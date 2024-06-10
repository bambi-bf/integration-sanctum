"use client";
import { TabMenu } from "@/constants";
import { ModalContext } from "@/contexts/ModalContext";
/* eslint-disable @next/next/no-img-element */
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function TabsTip() {
  const { openFeeSettingModal } = useContext(ModalContext);
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
      <button className="border px-3 mb-1 float-right rounded-full" onClick={() => openFeeSettingModal()}>1%</button>
    </div>
  );
}
