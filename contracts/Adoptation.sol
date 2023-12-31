// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Adoption {
    //This is an array of Ethereum addresses

    address[32] public adopters;

    //1. Adopting a pet
    function adopt(uint256 petId) public returns (uint256) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;
        return petId;
    }

    //2. Retrieving the adopters
    //   memory gives the data location for the variable.
    function getAdopters() public view returns (address[32] memory) {
        return adopters;
    }
}