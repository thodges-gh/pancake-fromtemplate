"use strict";

require("./support/helpers.js");

let MyContract = artifacts.require("MyContract.sol");
let Oracle = artifacts.require("Oracle.sol");
let LinkToken = artifacts.require("LinkToken.sol");

contract("MyContract", () => {
  let linkContract, oracleContract, myContract;

  beforeEach(async function () {
    linkContract = await LinkToken.new();
    oracleContract = await Oracle.new(linkContract.address);
    myContract = await MyContract.new(
      linkContract.address, 
      oracleContract.address,
      {from: owner}
    );
    await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
  });

  it("passes", async function () {

  });
});