import { Games } from "./_components/games";
import { Container } from "./_components/ui/container";

export default async function Home() {
  return (
    <main>
      <Container>
        <Games />
      </Container>
    </main>
  );
}
