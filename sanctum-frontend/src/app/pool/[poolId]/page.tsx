/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-img-element */
"use client";
import TabsTip from "@/components/TabsTip";
import FeeSetting from "@/components/modal/feeSetting";
import SwitchIcon from "@/components/svgIcons/SwitchIcon";
import Tab from "@/components/tab";
import { TokenKey, tokenAddress } from "@/constants";
import useTokenBalance from "@/hooks/useTokenBalance";
import { TokenDataProps } from "@/utils/type";
import { getTokenInfo } from "@/utils/util";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usePathname, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function PoolPage() {
  const pathname = usePathname();
  const tokenStrings = pathname.split("/pool/")[1];

  const tokens: Array<string> = JSON.parse(
    Buffer.from(tokenStrings, "base64").toString("utf-8")
  );
  const searchParam = useSearchParams();
  const search = searchParam.get("activeTab") || "yours";

  const { publicKey } = useWallet();

  const [tokenInfos, setTokenInfos] = useState<
    Record<string, TokenDataProps | null>
  >({});
  const [slideValue, setSlideValue] = useState([10, 70]);
  const [swapOrder, setSwapOrder] = useState(0);

  useEffect(() => {
    const fetchTokenIcons = async () => {
      try {
        const newTokenInfos: Record<string, TokenDataProps | null> = {
          ...tokenInfos,
        };
        for (const token of tokens) {
          if (token) {
            const tokenInfo = await getTokenInfo(
              tokenAddress[token as TokenKey]
            );
            newTokenInfos[token] = tokenInfo;
          }
        }

        setTokenInfos(newTokenInfos);
      } catch (error) {
        console.error("Error fetching token icons:", error);
      }
    };
    fetchTokenIcons();
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
      <div className="flex bg-white p-5 gap-20">
        <div className="flex flex-col w-3/5">
          <div className="flex-col py-5">
            <span>Total Value Locked</span>
            <h2 className="text-[25px] font-bold">$12,816,919.85</h2>
            <span>0.00024453% permanently locked</span>
          </div>
          <div className="flex-col border-b py-5 ">
            <span>Liquidity Allocation</span>
            {tokens.map((token, index) => (
              <div key={index} className="flex text-[10px] items-end mt-4">
                <img
                  src={tokenInfos[token as TokenKey]?.logoURI}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt=""
                />
                <span className="text-[20px] mx-2">
                  {tokenInfos[token as TokenKey]?.symbol + " "}
                </span>
                <span className="pb-[7px]">
                  {tokenAddress[token as TokenKey] &&
                    tokenAddress[token as TokenKey].slice(0, 4)}
                  ...
                  {tokenAddress[token as TokenKey] &&
                    tokenAddress[token as TokenKey].slice(-4)}
                </span>
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
        <div className="w-2/5">
          <h4 className="text-[20px] font-bold">Your Deposit</h4>
          <div className="flex border-b py-5 w-full">
            <div className="flex flex-col w-1/2">
              <h2>Current Balance</h2>
              {tokens.map((token, index) => (
                <div key={index} className="flex text-[10px] items-end mt-4">
                  <img
                    src={tokenInfos[token as TokenKey]?.logoURI}
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt=""
                  />
                  <BalanceBox token={token as TokenKey} />
                  <span className="text-[20px] mx-2">
                    {tokenInfos[token as TokenKey]?.symbol + " "}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-1/2">
              <h2>Your Uniclaimed Swap Fee</h2>
              {tokens.map((token, index) => {
                return (
                  <div key={index} className="flex text-[10px] items-end mt-4">
                    <img
                      src={tokenInfos[token as TokenKey]?.logoURI}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt=""
                    />
                    <span className="text-[20px] mx-2">
                      {tokenInfos[token as TokenKey]?.symbol + " "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <TabsTip />
          <div
            className={`${
              search == "yours" || search == null ? "block" : "hidden"
            }`}
          >
            yours
          </div>
          <div className={`${search == "add" ? "block" : "hidden"} mt-5`}>
            <h2 className="text-[20px] font-bold">Enter deposit amount:</h2>
            <div className="flex w-full gap-5 border-b pb-3">
              {tokens.map((token, index) => (
                <div
                  className={`flex flex-col w-1/${tokens.length} pb-3gir `}
                  key={index}
                >
                  <div
                    className={`flex border rounded-md border-gray-300 w-full p-2`}
                  >
                    <img
                      src={tokenInfos[token as TokenKey]?.logoURI}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt=""
                    />
                    <span className="text-[20px] mx-3">
                      {tokenInfos[token as TokenKey]?.symbol}
                    </span>
                    <input
                      type="text"
                      className="border-none focus:outline-none w-full text-right"
                      placeholder="0.00"
                      inputMode="decimal"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <span>
                        Balance:
                        <BalanceBox token={token as TokenKey} />
                      </span>
                    </div>
                    <div className="text-[12px] mt-2">
                      <span className="bg-gray-300 rounded-md p-1 mr-2">
                        HALF
                      </span>
                      <span className="bg-gray-300 rounded-md p-1">MAX</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Tab labels={["Spot", "Curve", "Bid Ask"]}>
              <div>
                <b>Spot</b> provides a uniform distribution that is versatile
                and risk adjusted, suitable for any type of market and
                conditions. This is similar to setting a CLMM price range.
              </div>
              <div>
                <b>Curve</b> is ideal for a concentrated approach that aims to
                maximise capital efficiency. This is great for stables or pairs
                where the price does not change very often.
              </div>
              <div>
                <b>Bid-Ask</b> is an inverse Curve distribution, typically
                deployed single sided for a DCA in or out strategy. It can be
                used to capture volatility especially when prices vastly move
                out of the typical range.
              </div>
            </Tab>
            <div className="flex flex-col gap-3">
              <RangeSlider value={slideValue} onInput={setSlideValue} />
              <div className="flex mt-5 gap-3 justify-between">
                <div className="w-1/2">
                  <span>Min Price</span>
                  <input
                    className="border focus: outline-none focus:border text-right h-10 pr-2"
                    type="text"
                    value={slideValue[0]}
                    onChange={(e) =>
                      setSlideValue([Number(e.target.value), slideValue[1]])
                    }
                  />
                </div>
                <div className="w-1/2">
                  <span>Max Price</span>

                  <input
                    className="border focus:outline-none focus:border text-right h-10 pr-2"
                    type="text"
                    value={slideValue[1]}
                    onChange={(e) =>
                      setSlideValue([slideValue[0], Number(e.target.value)])
                    }
                  />
                </div>
              </div>
              <button className="w-full bg-black text-white hover:bg-gray-800 h-10 rounded-md">
                Add Liquidity
              </button>
            </div>
          </div>
          <div className={`${search == "swap" ? "block" : "hidden"}`}>
            <div className="flex w-full flex-col gap-5 pb-3 mt-5">
              {swapOrder == 0
                ? tokens.map((token, index) => (
                    <div className={`flex flex-col pb-3gir `} key={index}>
                      <div
                        className={`flex border rounded-md border-gray-300 w-full p-2`}
                      >
                        <img
                          src={tokenInfos[token as TokenKey]?.logoURI}
                          width={30}
                          height={30}
                          className="rounded-full"
                          alt=""
                        />
                        <span className="text-[20px] mx-3">
                          {tokenInfos[token as TokenKey]?.symbol}
                        </span>
                        <input
                          type="text"
                          className="border-none focus:outline-none w-full text-right"
                          placeholder="0.00"
                          disabled={index != 0 ? true : false}
                          inputMode="decimal"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span>
                            Balance:
                            <BalanceBox token={token as TokenKey} />
                          </span>
                        </div>
                        <div className="text-[12px] mt-2">
                          {!index && (
                            <div>
                              <span className="bg-gray-300 rounded-md p-1 mr-2">
                                HALF
                              </span>
                              <span className="bg-gray-300 rounded-md p-1">
                                MAX
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {index == 0 && (
                        <div className="relative w-full mt-10 mb-5">
                            <span className="h-4">
                                <hr className="w-full"/>
                            </span>
                          <button className="bg-black hover:bg-gray-800 text-white rounded-full p-1 absolute bottom-[-14px] right-[50%]" onClick={() => setSwapOrder(1-swapOrder)}>
                            <SwitchIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                : tokens.reverse().map((token, index) => (
                    <div className={`flex flex-col pb-3gir `} key={index}>
                      <div
                        className={`flex border rounded-md border-gray-300 w-full p-2`}
                      >
                        <img
                          src={tokenInfos[token as TokenKey]?.logoURI}
                          width={30}
                          height={30}
                          className="rounded-full"
                          alt=""
                        />
                        <span className="text-[20px] mx-3">
                          {tokenInfos[token as TokenKey]?.symbol}
                        </span>
                        <input
                          type="text"
                          className="border-none focus:outline-none w-full text-right"
                          placeholder="0.00"
                          disabled={index != 0 ? true : false}
                          inputMode="decimal"
                        />
                      </div>
                      <div className="flex justify-between mt-2">
                        <div>
                          <span>
                            Balance:
                            <BalanceBox token={token as TokenKey} />
                          </span>
                        </div>
                        <div className="text-[12px] mt-2">
                          {!index && (
                            <div>
                              <span className="bg-gray-300 rounded-md p-1 mr-2">
                                HALF
                              </span>
                              <span className="bg-gray-300 rounded-md p-1">
                                MAX
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {index == 0 && (
                        <div className="relative w-full mt-10 mb-5">
                            <span className="h-4">
                                <hr className="w-full"/>
                            </span>
                          <button className="bg-black hover:bg-gray-800 text-white rounded-full p-1 absolute bottom-[-14px] right-[50%]" onClick={() => setSwapOrder(1-swapOrder)}>
                            <SwitchIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                <div>
                    <button className="bg-black hover:bg-gray-800 text-white py-3 w-full rounded-lg">Swap</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <FeeSetting />
    </div>
  );
}

type TokenProps = {
  token: TokenKey;
};

const BalanceBox: FC<TokenProps> = (tokenProps) => {
  const { publicKey } = useWallet();
  const { balance } = useTokenBalance(
    publicKey,
    tokenAddress[tokenProps.token]
  );
  if (balance)
    return (
      <div className="flex items-center gap-3">
        <span className=" text-sm font-bold leading-[1]">
          {balance ? (balance / LAMPORTS_PER_SOL).toFixed(2) : 0}
        </span>
      </div>
    );
  else {
    return <span className="text-[20px] mx-3"> 0.00 </span>;
  }
};
