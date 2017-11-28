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
    // console.log(req.body);
    if (!req.body.ssn || !req.body.password) {
        res.status(400).send({
            success: false,
            message: "request body is missing attribute: snn or password"
        });
        return;
    }

    deployBallotContract(req.body.candidateNames, req.body.daysUntilExpire, (err, result) => {
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