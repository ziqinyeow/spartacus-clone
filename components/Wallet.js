/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef } from "react";
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import CONFIG from "../public/config/config.json";

const Wallet = ({ wallet, setWallet, setAccount, setBalance }) => {
  const ref = useRef();

  const close = (e) => {
    if (ref.current === e.target) {
      setWallet(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && wallet) {
        setWallet(false);
      }
    },
    [setWallet, wallet]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const connectWallet = async () => {
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance / Math.pow(10, 18));
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          setAccount(accounts[0]);
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0]);
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          console.log(`Change network to ${CONFIG.NETWORK.NAME}.`);
        }
      } catch (err) {
        console.log("Something went wrong. Reload the page and try again.");
      }
    } else {
      console.log("Install Metamask.");
    }
  };

  return (
    <div>
      {wallet ? (
        <div
          onClick={close}
          ref={ref}
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-gray-50"
        >
          <div className="p-6 space-y-6 bg-white rounded min-w-[300px] max-w-[500px]">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-medium">Connect a Wallet</h4>
              <div
                onClick={() => setWallet(false)}
                className="p-1 transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center px-3 py-4 space-x-3 transition-all duration-300 rounded cursor-pointer hover:bg-slate-50">
              <img
                src="https://valoraapp.com/_next/static/images/icon-62b90ddabe4910b9c5d55ecabf817aa8.png"
                alt="valora"
                className="w-10 h-10"
              />
              <div>
                <h5 className="font-medium">Valora</h5>
                <h6 className="text-gray-700">
                  Connect to Valora, a mobile payments app that works worldwide
                </h6>
              </div>
            </div>
            <div className="flex items-center px-3 py-4 space-x-3 transition-all duration-300 rounded cursor-pointer hover:bg-slate-50">
              <img
                src="https://time.com/img/icons/wallet-connect.png"
                alt="wallet connect"
                className="w-10 h-10"
              />
              <div>
                <h5 className="font-medium">WalletConnect</h5>
                <h6 className="text-gray-700">
                  Scan a QR code to connect your wallet
                </h6>
              </div>
            </div>
            <div
              onClick={connectWallet}
              className="flex items-center px-3 py-4 space-x-3 transition-all duration-300 rounded cursor-pointer hover:bg-slate-50"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                alt="metamask"
                className="w-10 h-10"
              />
              <div>
                <h5 className="font-medium">MetaMask</h5>
                <h6 className="text-gray-700">
                  Use the Metamask browser extension. Celo support is limited.
                </h6>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Wallet;
