export type FilterProps = {
  id: number;
  name: string;
  checked: boolean;
};

type GamesFilterProps = {
  platforms: FilterProps[];
  genres: FilterProps[];
};

export const gamesFilter: GamesFilterProps = {
  platforms: [
    // {
    //   id: 0,
    //   name: "All",
    //   checked: false,
    // },
    {
      id: 1,
      name: "PC",
      checked: false,
    },
    {
      id: 2,
      name: "Playstation",
      checked: false,
    },
    {
      id: 3,
      name: "Xbox",
      checked: false,
    },
    {
      id: 7,
      name: "Nintendo",
      checked: false,
    },
  ],
  genres: [
    // {
    //   id: 0,
    //   name: "All",
    //   checked: false,
    // },
    {
      id: 4,
      name: "Action",
      checked: false,
    },
    {
      id: 3,
      name: "Adventure",
      checked: false,
    },
    {
      id: 5,
      name: "RPG",
      checked: false,
    },
    {
      id: 51,
      name: "Indie",
      checked: false,
    },
    {
      id: 10,
      name: "Strategy",
      checked: false,
    },
    {
      id: 2,
      name: "Shooter",
      checked: false,
    },
    {
      id: 40,
      name: "Casual",
      checked: false,
    },
    {
      id: 14,
      name: "Simulation",
      checked: false,
    },
    {
      id: 7,
      name: "Puzzle",
      checked: false,
    },
    {
      id: 11,
      name: "Arcade",
      checked: false,
    },
    {
      id: 83,
      name: "Platformer",
      checked: false,
    },
    {
      id: 59,
      name: "Massively Multiplayer",
      checked: false,
    },
    {
      id: 1,
      name: "Racing",
      checked: false,
    },
    {
      id: 15,
      name: "Sports",
      checked: false,
    },
    {
      id: 6,
      name: "Fighting",
      checked: false,
    },
    {
      id: 19,
      name: "Family",
      checked: false,
    },
    {
      id: 28,
      name: "Board Games",
      checked: false,
    },
    {
      id: 34,
      name: "Educational",
      checked: false,
    },
    {
      id: 17,
      name: "Card",
      checked: false,
    },
  ],
};
