import baseConsumer from "./baseConsumer";

function postVoter(ssn, password, callback) {
    const route = "voters/";
    const data = {
        ssn,
        password
    };
    baseConsumer.postJSON(route, data, (err, data) => {
        if (!err) {
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

function postVote(electionAddress, voterAddress, chosenCandidate, ssn, password, callback) {
    const route = "voters/vote";
    const data = {
        electionAddress,
        voterAddress,
        chosenCandidate,
        ssn,
        password
    };
    baseConsumer.postJSON(route, data, (err, data) => {
        if (!err) {
            callback(null, data);
        }
        else {
            callback(err);
        }
    });
}

export {
    postVoter,
    postVote
};