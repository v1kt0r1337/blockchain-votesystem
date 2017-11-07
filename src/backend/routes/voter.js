const express = require("express");
const router = express.Router();
const VoterDeployer = require("../contractDeployment/voterDeployer");

/**
 * Route for creating new Voter contracts.
 */
router.post("/", function(req, res) {
    // console.log(req.body);
    if (!req.body.ssn || !req.body.password) {
        res.status(400).send({
            success: false,
            message: "request body is missing attribute: snn or password"
        });
        return;
    }

    VoterDeployer.deployVoterContract(req.body.ssn, req.body.password, (err, result) => {
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