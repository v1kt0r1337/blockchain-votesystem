pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Election {

    /* mapping field below is equivalent to an associative array or hash table.
    The key of the mapping is candidate name stored as type bytes32 and value is
    an unsigned integer to store the vote count
    */
    mapping (bytes32 => uint8) public votesReceived;

    /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
    We will use an array of bytes32 instead to store the list of candidates
    */
    bytes32[] public candidateList;

    address owner;
    bytes32 electionName;
    uint creationTime;
    uint expireTime;

    // Eligible voters
    Voter[] validVoters;
    // Voters that has voted.
    Voter[] voters;

    /* This is the constructor which will be called once when you
    deploy the contract to the blockchain. When we deploy the contract,
    we will pass an array of candidates who will be contesting in the election
    */
    function Election(bytes32 name, bytes32[] candidates, uint daysUntilExpire, Voter[] eligibleVoters) public {
        electionName = name;
        candidateList = candidates;
        owner = msg.sender;
        creationTime = now;
        expireTime = creationTime + (daysUntilExpire * 1 days);
        validVoters = eligibleVoters;
    }

    /**
     * If voting has expired then the vote will not be cast
     */
    modifier hasVotingExpired() {
        if (now >= expireTime) {
            revert();
        }
        // This basically means continue
        _;
    }

    /**
     * Checks if the voter has already voted-
     */
    modifier hasVoted() {
        Voter voter = Voter(msg.sender);
        var (votersCreator, votersHash)= voter.getIdentifiers();
        for(uint i = 0; i < voters.length; i++) {
            var (validCreator, validHash) = voters[i].getIdentifiers();
            if (validHash == votersHash) {
                revert();
            }
        }
        // This basically means continue
        _;
    }

    // This function returns the total votes a candidate has received so far
    function totalVotesFor(bytes32 candidate) view public returns (uint8) {
        if (!validCandidate(candidate)) revert();
        return votesReceived[candidate];
    }

    // This function increments the vote count for the specified candidate. This
    // is equivalent to casting a vote
    function voteForCandidate(bytes32 candidate) public hasVotingExpired hasVoted  {
        if (!validVoter()) revert();
        if (!validCandidate(candidate)) revert();
        votesReceived[candidate] += 1;
        Voter voter = Voter(msg.sender);
        voters.push(voter);
    }

    function validCandidate(bytes32 candidate) public view returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

    // Cant be a modifier, due call stack gets too deep.
    function validVoter() internal view returns (bool) {
        Voter voter = Voter(msg.sender);
        for(uint i = 0; i < validVoters.length; i++) {
            var (validCreator, validHash) = validVoters[i].getIdentifiers();
            var (votersCreator, votersHash)= voter.getIdentifiers();
            if (validHash == votersHash && validCreator == votersCreator) {
                return true;
            }
        }
        return false;
    }

    function getCandidateList() public view returns (bytes32[]) {
        return candidateList;
    }
}

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

    string salt;
    uint creationTime;
    uint expireTime;
    Identifiers identifiers;

    /**
     * The parameters are used for creating the voters identifying hash.
     * ssn (sosial security number)
     */
    function Voter(string voterHash, string _salt) public {
        salt = _salt;
        bytes32 identifyingHash = createIdentifyingHash(voterHash);
        identifiers.creator = msg.sender;
        identifiers.identifyingHash = identifyingHash;
        creationTime = now;
        // How often should a voter contract need to be renewed?
        expireTime = creationTime + 360 days;
    }

    modifier hasValidCredentials(string voterHash) {
        bytes32 identifyingHash = createIdentifyingHash(voterHash);
        if (identifyingHash != identifiers.identifyingHash) {
            revert();
        }
        _;
    }

    function vote(bytes32 candidate, address electionContract, string voterHash) public isCreator hasValidCredentials(voterHash) {
        Election election = Election(electionContract);
        election.voteForCandidate(candidate);
    }

    function getIdentifiers() view public returns (address, bytes32) {
        return (identifiers.creator, identifiers.identifyingHash);
    }

    function createIdentifyingHash(string voterHash) pure private returns (bytes32) {
        return keccak256(voterHash);
    }

    modifier isCreator() {
        if (identifiers.creator != msg.sender)  {
            revert();
        }
        _;
    }

    function getSalt() view public isCreator returns (string) {
        return salt;
    }
}
