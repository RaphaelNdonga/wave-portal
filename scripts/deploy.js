const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001")
    });
    await waveContract.deployed();

    console.log("Contract deployed successfully to: ", waveContract.address);
    console.log("Contract deployed by: ", deployer.address)
    console.log("The balance of the deployer is ", accountBalance.toString())
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log("Error: ", error);
        process.exit(1);
    }
};

runMain();