"use client";

import { formatDate } from "@/utils/date";
import { Button } from "../ui/button";
import Image from "next/image";
import { GameImageLoader } from "../game-image-loader";
import { type GameData } from "@/server/services/external-api/api";
import { GameCardSkeleton } from "../ui/game-card-skeleton";
import Link from "next/link";

type PlatformImageTypeTest = Record<string, string>;

export const platformImages: PlatformImageTypeTest = {
  android: "/images/platforms/android.svg",
  ios: "/images/platforms/ios.svg",
  nintendo: "/images/platforms/nintendo.svg",
  pc: "/images/platforms/pc.svg",
  playstation: "/images/platforms/playstation.svg",
  xbox: "/images/platforms/xbox.svg",
  others: "/images/platforms/others.svg",
};

type GamesListProps = {
  gameData: GameData;
  isLoading: boolean;
  setPage: () => void;
};

type RenderSkeletonsProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

function RenderSkeletons({ isLoading, children }: RenderSkeletonsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {Array.from({ length: 20 }, (_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return <>{children}</>;
}

export function GamesList({ gameData, isLoading, setPage }: GamesListProps) {
  return (
    <section className="mt-8 w-full">
      <RenderSkeletons isLoading={isLoading && gameData.games.length === 0}>
        {gameData.games.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {gameData.games.map((game, index) => (
              <div
                key={`${game.id}-${index}`}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-slate-900"
              >
                <div className="aspect-h-3 aspect-w-3 bg-gray-500 sm:aspect-none group-hover:opacity-75 sm:h-96">
                  <div className="h-full w-full sm:h-full sm:w-full">
                    <GameImageLoader
                      alt={game.name}
                      className="object-cover object-center"
                      src={game.backgroundImage}
                      quality={75}
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-none space-x-4">
                    {game?.parentPlatforms.map(
                      (platform) =>
                        platformImages[platform.slug] && (
                          <Image
                            key={platform.id}
                            src={
                              platformImages[platform.slug]
                                ? platformImages[platform.slug]!
                                : platformImages.others!
                            }
                            width={0}
                            height={0}
                            alt={platform.slug}
                            className="h-4 w-4"
                          />
                        ),
                    )}
                    {game?.parentPlatforms.some(
                      (platform) => !platformImages[platform.slug],
                    ) && (
                      <Image
                        src={platformImages.others!}
                        className="h-4 w-4"
                        width={0}
                        height={0}
                        alt="others"
                      />
                    )}
                  </div>

                  <h3 className="mt-2 text-lg font-medium text-amber-400">
                    <Link href={`/game-details/${game.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {game.name}
                    </Link>
                  </h3>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-normal text-white">
                      Release date
                    </p>
                    <p className="flex-wrap text-sm font-normal text-white">
                      {!!game.released ? formatDate(game.released) : "--"}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center justify-between">
                    <p className="mr-2 text-sm font-normal text-white">
                      Genres
                    </p>
                    <p className="flex-wrap text-sm  font-normal text-white">
                      {game.genres && game.genres.length > 0
                        ? game.genres.map((genre) => genre.name).join(", ")
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-24 grid min-h-full place-items-center">
            <div className="text-center">
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-400 sm:text-5xl">
                No games found
              </h1>
              <p className="mt-6 text-base leading-7 text-white">
                Sorry, we couldn’t find any games.
              </p>
            </div>
          </div>
        )}
      </RenderSkeletons>

      {gameData.games.length > 0 && gameData.next && (
        <div className="m-7 mb-0 flex justify-center sm:mb-2">
          <Button onClick={setPage} disabled={isLoading} isLoading={isLoading}>
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
