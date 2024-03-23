"use client";

import { type Session } from "next-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, Fragment } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

type RecoverAccountFormProps = {
  session: Session | null;
};

const recoverAccountSchema = z.object({
  email: z.string().trim().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
});

type RecoverAccountSchema = z.infer<typeof recoverAccountSchema>;

export default function RecoverAccountForm({
  session,
}: RecoverAccountFormProps) {
  const router = useRouter();

  if (session) {
    router.replace("/");
  }

  const sendEmailRecoverAccount = api.auth.sendEmailRecoverAccount.useMutation({
    cacheTime: 0,
    retry: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecoverAccountSchema>({
    resolver: zodResolver(recoverAccountSchema),
  });

  const handleRecoverAccount = useCallback(
    (data: RecoverAccountSchema) => {
      sendEmailRecoverAccount.mutate(
        {
          email: data.email,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    },
    [reset, sendEmailRecoverAccount],
  );

  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-16 md:py-24 lg:px-8 lg:py-40">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Recover your account
        </h2>

        <p className="mt-2 text-center text-sm leading-6 text-white">
          You will receive an email with a password reset link
        </p>

        <Transition
          show={!!sendEmailRecoverAccount.error}
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
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                {!!sendEmailRecoverAccount.error && (
                  <div className="mt-2 text-sm text-red-700">
                    <p>{sendEmailRecoverAccount.error?.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Transition>

        <Transition
          show={!!sendEmailRecoverAccount.isSuccess}
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
                  Email Sent Successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    An email has been successfully sent to your registered email
                    address for account recovery. Please check your inbox,
                    including your spam folder, if you don&apos;t see it in your
                    main mailbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit(handleRecoverAccount)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email
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

          <Button
            type="submit"
            className="mt-3 flex w-full"
            size="medium"
            isLoading={sendEmailRecoverAccount.isLoading}
            disabled={sendEmailRecoverAccount.isLoading}
          >
            Send
          </Button>
        </form>
      </div>
    </section>
  );
}
