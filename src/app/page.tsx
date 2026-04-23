import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <section className="w-full max-w-2xl rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">AI Automation Platform</h1>
        <p className="mt-3 text-muted-foreground">
          Build and manage AI workflows from one dashboard.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/login" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Login
          </Link>
          <Link href="/register" className="rounded-md border px-4 py-2">
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}
