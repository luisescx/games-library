"use client";

import { type Session } from "next-auth";
import { api } from "@/trpc/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { StaticToast } from "../ui/static-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type RecoverNewPasswordProps = {
  session: Session | null;
};

const recoverAccessSchema = z.object({
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

type RecoverAccessSchema = z.infer<typeof recoverAccessSchema>;

export default function RecoverNewPassword({
  session,
}: RecoverNewPasswordProps) {
  const router = useRouter();

  if (session) {
    router.replace("/");
  }

  const pathname = usePathname();

  const accessToken = useMemo(() => {
    const parts = pathname.split("recover-account/");

    if (parts && parts.length > 1) {
      return parts[1];
    }

    return null;
  }, [pathname]);

  const { error, isFetched, isLoading } =
    api.auth.checkRecoverAccountToken.useQuery(
      {
        accessToken: accessToken ?? "",
      },
      {
        retry: false,
        refetchOnWindowFocus: false,
      },
    );

  const [showPassword, setShowPassword] = useState(false);

  const createNewPassword = api.auth.updatePasswordByRecoverAccount.useMutation(
    {
      cacheTime: 0,
      retry: false,
    },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecoverAccessSchema>({
    resolver: zodResolver(recoverAccessSchema),
  });

  const handleRecoverAccount = useCallback(
    (data: RecoverAccessSchema) => {
      createNewPassword.mutate(
        {
          password: data.password,
          accessToken: accessToken!,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );
    },
    [createNewPassword, reset, accessToken],
  );

  return (
    !session && (
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
            Create a new password so you can access your account again
          </p>

          <StaticToast
            type="error"
            showToast={!!error || !!createNewPassword.error}
            title="Error"
            message={error?.message ?? createNewPassword.error?.message ?? ""}
          />

          <StaticToast
            type="success"
            showToast={createNewPassword.isSuccess}
            title="New password!"
            message="You created your new password, log in again using the new password."
          />
        </div>

        {isLoading && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <StaticToast
              type="success"
              showToast={isLoading}
              title="Validating your token"
              message="Just a moment, we are validating your token"
            />
          </div>
        )}

        {!error && isFetched && !createNewPassword.isSuccess && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit(handleRecoverAccount)}
            >
              <div>
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    New password
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
                      onClick={() => setShowPassword((oldValue) => !oldValue)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-6 w-6" aria-hidden="true" />
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
              </div>

              <Button
                type="submit"
                className="mt-3 flex w-full"
                size="medium"
                isLoading={createNewPassword.isLoading}
                disabled={createNewPassword.isLoading}
              >
                Create new password
              </Button>
            </form>
          </div>
        )}

        {error && isFetched && !isLoading && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Button
              className="mt-3 flex w-full"
              size="medium"
              onClick={() => {
                router.replace("/recover-account");
              }}
            >
              Generate a new token
            </Button>
          </div>
        )}
      </section>
    )
  );
}
