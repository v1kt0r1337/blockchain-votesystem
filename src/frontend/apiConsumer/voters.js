import baseConsumer from "./baseConsumer";

const Voter = {

    postVoter: function(ssn, password, callback) {
        const route = "voters/";
        const data = {
            ssn: ssn,
            password: password
        };
        baseConsumer.postJSON(route, data, (err, data) => {
            if (!err) {
                callback(null, data);
            }
            else {
                callback(err);
            }
        });
    },

    // getAllItems: function (callback) {
    //     baseConsumer.getJSON("items/", "", (err, result) => {
    //         if (!err) {
    //             callback(null, result);
    //         }
    //         else {
    //             callback(err);
    //         }
    //     });
    // },
    //
    // getItem: function (id, callback) {
    //     baseConsumer.getJSON("items/", id, (err, result) => {
    //         if (!err) {
    //             callback(null, result);
    //         }
    //         else {
    //             callback(err);
    //         }
    //     });
    // },


};

export default Voter;