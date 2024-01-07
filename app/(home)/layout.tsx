"use client";

import UserDropdown from "@/components/user-dropdown";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useState } from "react";
import {
  FaBars,
  FaBell,
  FaChevronRight,
  FaHome,
  FaRobot,
} from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";

const navigation = [
  { name: "Home", href: "#", icon: FaHome, current: true },
  { name: "My Library", href: "#", icon: IoLibrary, current: false },
  { name: "Ask AI", href: "#", icon: FaRobot, current: false },
];

const library = [
  {
    name: "Courses",
    current: false,
    children: [
      { name: "Engineering", href: "#", current: false },
      { name: "Human Resources", href: "#", current: false },
      { name: "Customer Success", href: "#", current: false },
    ],
  },
  {
    name: "Books",
    current: false,
    children: [
      { name: "GraphQL API", href: "#", current: false },
      { name: "iOS App", href: "#", current: false },
      { name: "Android App", href: "#", current: false },
      { name: "New Customer Portal", href: "#", current: false },
    ],
  },
  {
    name: "Studylists",
    current: false,
    children: [
      { name: "GraphQL API", href: "#", current: false },
      { name: "iOS App", href: "#", current: false },
      { name: "Android App", href: "#", current: false },
      { name: "New Customer Portal", href: "#", current: false },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      {/* <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        /> */}
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <h1 className="text-yellow-500 font-bold text-3xl [text-shadow:-3px_-3px_0_#09090b,3px_-3px_0_#09090b,_-3px_3px_0_#09090b,3px_3px_0_#09090b] drop-shadow-[4px_4px_0_#000] ">
                      StudyJom!
                    </h1>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-indigo-400 text-indigo-900"
                                    : "text-zinc-800 hover:bg-indigo-400",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-indigo-900"
                                      : "text-zinc-800",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-zinc-900">
                          My library
                        </div>
                        <ul className="-mx-2 mt-2 space-y-1">
                          {library.map((item) => (
                            <li key={item.name}>
                              <Disclosure as="div">
                                {({ open }) => (
                                  <>
                                    <Disclosure.Button
                                      className={classNames(
                                        item.current
                                          ? "bg-indigo-400"
                                          : "hover:bg-indigo-400",
                                        "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                      )}
                                    >
                                      <FaChevronRight
                                        className={classNames(
                                          open
                                            ? "rotate-90 text-zinc-800"
                                            : "text-zinc-800",
                                          "h-5 w-5 shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </Disclosure.Button>
                                    <Disclosure.Panel
                                      as="ul"
                                      className="mt-1 px-2"
                                    >
                                      {item.children.map((subItem) => (
                                        <li key={subItem.name}>
                                          <Disclosure.Button
                                            as="a"
                                            href={subItem.href}
                                            className={classNames(
                                              subItem.current
                                                ? "bg-indigo-400"
                                                : "hover:bg-indigo-400",
                                              "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                                            )}
                                          >
                                            {subItem.name}
                                          </Disclosure.Button>
                                        </li>
                                      ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </Disclosure>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <a
                          href="/settings"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                        >
                          {/* <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            /> */}
                          Settings
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-300 px-6 pb-4 border-r-2 border-solid border-black">
          <div className="flex h-16 shrink-0 items-center">
            <Link
              href="/"
              className="text-yellow-500 font-bold text-3xl [text-shadow:-1px_-1px_0_#09090b,1px_-1px_0_#09090b,_-1px_1px_0_#09090b,1px_1px_0_#09090b] drop-shadow-[2px_2px_0_#000] "
            >
              StudyJom!
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-indigo-400 text-indigo-900"
                            : "text-zinc-800 hover:bg-indigo-400",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? "text-indigo-900" : "text-zinc-800",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-zinc-900">
                  My library
                </div>
                <ul className="-mx-2 mt-2 space-y-1">
                  {library.map((item) => (
                    <li key={item.name}>
                      <Disclosure as="div">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? "bg-indigo-400"
                                  : "hover:bg-indigo-400",
                                "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                              )}
                            >
                              <FaChevronRight
                                className={classNames(
                                  open
                                    ? "rotate-90 text-zinc-800"
                                    : "text-zinc-800",
                                  "h-5 w-5 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                              {item.children.map((subItem) => (
                                <li key={subItem.name}>
                                  <Disclosure.Button
                                    as="a"
                                    href={subItem.href}
                                    className={classNames(
                                      subItem.current
                                        ? "bg-indigo-400"
                                        : "hover:bg-indigo-400",
                                      "block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700"
                                    )}
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                </li>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b-2 border-black bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 py-2">
              <input
                id="search-field"
                className="block h-full w-full border-2 border-solid border-black shadow-default py-0 pl-8 px-2 rounded-full text-gray-900 placeholder:text-zinc-800 focus:ring-0 focus:outline-none focus:shadow-none sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-zinc-800 hover:text-zinc-800"
              >
                <span className="sr-only">View notifications</span>
                <FaBell className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                aria-hidden="true"
              />

              {/* Profile dropdown */}
              <UserDropdown />
            </div>
          </div>
        </div>

        <main className="py-10 px-4 sm:px-6 lg:px-8 w-full h-screen bg-emerald-300">
          {children}
        </main>
      </div>
    </div>
  );
}
