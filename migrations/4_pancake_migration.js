var Pancake = artifacts.require("./Pancake.sol");
var Oracle = artifacts.require("./Oracle.sol");
var LinkToken = artifacts.require("./LinkToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Pancake, LinkToken.address, Oracle.address, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", web3.eth.accounts[0], {from: web3.eth.accounts[0]});
};