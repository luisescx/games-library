import { getServerAuthSession } from "@/server/auth";
import { Container } from "../_components/ui/container";
import RecoverAccountForm from "../_components/recover-account/recover-form";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <main>
      <Container>
        <RecoverAccountForm session={session} />
      </Container>
    </main>
  );
}
