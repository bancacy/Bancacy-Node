// Require Web3 Module
var Web3 = require('web3');
const sign = require('ethjs-signer').sign;



// Show web3 where it needs to look for the Ethereum node
web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/8a53bb3b5fa14748818f25b9ea6f73ee'));


// Define the ABI of the contract, used to return the desired values
var abi = [ { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "addMainProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "addProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getData", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "purgeReports", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "payload", "type": "uint256" } ], "name": "pushReport", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "removeProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "minimumProviders_", "type": "uint256" } ], "name": "setMinimumProviders", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "reportDelaySec_", "type": "uint256" } ], "name": "setReportDelaySec", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "reportExpirationTimeSec_", "type": "uint256" } ], "name": "setReportExpirationTimeSec", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "reportExpirationTimeSec_", "type": "uint256" }, { "internalType": "uint256", "name": "reportDelaySec_", "type": "uint256" }, { "internalType": "uint256", "name": "minimumProviders_", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ProviderAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ProviderRemoved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ReportTimestampOutOfRange", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "payload", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "ProviderReportPushed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "constant": true, "inputs": [], "name": "index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isMain", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "mainCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "mainProviders", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minimumProviders", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nodeAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nodeIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "providerReports", "outputs": [ { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "payload", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "providers", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "providersSize", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "regularNodes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "reportDelaySec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "reportExpirationTimeSec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ReturnValue", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "size", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "validReports", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "Where", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

// Input from the user
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Wait for user input - private key
rl.question('Please enter your Ethereum private-key ', (answer) => {


var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');

// The Ethereum address of the smart contract
var addr = "0x899847c95fc40903b30519b9dbfe81482b73f482";
var privateKey = answer;
var privateKeyBuffer = EthUtil.toBuffer(privateKey);


var wallet = Wallet.fromPrivateKey(privateKeyBuffer);
var thisAddr = wallet.getAddressString();

console.log(thisAddr);






// Build a new variable based on the web3 API including the ABI and address of the contract
var MedianOracle = new web3.eth.Contract(abi, addr);




let contract = new web3.eth.Contract(abi,addr );
data = contract.methods.pushReport("80000000000000000000").encodeABI();
console.log("Dd");
let transaction = {
    to: addr,
    from : thisAddr,
    value: 0,
    gas: 400000,
    gasPrice: 10 * 1.0e9,
    data: data
  };
  console.log("Dd");

  Send(transaction);



  function Send (transaction) {
   
          
    web3.eth.getTransactionCount(thisAddr, (error, nonce) => {
        if(!error) { 
            
            // Add nonce to the transaction object.
            transaction.nonce = nonce;
            console.log(nonce);
            // Sign the transaction and send.
            web3.eth.sendSignedTransaction(sign(transaction,privateKey), async (error, txHash) => {
                console.log("Dd");
              //console.log(txHash);
              if(txHash) { 
                console.log("Data Sent!");
                console.log(txHash);
              }
                if(error) {
                  
                    console.log('There was a problem sending your Data.');
                    console.log(error);
                    //alert(error);
                  }
                
            }).catch((error) => {
                console.log(error);
                
              });;
          }
            else {
              
                console.log('There was a problem sending your nonce.');
                //alert(error);
              }
      
    });

}  rl.close();

});
