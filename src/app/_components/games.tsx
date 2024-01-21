/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";

import { GamesList } from "./games-list";
import { GamesHeader } from "./games-header";
import { useCallback, useMemo, useReducer, useState } from "react";
import { api } from "@/trpc/react";
import { type GameData } from "@/server/services/external-api/api";

export type FilterAction =
  | { type: "onCheckPlatforms"; payload: { id: number } }
  | { type: "onCheckGenres"; payload: { id: number } };

type FilterState = {
  platforms: number[];
  genres: number[];
};

function reducer(state: FilterState, action: FilterAction) {
  switch (action.type) {
    case "onCheckPlatforms":
      const platforms = [...state.platforms];

      const platformIndex = platforms.findIndex(
        (platformId) => platformId === action.payload.id,
      );

      if (platformIndex >= 0) {
        platforms.splice(platformIndex, 1);
      } else {
        platforms.push(action.payload.id);
      }

      return { ...state, platforms: [...platforms] };
    case "onCheckGenres":
      const genres = [...state.genres];

      const genreIndex = genres.findIndex(
        (genreId) => genreId === action.payload.id,
      );

      if (genreIndex >= 0) {
        genres.splice(genreIndex, 1);
      } else {
        genres.push(action.payload.id);
      }

      return { ...state, genres: [...genres] };
    default:
      return state;
  }
}

export function Games() {
  const [search, setSearch] = useState("");
  const [gamesFilterState, dispatch] = useReducer(reducer, {
    platforms: [],
    genres: [],
  });

  const { data, fetchNextPage, isFetching } =
    api.game.getGames.useInfiniteQuery(
      {
        search,
        genres: gamesFilterState.genres,
        platforms: gamesFilterState.platforms,
      },
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
      <GamesHeader
        onInput={(value) => setSearch(value)}
        onChangeFilter={(newFilter) =>
          dispatch({ type: newFilter.type, payload: newFilter.payload })
        }
      />
      <GamesList
        gameData={gameData}
        setPage={onSetPage}
        isLoading={isFetching}
      />
    </>
  );
}
