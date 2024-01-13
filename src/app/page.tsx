import { Container } from "./_components/container";
import { Header } from "./_components/header";

export default async function Home() {
  return (
    <main>
      <Container className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <Header title="New games" />
      </Container>
    </main>
  );
}
