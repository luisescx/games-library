"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { EyeIcon, XMarkIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api } from "@/trpc/react";

type SignUpProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export default function SignUp({ isOpen, onCloseModal }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const createAccount = api.auth.createAccount.useMutation();

  useEffect(() => {
    return () => {
      setShowPassword(false);
    };
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-full transform overflow-hidden rounded-lg bg-slate-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-slate-900 text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-transparent"
                    onClick={onCloseModal}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                      className="mx-auto h-10 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=amber&shade=300"
                      alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-slate-50">
                      Create your account
                    </h2>
                  </div>

                  <form
                    className="space-y-6 pt-12"
                    action="#"
                    method="POST"
                    onSubmit={(e) => {
                      e.preventDefault();
                      createAccount.mutate({
                        ...form,
                      });
                    }}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm((oldState) => ({
                              ...oldState,
                              name: e.target.value,
                            }))
                          }
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((oldState) => ({
                              ...oldState,
                              email: e.target.value,
                            }))
                          }
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Password
                      </label>
                      <div className="relative mt-2 flex">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          value={form.password}
                          onChange={(e) =>
                            setForm((oldState) => ({
                              ...oldState,
                              password: e.target.value,
                            }))
                          }
                          required
                          className="block w-full rounded-md border-0 py-1.5 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6"
                        />

                        <div
                          className="absolute right-3 top-[20%]"
                          role="button"
                          onClick={() =>
                            setShowPassword((oldValue) => !oldValue)
                          }
                        >
                          {showPassword ? (
                            <EyeSlashIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-9">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-900 shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                      >
                        Sign up
                      </button>
                    </div>

                    <div className="flex w-full justify-center text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-amber-400 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-4 focus:ring-offset-slate-900"
                      >
                        Already have an account? Sign in
                      </a>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
