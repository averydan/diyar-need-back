let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Supply = sequelize.import("../models/supplies");
router.post("/new", function (req, res) {
    let pid = req.body.supplies.pid;
    let brand = req.body.supplies.brand;
    let item = req.body.supplies.item;
    let amount = req.body.supplies.amount;
    let last = req.body.supplies.last;
    let error = false;
    for (i in brand) {
        Supply.create({
            pid: pid,
            brand: brand[i],
            item: item[i],
            amount: amount[i]
        })
        .then(
            function duliePSuccess() {
                console.log("Great!")
            },
            function duliePError(err) {
                res.json(500, err.message)
                error = true;
            }
        )
    }
setTimeout(function(){
    if(!error){
        res.status(200).json({
            message: "Posted Supplies"
        })
    }
}, 2000);
})

router.delete("/delete/:id", function (req, res) {
    let input = req.params.id;
    Supply.findById(input)
        .then(
            function (item) {
                if (item !== undefined) {
                    Supply.destroy({ where: { id: input } })
                        .then(
                            function supplyDSuccess() {
                                res.status(200).send("Deleted Supply")
                            },
                            function supplyDError(err) {
                                res.send(500, err.message)
                            }
                        )
                } else {
                    res.send(500, "Supply does not exist.")
                }
            })
})

router.get("/get/:pid", function (req, res) {
    Supply.findAll({ where: { pid: req.params.pid } })
        .then(
            function supplyFSuccess(data) {
                res.status(200).json(data)
            },
            function supplyFError(err) {
                res.send(500, err.message)
            }
        )
})
router.put("/update/:id", function (req, res) {
    let input = req.params.id
    let brand = req.body.supplies.brand;
    let item = req.body.supplies.item
    let amount = req.body.supplies.amount
    Supply.update({
        brand: brand,
        item: item,
        amount: amount
    }, { where: { id: input } })
        .then(
            function createUpdateSuccess(updatedData) {
                res.status(200).json(updatedData)
            },
            function createUpdateError(err) {
                res.send(500, err.message)
            }
        )
})
module.exports = router;