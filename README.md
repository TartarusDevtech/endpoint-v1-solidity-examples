
---

# LayerZero V1 Solidity Examples

Welcome to the solidity-examples repository, showcasing various contract examples utilizing LayerZero. LayerZero is an Omnichain Interoperability Protocol, facilitating reliable, trustless communication between different blockchain networks.

**Disclaimer**: This repository contains example contracts to demonstrate the capabilities and usage of LayerZero. For actual implementation in your projects, it's recommended to use the official LayerZero contracts (such as LZApp, OFT, OFTV1.2, etc.) directly from the npm package.

You can find instructions for inheriting, deploying, and best practices for the provided contracts in the documentation.

---

## Features

The code in the [contracts](./contracts) folder demonstrates LayerZero contract behaviours:

- **[NonblockingLzApp](./contracts/lzApp/NonblockingLzApp.sol)**: Provides a generic message passing interface to send and receive arbitrary pieces of data between contracts on different blockchain networks. Check out `OmniCounter` for an example of omnichain messaging.
- **[OFTV1](./contracts/token/oft/v1/OFT.sol)**: Standard allows ERC20 tokens to be transferred across multiple EVM-compatible blockchains without asset wrapping or middlechains.
- **[OFTV1.2](./contracts/token/oft/v2/OFTV2.sol)**: Allows fungible tokens to be transferred across both EVM and non-EVM compatible blockchains supported by LayerZero.
- **[ONFT721](./contracts/token/onft721/ONFT721.sol)**: Standard allows ERC721 NFTs to be moved across EVM chains.
- **[ONFT1155](./contracts/token/onft1155/ONFT1155.sol)**: Standard allows ERC1155 tokens to be sent to EVM chains.

**Notice**: Each token standard comes with a `Proxy` variant for sending tokens that have already been deployed cross-chain.  
> **There can only be one `Proxy` per deployment**. Multiple Proxies break omnichain unified liquidity by creating token pools, which can result in lost tokens if supply mismatches occur across chains.

---

## Install & Run Tests

```shell
yarn install
yarn test
```

* Always audit your own code and test extensively on `testnet` before going to mainnet 🙏

> The examples below use two chains, but you could substitute any LayerZero supported chain!

---

## Example: OmniCounter

OmniCounter is a simple example of a `NonblockingLzApp` contract that increments a counter on multiple chains. You can only *remotely* increment the counter!

1. Deploy both OmniCounters:

    ```shell
    npx hardhat --network bsc-testnet deploy --tags OmniCounter
    npx hardhat --network fuji deploy --tags OmniCounter
    ```

2. Set the remote addresses, so each contract can receive messages:

    ```shell
    npx hardhat --network bsc-testnet setTrustedRemote --target-network fuji --contract OmniCounter
    npx hardhat --network fuji setTrustedRemote --target-network bsc-testnet --contract OmniCounter
    ```

3. Send a cross chain message from `bsc-testnet` to `fuji`!

    ```shell
    npx hardhat --network bsc-testnet incrementCounter --target-network fuji
    ```

4. Optionally, watch the counter increment in real-time:

    ```shell
    npx hardhat --network fuji ocPoll
    ```

---

## Check Your `setTrustedRemote` Config

Just use the [checkWireUpAll](./tasks/checkWireUpAll.js) task to check if your contracts are wired up correctly. You can use it on the example contracts deployed above.

Examples:

- **UniversalONFT**

    ```shell
    npx hardhat checkWireUpAll --e testnet --contract ONFT721Mock
    ```

- **OmniCounter**

    ```shell
    npx hardhat checkWireUpAll --e testnet --contract OmniCounter
    ```

Many of the example contracts use `LayerZeroEndpointMock.sol`, which lets you test LayerZero locally!

For further reading, and a list of endpoint ids and deployed LayerZero contract addresses, see the documentation:  
https://docs.layerzero.network/v1/developers/evm/build/what-you-can-build

---

## Chain IDs & Addresses

See testnet and mainnet chainIds and addresses, and the format for connecting contracts on different chains

## Node Version

Most recently tested with node version `18.16.0` 

---

## About

This repository provides **legacy example contracts for LayerZero Endpoint V1** using Solidity. It demonstrates how to set up omnichain messaging, transfer fungible and non-fungible tokens cross-chain, and wire up trustless communication between EVM and non-EVM blockchains. These examples are for educational purposes and reference only—**use the official LayerZero packages for production**.

---

## License

MIT
