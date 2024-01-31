"use client";

import { api } from "@/trpc/react";
import clsx from "clsx";
import { Fragment, useState } from "react";
import { ScreenshotImageSkeleton } from "./screenshot-image-skeleton";
import { GameImageLoader } from "../game-image-loader";

type ScreenshotsProps = {
  slug: string;
};

export function Screenshots({ slug }: ScreenshotsProps) {
  const { data, isLoading } = api.game.getGameScreenshots.useQuery({ slug });

  if (isLoading) {
    return <ScreenshotImageSkeleton />;
  }

  if (data?.results && data.results.length > 0) {
    const screenshots = data.results.slice(0, 3);

    return (
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
                  <div className="h-full w-full">
                    <GameImageLoader
                      alt={screenshot.id}
                      src={screenshot.image}
                      quality={100}
                      className="rounded-lg object-cover object-center"
                      loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                      defaultLoaderBg={false}
                    />
                  </div>
                </div>
              )}

              {index === 1 && !screenshots[index + 1] && (
                <div className="hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 sm:block">
                  <div className="h-full w-full">
                    <GameImageLoader
                      alt={screenshot.id}
                      src={screenshot.image}
                      quality={100}
                      className="h-full w-full rounded-lg object-cover object-center"
                      loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                      defaultLoaderBg={false}
                    />
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="hidden sm:block md:grid md:grid-cols-1 md:gap-y-8">
                  <div className="rounded-lg sm:aspect-h-1 sm:aspect-w-2 md:aspect-h-1 md:aspect-w-3 sm:block">
                    <div className="h-full w-full">
                      <GameImageLoader
                        alt={screenshots[index - 1]!.id}
                        src={screenshots[index - 1]!.image}
                        quality={100}
                        className="h-full w-full rounded-lg object-cover object-center"
                        loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                        defaultLoaderBg={false}
                      />
                    </div>
                  </div>

                  <div className="hidden md:aspect-h-1 md:aspect-w-3 md:block md:rounded-lg">
                    <div className="h-full w-full">
                      <GameImageLoader
                        alt={screenshot.id}
                        src={screenshot.image}
                        quality={100}
                        className="h-full w-full rounded-lg object-cover object-center"
                        loaderClassName="rounded-lg object-cover object-center bg-gray-500"
                        defaultLoaderBg={false}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
