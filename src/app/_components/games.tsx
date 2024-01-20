/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";

import { GamesList } from "./games-list";
import { GamesHeader } from "./games-header";
import { useCallback, useMemo, useState } from "react";
import { api } from "@/trpc/react";
import { type GameData } from "@/server/services/external-api/api";

export function Games() {
  const [search, setSearch] = useState("");

  const { data, fetchNextPage, isLoading, isFetching } =
    api.game.getGames.useInfiniteQuery(
      { search },
      {
        retry: false,
        refetchOnWindowFocus: false,
        initialCursor: 1,
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      },
    );

  const gameData = useMemo(() => {
    if (data?.pages && data?.pages.length > 0) {
      const games = data.pages.flatMap((page) => [...page.games]);

      return {
        next:
          (data?.pages && data?.pages[data?.pages.length - 1]?.next) ?? null,
        previous:
          (data?.pages && data?.pages[data?.pages.length - 1]?.previous) ??
          null,
        games,
      } as GameData;
    }

    return {
      games: [],
      next: null,
      previous: null,
    } as GameData;
  }, [data]);

  const onSetPage = useCallback(
    async () => await fetchNextPage(),
    [fetchNextPage],
  );

  return (
    <>
      <GamesHeader title="Games" onInput={(value) => setSearch(value)} />

      <GamesList
        gameData={gameData}
        setPage={onSetPage}
        isLoading={isFetching}
      />
    </>
  );
}
