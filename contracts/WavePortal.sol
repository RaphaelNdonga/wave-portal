// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 private totalWaves;
    WaverData[] private wavers;
    uint256 seed;
    mapping(address => uint256) lastWavedAt;

    struct WaverData {
        address waverAddress;
        string message;
        uint256 timeStamp;
    }

    event NewWave(address indexed from, string message, uint256 timeStamp);

    constructor() payable {
        console.log("Yo yo I am a contract and I am very smart");
        seed = (block.difficulty + block.timestamp) % 100;
        console.log("The random number is %d", seed);
    }

    function wave(string memory _message) public {
        addWaver(msg.sender, _message);
        console.log("%s has waved!", msg.sender);
        uint256 prizeAmount = 0.0001 ether;

        seed = (block.difficulty + block.timestamp) % 100;
        console.log("The random number is %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            require(
                prizeAmount < address(this).balance,
                "Contract has insufficient funds"
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from the contract");
        }
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("There are %d waves", totalWaves);
        return totalWaves;
    }

    function addWaver(address waver, string memory _message) private {
        wavers.push(WaverData(waver, _message, block.timestamp));
        lastWavedAt[msg.sender] = block.timestamp;
        ++totalWaves;
        emit NewWave(waver, _message, block.timestamp);
    }

    function getAllWaves() public view returns (WaverData[] memory) {
        return wavers;
    }

    function getWavers() public view {
        for (uint256 i = 0; i < wavers.length; i++) {
            console.log("%s is a waver with waves", wavers[i].waverAddress);
        }
    }
}
