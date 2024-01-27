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

export type Developer = {
  id: number;
  name: string;
};

export type Publisher = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  slug: string;
  name: string;
  backgroundImage: string;
  released: string;
  platforms: Platform[];
  parentPlatforms: Platform[];
  genres: Genres[];
  description?: string;
  descriptionRaw?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  website?: string;
  metacritic: number | null;
  metacriticUrl?: string;
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
  platforms: {
    platform: Platform;
  }[];
  genres: Genres[];
  description_raw: string;
  background_image_additional?: string;
  description?: string;
  website?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  metacritic: number | null;
  metacritic_url?: string;
};
