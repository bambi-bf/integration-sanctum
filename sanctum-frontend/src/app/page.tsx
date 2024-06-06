"use client"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/dashboard");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
