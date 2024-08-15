import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { useStore } from "../context/GlobalState";
import { loadBlockchain } from "../store/asyncActions";
import { chainID } from "../store/actions";

const NavbarCom = () => {
  const [isLogIn, setIsLogIn] = useState("");
  const [{ web3, chainid }, dispatch] = useStore();
  const { ethereum } = window;

  // useEffect(async() => {
  //   //let token = localStorage.getItem("token");
  //   //setIsLogIn(token);
  //   console.log(window.location.href)
  //   if(ethereum.isConnected() == true){
  //     await loadBlockchain(dispatch);
  //   }

  // },[]);

  const logOut = () => {
    console.log("0");
    localStorage.setItem("token", false);
    window.location.href = "/login";
  };

  const isMetaMaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const initialize = async () => {
    const checkWallet = Boolean(ethereum && ethereum.isMetaMask);
    if (checkWallet == true) {
      await ethereum.request({ method: "eth_requestAccounts" });
      document.getElementById("collect__now").innerText = "Connected";
      document.getElementById("collect__now").disabled = true;
      await loadBlockchain(dispatch);
      //  setStatus("Connected");
      // dispatch(setupConnection(1));
    } else {
      const MetaMaskClientCheck = () => {
        //Now we check to see if Metmask is installed
        if (!isMetaMaskInstalled()) {
          //If it isn't installed we ask the user to click to install it
          document.getElementById("collect__now").innerText =
            "Click here to install MetaMask!";
          //When the button is clicked we call this function
          document.getElementById("collect__now").onclick = onClickInstall;
          //The button is now disabled
          document.getElementById("collect__now").disabled = false;
        } else {
          //If it is installed we change our button text
          document.getElementById("collect__now").innerText = "Connect";
          document.getElementById("collect__now").onclick = onClickConnect;
          //The button is now disabled
          document.getElementById("collect__now").disabled = false;
        }
      };
      MetaMaskClientCheck();
    }
  };

  const onClickInstall = () => {
    document.getElementById("collect__now").href =
      "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
  };

  const onClickConnect = async () => {
    try {
      await loadBlockchain(dispatch);
      //  await ethereum.request({ method: 'eth_requestAccounts' });
      //  setStatus("Connected");
      //  dispatch(setupConnection(1));
    } catch (error) {
      console.error(error);
    }
  };

  async function switchNetwork() {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
      dispatch(chainID(97));
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "BSC Testnet",
                rpcUrls: [
                  "https://data-seed-prebsc-1-s1.binance.org:8545/",
                ] /* ... */,
              },
            ],
          });
          dispatch(chainID(97));
        } catch (addError) {
          console.log("Error in switch network = ", addError.message);
        }
      }
      // handle other "switch" errors
    }
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ background: "#12567D" }}
    >
      <>
        <Navbar.Brand href="#home" style={{ color: "white" }}>
          Blockchain
        </Navbar.Brand>
        {/* {isLogIn ? ( */}
        <Nav className="justify-content-end flex-row width-100">
          {window.location.href == "http://localhost:3000/" ||
          window.location.href == "http://localhost:3000/#" ||
          window.location.href == "http://localhost:3000" ? (
            <null />
          ) : (
            <Navbar.Brand href="/">Goto Home</Navbar.Brand>
          )}
          {web3 === null ? (
            <Navbar.Brand href="#" id="collect__now" onClick={initialize}>
              Connect Wallet
            </Navbar.Brand>
          ) : chainid !== 97 ? (
            <Navbar.Brand href="#" onClick={switchNetwork}>
              Change Network
            </Navbar.Brand>
          ) : window.location.href != "http://localhost:3000/" ||
            window.location.href == "http://localhost:3000/#" ? (
            <Navbar.Brand id="btn_dashboard" href="/landing">
              Goto Dashboard
            </Navbar.Brand>
          ) : (
            <null />
          )}

          {/* <NavDropdown title="" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={logOut}>SignOut</NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        {/* ) : null} */}
      </>
    </Navbar>
  );
};

export default NavbarCom;
