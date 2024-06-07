/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
"use client";
import { tokenAddress } from "@/constants";
import { getTokenIconUrl } from "@/utils/util";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TokenKey } from "./src/app/pool/[poolId]/page";


export default function PoolPage() {
    const pathname = usePathname();
    const tokenStrings = pathname.split("/pool/")[1];

    const tokens: Array<string> = JSON.parse(
        Buffer.from(tokenStrings, "base64").toString("utf-8")
    );

    const [icons, setIcons] = useState<Array<object>>([]);

    useEffect(() => {
        try {
            tokens.forEach(async (token, index) => {
                const tokenIconUrl = await getTokenIconUrl(
                    tokenAddress[token as TokenKey]
                );
                setIcons([...icons, {
                    token: tokenIconUrl
                }]);
            });
        } catch (error) { }
    }, []);

    return (
        <div className="container m-auto">
            <div className="flex justify-between">
                <div className="gap-3 ml-10">
                    <h1 className="font-bold text-5xl">
                        {tokens.map((token, index) => (
                            <span key={index}>{token + "  "} </span>
                        ))}
                    </h1>
                </div>
                <div className="gap-3 flex justify-end">
                    <div className="flex flex-col">
                        <span className="border-black border px-3 py-1 text-[20px] font-bold">
                            10.90%
                        </span>
                        <span className="text-[12px] text-center">365d yield / TVL</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="border-black border px-3 py-1 text-[20px] font-bold">
                            9.39%
                        </span>
                        <span className="text-[12px] text-center">Base APY</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="border-black border px-3 py-1 text-[20px] font-bold">
                            N/A
                        </span>
                        <span className="text-[12px] text-center">LM APR</span>
                    </div>
                </div>
            </div>
            <div className="flex bg-white p-5">
                <div className="grow flex flex-col">
                    <div className="flex-col border-b py-5">
                        <span>Total Value Locked</span>
                        <h2 className="text-[25px] font-bold">$12,816,919.85</h2>
                        <span>0.00024453% permanently locked</span>
                    </div>
                    <div className="flex-col border-b py-5 ">
                        <span>Liquidity Allocation</span>
                        {tokens.map(async (token, index) => (
                            <div key={index} className="flex text-[10px] items-end mt-4">
                                {/* <img src={await getTokenIconUrl(tokenAddress[token as TokenKey])} alt="" width={30} height={30} className="rounded-full"/> */}
                                <span className="text-[20px] mx-2">{token + " "}</span>
                                {tokenAddress[token as TokenKey].slice(0, 4)}...
                                {tokenAddress[token as TokenKey].slice(-4)}
                            </div>
                        ))}
                    </div>
                    <div className="flex-col border-b py-5 ">
                        <div className="flex justify-between py-3">
                            <h2>Bin Step</h2>
                            <span>1</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <h2>Base Fee</h2>
                            <span>1</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <h2>Max Fee</h2>
                            <span>10%</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <h2>Protocol Fee</h2>
                            <span>1%</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <h2>Dynamic Fee</h2>
                            <span>0.01%</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <h2>24h Fee</h2>
                            <span>$700</span>
                        </div>
                    </div>
                </div>
                <div className="w-[400px]">
                    <h4>Your Deposit</h4>
                    <div className="flex border-b py-5">
                        <div className="flex flex-col"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
