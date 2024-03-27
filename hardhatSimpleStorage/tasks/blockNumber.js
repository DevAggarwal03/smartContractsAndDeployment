const { ethers } = require("hardhat")
// require("@nomicfoundation/hardhat-toolbox");

task("block-number", "return block number").setAction(
    async (taskArg, hre) => {
        const blockNum = await ethers.provider.getBlockNumber();
        console.log(`Block Number: ${blockNum}`);
    }
)

module.exports = {
    // solidity: "0.8.24",
};