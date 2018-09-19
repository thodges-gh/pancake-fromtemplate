# Template for Chainlinked Contracts

This is a template that you can use to get started developing [Chainlinked](https://docs.chain.link/v1.0/docs/getting-started) contracts.

## Getting Started

Clone (or fork first) the repo:

```
git clone https://github.com/thodges-gh/cltemplate.git MyProject
```

Install dependencies (requires NPM to be installed already):

```
npm install
```

Make sure everything worked by compiling and test contracts:

```
npm test
```

## Included Examples

MyContract.sol has request and callback example methods for `bytes32`, `int256`, and `uint256` data types. A request method (like the one below) accepts a `_jobId` as an input parameter. If using a public network, you can use a pre-defined [Job Spec](https://docs.chain.link/v1.0/docs/getting-started#section-job-specs) to supply for a given data type. Also note the required parameters for each Job Spec from the documentation. Details on which parameters are accepted by each adapter are available [here](https://docs.chain.link/v1.0/docs/adapters).

```solidity
function requestBytes32(bytes32 _jobId) public onlyOwner {
  ChainlinkLib.Run memory run = newRun(_jobId, this, "bytes32Callback(bytes32,bytes32)");
  chainlinkRequest(run, LINK(1));
}
```

Each data type also has an associated callback method, as shown below. These methods will only accept answers from the oracle contract, and only for request IDs which the contract knows about (the Chainlinked contract maps request IDs). In this method body, you can trigger additional functionality for your contract based on the data it has received from off-chain.

```solidity
function bytes32Callback(bytes32 _requestId, bytes32 _data)
  public
  checkChainlinkFulfillment(_requestId)
{
  bData = _data;
}
```

## Contracts

- [Chainlinked](https://github.com/smartcontractkit/chainlink/blob/master/solidity/contracts/Chainlinked.sol)
- [OpenZeppelin Ownable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol)

## Tools

- [ESLint](https://github.com/eslint/eslint)
- [Ganache CLI](https://github.com/trufflesuite/ganache-cli)
- [Solium](https://github.com/duaraghav8/Solium)
- [Truffle](https://github.com/trufflesuite/truffle)
- [truffle-flattener](https://github.com/nomiclabs/truffle-flattener)
- [Web3](https://github.com/ethereum/web3.js/)

## Scripts

### Deploying

Deploy contracts to the "development" network:

```
npm run deploy:dev
```

### Linting

Linting is ran on JavaScript and Solidity code.

Show lint status:

```
npm run lint:all
```

Fix all:

```
npm run lint:all:fix
```

### Services

#### Ganache

Run Ganache on port 9045 for the "development" network:

```
npm run ganache
```

#### Truffle Console

Run Truffle Console on the "development" network:

```
npm run console
```

### Testing

```
npm test
```