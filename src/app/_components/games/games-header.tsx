"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import { Disclosure, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { GamesHeaderFilter } from "../ui/games-header-filter";
import { gamesFilter } from "@/utils/games-filter";
import { type FilterAction } from "./games";

type HeaderProps = {
  totalFiltersCount: number;
  inputValue: string;
  gamesFilterState: { platforms: number[]; genres: number[] };
  onInput: (value: string) => void;
  onChangeFilter: (action: FilterAction) => void;
  onClearFilters: () => void;
};

export function GamesHeader({
  totalFiltersCount = 0,
  inputValue,
  gamesFilterState,
  onInput,
  onChangeFilter,
  onClearFilters,
}: HeaderProps) {
  const debounceOnInput = debounce((value: string) => {
    onInput(value);
  }, 300);

  return (
    <div>
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
                {`${totalFiltersCount} Filters`}
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button
                type="button"
                className="text-white hover:text-slate-400"
                onClick={() => {
                  gamesFilter.genres = gamesFilter.genres.map((genre) => ({
                    ...genre,
                    checked: false,
                  }));
                  gamesFilter.platforms = gamesFilter.platforms.map(
                    (platform) => ({
                      ...platform,
                      checked: false,
                    }),
                  );

                  onClearFilters();
                }}
              >
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
                  defaultValue={inputValue}
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
                  defaultValue={inputValue}
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
                  {gamesFilter.platforms.map((option) => (
                    <GamesHeaderFilter
                      key={option.id}
                      option={{
                        ...option,
                        checked: gamesFilterState.platforms.some(
                          (platformId) => platformId === option.id,
                        ),
                      }}
                      type="platform"
                      onChange={(id) =>
                        onChangeFilter({
                          type: "onCheckPlatforms",
                          payload: { id },
                        })
                      }
                    />
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="block font-medium text-amber-400">
                  Genres
                </legend>
                <div className="grid grid-cols-2 items-center gap-x-4 space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                  {gamesFilter.genres.map((option) => (
                    <GamesHeaderFilter
                      key={option.id}
                      option={{
                        ...option,
                        checked: gamesFilterState.genres.some(
                          (genreId) => genreId === option.id,
                        ),
                      }}
                      type="genre"
                      onChange={(id) =>
                        onChangeFilter({
                          type: "onCheckGenres",
                          payload: { id },
                        })
                      }
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
