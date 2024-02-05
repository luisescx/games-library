"use client";

type RenderSkeletonsProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

function GameSeriesCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-900 bg-slate-900">
        <div className="h-28 bg-gray-500 group-hover:opacity-75 sm:h-44">
          <div className="h-full w-full sm:h-full sm:w-full"></div>
        </div>

        <div className="flex flex-1 flex-col p-2 md:p-3">
          <div className="h-3 rounded-md bg-gray-500"></div>

          <div className="mt-3 flex items-center justify-between">
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
            <div className="h-3 w-1/3 rounded-md bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RenderGameSeriesSkeletons({
  isLoading,
  children,
}: RenderSkeletonsProps) {
  if (isLoading) {
    return (
      <div className="lg:grid-cols-23 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <GameSeriesCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return <>{children}</>;
}
