//imports
const { verify } = require("crypto")
const { ethers, network, run } = require("hardhat")

//async main fun
async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying...")
    const simpleStorage = await simpleStorageFactory.deploy()
     await simpleStorage.waitForDeployment() // ---> important because this ensures that our contract is full deployed and only after this can we verify it and interact with ti
    //  console.log(simpleStorage);
    console.log(simpleStorage.runner.address)
    // console.log(network.config)
    if(network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY){
        // await simpleStorage.deployTransaction.wait(3)
        await verifyCon(simpleStorage.runner.address, [])
    }

    const currFavNum = await simpleStorage.retrieve();
    console.log(currFavNum.toString());

    const txRes = await simpleStorage.store("53");
    await txRes.wait(1);
    
    const updatedFavNum = await simpleStorage.retrieve();
    console.log(updatedFavNum.toString());

    // if()
}

async function verifyCon(contractAddress, args) {
    console.log("contract verifying")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if(e.message.toLowerCase().includes("already verfied")){
            console.log("contract already verified");
        }
        else{
            console.error(e);
        }
    }
    console.log("contract verified")
}

//call main
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
