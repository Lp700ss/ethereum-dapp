import React from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import { Moralis } from "react-moralis";

export default function CheckAllowance() {
  const [allow, tokenAllowance] = useState();
  const Web3Api = useMoralisWeb3Api();
  const appId = "DvGuMvt8DBJSRlK9xnmvk47CBAyyJ6IRbaoZWF3E";
  const serverUrl = "https://wgvljzn3us9r.usemoralis.com:2053/server";

  //  const Moralis.start({ serverUrl, appId });

  useEffect(() => {
    async function fetchTokenAllowance() {
      const options = {
        //token holder
        owner_address: "0xBc19fFeF966bFf35cb0FeE54741FeF4f1a33662A",
        //uniswap v3 router 2 contract address
        spender_address: "0xaC9411EAD1E51346974E6BA8F4CB7035c9287A5e",
        //ENS token contract address
        address: "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b",
      };

      const allowance = await Web3Api.token.getTokenAllowance(options);
      tokenAllowance(allowance);
      console.log(allow);
    }

    fetchTokenAllowance();
  }, []);

  //Get token allowace on ETH

  return (
    <div>
      <h1>Check the Allowance here</h1>
      <h2>the token allowance is {allow}</h2>
    </div>
  );
}
