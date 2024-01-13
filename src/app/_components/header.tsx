"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  return (
    <div className="border-b border-amber-400 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-white">{title}</h3>

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
            />
            <input
              type="text"
              name="desktop-search"
              id="desktop-search"
              className="hidden w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:block"
              placeholder="Search"
            />
          </div>
          {/* <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon
              className="-ml-0.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Sort
            <ChevronDownIcon
              className="-mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
}
