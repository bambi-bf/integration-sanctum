"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/dashboard");
  // },[router])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
