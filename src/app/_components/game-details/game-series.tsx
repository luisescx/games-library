"use client";

import { api } from "@/trpc/react";
import { GameImageLoader } from "../game-image-loader";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { RenderGameSeriesSkeletons } from "./games-series-skeleton";

type GameSeriesProps = {
  slug: string;
};

export function GameSeries({ slug }: GameSeriesProps) {
  const { data, isLoading } = api.game.getGameSeries.useQuery({ slug });

  const teste = [];

  return (
    <section className="mt-8 w-full sm:mt-12">
      <h5 className="mb-5 border-l-2 border-amber-400 pl-2 text-xl font-bold tracking-tight text-amber-400 sm:text-lg">
        Game series
      </h5>

      {
        <RenderGameSeriesSkeletons isLoading={isLoading}>
          {data?.games && data.games.length > 0 ? (
            <div className="lg:grid-cols-23 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              {data?.games.map((game) => (
                <div
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-slate-900"
                  key={game.id}
                >
                  <div className="h-28  bg-gray-500 group-hover:opacity-75 sm:h-44">
                    <div className="h-full w-full sm:h-full sm:w-full">
                      <GameImageLoader
                        alt={game.name}
                        className="object-cover object-center"
                        src={game.backgroundImage}
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="text-base font-medium text-amber-400 md:text-lg">
                      <Link href={`/game-details/${game.slug}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {game.name}
                      </Link>
                    </h3>

                    <div className="mt-1 flex items-center justify-between md:mt-2">
                      <p className="text-xs font-normal text-white md:text-sm">
                        Release date
                      </p>
                      <p className="flex-wrap text-xs font-normal text-white md:text-sm">
                        {!!game.released ? formatDate(game.released) : "--"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="m-4 grid min-h-full place-items-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  No games series
                </h1>
              </div>
            </div>
          )}
        </RenderGameSeriesSkeletons>
      }
    </section>
  );
}
