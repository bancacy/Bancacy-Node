// Require Web3 Module
var Web3 = require('web3');
// Require ethjs-signer Module
const sign = require('ethjs-signer').sign;
// Require ethereumjs-wallet Module
var Wallet = require('ethereumjs-wallet');
// Require ethereumjs-util Module
var EthUtil = require('ethereumjs-util');

const CronJob = require('cron').CronJob;



var privateKey;
var lastData;
var  restored = false;
var count= 0;
var index = 0;

var arraySize = 16; // 10080 on mainnet - 7 Days
var Sap = 4;  // 360 on mainnet - 6 Hours
var freqOfData = 30; // 60 on Mainnet
var restoringWindow = 600;

// Input from the user
var readline = require('readline');
var fs = require('fs');
var stream = require('stream');
const Fs = require('fs');
let seconds;
const priceArrayFile = new Array(arraySize);

// The Ethereum address of the MedianOracle smart contract
var MedianOracle = "0x3DC072445c1aD51603b3A4cB2B6E4c3f99047CAF";

// The Ethereum address of the sapOracle smart contract
var sapOracle = "0x3DC072445c1aD51603b3A4cB2B6E4c3f99047CAF";

// The Ethereum address of Bancacy - BNY
var BancacyAddress = "0x3DC072445c1aD51603b3A4cB2B6E4c3f99047CAF";
// Eth Address of the user - coumputed via the provided private key
var addr;

var draft = 0x6c5e705beead05db7f34e5ac92881d1796e24e8bbfa3936863b83b3252705ba5;









