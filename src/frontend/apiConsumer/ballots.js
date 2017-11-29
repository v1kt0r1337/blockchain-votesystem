/**
 * Created by archheretic on 28.11.17.
 */
import baseConsumer from "./baseConsumer";

function postBallot(ballotName, candidateList, daysUntilExpire, callback) {
    const route = "ballots/";
    const data = {
        ballotName,
        candidateList,
        daysUntilExpire
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

export {postBallot};