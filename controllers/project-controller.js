let express = require("express");
let router = express.Router();
let sequelize = require("../db");
let Post = sequelize.import("../models/project");
router.post("/new", function (req, res) {
    let authid = req.body.post.authid;
    let author = req.body.post.author
    let body = req.body.post.body
    Post.create({
        authid: authid,
        author: author,
        body: body
    })
        .then(
            function PostPSuccess() {
                res.status(200).json({
                    message: "Posted Post"
                })
            },
            function PostPError(err) {
                res.json(500, err.message)
            }
        )
})
router.delete("/delete/:id", function (req, res) {
    let input = req.params.id;
    Post.findById(input)
        .then(
            function (item) {
                if (item !== undefined) {
                    Post.destroy({ where: { id: input } })
                        .then(
                            function postDSuccess() {
                                res.status(200).send("Deleted Post")
                            },
                            function postDError(err) {
                                res.send(500, err.message)
                            }
                        )
                } else {
                    res.send(500, "Post does not exist.")
                }
            })
})

router.get("/get", function (req, res) {
    Post.findAll()
        .then(
            function postFSuccess(data) {
                res.status(200).json(data)
            },
            function postFError(err) {
                res.send(500, err.message)
            }
        )
})
router.put("/update/:id", function (req, res) {
    let input = req.params.id
    let authid = req.body.post.authid;
    let author = req.body.post.author
    let body = req.body.post.body
    Post.update({
        authid: authid,
        author: author,
        body: body
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