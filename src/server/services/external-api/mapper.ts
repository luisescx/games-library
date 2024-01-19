import { type GameData, type ApiGamesResponseDTO } from "./api";
import { type Game, type GameDTO } from "./models/game";

const convertGameDtoToGame = (game: GameDTO): Game => ({
  id: game.id,
  name: game.name,
  slug: game.slug,
  backgroundImage: game.background_image,
  released: game.released,
  platforms: game.parent_platforms
    ? game.parent_platforms.map((data) => ({
        id: data.platform.id,
        name: data.platform.name,
        slug: data.platform.slug,
      }))
    : [],
  genres: game.genres
    ? game.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        slug: genre.slug,
      }))
    : [],
});

export const gamesListMapper = (data: GameDTO[]): Game[] => {
  return data.map((game) => convertGameDtoToGame(game));
};

export const getGamesMapper = (data: ApiGamesResponseDTO): GameData => {
  if (data?.results && data.results.length > 0) {
    return {
      next: data.next,
      previous: data.previous,
      games: gamesListMapper(data.results),
    } as GameData;
  }

  return {
    next: data.next,
    previous: data.previous,
    games: [],
  };
};