// input from the user - private key
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Wait for user input - private key
rl.question('Please enter your Ethereum private-key:', (answer) => {
    // privateKey is the user's input
 privateKey = answer;

// privateKeyBuffer
var privateKeyBuffer = EthUtil.toBuffer(privateKey);

// Generating Wallet from the private key
var wallet = Wallet.fromPrivateKey(privateKeyBuffer);
// Getting Address from the Wallet
 addr = wallet.getAddressString();

// closing rI
rl.close();








// Function for sending the report to the MedianOracle smart contract
function sendReport(dataReport){


// Show web3 where it needs to look for the Ethereum node
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


// Define the ABI of the contract, used to return the desired values
var abi = [ { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "addMainProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "addProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "getData", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "purgeReports", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "payload", "type": "uint256" } ], "name": "pushReport", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "provider", "type": "address" } ], "name": "removeProvider", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "minimumProviders_", "type": "uint256" } ], "name": "setMinimumProviders", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "reportDelaySec_", "type": "uint256" } ], "name": "setReportDelaySec", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "uint256", "name": "reportExpirationTimeSec_", "type": "uint256" } ], "name": "setReportExpirationTimeSec", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "reportExpirationTimeSec_", "type": "uint256" }, { "internalType": "uint256", "name": "reportDelaySec_", "type": "uint256" }, { "internalType": "uint256", "name": "minimumProviders_", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ProviderAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ProviderRemoved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "provider", "type": "address" } ], "name": "ReportTimestampOutOfRange", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "provider", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "payload", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "ProviderReportPushed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "constant": true, "inputs": [], "name": "index", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isMain", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "mainCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "mainProviders", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "minimumProviders", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nodeAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "nodeIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "providerReports", "outputs": [ { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "payload", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "providers", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "providersSize", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "regularNodes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "reportDelaySec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "reportExpirationTimeSec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ReturnValue", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "size", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "validReports", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "Where", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];



// Build a new variable based on the web3 API including the ABI and address of the contract
let contract = new web3.eth.Contract(abi,addr);
// Build the Data of pushReport
data = contract.methods.pushReport(dataReport).encodeABI();
// Build the transaction
let transaction = {
    to: MedianOracle,
    from : addr,
    value: 0,
    gas: 400000,
    gasPrice: 10 * 1.0e9,
    data: data
  };

  // Sending the transaction
  Send(transaction);




// Getting the nonce, signing the transaction and broadcasting
  function Send (transaction) {
   
    // get the nonce (Transactions Count)
    web3.eth.getTransactionCount(addr, (error, nonce) => {
        if(!error) { 
            
            // Add nonce to the transaction object.
            transaction.nonce = nonce;
            console.log(nonce);
            // Sign the transaction and send.
            web3.eth.sendSignedTransaction(sign(transaction,privateKey), async (error, txHash) => {
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
              
                console.log('There was a problem getting your nonce.');
              }
    
    });

} 

}












// Seting up the event subscription, once recived - it will cheack if the report is valid and send it.
// This is used when users want to on-chain exchange between BNY and XBNY
// This event is limited to 1 call per 10 minitues  
let web3Provider = new Web3.providers.WebsocketProvider("ws://localhost:8546");
var web3Obj = new Web3(web3Provider);

var subscription = web3Obj.eth.subscribe('logs', {
    address: BancacyAddress, 
    topics: ['0xb17ff9ded3a31df323e52546588eb044a74643da514d71f37ad0e07b010b96ba',null,null]
}, function(error, result){ 
    if (error) console.log(error);
}).on("data", function(trxData){

   // Send report
   console.log("Event received", trxData);
   
   // Cheack if the Data array is not empty
   if(priceArrayFile[0] != undefined && priceArrayFile[priceArrayFile.length-1] != undefined){
   console.log('Sending Report!!');
   // getting the array average with averageArray function
   var avg = averageArray(priceArrayFile);
   if(avg != false){
   sendReport(avg);
   }
   else{
    console.log("Array has to many missing indexes");
   }
   }
   else{
     console.log("Empty array, Node must run at least 1 week to provide data");
 }
  
 
  
});

subscription;










// cron Job for calling sendReport with the node report evrey 6 hours - prior to BNY Token Rebase
const job = new CronJob({
  // Run at 20:00 Central time
  cronTime: '0 20,02,08,14 * * *',
  onTick: function() {
      // Send report
      console.log('Sending Report!!');
      if(priceArrayFile[0] != undefined && priceArrayFile[priceArrayFile.length-1] != undefined)
      {
      var avg = averageArray(priceArrayFile);
      if(avg != false){
        sendReport(avg);
        }
        else{
         console.log("Array has to many missing indexes");
        }
    
      }
      else{
        console.log("Empty array, Node must run at least 1 week to provide data");
    }
  },
  start: true,
  timeZone: 'US/Central'
});






//Cheack if theres stored file (file.txt), if yes, cheack if the last file change was in the last 10".
// If the file is valid, it will be written to the data array and countinue from the last data on the file.
// Else it will start getting data and write it to new empty file.
fs.stat("./file.txt", function(err, stats){
  if(!err){
   seconds = (new Date().getTime() - stats.mtime) / 1000;
  console.log(`File modified ${seconds} ago`);

  var missingDataSec = seconds / freqOfData;
console.log( " " + seconds + " " + missingDataSec);
if(seconds <= restoringWindow){

  restored = true;

console.log("Your stored Data is within 10 minutes");

var writeStream = fs.createReadStream('./file.txt');
var outstream = new stream;
var rl1 = readline.createInterface(writeStream, outstream);



rl1.on('line', function(line) {
  // process line here
  priceArrayFile[count]=(line);
  
  count++;
  
});


rl1.on('close', function() {
  //delete last data in the array

  priceArrayFile[count-1] = undefined;
  if( priceArrayFile[count-2] != undefined ){
    
    lastData = priceArrayFile[count-2];
    priceArrayFile[count-1] = priceArrayFile[count-2];
  }
  else{
    lastData = undefined;
  }

  var writeStream3 = fs.createReadStream('./pointer.txt');
  var outstream2 = new stream;
  var rl2 = readline.createInterface(writeStream3, outstream2);

  rl2.on('line', function(line) {
    // process line here
    count = line;
    
  });

  rl2.on('close', function() {
    // adding the missing data from the last recived data
while(missingDataSec > 0  && lastData != undefined){
  console.log(count);

 if(count > priceArrayFile.length-2){
   priceArrayFile[priceArrayFile.length-1] = lastData;
   count =0;
   missingDataSec--;
 }

 else{

 priceArrayFile[count] = lastData;
 count++;
 missingDataSec--;
 }
}

if(restored){
  
 index =count;
 }

 console.log('arr', priceArrayFile);

  });



});



}
  }
});















startLog();

function startLog() {

  
   
setTimeout(startLog, freqOfData * 1000);

// Get BNY price in ETH from Stex
var request = require('request');
request('https://api3.stex.com/public/ticker/1073', function (error, response, data) {

  if (!error && response.statusCode == 200) {
    var parsedData = JSON.parse(data);
    var ethPrice = parsedData.data.last;

// Get ETH price in USD from CoinBase
request('https://api.coinbase.com/v2/prices/ETH-USD/spot', function (error, response, data) {

  if (!error && response.statusCode == 200) {

    var parsedData = JSON.parse(data);
    var USDprice = parsedData.data.amount;
    // TEST ETH = 150
    USDprice = 150;
    var priceBNY = USDprice * ethPrice;
    var finalBNY = Math.pow(10,18)* priceBNY;
    finalBNY = Math.floor(finalBNY);

    if (index == priceArrayFile.length-1){

        priceArrayFile[index] = finalBNY;
        file_RW();
        index=0;
    }

    else{
        
        priceArrayFile[index] = finalBNY;   
        console.log(index + " real");
        file_RW();
        index++;
    }

  }
  
})
  }
})



}


function file_RW(){

  const writeStream = fs.createWriteStream('file.txt');
const writeStream2 = fs.createWriteStream('pointer.txt');

const pathName = writeStream.path;
const pathName2 = writeStream2.path;

writeStream2.write((`${index}\n`));

// the finish event is emitted when all data has been flushed from the stream
writeStream2.on('finish', () => {

   console.log(`wrote the pointer into the file ${pathName2}`);
   console.log(index);
});

// handle the errors on the write process
writeStream2.on('error', (err) => {

    console.error(`There is an error writing the file ${pathName2} => ${err}`)
});
writeStream2.end();


// write each value of the array on the file breaking line
priceArrayFile.forEach(value => writeStream.write(`${value}\n`));

// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {

   console.log(`wrote all the array data to file ${pathName}`);
});

// handle the errors on the write process
writeStream.on('error', (err) => {

    console.error(`There is an error writing the file ${pathName} => ${err}`)
});

// close the stream
writeStream.end();

}






