pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

/**
 * The Voter contract is a way to validate that the voter is indeed eligible for
 * voting.
 *
 */
contract Voter {
    // These are used to validate a Voter
    struct Identifiers {
    address creator;
    bytes32 identifyingHash;
    }

    uint creationTime;
    uint expireTime;
    Identifiers identifiers;

    /**
     * The parameters are used for creating the voters identifying hash.
     * ssn (sosial security number)
     */
    function Voter(uint ssn, bytes32 password) {
        bytes32 identifyingHash = createIdentifyingHash(ssn, password);
        identifiers.creator = msg.sender;
        identifiers.identifyingHash = identifyingHash;
        creationTime = now;
        // How often should a voter contract need to be renewed?
        expireTime = creationTime + 360 days;
    }

    modifier hasValidCredentials(uint ssn, bytes32 password) {
        bytes32 identifyingHash = createIdentifyingHash(ssn, password);
        if (identifyingHash == identifiers.identifyingHash) {
            revert();
        }
        // This basically means continue
        _;
    }
    function vote(bytes32 candidate, address ballotContract, uint ssn, bytes32 password)
    hasValidCredentials(ssn, password) {
        Ballot ballot = Ballot(ballotContract);
        ballot.voteForCandidate(candidate);
    }

    function getIdentifiers() constant returns (address, bytes32) {
        return (identifiers.creator, identifiers.identifyingHash);
    }

    function createIdentifyingHash(uint ssn, bytes32 password) constant private returns (bytes32) {
        return keccak256(ssn, password);
    }
}