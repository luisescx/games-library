import { Container } from "@/app/_components/ui/container";
import { api } from "@/trpc/server";
import { Suspense } from "react";

async function Screenshots() {
  const data = await api.game.getGameScreenshots.query({ slug: "the-witcher" });

  console.log("screenshots: ", data);

  return data?.results ? (
    data.results.map((result) => (
      <h1 className="text-white" key={result.id}>
        {result.id}
      </h1>
    ))
  ) : (
    <h1>Não encontrado</h1>
  );
}

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

export default async function Page() {
  const data = await api.game.getGameDetails.query({ slug: "the-witcher" });

  console.log("data", data);

  return (
    <main>
      <Container>
        <h1 className="mb-11 text-white">{data.name ?? "Carregando"}</h1>

        <Suspense
          fallback={
            <div className="mb-11 text-amber-400">Loading screenshots...</div>
          }
        >
          <Screenshots />
        </Suspense>

        <div className="mb-11"></div>
        <Suspense
          fallback={
            <div className="text-amber-400">Loading game series...</div>
          }
        >
          <GameSeries />
        </Suspense>
      </Container>
    </main>
  );
}
