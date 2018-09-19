var MyContract = artifacts.require("./MyContract.sol");
var Oracle = artifacts.require("./Oracle.sol");
var LinkToken = artifacts.require("./LinkToken.sol");

module.exports = function(deployer) {
  deployer.deploy(MyContract, LinkToken.address, Oracle.address, {from: web3.eth.accounts[0]});
};