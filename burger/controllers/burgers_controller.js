var express = require('express');
var burger = require('../models/burger');
var router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var object = {
            burgers: data
        };
        console.log(object);
        res.render("index", object);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.insertOne(["burger_name"], [req.body.name], function (result) {
        res.json({ id: result.id });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id = ${req.params.id}`;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;