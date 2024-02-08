"use client";

import { api } from "@/trpc/react";
import clsx from "clsx";
import { Fragment, useCallback, useState } from "react";
import { ScreenshotImageSkeleton } from "./screenshot-image-skeleton";
import { GameImageLoader } from "../game-image-loader";
import { Carousel } from "./carousel";

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

  if (isLoading) {
    return <ScreenshotImageSkeleton />;
  }

  if (data?.results && data.results.length > 0) {
    return (
      <>
        <section className="mt-14">
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
                      >
                        <div className="sm:hidden">
                          <Overlay />
                        </div>
                      </GameImageLoader>
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
                      >
                        <Overlay />
                      </GameImageLoader>
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
                        >
                          <div className="md:hidden">
                            <Overlay />
                          </div>
                        </GameImageLoader>
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
                        >
                          <Overlay />
                        </GameImageLoader>
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </section>

        <Carousel
          allScreenshots={allScreenshots}
          onCloseModal={() => setScreenshotModal(false)}
          showScreenshotModal={showScreenshotModal}
          initScreenshotIndex={selectedImageIndex}
        />
      </>
    );
  }

  return null;
}
