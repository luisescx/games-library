export function GameCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-slate-900">
        <div className="aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-500 duration-1000 ease-in group-hover:opacity-75 sm:h-96">
          <div className="relative h-72 w-full sm:h-full sm:w-full"></div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-none space-x-4">
            <div className="h-4 w-4 rounded-xl bg-gray-500"></div>
            <div className="h-4 w-4 rounded-xl bg-gray-500"></div>
            <div className="h-4 w-4 rounded-xl bg-gray-500"></div>
          </div>

          <div className="mt-4 h-4 rounded-md bg-gray-500"></div>

          <div className="mt-4 flex items-center justify-between">
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
