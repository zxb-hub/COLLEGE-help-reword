module.exports = app => {
    const express = require('express')
    const College = require("../../models/collegeData")
    const Class = require("../../models/classData")
    const Major = require("../../models/majorData")
    const Student = require("../../models/studentData")
    
    const router = express.Router()

    router.route('/college')
        .get(async (req, res) => {
            await College.aggregate([{
                $lookup: {
                    from: 'Major',
                    localField: "college",
                    foreignField: "college",
                    as: "major"
                }
            }], function (err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    res.send({
                        success: 1,
                        data: docs
                    })
                }

            })

        })



    router.get('/major', async (req, res) => {
        await Major.aggregate([{
            $match: {
                college: req.query.college
            }
        }], function (err, docs) {
            if (err) {
                console.log(err)
            } else {
                res.send({
                    success: 1,
                    data: docs
                })
            }

        })

    })

    router.route('/class')
        .get(async (req, res) => {
            await Class.find({
                college: req.query.college,
                major: req.query.major
            }, (err, doc) => {
                res.send({
                    success: 1,
                    data: doc
                })
            })

        })
        .post(async (req, res) => {
            console.log(req.body)
            await Class.create({
                college: req.body.college,
                class_id: req.body.class_id,
                major: req.body.major,
                class: req.body.class,
            }, (err, doc) => {
                if (err) {
                    res.send({
                        success: 0,
                        message: "添加失败",
                        err: err
                    })
                } else {
                    res.send({
                        success: 1,
                        message: "添加成功",
                        doc: doc
                    })
                }
            })
        })
    

    

    app.use("/common/api", router)
}