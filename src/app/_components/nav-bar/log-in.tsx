"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { EyeIcon, XMarkIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { api } from "@/trpc/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Button } from "../ui/button";

type LogInProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSignUpOpenModal: () => void;
};

const userSchema = z.object({
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

export default function LogIn({
  isOpen,
  onCloseModal,
  onSignUpOpenModal,
}: LogInProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const router = useRouter();

  const signInCredentials = api.auth.signIn.useMutation({
    cacheTime: 0,
    retry: false,
  });

  const handleSignIn = useCallback(
    (data: UserSchema) => {
      signInCredentials.mutate(
        {
          ...data,
        },
        {
          onSuccess: () => {
            router.refresh();
          },
        },
      );
    },
    [router, signInCredentials],
  );

  const handleCloseModal = useCallback(
    (openLoginModal?: boolean) => {
      reset();
      signInCredentials.reset();

      if (openLoginModal) {
        onSignUpOpenModal();
        return;
      }

      onCloseModal();
    },
    [reset, signInCredentials, onCloseModal, onSignUpOpenModal],
  );

  useEffect(() => {
    return () => {
      setShowPassword(false);
    };
  }, [isOpen]);

  return (
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
                      Sign in to your account
                    </h2>
                  </div>

                  <Transition
                    show={!!signInCredentials.error}
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
                          {!!signInCredentials.error && (
                            <div className="mt-2 text-sm text-red-700">
                              <p>{signInCredentials.error?.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Transition>

                  <form
                    className="pt-6"
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit(handleSignIn)}
                  >
                    <div>
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
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          {...register("password")}
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
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <EyeIcon className="h-6 w-6" aria-hidden="true" />
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

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300  text-amber-400 focus:ring-amber-400 focus:ring-offset-slate-900"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-3 block text-sm leading-6 text-white"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm leading-6">
                        <a
                          href="#"
                          className="font-semibold text-amber-400 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-4 focus:ring-offset-slate-900"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        type="submit"
                        className="mt-2 flex w-full"
                        size="large"
                        isLoading={signInCredentials.isLoading}
                        disabled={signInCredentials.isLoading}
                      >
                        Sign in
                      </Button>
                    </div>

                    <div className="mt-4 flex w-full justify-center text-sm leading-6">
                      <button
                        type="button"
                        onClick={() => handleCloseModal(true)}
                        className="font-semibold text-amber-400 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-4 focus:ring-offset-slate-900"
                      >
                        Dont&apos;t have an account? Sign up
                      </button>
                    </div>
                  </form>

                  <div>
                    <div className="relative mt-8">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-slate-900 px-6 text-white">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button
                        onClick={() => signIn("discord")}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <svg className="h-5 w-5" viewBox="0 -28.5 256 256">
                          <g>
                            <path
                              d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                              fill="#5865F2"
                            ></path>
                          </g>
                        </svg>
                        <span className="text-sm font-semibold leading-6">
                          Discord
                        </span>
                      </button>
                      <button
                        onClick={() => signIn("google")}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                      >
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                            fill="#EA4335"
                          />
                          <path
                            d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                            fill="#4285F4"
                          />
                          <path
                            d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                            fill="#34A853"
                          />
                        </svg>
                        <span className="text-sm font-semibold leading-6">
                          Google
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
