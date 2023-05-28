
const provider = {
  isMetaMask: true,
  send: () => { console.log("A transaction has sent."); },
  call: () => { console.log("Query data from blockchain"); }
}

window.ethereum = provider;