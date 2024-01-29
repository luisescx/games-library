import { api } from "@/trpc/server";
import clsx from "clsx";
import Image from "next/image";

type ScreenshotsProps = {
  slug: string;
};

export async function Screenshots({ slug }: ScreenshotsProps) {
  const data = await api.game.getGameScreenshots.query({ slug });

  if (data.results && data.results.length > 0) {
    const screenshots = data.results.slice(0, 3);

    return (
      <div className="mt-14">
        <div
          className={clsx("grid grid-cols-1", {
            "sm:grid-cols-2 sm:gap-x-8": screenshots.length > 1,
          })}
        >
          {screenshots.map((screenshot, index) => (
            <>
              {index === 0 && (
                <div className="aspect-h-1 aspect-w-2 rounded-lg">
                  <Image
                    alt={screenshot.id}
                    src={screenshot.image}
                    priority
                    quality={100}
                    fill
                    sizes="100vw, 100vh"
                    className="rounded-lg object-cover object-center"
                  />
                </div>
              )}

              {index === 1 && !screenshots[index + 1] && (
                <div className="hidden rounded-lg sm:aspect-h-1 sm:aspect-w-2 sm:block">
                  <Image
                    alt={screenshot.id}
                    src={screenshot.image}
                    priority
                    quality={50}
                    sizes="100vw, 100vh"
                    fill
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
              )}

              {index === 2 && (
                <div className="hidden sm:block md:grid md:grid-cols-1 md:gap-y-8">
                  <div className="rounded-lg sm:aspect-h-1 sm:aspect-w-2 md:aspect-h-1 md:aspect-w-3 sm:block">
                    <Image
                      alt={screenshots[index - 1]!.id}
                      src={screenshots[index - 1]!.image}
                      priority
                      quality={50}
                      sizes="100vw, 100vh"
                      fill
                      className="h-full w-full rounded-lg object-cover object-center"
                    />
                  </div>

                  <div className="hidden md:aspect-h-1 md:aspect-w-3 md:block md:rounded-lg">
                    <Image
                      alt={screenshot.id}
                      src={screenshot.image}
                      priority
                      quality={50}
                      sizes="100vw, 100vh"
                      fill
                      className="h-full w-full rounded-lg object-cover object-center"
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
