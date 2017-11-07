//// If this is used then frontend will always look for api on same domain path as the react app.
// let baseUri;
//if (typeof window !== "undefined") {
//     // Dette kan være en sikkerhetsrisiko under produksjon
//     baseUri = window.location.protocol + '//' + window.location.host;
//}

const baseUri = "http://localhost:3000";
const BaseConsumer = {

    getJSON: function (route, id, callback) {
        const uri = baseUri + "/api/" + route + id;

        // // The following properties is only needed if the application use tokens.
        // const headers = new Headers()
        // headers.append("Content-Type", "application/json");
        // const token = localStorage.getItem("token");
        // headers.append("x-access-token", token);
        // console.log(localStorage.getItem("token"));

        const myInit = {
            method: "GET",
            // headers: headers,
            // mode: "cors",
            cache: "default"
        };
        const request = new Request(uri, myInit);
        fetch(request).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        }).then(function(data) {
            callback(null, data)
        }).catch(function(error) {
            console.log(error);
            callback(error);
        });
    },

    postJSON: function(route, data, callback) {
        const uri = baseUri + "/api/" + route;

        // // The following properties is only needed if the application use tokens.
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        // const token = localStorage.getItem("token");
        // headers.append("x-access-token", token);
        const myInit = {
            method: "POST",
            headers: headers,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(data),
        };
        // console.log(data);
        const request = new Request(uri, myInit);
        fetch(request).then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.status);
        }).then(function(data) {
            callback(null, data)
        }).catch(function(error) {
            callback(error)
        });
    },
};

export default BaseConsumer;