"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Pool() {
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/pool") {
      push("/");
    }
  }, [pathname, push]);
  return <></>;
}
