import { Screenshots } from "@/app/_components/game-details/screenshots";
import { GameImageLoader } from "@/app/_components/game-image-loader";
import { Container } from "@/app/_components/ui/container";
import { api } from "@/trpc/server";
import { formatDate } from "@/utils/date";
import { CalendarDaysIcon, LinkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import { Suspense } from "react";

async function GameSeries() {
  const data = await api.game.getGameSeries.query({ slug: "the-witcher" });

  console.log("game series: ", data);

  return data?.results ? (
    data.results.map((result) => (
      <h1 className="text-white" key={result.id}>
        {result.name}
      </h1>
    ))
  ) : (
    <h1>Não encontrado</h1>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const game = await api.game.getGameDetails.query({ slug: params.slug });

  return (
    <main>
      <Container className="py-10">
        <h1 className="text-3xl font-bold tracking-tight text-amber-400 sm:text-4xl">
          {game.name}
        </h1>

        <div className="grid-col-1 mt-8 grid gap-4 gap-y-5 md:grid-cols-[2fr_1fr] md:gap-x-6">
          <div>
            <div
              dangerouslySetInnerHTML={{ __html: game.description ?? "" }}
              className="row-span-3 text-lg leading-8 text-white"
            />

            <div className="mt-5 grid grid-cols-2 justify-center gap-x-4 gap-y-5 border-t border-slate-900 pt-4 lg:gap-y-8">
              <div>
                <h3 className="border-l-2 border-amber-400 pl-2 text-lg font-medium text-white">
                  Genres
                </h3>

                <p className="mt-2 text-sm font-normal text-white">
                  {game.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>

              <div>
                <h3 className="border-l-2 border-amber-400 pl-2 text-lg font-medium text-white">
                  Platforms
                </h3>

                <p className="mt-2 text-sm font-normal text-white">
                  {game.platforms.map((genre) => genre.name).join(", ")}
                </p>
              </div>

              <div>
                <h3 className="border-l-2 border-amber-400 pl-2 text-lg font-medium text-white">
                  Publishers
                </h3>

                <p className="mt-2 text-sm font-normal text-white">
                  {game.publishers && game.publishers?.length > 0
                    ? game.publishers
                        ?.map((publisher) => publisher.name)
                        .join(", ")
                    : "--"}
                </p>
              </div>
              <div>
                <h3 className="border-l-2 border-amber-400 pl-2 text-lg font-medium text-white">
                  Developers
                </h3>

                <p className="mt-2 text-sm font-normal text-white">
                  {game.developers && game.developers?.length > 0
                    ? game.developers
                        ?.map((developer) => developer.name)
                        .join(", ")
                    : "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last md:mb-0">
            <div className="aspect-h-4 aspect-w-3 rounded-lg bg-gray-500 sm:aspect-none sm:h-[32rem]">
              <div className="h-full w-full sm:h-full sm:w-full">
                <GameImageLoader
                  className="rounded-lg object-cover object-center"
                  alt={game.name}
                  src={game.backgroundImage}
                  loaderClassName="rounded-lg"
                />
              </div>
            </div>

            <div className="mt-4 lg:col-start-3 lg:row-end-1">
              <div className="rounded-lg bg-slate-900 shadow-sm ring-1 ring-amber-400/15">
                <dl className="flex flex-wrap">
                  <div className="flex w-full flex-none items-center justify-between border-white px-6 pb-4 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-white">
                      Metacritic Score
                    </dt>
                    {game.metacritic !== null &&
                    game.metacritic !== undefined ? (
                      <dd
                        className={clsx(
                          "inline-flex items-center rounded-md px-3 py-1 text-base font-medium",
                          {
                            "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20":
                              game.metacritic && game.metacritic >= 80,
                          },
                          {
                            "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20":
                              game.metacritic && game.metacritic < 50,
                          },
                          {
                            "bg-yellow-400 text-amber-800 ring-1 ring-inset ring-yellow-600/20":
                              game.metacritic &&
                              game.metacritic >= 50 &&
                              game.metacritic < 80,
                          },
                        )}
                      >
                        {game.metacritic}
                      </dd>
                    ) : (
                      <dd className="inline-flex items-center rounded-md px-3 py-1 text-base font-medium text-white">
                        {game.metacritic ?? "--"}
                      </dd>
                    )}
                  </div>
                  {!!game.metacriticUrl && (
                    <div className="flex w-full flex-none items-center gap-x-4 border-white px-6 pb-6">
                      <dt className="flex-none">
                        <span className="sr-only">Web site</span>
                        <LinkIcon
                          className="h-6 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd className="text-sm leading-6 text-white underline">
                        <a
                          href={game.metacriticUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Metacritic reviews
                        </a>
                      </dd>
                    </div>
                  )}

                  <div className="mt-2 flex w-full flex-none items-center gap-x-4 border-t border-amber-400/15 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Release date</span>
                      <CalendarDaysIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-white">
                      <time dateTime={game.released ?? ""}>
                        {!!game.released ? formatDate(game.released) : "--"}
                      </time>
                    </dd>
                  </div>
                  <div className="flex w-full flex-none items-center gap-x-4 border-white px-6 pb-6 pt-4">
                    <dt className="flex-none">
                      <span className="sr-only">Web site</span>
                      <LinkIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-white underline">
                      <a
                        href={game.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {game.website}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <Screenshots slug={params.slug} />
      </Container>
    </main>
  );
}
