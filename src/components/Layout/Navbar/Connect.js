import React, { useEffect, useRef, useState } from "react";
import { Cryptologo } from "../../../assets/Icons";
import "./navbar.css";
import { toast } from "react-hot-toast";
// import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, removeAddress } from "../../../actions";
import WalletConnectDialog from "../../WalletConnectDialog";
import SwitchNetDialog from "../../SwitchNetDialog";
import { REMOVE_ADDRESS } from "../../../actions/types";
// import Web3 from "web3";

function Connect() {
  const [walletDialogStatus, setWalletDialogStatus] = useState(false);
  const [walletAddress, setWalletAddress] = useState("CONNECT");
  const [connection, setConnection] = useState(null);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [firstLoginTime, setFirstLoginTime] = useState();
  const btnSelf = useRef(null);
  const { ethereum } = window;
  const { button, hover, font, background, backgroundHolder, border } =
    useSelector((state) => state);
  const dispatch = useDispatch();

  let provider;

  try {
    let temp_provider = new ethers.providers.Web3Provider(window.ethereum);
    provider = temp_provider;
  } catch (error) {
    console.log(error);
    let temp_provider = null;
    provider = temp_provider;
  }

  const convStr = (str) => {
    const temp =
      str.slice(0, 4) + "..." + str.slice(str.length - 3, str.length);
    return temp;
  };

  // On refresh, check connection again
  useEffect(() => {
    async function getSignerAddress() {
      try {
        const signer = await provider.getSigner().getAddress();
        let string = signer.toString();
        dispatch(addAddress(string));
        setWalletAddress(
          string.slice(0, 4) +
            "..." +
            string.slice(string.length - 3, string.length)
        );
      } catch (error) {
        // toast.error("Couldn't find your wallet address");
        console.log("Wallet address in not found.");
      }
    }

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts) => {
        if (
          (await provider.getSigner()) &&
          currentWalletAddress === window.ethereum.selectedAddress &&
          window.ethereum.selectedAddress
        ) {
          console.log("Found the address");
          setWalletAddress(convStr(window.ethereum.selectedAddress));
        } else if (
          (await provider.getSigner()) &&
          currentWalletAddress !== window.ethereum.selectedAddress &&
          window.ethereum.selectedAddress
        ) {
          setWalletAddress(convStr(window.ethereum.selectedAddress));
        } else {
          console.log("disconnected");
          setWalletAddress("CONNECT");
          dispatch(removeAddress());
        }
        setCurrentWalletAddress(window.ethereum.selectedAddress);
      });
    }

    if (!ethereum || !ethereum.isMetaMask) {
      return;
    }

    let currentTime = new Date().getTime();
    let storedFirstLoginTime = localStorage.getItem("firstLoginTime");
    if (storedFirstLoginTime) {
      if (currentTime - storedFirstLoginTime > 0.1 * 60 * 1000) {
        //disconnect wallet
        console.log(currentTime - storedFirstLoginTime);
        localStorage.setItem("firstLoginTime", currentTime);
        provider = new ethers.providers.Web3Provider(window.ethereum);
        setWalletAddress("CONNECT");
        setConnection(null);
      } else {
        setFirstLoginTime(storedFirstLoginTime);
      }
    } else {
      localStorage.setItem("firstLoginTime", currentTime);
      setFirstLoginTime(currentTime);
    }

    // Check if connection is still valid
    if (!connection) {
      console.log("checking connection");
      setConnection(provider);
      getSignerAddress();
    }
  }, []);

  const connectWallet = async () => {
    setWalletDialogStatus(!walletDialogStatus);
  };
  return (
    <>
      <button
        className={`conbtn bg-[${button}] text-[${font}] border-[${border}] hover:bg-[${hover}]`}
        onClick={connectWallet}
        ref={btnSelf}
      >
        <Cryptologo width={11} height={18} color={font} />
        {walletAddress}
      </button>
      <WalletConnectDialog
        className="z-20"
        modalState={walletDialogStatus}
        closeModal={() => {
          setWalletDialogStatus(false);
        }}
        buttonRef={btnSelf}
      />
      {/* <SwitchNetDialog
        modalState={walletDialogStatus}
        closeModal={() => {
          setWalletDialogStatus(false);
        }}
        buttonRef={btnSelf}
      /> */}
    </>
  );
}

export default Connect;
