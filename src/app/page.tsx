import { Games } from "./_components/games";
import { Container } from "./_components/ui/container";

export default async function Home() {
  return (
    <main>
      <Container className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Games />
      </Container>
    </main>
  );
}
