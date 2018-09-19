pragma solidity ^0.4.24;

import "chainlink/solidity/contracts/Chainlinked.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MyContract is Chainlinked, Ownable {
  constructor(address _link, address _oracle) public Ownable() {
    setLinkToken(_link);
    setOracle(_oracle);
  }
}