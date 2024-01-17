"use client";

import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { formatDate, platformImages } from "@/utils";
import { type Game } from "@/server/services/external-api/models/game";
import { type GameData } from "@/server/services/external-api/api";
import { Button } from "./ui/button";
import Image from "next/image";

const GAMES_LIST = [
  {
    id: 1,
    backgroundImage:
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    name: "Grand Theft Auto V",
    platforms: [
      {
        id: 1,
        name: "PC",
        slug: "pc",
      },
      {
        id: 2,
        name: "PlayStation",
        slug: "playstation",
      },
      {
        id: 3,
        name: "Xbox",
        slug: "xbox",
      },
    ],
    released: "2013-09-17",
    slug: "grand-theft-auto-v",
    genres: [
      {
        id: 1,
        name: "Action",
        slug: "action",
      },
      {
        id: 2,
        name: "RPG",
        slug: "rpg",
      },
      {
        id: 3,
        name: "Adventure",
        slug: "adventure",
      },
    ],
  },
  {
    id: 2,
    backgroundImage:
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    name: "Grand Theft Auto V",
    platforms: [
      {
        id: 1,
        name: "PC",
        slug: "pc",
      },
      {
        id: 2,
        name: "PlayStation",
        slug: "playstation",
      },
      {
        id: 3,
        name: "Xbox",
        slug: "xbox",
      },
    ],
    released: "2013-09-17",
    slug: "grand-theft-auto-v",
    genres: [
      {
        id: 1,
        name: "Action",
        slug: "action",
      },
      {
        id: 2,
        name: "RPG",
        slug: "rpg",
      },
      {
        id: 3,
        name: "Adventure",
        slug: "adventure",
      },
    ],
  },
  {
    id: 3,
    backgroundImage:
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    name: "Grand Theft Auto V",
    platforms: [
      {
        id: 1,
        name: "PC",
        slug: "pc",
      },
      {
        id: 2,
        name: "PlayStation",
        slug: "playstation",
      },
      {
        id: 3,
        name: "Xbox",
        slug: "xbox",
      },
    ],
    released: "2013-09-17",
    slug: "grand-theft-auto-v",
    genres: [
      {
        id: 1,
        name: "Action",
        slug: "action",
      },
      {
        id: 2,
        name: "RPG",
        slug: "rpg",
      },
      {
        id: 3,
        name: "Adventure",
        slug: "adventure",
      },
    ],
  },
] as Game[];

export function Games() {
  const [page, setPage] = useState(1);
  const [gameData, setGameData] = useState<GameData>({
    games: [],
    next: null,
    previous: null,
  });

  const { data, isLoading } = api.game.getGames.useQuery(
    { page },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (data?.games && data.games.length > 0) {
      setGameData((oldValue) => {
        const newList = [...oldValue.games, ...data?.games];

        return {
          previous: data.previous,
          next: data.next,
          games: newList,
        };
      });
    }
  }, [data?.games]);

  return (
    <section className="mt-8 w-full">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {/* {GAMES_LIST.map((game) => ( */}
        {gameData.games.map((game) => (
          <div
            key={game.id}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-slate-900"
          >
            <div className="aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96">
              <div className="relative h-72 w-full sm:h-full sm:w-full">
                <Image
                  src={game.backgroundImage}
                  fill
                  alt={game.name}
                  sizes="100vw, 100vh"
                  priority
                  quality={50}
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <div className="flex flex-none space-x-4">
                {game?.platforms.map(
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
                {game?.platforms.some(
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
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {game.name}
                </a>
              </h3>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm font-normal text-white">Release date</p>
                <p className="flex-wrap text-sm font-normal text-white">
                  {!!game.released ? formatDate(game.released) : "--"}
                </p>
              </div>

              <div className="mt-1 flex items-center justify-between">
                <p className="mr-2 text-sm font-normal text-white">Genres</p>
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

      <div className="m-7 flex justify-center">
        <Button
          onClick={() => setPage((oldPage) => oldPage + 1)}
          className="mb-5"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Load more
        </Button>
      </div>
    </section>
  );
}
