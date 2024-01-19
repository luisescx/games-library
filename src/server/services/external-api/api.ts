import { env } from "process";
import { type Game, type GameDTO } from "./models/game";
import { getGamesMapper } from "./mapper";

type UrlParams = {
  path: string;
  page: string;
  search: string;
};

const getUrlWithParams = ({ page, path, search }: UrlParams) => {
  let url = `${env.RAWG_API_URL}/${path}?key=${env.RAWG_API_KEY}`;

  if (!!page) {
    url += `&page=${page}`;
  }

  if (!!search) {
    url += `&search=${search}`;
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

const getGames = async (page: number, search?: string) => {
  try {
    const res = await fetch(
      getUrlWithParams({
        page: String(page),
        path: "games",
        search: search ?? "",
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
