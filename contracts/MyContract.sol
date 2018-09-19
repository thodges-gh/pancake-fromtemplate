pragma solidity ^0.4.24;

import "chainlink/solidity/contracts/Chainlinked.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract MyContract is Chainlinked, Ownable {

  bytes32 public bData;
  int256 public iData;
  uint256 public uData;

  constructor(address _link, address _oracle) public Ownable() {
    setLinkToken(_link);
    setOracle(_oracle);
  }

  function requestBytes32(bytes32 _jobId) public onlyOwner {
    ChainlinkLib.Run memory run = newRun(_jobId, this, "bytes32Callback(bytes32,bytes32)");
    chainlinkRequest(run, LINK(1));
  }

  function bytes32Callback(bytes32 _requestId, bytes32 _data)
    public
    checkChainlinkFulfillment(_requestId)
  {
    bData = _data;
  }

  function requestInt256(bytes32 _jobId) public onlyOwner {
    ChainlinkLib.Run memory run = newRun(_jobId, this, "int256Callback(bytes32,int256)");
    chainlinkRequest(run, LINK(1));
  }

  function int256Callback(bytes32 _requestId, int256 _data)
    public
    checkChainlinkFulfillment(_requestId)
  {
    iData = _data;
  }

  function requestUint256(bytes32 _jobId) public onlyOwner {
    ChainlinkLib.Run memory run = newRun(_jobId, this, "uint256Callback(bytes32,uint256)");
    chainlinkRequest(run, LINK(1));
  }

  function uint256Callback(bytes32 _requestId, uint256 _data)
    public
    checkChainlinkFulfillment(_requestId)
  {
    uData = _data;
  }

}