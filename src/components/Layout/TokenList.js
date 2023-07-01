import React from "react";
import { useSelector } from "react-redux";
import { EthereumIcon, BinanceIcon } from "../../assets/Icons";

const TokenList = () => {
  const { border, font, background } = useSelector((state) => state);
  const token_list = [
    {
      title: "NEOPUNK",
      chain: "ETH",
      price: 200,
      period: 2,
    },
    {
      title: "CCT",
      chain: "BNB",
      price: 8,
      period: 2,
    },
    {
      title: "SMUDGE",
      chain: "BNB",
      price: 800,
      period: 5,
    },
    {
      title: "PPM",
      chain: "BNB",
      price: 8,
      period: 16,
    },
    {
      title: "APLS",
      chain: "BNB",
      price: "1,000",
      period: 19,
    },
    {
      title: "NEOPUNK",
      chain: "ETH",
      price: 200,
      period: 2,
    },
    {
      title: "CCT",
      chain: "BNB",
      price: 8,
      period: 2,
    },
    {
      title: "SMUDGE",
      chain: "BNB",
      price: 800,
      period: 5,
    },
    {
      title: "PPM",
      chain: "BNB",
      price: 8,
      period: 16,
    },
    {
      title: "APLS",
      chain: "BNB",
      price: "1,000",
      period: 19,
    },
  ];
  return (
    <div className="w-full overflow-x-scroll flex gap-5 pb-4">
      {token_list.map((item, index) => {
        return (
          <div
            className={`grid grid-cols-2 gap-7 border-[${border}] bg-[${background}] text-[${font}] px-4 py-2 rounded-lg border-2 items-center w-80`}
            key={index}
            style={{ gridTemplateColumns: "86px 150px" }}
          >
            <div
              className={`relative border-2 border-[${border}] w-[86px] h-[86px] rounded-full flex justify-center items-center col-span-1`}
            >
              <img
                src={`/img/${item.title.toLowerCase()}.svg`}
                className="w-[75px] h-w-[75px]"
                alt={item.title}
              />
              {item.chain === "ETH" ? (
                <EthereumIcon className={`w-6 h-6 bottom-0 right-0 absolute`} />
              ) : (
                <BinanceIcon className={`w-6 h-6 bottom-0 right-0 absolute`} />
              )}
            </div>
            <div className="w-50 col-span-1">
              <h5>{item.title}</h5>
              <p>
                {item.price} {item.chain}
              </p>
              <p>in {item.period} days</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TokenList;
