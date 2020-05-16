var chainSelected;


function checkDestBlockchain(){
    var bcArr=["","eth","etc","clo","ella"];
    for (var i=1; i<5; i++){
        if (document.getElementById("control_0"+i).checked){
            document.getElementById("0"+i+"_btn").style.display="block";
            chainSelected=bcArr[i];
        }
        else{
            document.getElementById("0"+i+"_btn").style.display="none";
        }
    }
}


var web3_eth;
var web3_etc;
var web3_clo;
var web3_ella;
var ethTx;
var etcTx;
var cloTx;
var ellaTx;


function init_web3s(){
    var Web3 = require('web3');
    //web3_eth = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));//Localhost
    //web3_eth = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/6efe4dc6516a44e89b3d38dd9e551415"));//Ropsten
    web3_eth_search = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/6efe4dc6516a44e89b3d38dd9e551415"));//MainNet
    //web3_etc_search = new Web3(new Web3.providers.HttpProvider("https://web3.gastracker.io")); //Dead 2019
    //web3_etc_search = new Web3(new Web3.providers.HttpProvider("https://etc-geth.0xinfra.com"));
    //web3_clo_search = new Web3(new Web3.providers.HttpProvider("https://clo-geth.0xinfra.com"));
    //web3_ella_search = new Web3(new Web3.providers.HttpProvider("https://jsonrpc.ellaism.io"));
    console.log("search node loaded")

    if (typeof web3 != 'undefined') {
        web3_eth_send = new Web3(web3.currentProvider);//Metamask Only for sending!!!
        //web3_etc_send = new Web3(web3.currentProvider);//Metamask Only for sending!!!
        //web3_clo_send = new Web3(web3.currentProvider);//Metamask Only for sending!!!
        //web3_ella_send = new Web3(web3.currentProvider);//Metamask Only for sending!!!
        console.log("web3 defined");
    }
}


function searchTransaction(){
    abiDecoder.addABI(abi);
    document.getElementById("loader").style.display="block";
    var hash=document.getElementById("txHash").value;
    if (hashValid(hash)){
            errors=[];
            ethTx=null;
            etcTx=null;
            cloTx=null;
            ellaTx=null;
            ethTx= web3_eth_search.eth.getTransaction(hash);
            //etcTx= web3_etc_search.eth.getTransaction(hash);
            //cloTx= web3_clo_search.eth.getTransaction(hash);
            //ellaTx= web3_ella_search.eth.getTransaction(hash);
            printResult("Ethereum",ethTx,"ethTx");
            //printResult("Ethereum Classic",etcTx,"etcTx");
            //printResult("Callisto Network",cloTx,"cloTx");
            //printResult("Ellaism",ellaTx,"ellaTx");
            document.getElementById("loader").style.display="none";
            document.getElementById("results").innerHTML="Complete!"
    }
    else{
        alert("Incorrect Hash!");
        document.getElementById("loader").style.display="none";
    }
}


var txData;


function printResult(coin,tx,txVar){
        var tx_res=document.getElementById("tx_results");
        if (tx != null){
            var date = getTxDate(tx,txVar);
            tx_res.innerHTML="Found <b>" + coin +"</b> transaction!<br><ul><li> <b>Block number: </b>"+tx.blockNumber + "</li><li><b>Timestamp(UTC): </b>"+ date.toUTCString() + "</li><li><b>Timestamp(Local time): </b>" + date + "</li></ul>";
            try {
            txData=abiDecoder.decodeMethod(tx.input).params[0].value;
            if (txData.substr(0,5)=="{4en}"){// "{4en}" web3_eth.toAscii(tx.input).substr(0,5)
                tx_res.innerHTML=tx_res.innerHTML+"Found <b>4en</b> record! <a onclick='decodeTxData("+txVar+")'>Click here to get it!</a>";
            }
            else{
                tx_res.innerHTML=tx_res.innerHTML+"No <b>4en</b> record found.<br>";
            }
            }
            catch(err){
                tx_res.innerHTML=tx_res.innerHTML+"No <b>4en</b> record found.<br>";
            }
        }
}

const delimiter="-;-";

function decodeTxData(tx){
  //Format for text only: {4en}-;-TextOnly-;--;-4en contract started!
  //Format for file: {4en}-;-fileType-;-fileName-;-fileContent
  //Pattern -;- is the field delimiter
  //{4en} pattern is always present then start search from char #6
    var posDel1=5;
    var posDel2;
    var posDel3;
    var substr1=txData.substr(posDel1+3);//String from delimiter after fileName
    posDel2=substr1.search(delimiter);
    var substr2=substr1.substr(posDel2+3);//String from delimiter after fileType
    posDel3=substr2.search(delimiter);

    fileType = txData.substr(posDel1+3,posDel2);
    fileName = substr1.substr(posDel2+3,posDel3);
    fileData = str2ab(substr2.substr(posDel3+3));

    if (fileType=="TextOnly"){
        document.getElementById("fileOutput").style.display="none";
        document.getElementById("textOutput").style.display="block";
        document.getElementById("textData").innerHTML=substr2.substr(posDel3+3);
    }
    else {
        document.getElementById("fileOutput").style.display="block";
        document.getElementById("textOutput").style.display="none";
        document.getElementById("fileName").innerHTML=fileName;
        document.getElementById("fileType").innerHTML=fileType;
        document.getElementById("fileData").innerHTML=fileData;
    }
}


function hashValid(hash){
    if ((hash.substr(0,2)=="0x") && (hash.toString(16).length==66) && !isNaN(hash)){
        return true;
    }
    else {
        return false;
    }
}


function getTxDate(tx,txvar){
    var timestamp;
    //init_web3s();
    switch(txvar){
        case ("ethTx"): {
            timestamp=web3_eth_search.eth.getBlock(tx.blockNumber).timestamp*1000;
            break;
        }case ("etcTx"): {
            timestamp=web3_etc_search.eth.getBlock(tx.blockNumber).timestamp*1000;
            break;
        }case ("cloTx"): {
            timestamp=web3_clo_search.eth.getBlock(tx.blockNumber).timestamp*1000;
            break;
        }case ("ellaTx"): {
            timestamp=web3_ella_search.eth.getBlock(tx.blockNumber).timestamp*1000;
            break;
        }
    }
    var date = new Date(timestamp);
    return date;
}


function resetResult(){
    document.getElementById("results").innerHTML="";
    document.getElementById("tx_results").innerHTML="";
    document.getElementById("fileOutput").style.display="none";
    document.getElementById("textOutput").style.display="none";
}

//Conversion from byteArray to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));//Uint16Array
}


//Conversion from string to byteArray
function str2ab(str) {
  var buf = new ArrayBuffer(str.length);                // (str.length*2) 2 bytes for each char
  var bufView = new Uint8Array(buf);                    //Uint16Array
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


function checkUtf8(){
  try{
    var str=utf8.encode(ab2str(fileData));
  }
  catch(err){
    alert("Selected file could not be stored.\n UTF-8 encodig failed with error: "+err.message+"\n Try with another file or format.");
    resetFile();
    str="";
  }
}


function checkNull(){
    var str=utf8.encode(ab2str(fileData));
    if (str.search("\u0000")!= -1){
        console.log("Error, null char found.");
        alert("Unable to store this file. Null char found.");
        resetFile();
    }
    else{
        document.getElementById("gotostep3").style.display="block";
        document.getElementById("store").style.display="block";
    }
}
