const express = require("express");
const router = express.Router();
// const VoterDeployer = require("../contractDeployment/voterDeployer");
const { deployVoterContract, vote } = require("../models/voter");

/**
 * Route for creating new Voter contracts.
 */
router.post("/", (req, res) => {
    // console.log(req.body);
    if (!req.body.ssn || !req.body.password) {
        res.status(400).send({
            success: false,
            message: "request body is missing attribute: snn or password"
        });
        return;
    }

    deployVoterContract(req.body.ssn, req.body.password, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        }
        res.status(201).send({
            success: true,
            message: result
        });
    });
});

/**
 * Route for casting a vote.
 */
router.post("/vote", (req, res) => {
    // console.log(req.body);
    if (!req.body.electionAddress || !req.body.chosenCandidate || !req.body.ssn || !req.body.password) {
        res.status(400).send({
            success: false,
            message: "request body is missing one or multiple of the following: electionAddress, chosenCandidate, snn or password"
        });
        return;
    }

    vote(req.body.electionAddress, req.body.chosenCandidate, req.body.ssn, req.body.password, (err, result) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        }
        res.status(201).send({
            success: true,
            message: result
        });
    });
});
module.exports = router;