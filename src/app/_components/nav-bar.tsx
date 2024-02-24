/* eslint-disable @next/next/no-img-element */
"use client";

import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image, { type StaticImageData } from "next/image";
import clsx from "clsx";
import { Container } from "./ui/container";
import { cva } from "class-variance-authority";
import tailwindLogo from "/public/images/talwind-logo.svg";
import LogIn from "./nav-bar/log-in";
import SignUp from "./nav-bar/sign-up";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

const tailwindLogoImage = tailwindLogo as StaticImageData;
const avatarImage = "images/avatar.avif";

const navigation = [
  { name: "Games", href: "#", current: true },
  { name: "My Games", href: "#", current: false },
];

const navBarButton = cva(
  "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold",
  {
    variants: {
      intent: {
        filled: "bg-amber-400 text-gray-900",
        ghost: "text-white hover:bg-gray-700 hover:text-white",
      },
      hover: {
        filled: "hover:bg-amber-300",
        ghost: "hover:text-white",
      },
    },
  },
);

type NavBarProps = {
  session: Session | null;
};

export function NavBar({ session }: NavBarProps) {
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <header>
      <>
        <Disclosure as="nav" className="bg-slate-900 shadow">
          {({ open }) => (
            <Container>
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      src={tailwindLogoImage}
                      alt="Yout Company"
                      className="block h-8 w-auto lg:hidden"
                    />
                    <Image
                      src={tailwindLogoImage}
                      alt="Yout Company"
                      className="hidden h-8 w-auto lg:block"
                    />
                  </div>

                  {session && (
                    <div className="hidden sm:flex sm:items-center">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Disclosure.Button
                            as="a"
                            key={item.name}
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={navBarButton({
                              hover: item.current ? "filled" : "ghost",
                              intent: item.current ? "filled" : "ghost",
                            })}
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {session ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>
                          <img
                            src={session.user.image ?? avatarImage}
                            alt="User avatar"
                            className="h-8 w-8 rounded-full"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Disclosure.Button
                                as="a"
                                href="#"
                                className={clsx(
                                  "block px-4 py-2 text-sm text-gray-700",
                                  active ? "bg-gray-100" : "",
                                )}
                              >
                                Your Profile
                              </Disclosure.Button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Disclosure.Button
                                onClick={() => signOut()}
                                className={clsx(
                                  "flex w-full items-center px-4 py-2 text-sm text-gray-700",
                                  active ? "bg-gray-100" : "",
                                )}
                              >
                                Sign out
                              </Disclosure.Button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex flex-1 items-center justify-end gap-x-6">
                      <Disclosure.Button
                        onClick={() => setOpenLogIn(true)}
                        className={navBarButton({
                          hover: "ghost",
                          intent: "ghost",
                        })}
                      >
                        Log in
                      </Disclosure.Button>
                      <Disclosure.Button
                        onClick={() => setOpenSignUp(true)}
                        className={navBarButton({
                          hover: "filled",
                          intent: "filled",
                        })}
                      >
                        Sign up
                      </Disclosure.Button>
                    </div>
                  )}
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                {session ? (
                  <>
                    <div className="space-y-1 pb-3 pt-2">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={clsx(
                            item.current
                              ? "bg-amber-400 text-gray-900"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>

                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-4">
                        <div className="flex-shrink-0">
                          <img
                            src={session.user.image ?? avatarImage}
                            alt="User avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {session.user.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {session.user.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <Disclosure.Button
                          as="a"
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Your Profile
                        </Disclosure.Button>
                        <Disclosure.Button
                          onClick={() => signOut()}
                          className="flex w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Sign out
                        </Disclosure.Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1 pb-3 pt-2">
                    <Disclosure.Button
                      onClick={() => setOpenLogIn(true)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-amber-400 hover:text-gray-900"
                    >
                      Log in
                    </Disclosure.Button>

                    <Disclosure.Button
                      onClick={() => setOpenSignUp(true)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-amber-400 hover:text-gray-900"
                    >
                      Sign up
                    </Disclosure.Button>
                  </div>
                )}
              </Disclosure.Panel>
            </Container>
          )}
        </Disclosure>

        {!session && (
          <>
            <LogIn
              isOpen={openLogIn}
              onCloseModal={() => setOpenLogIn(false)}
            />
            <SignUp
              isOpen={openSignUp}
              onCloseModal={() => setOpenSignUp(false)}
            />
          </>
        )}
      </>
    </header>
  );
}
