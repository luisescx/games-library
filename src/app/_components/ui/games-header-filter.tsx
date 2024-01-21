"use client";

import { type FilterProps } from "@/utils/games-filter";

type GamesHeaderFilterProps = {
  option: FilterProps;
  type: string;
  onChange: (id: number) => void;
};

export function GamesHeaderFilter({
  option,
  type,
  onChange,
}: GamesHeaderFilterProps) {
  return (
    <div key={option.id} className="flex items-center text-base sm:text-sm">
      <input
        id={`${type}-${option.id}`}
        name={`${type}[]`}
        defaultValue={option.name}
        type="checkbox"
        className="h-4 w-4 flex-shrink-0 rounded border-amber-400  text-indigo-600 focus:ring-indigo-500"
        defaultChecked={option.checked}
        onChange={() => onChange(option.id)}
      />
      <label
        htmlFor={`${type}-${option.id}`}
        className="ml-3 min-w-0 flex-1 text-white"
      >
        {option.name}
      </label>
    </div>
  );
}
