// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.24;
import "../shared/Structs.sol";

contract CiphertextCommitsMock {
    event AddCiphertextMaterial(
        bytes32 indexed ctHandle,
        bytes32 ciphertextDigest,
        bytes32 snsCiphertextDigest,
        address[] coprocessorTxSenders
    );

    function addCiphertextMaterial(
        bytes32 ctHandle,
        uint256,
        bytes32 ciphertextDigest,
        bytes32 snsCiphertextDigest
    ) external {
        emit AddCiphertextMaterial(ctHandle, ciphertextDigest, snsCiphertextDigest, new address[](1));
    }
}
