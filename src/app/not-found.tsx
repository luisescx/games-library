import { Container } from "./_components/ui/container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-6">
      <main className="flex-auto flex-col justify-center py-24 sm:py-64 lg:px-8">
        <p className="text-base font-semibold leading-8 text-amber-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-400 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10">
          <Link
            href={`/`}
            className="text-sm font-semibold leading-7 text-amber-400"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </main>
    </Container>
  );
}
