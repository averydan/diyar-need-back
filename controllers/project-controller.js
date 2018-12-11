let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Project = sequelize.import("../models/project");
router.post("/add", function (req, res) {
    console.log("!!!!!LOOK HERE AVERY!!!!!", req.user.id, "SPLIT", req.body)
    let _aid = req.user.id;
    console.log("~~~~~~~~~~~~~~~~~~I HaVe FaIlEd My MiSiOn~~~~~~~~~~~~~~~~~~~~~", _aid)
    let _index = req.body.project.index
    let _title = req.body.project.title
    let _budget = req.body.project.budget
    Project.create({
        aid: _aid,
        index: _index,
        title: _title,
        budget: _budget
    })
        .then(
            function ProjectPSuccess() {
                res.status(200).json({
                    message: "Posted Project"
                })
            },
            function ProjectPError(err) {
                res.json(500, err.message)
                console.log("!@!@!@!@!@!@!@!EVERYTHING HAS GONE WRONG!@!@!@!@!@!@!@!", err)
            }
        )
})
router.delete("/delete/:id", function (req, res) {
    let input = req.params.id;
    Project.findById(input)
        .then(
            function (item) {
                if (item !== undefined) {
                    Project.destroy({ where: { id: input } })
                        .then(
                            function projectDSuccess() {
                                res.status(200).send("Deleted Project")
                            },
                            function projectDError(err) {
                                res.send(500, err.message)
                            }
                        )
                } else {
                    res.send(500, "Project does not exist.")
                }
            })
})

router.get("/get/", function (req, res) {
    Project.findAll()
        .then(
            function projectFSuccess(data) {
                res.status(200).json(data)
            },
            function projectFError(err) {
                res.send(500, err.message)
            }
        )
})
router.put("/update/:id", function (req, res) {
    let input = req.params.id
    let index = req.body.project.index;
    let title = req.body.project.title
    let budget = req.body.project.budget
    Project.update({
        index: index,
        title: title,
        budget: budget
    }, { where: { id: input } } )
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