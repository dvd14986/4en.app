const abi= JSON.parse('[{"constant":false,"inputs":[{"name":"_data","type":"string"}],"name":"setData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

//const sc_address_eth='0xc2ba1c19c00152e880f330b553d69553d4112c3c'; //localhost
//const sc_address_eth='0xc55704fc5b494bc8aae0675fc0275d716f6b9f04'; //Ropsten
const sc_address_eth='0x96cf3338e7b068cf2ac462474b83b5f8a030dd1b'; //Ethereum
const sc_address_etc='0x376a8A2Ff16Df9e0Cd6AefB80F7b589c3426D953'; //Ethereum Classic
const sc_address_clo='0xc55704fc5b494bc8aae0675fc0275d716f6b9f04'; //Callisto Network
const sc_address_ella='0xc55704fc5b494bc8aae0675fc0275d716f6b9f04'; //Ellaism



var web3_dest;
var sc_address;

function storedata_eth() {
  //Format for text only: {4en}-;-TextOnly-;--;-4en contract started!
  //Format for file: {4en}-;-fileType-;-fileName-;-fileContent
  //Pattern -;- is the field delimiter
    resetStoreResult();
    document.getElementById("loader").style.display="block";
    
    switch (chainSelected) {
        case "eth": {
            web3_dest=web3_eth_send;
            sc_address=sc_address_eth;
            break;
        }
        case "etc": {
            web3_dest=web3_etc_send;
            sc_address=sc_address_etc;
            break;
        }
        case "clo": {
            web3_dest=web3_clo_send;
            sc_address=sc_address_clo;
            break;
        }
        case "ella": {
            web3_dest=web3_ella_send;
            sc_address=sc_address_ella;
            break;
        }    
        default:{
            web3_dest=web3_eth_send;
            sc_address=sc_address_eth;
            break;
        }
    } 
    if (typeof web3 === 'undefined') {
        alert('You need the https://metamask.io/ browser plugin to use this service.')
    }
    else {
        field = document.getElementById("byte_content");
          text_field = field.value;
          if (field.value=="[object ArrayBuffer]"){
            data="{4en}"+delimiter+fileType+delimiter+fileName+delimiter+ab2str(fileData);
          }
          else {
            data="{4en}"+delimiter+"TextOnly"+delimiter+delimiter+text_field;
          }
            try{
              contractInstance = web3_dest.eth.contract(abi).at(sc_address);
              contractInstance.setData(
                data,
                {
                  from: web3.eth.accounts[0],
                  gas: 4700000
                },
                function (error, hash) {
                    console.log(error, hash);
                        if (hash!=undefined) {
                            document.getElementById("txhash").innerHTML=hash;
                            document.getElementById("txhash").style.display="block";
                            switch (chainSelected) {
                                case "eth": {
                                    document.getElementById("eth_exp").innerHTML="<a href='https://etherscan.io/tx/"+hash+"'>https://etherscan.io/tx/"+hash+"</a>";
                                    document.getElementById("eth_exp").style.display="block";
                                    break;
                                }
                                case "etc": {
                                    document.getElementById("etc_exp").innerHTML="<a href='https://gastracker.io/tx/"+hash+"'>https://gastracker.io/tx/"+hash+"</a>";
                                    document.getElementById("etc_exp").style.display="block";
                                    break;
                                }
                                case "clo": {
                                    document.getElementById("clo_exp").innerHTML="<a href='https://cloexplorer.org/tx/"+hash+"'>https://cloexplorer.org/tx/"+hash+"</a>";
                                    document.getElementById("clo_exp").style.display="block";
                                    break;
                                }
                                case "ella": {
                                    document.getElementById("ella_exp").innerHTML="<a href='https://explorer.ellaism.io/tx/"+hash+"'>https://explorer.ellaism.io/tx/"+hash+"</a>";
                                    document.getElementById("ella_exp").style.display="block";
                                    break;
                                }    
                                default:{
                                    break;
                                }
                           }  
                            document.getElementById("hashResult").style.display="block";
                            document.getElementById("loader").style.display="none";
                        }
                        else {
                            document.getElementById("errorTX").style.display="block";
                            document.getElementById("loader").style.display="none";
                        }
                }
              )
            }
            catch(err){
                alert("Error storing data!\n\n"+ err.message)
                document.getElementById("loader").style.display="none";
            }
        }
    }