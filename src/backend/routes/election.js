/**
 * Created by archheretic on 28.11.17.
 */
const express = require("express");
const router = express.Router();
const { deployElectionContract, getElectionCandidates, getElectionResults } = require("../models/election");

/**
 * Route for creating new Voter contracts.
 */
router.post("/", (req, res) => {
    if (!req.body.electionName || !req.body.candidateList || !req.body.daysUntilExpire
        || !req.body.startBlockNumber) {
        res.status(400).send({
            success: false,
            message: "request body is missing one or multiple of the follow attributes: electionName, candidateList, " +
            "daysUntilExpire, firstBlock or lastBlock"
        });
        return;
    }

    deployElectionContract(req.body.electionName, req.body.candidateList, req.body.daysUntilExpire,
        req.body.startBlockNumber, req.body.endBlockNumber, (err, result) => {
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

router.get("/results/:contractAddress", (req, res) => {
    if (!req.params.contractAddress) {
        res.status(400).send({
            success: false,
            message: "missing parameter"
        });
        return;
    }

    getElectionResults(req.params.contractAddress, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                success: false,
                message: err
            });
        }
        else {
            console.log(result);
            res.json({electionResult: result});
        }
    });
});

module.exports = router;