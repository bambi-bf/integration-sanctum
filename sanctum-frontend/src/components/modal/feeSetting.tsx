/* eslint-disable react/no-unescaped-entities */
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import React, { useContext, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { CloseIcon } from "../svgIcons";
import FeeTab from "../tab/feeTab";
import { FeeLabels, Slippage } from "@/constants";

export default function FeeSetting() {
  const { feeSettingModalShow, closeFeeSettingModal } =
    useContext(ModalContext);
  const [priorityFee, setPriorityFee] = useState(0);
  const [slippage, setSlippage] = useState(0);
  const handlePriorityFee = (curIndex: number) => {
    setPriorityFee(curIndex);
  };
  return (
    <Modal open={feeSettingModalShow} onClose={closeFeeSettingModal} center>
      <FeeTab labels={["Priority Fee", "Liquidity Slippage", "Swap Slippage"]}>
        <div className="flex flex-col">
          <p>
            Priority fees increase the likelihood your tx gets into the block.
            We will auto adjust your priority fee to be a multiple of priority
            fees used for recent transactions up to the max amount specified in
            the field.
          </p>
          <div className="flex gap-3 multi-fee my-3">
            {FeeLabels.map((feelabel, index) => (
              <button
                className={`flex flex-col justify-center w-1/3 border p-3 text-center rounded-lg ${
                  priorityFee == index ? "active" : ""
                }`}
                key={index}
                onClick={(e) => handlePriorityFee(index)}
              >
                <span className="m-auto">{feelabel.title}</span>
                <span className="m-auto">x{feelabel.value}</span>
              </button>
            ))}
            <style jsx>{`
              .multi-fee button.active {
                border: 2px solid blue;
              }
            `}</style>
          </div>
          <div className="flex flex-col">
            <span>Set Max Cap (Max: 2 SOL)</span>
            <div
              className={`flex border rounded-md border-gray-300 w-full p-2`}
            >
              <span className="text-[20px] mx-3">Max</span>
              <input
                type="text"
                className="border-none focus:outline-none w-full text-right"
                placeholder="0.00"
                inputMode="decimal"
              />
              <span className="ml-3">SOL</span>
            </div>
            <button className="w-full bg-black hover:bg-gray-800 text-white my-2 py-3 rounded-md">
              Save setting
            </button>
          </div>
        </div>
        <div>
          <p>
            Adjust how much change to the pool price you're willing to accept
            and still add liquidity. If the pool price changes a lot while
            adding liquidity, your transaction may fail. Increase this slippage
            to improve your success rate.
          </p>
          <div className="flex gap-3 multi-fee my-3">
            {Slippage.map((item, index) => (
              <button
                className={`flex flex-col justify-center w-1/3 border p-3 text-center rounded-lg ${
                  slippage == index ? "active" : ""
                }`}
                key={index}
                onClick={(e) => setSlippage(index)}
              >
                <span className="m-auto">{item.value}%</span>
              </button>
            ))}
            <style jsx>{`
              .multi-fee button.active {
                border: 2px solid blue;
              }
            `}</style>
          </div>
          <div className="flex flex-col">
            <span>Set Custom %</span>
            <div
              className={`flex border rounded-md border-gray-300 w-full p-2`}
            >
              <input
                type="text"
                className="border-none focus:outline-none w-full text-right"
                placeholder="0.00"
                inputMode="decimal"
              />
              <span className="ml-2">%</span>
            </div>
            <button className="w-full bg-black hover:bg-gray-800 text-white my-2 py-3 rounded-md">
              Save setting
            </button>
          </div>
        </div>
        <div>
          <p>
            Select a slippage you're willing to accept for swaps on Meteora.
          </p>
          <div className="flex gap-3 multi-fee my-3">
            {Slippage.map((item, index) => (
              <button
                className={`flex flex-col justify-center w-1/3 border p-3 text-center rounded-lg ${
                  slippage == index ? "active" : ""
                }`}
                key={index}
                onClick={(e) => setSlippage(index)}
              >
                <span className="m-auto">{item.value}%</span>
              </button>
            ))}
            <style jsx>{`
              .multi-fee button.active {
                border: 2px solid blue;
              }
            `}</style>
          </div>
          <div className="flex flex-col">
            <span>Set Custom %</span>
            <div
              className={`flex border rounded-md border-gray-300 w-full p-2`}
            >
              <input
                type="text"
                className="border-none focus:outline-none w-full text-right"
                placeholder="0.00"
                inputMode="decimal"
              />
              <span className="ml-2">%</span>
            </div>
            <button className="w-full bg-black hover:bg-gray-800 text-white my-2 py-3 rounded-md">
              Save setting
            </button>
          </div>
        </div>
      </FeeTab>
    </Modal>
  );
}
