/**
 * Created by archheretic on 28.11.17.
 */
const express = require("express");
const router = express.Router();
const { deployBallotContract } = require("../models/ballot");

/**
 * Route for creating new Voter contracts.
 */
router.post("/", (req, res) => {
    console.log(req.body);
    if (!req.body.ballotName || !req.body.candidateList || !req.body.daysUntilExpire) {
        res.status(400).send({
            success: false,
            message: "request body is missing attribute: ballotName, candidateList or daysUntilExpire"
        });
        return;
    }

    deployBallotContract(req.body.ballotName, req.body.candidateList, req.body.daysUntilExpire, (err, result) => {
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