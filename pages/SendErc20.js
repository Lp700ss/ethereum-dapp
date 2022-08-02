// import React from "react";
// import Web3 from "web3";
// import { useWeb3Transfer } from "react-moralis";
// import { useMoralis } from "react-moralis";
// import { useState } from "react";

// const SendErc20 = (props) => {
//   const { fetch, error, isFetching } = useWeb3Transfer();
//   const { authenticate, authError, isAuthenticated, user } = useMoralis();

//   const login = async () => {
//     if (!isAuthenticated) {
//       await authenticate()
//         .then(function (user) {
//           console.log(user.get("ethAddress"));
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     }
//   };
//   const { Moralis } = useMoralis();

//   const [receiverAddress, setReceiverAddress] = useState("");
//   const [transferAmount, setTransferAmount] = useState("");

//   const value = transferAmount.toString();

//   return (
//     // Use your custom error component to show errors
//     <div>
//       {/* {error && <ErrorMessage error={error} />} */}

//       <div>
//         <br />
//         <div style={{ color: "blue", fontSize: "1.5rem" }}>
//           Send USDC to any Address
//         </div>
//         <br />
//         <div style={{ fontSize: "1.2rem" }}>Send to :</div>
//         <div>
//           <input
//             type="text"
//             style={{ height: "1.5vw", width: "30vw" }}
//             onChange={(event) => setReceiverAddress(event.target.value)}
//             placeholder="0x0000....."
//           />
//         </div>
//         <br />
//         <div style={{ fontSize: "1.2rem" }}>Amount :</div>
//         <div>
//           <input
//             type="text"
//             style={{ height: "1.5vw", width: "5vw" }}
//             onChange={(event) => setTransferAmount(event.target.value)}
//             placeholder="0.0"
//           />{" "}
//           ETH
//         </div>
//         <br />
//         <button
//           onClick={() =>
//             fetch({
//               params: {
//                 amount: Moralis.Units.Token(20, 18),
//                 receiver: receiverAddress,
//                 value: value,
//                 type: "erc20",
//                 contractAddress: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
//               },
//             })
//           }
//           disabled={isFetching}
//         >
//           Send USDC
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SendErc20;

import { ethers } from "ethers";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../components/Login";

export default function Home() {
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState(false);

  const [transferLoading, setTransferLoading] = useState(false);
  const [hash, setHash] = useState([]);
  const [balance, setBalance] = useState(0);
  const [hasMetamask, setHasMetamask] = useState(false);

  useEffect(() => {
    if (window.ethereum) setHasMetamask(true); // If metamask installed set it to true

    window.localStorage.setItem("address", address);
    window.localStorage.setItem("transactionHash", hash);
  }, [address, hash]);

  // Handle bulk events using one useState hook, set initial values
  const initialValues = {
    address: "",
    amount: "",
  };
  // Pass the initail value to a hook
  const [values, setValues] = useState(initialValues);
  // Making a one time handle change

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target);
    setValues({ ...values, [name]: value });
    // const formattedAmount = ethers.utils.parseUnits(values.amount, 6);
    // console.log(values, formattedAmount._hex);
    // transferToken(values.address, values.amount);
  };
  // const { ethereum } = window;
  const usdc = {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    abi: [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function gimmeSome() external",
      "function balanceOf(address _owner) public view returns (uint256 balance)",
      "function transfer(address _to, uint256 _value) public returns (bool success)",
    ],
  };

  const getContract = async () => {
    try {
      if (!hasMetamask) {
        console.log("Pls install Metamask");
      }
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // await provider.send("eth_requestAccounts", [])

      
      const signer = provider.getSigner();
      const usdcContract = await new ethers.Contract(
        usdc.address,
        usdc.abi,
        signer
      );
      return usdcContract;
    } catch (error) {
      console.log(error);
    }
  };
  // Transfer Fake USDC from one address to another
  const transferToken = async () => {
    try {
      // const formattedAmount = ethers.utils.parseUnits("1", 6);
      const { address, amount } = values;
      if (!address || !amount) {
        setTransferLoading(false);
        console.log("Invalid inputs...");
        toast.error("Please enter a valid address and amount!");
        return;
      }
      const formattedAmount = amount * Math.pow(10, 6);
      console.log(formattedAmount);
      const usdcContract = await getContract();
      setTransferLoading(true);
      const txn = await usdcContract.transfer(
        // "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
        address,
        formattedAmount,
        "10",
        { gasPrice: 52399666204 }
      );
      await txn.wait();
      if (txn.hash) setTransferLoading(false);
      // console.log(txn.hash);
      toast.success(`Transfer Successful!! Hash: ${txn.hash.slice(0, 6)}...`);
    } catch (e) {
      setTransferLoading(false);
      toast.error(e.message);
    }
  };

  const connectWallet = async () => {
    // connect to Metamask

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    setConnected(true);
    const userAddress = await signer.getAddress();
    console.log(userAddress);
    setAddress(userAddress);
    getAddressHistory(userAddress); // calls etherscan to get all transactions on address
    const usdcContract = await getContract();
    console.log(userAddress);
    const bal = await usdcContract.balanceOf(userAddress.toString()); // returns a hex in 6 decimals
    setBalance(ethers.utils.formatUnits(bal, 6));
  };

  //checking if the address is a non 0 address .

  // Get wallet history
  const getAddressHistory = async (address) => {
    const etherscanProvider = new ethers.providers.EtherscanProvider(
      "goerli",
      "S1QM76TUI46A2X26PFF4YZ4IQ1NBBNU6KB"
    );
    const history = await etherscanProvider.getHistory(address);
    console.log(history);
  };
  return (
    <div className="container">
      <div className="header">
        <h2>ERC20 Token Transfer ( USDC)</h2>
        {connected ? (
          <button>Connected!!</button>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>
      <div className="wallet-details">
        <p>
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
        <p>{balance} FakeUSDC </p>
      </div>
      <div className="card">
        {/* Transfer */}
        <hr />
        <p>Send USDC to another wallet</p>
        <input
          type="text"
          placeholder="Enter wallet address"
          onChange={handleChange}
          value={values.address}
          name="address"
          required
        />
        <input
          type="number"
          placeholder="Enter amount of USDC"
          onChange={handleChange}
          value={values.amount}
          name="amount"
          required
        />
        {transferLoading ? (
         
          <Login />
        ) : (
          <button onClick={transferToken}>Transfer</button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
