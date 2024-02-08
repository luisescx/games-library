"use client";

import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { cva } from "class-variance-authority";

const toast = cva(
  "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1",
  {
    variants: {
      intent: {
        error: "bg-red-300 ring-red-700",
        success: "bg-green-200 ring-green-700",
        default: "bg-slate-700 ring-slate-900",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

const toastTitle = cva("text-sm font-medium", {
  variants: {
    intent: {
      error: "text-red-900",
      success: "text-green-900",
      default: "text-amber-400",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

const toastMessage = cva("mt-1 text-sm", {
  variants: {
    intent: {
      error: "text-red-600",
      success: "text-green-500",
      default: "text-amber-200",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

const closeButton = cva("inline-flex rounded-md", {
  variants: {
    intent: {
      error: "text-red-900 hover:text-red-700",
      success: "text-green-900 hover:text-green-700",
      default: "text-amber-400 hover:text-amber-500",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

const toastIcon = cva("h-6 w-6", {
  variants: {
    intent: {
      error: "text-red-900",
      success: "text-green-900",
      default: "text-amber-400",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

type ToastProps = {
  type?: "error" | "success" | "default";
  title: string;
  message: string;
  autoHide?: boolean;
};

export function Toast({
  type = "default",
  message,
  title,
  autoHide = false,
}: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoHide) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  });

  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={toast({ intent: type })}>
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {type === "success" ||
                      (type === "default" && (
                        <CheckCircleIcon
                          className={toastIcon({ intent: type })}
                          aria-hidden="true"
                        />
                      ))}
                    {type === "error" && (
                      <ExclamationCircleIcon
                        className={toastIcon({ intent: type })}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className={toastTitle({ intent: type })}>{title}</p>
                    <p className={toastMessage({ intent: type })}>{message}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className={closeButton({ intent: type })}
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
