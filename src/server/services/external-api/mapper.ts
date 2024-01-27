import { type GameData, type ApiGamesResponseDTO } from "./api";
import { type Game, type GameDTO } from "./models/game";

export const convertGameDtoToGame = (game: GameDTO): Game => {
  return {
    id: game.id,
    name: game.name,
    slug: game.slug,
    backgroundImage: game.background_image,
    released: game.released,
    parentPlatforms: game.parent_platforms
      ? game.parent_platforms.map((data) => ({
          id: data.platform.id,
          name: data.platform.name,
          slug: data.platform.slug,
        }))
      : [],
    platforms: game.platforms
      ? game.platforms.map((data) => ({
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
    description: game.description,
    developers: game.developers
      ? game.developers.map((developer) => ({
          id: developer.id,
          name: developer.name,
        }))
      : [],
    publishers: game.publishers
      ? game.publishers.map((publisher) => ({
          id: publisher.id,
          name: publisher.name,
        }))
      : [],
    website: game.website,
    metacritic: game.metacritic,
    metacriticUrl: game.metacritic_url ?? "--",
  } as Game;
};

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
