import { env } from "process";
import { type Game, type GameDTO } from "./models/game";
import { getGamesMapper } from "./mapper";

const getUrlWithParams = (path: string, page = "", params = "") => {
  let url = `${env.RAWG_API_URL}/${path}?key=${env.RAWG_API_KEY}`;

  if (!!page) {
    url += `&page=${page}`;
  }

  if (!!params) {
    url += `&${params}`;
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

const getGames = async (page: number) => {
  try {
    const res = await fetch(getUrlWithParams("games", String(page)));

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
