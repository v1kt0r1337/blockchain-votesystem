/**
 * Created by archheretic on 28.11.17.
 */
const express = require("express");
const router = express.Router();
const { deployElectionContract, getElectionCandidates } = require("../models/election");

/**
 * Route for creating new Voter contracts.
 */
router.post("/", (req, res) => {
    if (!req.body.electionName || !req.body.candidateList || !req.body.daysUntilExpire) {
        res.status(400).send({
            success: false,
            message: "request body is missing attribute: electionName, candidateList or daysUntilExpire"
        });
        return;
    }

    deployElectionContract(req.body.electionName, req.body.candidateList, req.body.daysUntilExpire, (err, result) => {
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

router.get("/electionCandidates/:contractAddress", (req, res) => {
    if (!req.params.contractAddress) {
        res.status(400).send({
            success: false,
            message: "missing parameter"
        });
        return;
    }

    getElectionCandidates(req.params.contractAddress, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: err
            });
        }
        else {
            res.json({candidates: result});
        }
    });
});
module.exports = router;