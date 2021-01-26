module.exports = app => {
    const express = require('express')
    const Student = require('../../models/studentData')
    const Help = require('../../models/application-help')
    const Reward = require('../../models/application-reward')
    const router = express.Router()


    router.post('/loginStu', async (req, res) => {
        await Student.find({
            userId: req.body.username,
            psw: req.body.psw
        }, (err, doc) => {
            if (err) {
                res.send(err)
            } else {
                if (doc.length === 0) {
                    res.send({
                        success: false,
                        data: '账号密码有误'
                    })
                } else {
                    Student.aggregate([{
                        $lookup: {
                            from: "rewards",
                            localField: "userId",
                            foreignField: "userId",
                            as: "reward"
                        }
                    }, {
                        $lookup: {
                            from: "helps",
                            localField: "userId",
                            foreignField: "userId",
                            as: "help"
                        }
                    }, {
                        $lookup: {
                            from: "students",
                            localField: "userId",
                            foreignField: "userId",
                            as: "student"
                        }
                    }, {
                        $match: {
                            userId: req.body.username,
                        }
                    }], function (err, doc) {
                        if (err) {
                            res.send({
                                success: false,
                                data: err
                            })
                        } else {
                            res.send({
                                success: true,
                                data: doc
                            })
                        }
                    })

                }


            }
        })
    })

    router.post('/help', async (req, res) =>{
        await Help.find({userId:req.body.userId},(err,doc)=>{
            if(err){
                res.send({
                    success:false,
                    data:err
                })
            } else {
                if(doc.length == 0){
                    Help.create(req.body,(err,doc)=>{
                        if(err){
                            res.send({
                                success:false,
                                data:err
                            })
                        }else{
                            res.send({
                                success:true,
                                data:doc
                            })
                        }
                    })
                }else{
                    res.send({
                        success:false,
                    data:"已申请过，请勿重复申请"
                    })
                }
            }
        })
    })

    router.post('/reward', async (req, res) =>{
        await Reward.find({userId:req.body.userId},(err,doc)=>{
            if(err){
                res.send({
                    success:false,
                    data:err
                })
            } else {
                if(doc.length == 0){
                    Reward.create(req.body,(err,doc)=>{
                        if(err){
                            res.send({
                                success:false,
                                data:err
                            })
                        }else{
                            res.send({
                                success:true,
                                data:doc
                            })
                        }
                    })
                }else{
                    res.send({
                        success:false,
                    data:"已申请过，请勿重复申请"
                    })
                }
            }
        })
    })

    router.post("/changePsw",async (req,res)=>{
        let psw = req.body.newpsw
        let data={
            psw
        }
        Student.updateOne({userId:req.body.userId},data,(err,doc)=>{
            if(err){
                res.send({
                    success:false,
                    message:"数据库更新出错",
                    data:err
                })
            }else{
                res.send({
                    success:true,
                    message:"更新成功",
                    data:doc
                })
            }
        })
    })

    app.use("/student/api", router)
}