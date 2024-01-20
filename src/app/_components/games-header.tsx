"use client";

import { Fragment, useState } from "react";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { GamesHeaderFilter } from "./ui/games-header-filter";

type HeaderProps = {
  title: string;
  onInput: (value: string) => void;
};

const filters = {
  platforms: [
    {
      id: 0,
      name: "All",
      checked: true,
    },
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
    {
      id: 0,
      name: "All",
      checked: true,
    },
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
  size: [
    { value: "xs", label: "XS", checked: false },
    { value: "s", label: "S", checked: true },
    { value: "m", label: "M", checked: false },
    { value: "l", label: "L", checked: false },
    { value: "xl", label: "XL", checked: false },
    { value: "2xl", label: "2XL", checked: false },
  ],
  category: [
    { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
    { value: "tees", label: "Tees", checked: false },
    { value: "objects", label: "Objects", checked: false },
    { value: "sweatshirts", label: "Sweatshirts", checked: false },
    { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
  ],
};

export function GamesHeader({ title, onInput }: HeaderProps) {
  const debounceOnInput = debounce((value: string) => {
    onInput(value);
  }, 300);

  return (
    <div>
      {/* <div className="bg-slate-800 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-white">
          {title}
        </h3>

        <div className="mt-3 sm:ml-4 sm:mt-0">
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <label htmlFor="desktop-search" className="sr-only">
            Search
          </label>

          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden={true}
                />
              </div>

              <input
                type="text"
                name="mobile-search"
                id="mobile-search"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                placeholder="Search"
                onInput={(value) => debounceOnInput(value.currentTarget.value)}
              />
              <input
                type="text"
                name="desktop-search"
                id="desktop-search"
                className="hidden w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:block"
                placeholder="Search"
                onInput={(value) => debounceOnInput(value.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div> */}

      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-amber-400"
      >
        <div className="pb-5 sm:flex  sm:items-center sm:justify-between sm:pb-3">
          <div className="flex space-x-6 divide-x divide-gray-200 text-sm">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-white hover:text-slate-400">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none"
                  aria-hidden="true"
                />
                2 Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" className="text-white hover:text-slate-400">
                Clear all
              </button>
            </div>
          </div>

          <div className="mt-5 sm:ml-4 sm:mt-0">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <label htmlFor="desktop-search" className="sr-only">
              Search
            </label>

            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden={true}
                  />
                </div>

                <input
                  type="text"
                  name="mobile-search"
                  id="mobile-search"
                  className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                  placeholder="Search"
                  onInput={(value) =>
                    debounceOnInput(value.currentTarget.value)
                  }
                />
                <input
                  type="text"
                  name="desktop-search"
                  id="desktop-search"
                  className="hidden w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:block"
                  placeholder="Search"
                  onInput={(value) =>
                    debounceOnInput(value.currentTarget.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <Transition
          enterFrom="opacity-0 -translate-y-1"
          enter="opacity-50 transition ease-in duration-350 transform"
          enterTo="opacity-100  translate-y-0"
          leaveFrom="opacity-100 translate-y-0"
          leave="transition ease-out duration-1500 transform"
          leaveTo="opacity-0 -translate-y-3"
        >
          <Disclosure.Panel className="border-t border-amber-400 py-10">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium text-amber-400">
                  Platforms
                </legend>
                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.platforms.map((option) => (
                    <GamesHeaderFilter
                      key={option.id}
                      option={option}
                      type="platform"
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block font-medium text-amber-400">
                  Genres
                </legend>
                <div className="grid grid-cols-2 items-center gap-x-4 space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {filters.genres.map((option) => (
                    <GamesHeaderFilter
                      key={option.id}
                      option={option}
                      type="genre"
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
}
