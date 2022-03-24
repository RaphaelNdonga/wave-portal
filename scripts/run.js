const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });
    await waveContract.deployed();

    console.log("Contract deployed successfully to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address)

    let waveContractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("The balance is: ", hre.ethers.utils.formatEther(waveContractBalance))

    let totalWaves = await waveContract.getTotalWaves();
    let waveTxn = await waveContract.wave("Hello from person A");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Hello from person B!");
    await waveTxn.wait();

    waveTxn = await waveContract.connect(randomPerson).wave("Hello from person B!");
    await waveTxn.wait();
    totalWaves = await waveContract.getTotalWaves();

    let allWaves = await waveContract.getAllWaves();
    console.log("All waves: ", allWaves)
    waveContractBalance = await hre.ethers.provider.getBalance(waveContract.address);

    console.log("The balance is: ", hre.ethers.utils.formatEther(waveContractBalance))
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