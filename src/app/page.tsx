import { Container } from "./_components/container";
import { Header } from "./_components/header";
import { Games } from "./_components/games";

export default async function Home() {
  return (
    <main>
      <Container className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Header title="New games" />
        <Games />
      </Container>
    </main>
  );
}
