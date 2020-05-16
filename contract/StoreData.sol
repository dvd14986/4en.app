// 4en.app data contract
// Version: 1.0 - 18/08/2018

//Set solidity version
pragma solidity ^0.4.24;

//Define new contract
contract StoreData {
  string data;


  //Constructor, public function.
  //Initialize data element
  function StoreData() public {
    data = "{4en};TextOnly;;4en contract started!";
  }

  //Function SetData: store data into the blockchain
  function setData(string _data) public {
    data = _data;
  }

}
