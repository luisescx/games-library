import { Games } from "./_components/games/games";
import { Container } from "./_components/ui/container";

export default async function Home() {
  return (
    <main>
      <Container className="py-6">
        <Games />
      </Container>
    </main>
  );
}
