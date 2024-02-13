/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";

import { GamesList } from "./games-list";
import { GamesHeader } from "./games-header";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { api } from "@/trpc/react";
import { type GameData } from "@/server/services/external-api/api";
import debounce from "lodash.debounce";
import { Toast } from "../ui/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  constructSearchParameters,
  gamesFilter,
  getListParams,
} from "@/utils/games-filter";

export type FilterAction =
  | { type: "onCheckPlatforms"; payload: { id: number } }
  | { type: "onCheckGenres"; payload: { id: number } }
  | { type: "onClearFilters"; payload?: { id: number } }
  | {
      type: "onAddMultiple";
      payload: { platforms: number[]; genres: number[] };
    };

type FilterState = {
  platforms: number[];
  genres: number[];
};

const PARAM_PLATFORMS = "platforms=";
const PARAM_GENRES = "genres=";
const PARAM_SEARCH = "search=";

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
    case "onClearFilters":
      return { genres: [], platforms: [] };
    case "onAddMultiple":
      const paramsGenres = action.payload.genres;
      const paramsPlatforms = action.payload.platforms;

      return { genres: [...paramsGenres], platforms: [...paramsPlatforms] };
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
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const { data, fetchNextPage, isFetching, error, isError } =
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

  const totalFiltersCount = useMemo(
    () => gamesFilterState.genres.length + gamesFilterState.platforms.length,
    [gamesFilterState.genres, gamesFilterState.platforms],
  );

  const onSetPage = useCallback(
    async () => await fetchNextPage(),
    [fetchNextPage],
  );

  const debounceOnInput = debounce((newFilter: FilterAction) => {
    const payload = newFilter.payload as { id: number };
    const type = newFilter.type as "onCheckPlatforms" | "onCheckGenres";

    dispatch({
      type: type,
      payload: payload,
    });
  }, 300);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    let paramsText = "";

    const platformsParams = constructSearchParameters(
      gamesFilter.platforms,
      gamesFilterState.platforms,
      PARAM_PLATFORMS,
    );
    if (platformsParams) {
      paramsText += `?${platformsParams}`;
    }

    const genresParams = constructSearchParameters(
      gamesFilter.genres,
      gamesFilterState.genres,
      PARAM_GENRES,
    );
    if (genresParams) {
      paramsText += `${platformsParams ? "&" : "?"}${genresParams}`;
    }

    if (search) {
      paramsText += `${platformsParams || genresParams ? "&" : "?"}${PARAM_SEARCH}${search}`;
    }

    router.push(pathname + paramsText);
  }, [gamesFilterState.platforms, gamesFilterState.genres, search]);

  useEffect(() => {
    const platformParams = queryParams.get("platforms");
    const genresParams = queryParams.get("genres");
    let platforms: number[] = [];
    let genres: number[] = [];

    if (platformParams) {
      platforms = getListParams(gamesFilter.platforms, platformParams);
    }
    if (genresParams) {
      genres = getListParams(gamesFilter.genres, genresParams);
    }

    dispatch({
      type: "onAddMultiple",
      payload: { genres, platforms },
    });

    const searchTextParams = queryParams.get("search");
    if (searchTextParams) {
      setSearch(searchTextParams);
    }
  }, []);

  return (
    <>
      <GamesHeader
        totalFiltersCount={totalFiltersCount}
        onInput={setSearch}
        inputValue={search}
        onChangeFilter={(newFilter) => debounceOnInput(newFilter)}
        onClearFilters={() => dispatch({ type: "onClearFilters" })}
        gamesFilterState={gamesFilterState}
      />
      <GamesList
        gameData={gameData}
        setPage={onSetPage}
        isLoading={isFetching}
      />

      {!!error && (
        <Toast
          type="error"
          title="Error"
          message={`${error.data?.httpStatus} - ${error.message}`}
          autoHide
        />
      )}
    </>
  );
}