pointer = 5
sap = 4
0 1 2 3 4 5 6          

sap - pointer = 4 - 5 =  
L.6 - 3 = L[3]


//Returns the average of the array from pointer back Sap indexes
function PartAverageArray (array,pointer){

  var i = 0;
  var sum = 0;
  var missing =0;
  var zero = false;
  var clock = false;

  if(Sap >= pointer)
  {
  clock = true;
   var startPointer = Sap - pointer;
   if (startPointer == 0){
    zero = true;
   }
  }
 


  // no need to clock the indexes
 if (!clock){ 
  for(i = pointer - Sap;  i < pointer ; i++){

    if(array[i] != undefined){

     sum = sum + parseInt(array[i]);
    }
    else{

      missing++;
    }
  }

  if(missing > 0 && missing < 10){

    sum= ((sum/(i+1)) * missing) + sum;
    i = i + missing;
  }
  if(missing > 10){
    return (false);
  }
  else{
  return (Math.floor(sum / (i+1)));
  }

}
}


}









//Returns the average of the array
function averageArray (array){
  var i = 0;
  var sum = 0;
  var missing =0;

  for(i = 0;  i < array.length ; i++){

    if(array[i] != undefined){

     sum = sum + parseInt(array[i]);
    }
    else{

      missing++;
    }
  }

  if(missing > 0 && missing < 10){

    sum= ((sum/(i+1)) * missing) + sum;
    i = i + missing;
  }

  if(missing > 10){
    return (false);
  }
  else{
  return (Math.floor(sum / (i+1)));
  }
}



//Returns the creation time of the parm file
function createdDate (file) {  

  const { birthtime  } = Fs.statSync(file);
  return birthtime 
}




});