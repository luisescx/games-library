"use client";

import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { cva } from "class-variance-authority";

type StaticToastProps = {
  showToast: boolean;
  title: string;
  message: string;
  type: "success" | "error";
};

const staticToast = cva("mt-4 rounded-md p-4", {
  variants: {
    intent: {
      error: "bg-red-50",
      success: "bg-green-50",
    },
  },
});

const titleToast = cva("text-sm font-medium", {
  variants: {
    intent: {
      error: "text-red-800",
      success: "text-green-800",
    },
  },
});

const messageToast = cva("mt-2 text-sm", {
  variants: {
    intent: {
      error: "text-red-800",
      success: "text-green-700",
    },
  },
});

export function StaticToast({
  showToast,
  type,
  message,
  title,
}: StaticToastProps) {
  return (
    <Transition
      show={showToast}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={staticToast({ intent: type })}>
        <div className="flex">
          <div className="flex-shrink-0">
            {type === "error" && (
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            )}
            {type === "success" && (
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="ml-3">
            <h3 className={titleToast({ intent: type })}>{title}</h3>

            <div className={messageToast({ intent: type })}>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
