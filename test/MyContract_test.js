"use strict";

require("./support/helpers.js");

let MyContract = artifacts.require("MyContract.sol");
let Oracle = artifacts.require("Oracle.sol");
let LinkToken = artifacts.require("LinkToken.sol");

contract("MyContract", () => {
  let linkContract, oracleContract, myContract;
  const jobId = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  beforeEach(async function () {
    linkContract = await LinkToken.new();
    oracleContract = await Oracle.new(linkContract.address, {from: node});
    myContract = await MyContract.new(
      linkContract.address, 
      oracleContract.address,
      {from: owner}
    );
  });

  describe("requestBytes32", () => {
    context("Without LINK", () => {
      it("Reverts", async function () {
        await assertActionThrows(async () => {
          await myContract.requestBytes32(jobId);
        });
      });
    });
    context("With LINK", () => {
      beforeEach(async () => {
        await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      });

      it("Creates a log on the oracle contract", async function () {
        let tx = await myContract.requestBytes32(jobId);
        let log = tx.receipt.logs[2];
        assert.equal(log.address, oracleContract.address);
      });
    });
  });

  describe("bytes32Callback", () => {
    let response = "Chainlink";
    let internalId;

    beforeEach(async () => {
      await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      await myContract.requestBytes32(jobId, {from: owner});
      let event = await getLatestEvent(oracleContract);
      internalId = event.args.internalId;
    });

    it("Only accepts answers from the oracle contract", async function () {
      await assertActionThrows(async () => {
        await myContract.bytes32Callback(internalId, response, {from: stranger});
      });
    });

    it("Only accepts valid request IDs", async function () {
      let funcSig = functionSelector("bytes32Callback(bytes32,bytes32)");
      let args = requestDataBytes(toHex("aaa"), myContract.address, funcSig, 42, "");
      await requestDataFrom(oracleContract, linkContract, 0, args);
      let event = await getLatestEvent(oracleContract);
      let otherId = event.args.internalId;
      await oracleContract.fulfillData(otherId, response, {from: node});
      const data = await myContract.bData();
      assert.equal(data, emptyBytes32);
    });

    it("Stores the given result", async function () {
      await oracleContract.fulfillData(internalId, response, {from: node});
      const data = await myContract.bData();
      assert.equal(web3.toUtf8(data), response);
    });
  });

  describe("requestInt256", () => {
    context("Without LINK", () => {
      it("Reverts", async function () {
        await assertActionThrows(async () => {
          await myContract.requestInt256(jobId);
        });
      });
    });
    context("With LINK", () => {
      beforeEach(async () => {
        await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      });

      it("Creates a log on the oracle contract", async function () {
        let tx = await myContract.requestInt256(jobId);
        let log = tx.receipt.logs[2];
        assert.equal(log.address, oracleContract.address);
      });
    });
  });

  describe("int256Callback", () => {
    let originalValue = -12345;
    let response = "0x" + encodeInt256(originalValue);
    let internalId;

    beforeEach(async () => {
      await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      await myContract.requestInt256(jobId, {from: owner});
      let event = await getLatestEvent(oracleContract);
      internalId = event.args.internalId;
    });

    it("Only accepts answers from the oracle contract", async function () {
      await assertActionThrows(async () => {
        await myContract.int256Callback(internalId, response, {from: stranger});
      });
    });

    it("Only accepts valid request IDs", async function () {
      let funcSig = functionSelector("int256Callback(bytes32,int256)");
      let args = requestDataBytes(toHex("bbb"), myContract.address, funcSig, 43, "");
      await requestDataFrom(oracleContract, linkContract, 0, args);
      let event = await getLatestEvent(oracleContract);
      let otherId = event.args.internalId;
      await oracleContract.fulfillData(otherId, response, {from: node});
      const data = await myContract.iData();
      assert.equal(data, 0);
    });

    it("Stores the given result", async function () {
      await oracleContract.fulfillData(internalId, response, {from: node});
      const data = await myContract.iData();
      assert.equal(data.toString(), originalValue);
    });
  });

  describe("requestUint256", () => {
    context("Without LINK", () => {
      it("Reverts", async function () {
        await assertActionThrows(async () => {
          await myContract.requestUint256(jobId);
        });
      });
    });
    context("With LINK", () => {
      beforeEach(async () => {
        await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      });

      it("Creates a log on the oracle contract", async function () {
        let tx = await myContract.requestUint256(jobId);
        let log = tx.receipt.logs[2];
        assert.equal(log.address, oracleContract.address);
      });
    });
  });

  describe("uint256Callback", () => {
    let originalValue = 12345;
    let response = "0x" + encodeUint256(originalValue);
    let internalId;

    beforeEach(async () => {
      await linkContract.transfer(myContract.address, web3.toWei("1", "ether"));
      await myContract.requestUint256(jobId, {from: owner});
      let event = await getLatestEvent(oracleContract);
      internalId = event.args.internalId;
    });

    it("Only accepts answers from the oracle contract", async function () {
      await assertActionThrows(async () => {
        await myContract.uint256Callback(internalId, response, {from: stranger});
      });
    });

    it("Only accepts valid request IDs", async function () {
      let funcSig = functionSelector("uint256Callback(bytes32,uint256)");
      let args = requestDataBytes(toHex("ccc"), myContract.address, funcSig, 44, "");
      await requestDataFrom(oracleContract, linkContract, 0, args);
      let event = await getLatestEvent(oracleContract);
      let otherId = event.args.internalId;
      await oracleContract.fulfillData(otherId, response, {from: node});
      const data = await myContract.uData();
      assert.equal(data, 0);
    });

    it("Stores the given result", async function () {
      await oracleContract.fulfillData(internalId, response, {from: node});
      const data = await myContract.uData();
      assert.equal(data.toString(), originalValue);
    });
  });
});