
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