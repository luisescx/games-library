import { env } from "process";
import { type Game, type GameDTO } from "./models/game";
import { getGamesMapper } from "./mapper";

type UrlParams = {
  path: string;
  page: string;
  search: string;
  genres: number[];
  platforms: number[];
};

const getUrlWithParams = ({
  page,
  path,
  search,
  genres,
  platforms,
}: UrlParams) => {
  let url = `${env.RAWG_API_URL}/${path}?key=${env.RAWG_API_KEY}`;

  if (genres.length > 0) {
    url += `&genres=${genres.join(",")}`;
  }

  if (platforms.length > 0) {
    url += `&parent_platforms=${platforms.join(",")}`;
  }

  if (!!search) {
    url += `&search=${search}`;
  }

  if (!!page) {
    url += `&page=${page}`;
  }

  return url;
};

export type ApiGamesResponseDTO = {
  next: string | null;
  previous: string | null;
  results: GameDTO[];
  error?: string;
};

export type GameData = {
  next: string | null;
  previous: string | null;
  games: Game[];
};

type GetGamesProps = {
  page: number;
  search: string;
  genres: number[];
  platforms: number[];
};

const getGames = async ({ page, search, genres, platforms }: GetGamesProps) => {
  try {
    const res = await fetch(
      getUrlWithParams({
        page: String(page),
        path: "games",
        search: search ?? "",
        genres: genres ?? [],
        platforms: platforms ?? [],
      }),
    );

    if (res.status !== 200) {
      throw new Error(res.statusText);
    }

    const data = (await res.json()) as ApiGamesResponseDTO;

    return getGamesMapper(data);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("An error occurred, please try again.");
  }
};

export const apiGames = {
  getGames,
};
