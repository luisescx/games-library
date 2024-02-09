"use client";

import { Container } from "@/app/_components/ui/container";
import { Toast } from "@/app/_components/ui/toast";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="pg-6">
      <main className="flex-auto flex-col justify-center py-24 sm:py-64 lg:px-8">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-amber-400 sm:text-5xl">
          Error
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          Sorry, we had an error:
        </p>
        <p className="text-base font-semibold leading-8 text-amber-400">
          {error.message}
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

      <Toast message={error.message} autoHide title="Error" type="error" />
    </Container>
  );
}
