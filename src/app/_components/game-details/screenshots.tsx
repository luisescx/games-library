/* eslint-disable @next/next/no-img-element */
"use client";

import { api } from "@/trpc/react";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";
import { ScreenshotImageSkeleton } from "./screenshot-image-skeleton";
import { GameImageLoader } from "../game-image-loader";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

type ScreenshotsProps = {
  slug: string;
};

function Overlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-slate-600 bg-opacity-65">
      <div className="flex h-full items-center justify-center">
        <div className="text-xl font-semibold text-amber-400">View All</div>
      </div>
    </div>
  );
}

export function Screenshots({ slug }: ScreenshotsProps) {
  const [showScreenshotModal, setScreenshotModal] = useState(false);
  const [selectedImageIndex, setSelectedIndex] = useState(0);

  const { data, isLoading } = api.game.getGameScreenshots.useQuery({ slug });

  const screenshots = data?.results ? data.results.slice(0, 3) : [];
  const allScreenshots = data?.results ? data.results : [];

  const handleSelectImage = useCallback((index: number) => {
    setSelectedIndex(index);

    setScreenshotModal(true);
  }, []);

  const onChangeImageIndex = useCallback((type: "next" | "back") => {
    if (type === "next") {
      setSelectedIndex((oldValue) => oldValue + 1);
    } else {
      setSelectedIndex((oldValue) => oldValue - 1);
    }
  }, []);

  if (isLoading) {
    return <ScreenshotImageSkeleton />;
  }

  if (data?.results && data.results.length > 0) {
    return (
      <>
        <div className="mt-14">
          <div
            className={clsx("grid grid-cols-1", {
              "sm:grid-cols-2 sm:gap-x-8": screenshots.length > 1,
            })}
          >
            {screenshots.map((screenshot, index) => (
              <Fragment key={screenshot.id}>
                {index === 0 && (
                  <div className="aspect-h-1 aspect-w-2 rounded-lg">
                    <div
                      className="h-full w-full hover:opacity-80 md:shadow-sm"
                      role="button"
                      onClick={() => handleSelectImage(index)}
                    >
                      <GameImageLoader
                        alt={screenshot.id}
                        src={screenshot.image}
                        quality={100}
                        className="rounded-lg object-cover object-center"
                        loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                        defaultLoaderBg={false}
                      />

                      <div className="sm:hidden">
                        <Overlay />
                      </div>
                    </div>
                  </div>
                )}

                {index === 1 && !screenshots[index + 1] && (
                  <div className="hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 sm:block">
                    <div
                      className="h-full w-full hover:opacity-80 md:shadow-sm"
                      role="button"
                      onClick={() => handleSelectImage(1)}
                    >
                      <GameImageLoader
                        alt={screenshot.id}
                        src={screenshot.image}
                        quality={100}
                        className="h-full w-full rounded-lg object-cover object-center"
                        loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                        defaultLoaderBg={false}
                      />
                      <Overlay />
                    </div>
                  </div>
                )}

                {index === 2 && (
                  <div className="hidden sm:block md:grid md:grid-cols-1 md:gap-y-8">
                    <div className="rounded-lg sm:aspect-h-1 sm:aspect-w-2 md:aspect-h-1 md:aspect-w-3 sm:block ">
                      <div
                        className="h-full w-full hover:opacity-80 md:shadow-sm"
                        role="button"
                        onClick={() => handleSelectImage(1)}
                      >
                        <GameImageLoader
                          alt={screenshots[index - 1]!.id}
                          src={screenshots[index - 1]!.image}
                          quality={100}
                          className="h-full w-full rounded-lg object-cover object-center"
                          loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                          defaultLoaderBg={false}
                        />
                        <div className="md:hidden">
                          <Overlay />
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:aspect-h-1 md:aspect-w-3 md:block md:rounded-lg">
                      <div
                        className="h-full w-full hover:opacity-80 md:shadow-sm"
                        role="button"
                        onClick={() => handleSelectImage(index)}
                      >
                        <GameImageLoader
                          alt={screenshot.id}
                          src={screenshot.image}
                          quality={100}
                          className="h-full w-full rounded-lg object-cover object-center"
                          loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                          defaultLoaderBg={false}
                        />
                        <Overlay />
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <Transition.Root show={showScreenshotModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setScreenshotModal}
          >
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
              <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-9">
                    <Dialog.Panel className="2xl:h-max[80%] relative w-full max-w-[95%] transform overflow-hidden rounded-lg bg-slate-900 px-4 pb-4 pt-5 text-left align-middle shadow-xl transition-all sm:my-8 sm:max-w-[80%] sm:p-6 md:p-8 2xl:h-[80%] 2xl:max-w-[70%]">
                      <div
                        className="absolute right-1 top-1 sm:right-3 sm:top-3"
                        role="button"
                        onClick={() => setScreenshotModal(false)}
                      >
                        <div className="z-10 rounded-lg  p-1 hover:bg-slate-800">
                          <XMarkIcon
                            aria-hidden="true"
                            className="h-7 w-7 text-amber-400"
                          />
                        </div>
                      </div>

                      <div className="aspect-h-1 aspect-w-2 relative mt-6 rounded-lg 2xl:aspect-none 2xl:h-full 2xl:max-h-full 2xl:pb-[1.5rem]">
                        <div className="h-full w-full 2xl:relative 2xl:h-full">
                          <button
                            className={clsx(
                              "absolute left-4 top-[45%] z-50 rounded-full bg-slate-900 bg-opacity-75 p-2 hover:bg-opacity-100",
                              {
                                "bg-slate-900 bg-opacity-75 text-amber-300 hover:bg-slate-900 hover:bg-opacity-75":
                                  !allScreenshots[selectedImageIndex - 1],
                              },
                            )}
                            role="button"
                            onClick={() => onChangeImageIndex("back")}
                            disabled={!allScreenshots[selectedImageIndex - 1]}
                          >
                            <ChevronLeftIcon
                              aria-hidden={true}
                              className={clsx(
                                "h-4 w-4 text-amber-400 md:h-7 md:w-7 lg:h-14 lg:w-14",
                                {
                                  "text-slate-600":
                                    !allScreenshots[selectedImageIndex - 1],
                                },
                              )}
                            />
                          </button>

                          {/* <Image
                            src={allScreenshots[selectedImageIndex]!.image}
                            alt={allScreenshots[selectedImageIndex]!.id}
                            fill
                            sizes="100vw, 100vh"
                            priority
                            quality={90}
                            className="rounded-lg bg-gray-500 object-center"
                          /> */}

                          <div className="relative h-full w-full">
                            <div className="h-full w-full overflow-hidden">
                              <div
                                className="flex h-full w-full transition duration-200 ease-out"
                                style={{
                                  transform: `translateX(-${selectedImageIndex * 100}%)`,
                                }}
                              >
                                {allScreenshots.map((screenshot) => (
                                  <div
                                    className="min-w-0 shrink-0 grow-0 basis-full"
                                    key={screenshot.id}
                                  >
                                    <img
                                      alt={screenshot.id}
                                      key={screenshot.id}
                                      src={screenshot.image}
                                      className="h-full w-full rounded-lg bg-gray-500 object-cover object-center"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <button
                            className={clsx(
                              "absolute right-4 top-[45%] z-50 rounded-full bg-slate-900 bg-opacity-75 p-2 hover:bg-opacity-100",
                              {
                                "text-green bg-slate-900 bg-opacity-75 text-amber-300 hover:bg-slate-900 hover:bg-opacity-75":
                                  !allScreenshots[selectedImageIndex + 1],
                              },
                            )}
                            role="button"
                            onClick={() => onChangeImageIndex("next")}
                            disabled={!allScreenshots[selectedImageIndex + 1]}
                          >
                            <ChevronRightIcon
                              className={clsx(
                                "h-4 w-4 text-amber-400 md:h-7 md:w-7 lg:h-14 lg:w-14",
                                {
                                  "text-slate-600":
                                    !allScreenshots[selectedImageIndex + 1],
                                },
                              )}
                            />
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
  }

  return null;
}
