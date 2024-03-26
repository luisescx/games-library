import RecoverNewPassword from "@/app/_components/recover-account/recover-new-password";
import { Container } from "@/app/_components/ui/container";
import { getServerAuthSession } from "@/server/auth";

export default async function Page() {
  const session = await getServerAuthSession();

  return (
    <main>
      <Container>
        <RecoverNewPassword session={session} />
      </Container>
    </main>
  );
}
