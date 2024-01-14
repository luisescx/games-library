export type Platform = {
  id: number;
  name: string;
  slug: string;
};

export type Genres = {
  id: number;
  name: string;
  slug: string;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  backgroundImage: string;
  released: string;
  platforms: Platform[];
  genres: Genres[];
};

export type GameDTO = {
  id: number;
  slug: string;
  name: string;
  background_image: string;
  released: string;
  parent_platforms: {
    platform: Platform;
  }[];
  genres: Genres[];
};
