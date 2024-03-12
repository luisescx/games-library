"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { EyeIcon, XMarkIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { api } from "@/trpc/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Button } from "../ui/button";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

type SignUpProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onLoginOpenModal: () => void;
};

const userSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "You must enter a password" })
    .min(6, { message: "Password must be at least 6 characters" })
    .refine(
      (val) => {
        return !val.includes(" ");
      },
      {
        message: "Password cannot contain spaces",
      },
    ),
});

type UserSchema = z.infer<typeof userSchema>;

export default function SignUp({
  isOpen,
  onCloseModal,
  onLoginOpenModal,
}: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const createAccount = api.auth.createAccount.useMutation({
    cacheTime: 0,
    retry: false,
  });

  const handleCreateAccount = useCallback(
    (data: UserSchema) => {
      createAccount.mutate(
        {
          ...data,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    },
    [createAccount, reset],
  );

  const handleCloseModal = useCallback(
    (openLoginModal?: boolean) => {
      reset();
      createAccount.reset();

      
      if (openLoginModal) {
        onLoginOpenModal();
        return;
      }

      onCloseModal();
    },
    [createAccount, onCloseModal, reset, onLoginOpenModal],
  );

  useEffect(() => {
    return () => {
      setShowPassword(false);
    };
  }, [isOpen]);

  useEffect;

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
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
                      onClick={() => handleCloseModal()}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 sm:py-12">
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

                    <Transition
                      show={!!createAccount.error}
                      as={Fragment}
                      enter="transform ease-out duration-300 transition"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="mt-4 rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                              Error
                            </h3>
                            {!!createAccount.error && (
                              <div className="mt-2 text-sm text-red-700">
                                <p>{createAccount.error?.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Transition>

                    <Transition
                      show={!!createAccount.isSuccess}
                      as={Fragment}
                      enter="transform ease-out duration-300 transition"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="mt-4 rounded-md bg-green-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-green-800">
                              Welcome to our gaming community!
                            </h3>
                            <div className="mt-2 text-sm text-green-700">
                              <p>
                                Your account has been successfully created. Have
                                fun exploring, creating your game list, and
                                sharing your experiences with fellow gamers!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Transition>

                    <form
                      className="pt-6"
                      action="#"
                      method="POST"
                      onSubmit={handleSubmit(handleCreateAccount)}
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
                            className={clsx(
                              "block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6",
                              {
                                "border-2 border-red-600 focus:border-0 focus:ring-2 focus:ring-red-600":
                                  !!errors.name?.message,
                              },
                            )}
                            {...register("name")}
                            type="text"
                          />
                        </div>
                        <div
                          className={clsx("mt-1 text-sm text-red-600", {
                            "opacity-0": !errors.name?.message,
                          })}
                        >
                          {errors.name?.message ?? "-"}
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            className={clsx(
                              "block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6",
                              {
                                "border-2 border-red-600 focus:border-0 focus:ring-2 focus:ring-red-600":
                                  !!errors.email?.message,
                              },
                            )}
                            {...register("email")}
                            type="email"
                            autoComplete="email"
                          />
                          <div
                            className={clsx("mt-1 text-sm text-red-600", {
                              "opacity-0": !errors.email?.message,
                            })}
                          >
                            {errors.email?.message ?? "-"}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Password
                        </label>
                        <div className="relative mt-2 flex">
                          <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            className={clsx(
                              "block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black sm:text-sm sm:leading-6",
                              {
                                "border-2 border-red-600 focus:border-0 focus:ring-2 focus:ring-red-600":
                                  !!errors.password?.message,
                              },
                            )}
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
                                className={clsx("h-6 w-6", {
                                  "text-red-600": !!errors.password?.message,
                                })}
                                aria-hidden="true"
                              />
                            ) : (
                              <EyeIcon
                                className={clsx("h-6 w-6", {
                                  "text-red-600": !!errors.password?.message,
                                })}
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>

                        <div
                          className={clsx("mt-1 text-sm text-red-600", {
                            "opacity-0": !errors.password?.message,
                          })}
                        >
                          {errors.password?.message ?? "-"}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          type="submit"
                          className="mt-2 flex w-full"
                          size="large"
                          isLoading={createAccount.isLoading}
                          disabled={createAccount.isLoading}
                        >
                          Sign up
                        </Button>
                      </div>

                      <div className="mt-4 flex w-full justify-center text-sm leading-6">
                        <button
                          type="button"
                          onClick={() => handleCloseModal(true)}
                          className="font-semibold text-amber-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-4 focus:ring-offset-slate-900"
                        >
                          Already have an account? Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
