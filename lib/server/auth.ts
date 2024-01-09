"use server";

import { connect } from "tls";
import { connectPrisma } from "@/lib/server/prisma";
import client from "@/prisma";
import got from "got";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";

type UserJwtPayload = {
  jti: string;
  iat: number;
};

type moodleData = {
  sitename: string;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  lang: string;
  userid: number;
  siteurl: string;
  userpictureurl: string;
  functions: Array<{
    name: string;
    version: string;
  }>;
  downloadfiles: number;
  uploadfiles: number;
  release: string;
  version: string;
  mobilecssurl: string;
  advancedfeatures: Array<{
    name: string;
    value: number;
  }>;
  usercanmanageownfiles: boolean;
  userquota: number;
  usermaxuploadfilesize: number;
  userhomepage: number;
  siteid: number;
  sitecalendartype: string;
  usercalendartype: string;
  userissiteadmin: boolean;
  theme: string;
};

/**
 * Get required user informations from trusted source.
 * @param {string} username Use the same matric number you use to login to i-ma'luum.
 * @param {string} password Use the same password you use to login to i-ma'luum.
 * @returns {Promise<TSession>} Returns the user's full name, matric number and image.
 */
export async function MoodleLogin(
  username: string,
  password: string
): Promise<TSession> {
  const initialDataPayload = new URLSearchParams({
    username: username,
    password: password,
    service: "moodle_mobile_app",
  });

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

  try {
    await connectPrisma();

    const initialData: { token: string; privatetoken: string } = await got
      .post("https://italeemc22-arc.iium.edu.my/login/token.php", {
        body: initialDataPayload.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        https: {
          rejectUnauthorized: false,
        },
      })
      .json();

    const finalDataPayload = new URLSearchParams({
      moodlewsrestformat: "json",
      wsfunction: "core_webservice_get_site_info",
      wstoken: initialData.token,
    });

    const finalData: moodleData = await got
      .post("https://italeemc22-arc.iium.edu.my/webservice/rest/server.php", {
        body: finalDataPayload.toString(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        https: {
          rejectUnauthorized: false,
        },
      })
      .json();

    const name: string = finalData.firstname;
    const matricNo: string = finalData.lastname;
    const image: string = `https://corsproxy.io/?https://smartcard.iium.edu.my/packages/card/printing/camera/uploads/original/${matricNo}.jpeg`;

    const payload = {
      matricNo,
      name,
    };

    // create session token using JWT
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(secret));

    cookies().set({
      name: "studyjom_session",
      value: token as string,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    // check if student already exists in database
    const student = await client.student.findFirst({
      where: {
        matricNo,
      },
    });

    let updatedStudent;

    // if student doesn't exist, create new student
    if (!student) {
      updatedStudent = await client.student.create({
        data: {
          name,
          matricNo,
          image,
          points: 0,
          sessionToken: token,
        },
      });
    } else {
      // if student exists, update session token
      updatedStudent = await client.student.update({
        where: {
          id: student.id,
        },
        data: {
          name,
          matricNo,
          image,
          sessionToken: token,
        },
      });
    }

    // return student data
    return updatedStudent;
  } catch (err) {
    console.log(err);
    throw new Error("Invalid Credentials");
  }
}

export async function MoodleLogout(sessionToken: string) {
  try {
    await connectPrisma();
    cookies().delete("studyjom_session");

    const student = await client.student.findFirst({
      where: {
        sessionToken,
      },
    });

    if (!student) {
      throw new Error("Invalid Session");
    }

    const updatedStudent = await client.student.update({
      where: {
        id: student.id,
      },
      data: {
        sessionToken: "",
      },
    });

    return updatedStudent;
  } catch (err) {
    console.log(err);
    throw new Error("Invalid Credentials");
  }
}
