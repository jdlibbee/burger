var express = require('express');
var burger = require('../models/burger');
var router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var object = {
            burgers: data
        };
        res.render("index", object);
    });
});

router.post("/api/burgers", function (req, res) {
    console.log(req.body);
    burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {

        console.log(req.body.burger_name);

        res.json({ id: result.id });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`;
    console.log(req.params.id);

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        console.log(result);
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;