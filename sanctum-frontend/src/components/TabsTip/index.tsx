"use client";
import { TabMenu } from "@/constants";
/* eslint-disable @next/next/no-img-element */
import { useRouter, useSearchParams } from "next/navigation";

export default function TabsTip() {
  const router = useRouter();
  const param = useSearchParams();
  const search = param.get("activeTab") || "items";
  return (
    <div className="w-full border-b-[1px] border-customborder flex items-center justify-between pt-3">
      <div className="flex justify-start gap-5">
        {TabMenu.map((item, index) => (
          <div
            className={`${
              item.param === search?.toString()
                ? ` border-b font-bold text-lg`
                : " text-md "
            } border-black cursor-pointer min-w-[60px] text-center`}
            key={index}
            onClick={() => router.push(`${item.link}`)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <button className="border px-3 mb-1 float-right rounded-full">1%</button>
    </div>
  );
}
