export function ScreenshotImageSkeleton() {
  return (
    <div className="mt-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
        <div className="aspect-h-1 aspect-w-2 animate-pulse rounded-lg bg-gray-500" />

        <div className="hiddensm:block md:grid md:grid-cols-1 md:gap-y-8">
          <div className="animate-pulse rounded-lg bg-gray-500 sm:aspect-h-1 sm:aspect-w-2 md:aspect-h-1 md:aspect-w-3 sm:block" />
          <div className="hidden animate-pulse bg-gray-500 md:aspect-h-1 md:aspect-w-3 md:block md:rounded-lg" />
        </div>
      </div>
    </div>
  );
}
