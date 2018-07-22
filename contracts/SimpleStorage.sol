pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;

  event StorageVal(uint data);

  function set(uint x) public {
    storedData = x;

    emit StorageVal(x);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
