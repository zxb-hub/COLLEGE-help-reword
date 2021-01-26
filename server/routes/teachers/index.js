module.exports = app =>{
    const express = require('express')
    const Teacher = require("../../models/teacher")
    const Help = require("../../models/application-help")
    const Reward = require("../../models/application-reward")
    const router = express.Router()

    router.post('/loginTea', async (req, res) => {
        await Teacher.find({
            userId: req.body.userId,
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
                    res.send({
                        success:true,
                        doc:doc
                    })
                }
            }
        })
    })

    router.route("/helpStu")
    .get(async (req,res) => {
        let state = null,
        teaLevel = null,
        level = null
        if(req.query.level == 3){
            state = "stateClass"
            teaLevel = "major_id"
            level = req.query.major_id
        }else if(req.query.level == 2){
            state = "stateMajor"
            teaLevel = "college_id"
            level = req.query.college_id
        }else{
            state = "stateCollege"
            teaLevel = ""
            level = ""
        }
        await Help.aggregate([{
            $lookup:{
                from: 'students',
                localField: "userId",
                foreignField: "userId",
                as: "student"
            }
        },{
             $match:{
                [teaLevel]:level,
                [state]:"padding"
             }
        }],function (err,doc) {
            if(err) {
                res.send({
                    success:false,
                    data:doc
                })
            }else{
                res.send({
                    success:true,
                    data:doc
                })
            }
        })
    })
    .post(async (req,res) => {
        let stateClass = req.body.stateClass,
        stateMajor = req.body.stateMajor,
        stateCollege = req.body.stateCollege
        let data = {
            stateClass,
            stateMajor,
            stateCollege
        };
        await Help.updateOne({userId:req.body.userId},data,(err,doc)=>{
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

    router.route("/rewardStu")
    .get(async (req,res) => {
        let state = null
        if(req.query.level == 3){
            state = "stateClass"
        }else if(req.query.level == 2){
            state = "stateMajor"
        }else{
            state = "stateCollege"
        }
        await Reward.aggregate([{
            $lookup:{
                from: 'students',
                localField: "userId",
                foreignField: "userId",
                as: "student"
            }
        },{
             $match:{
                major_id:req.query.major_id,
                [state]:"padding"
             }
        }],function (err,doc) {
            if(err) {
                res.send({
                    success:false,
                    data:doc
                })
            }else{
                res.send({
                    success:true,
                    data:doc
                })
            }
        })
    })
    .post(async (req,res) => {
        let stateClass = req.body.stateClass,
        stateMajor = req.body.stateMajor,
        stateCollege = req.body.stateCollege
        let data = {
            stateClass,
            stateMajor,
            stateCollege
        };
        await Reward.updateOne({userId:req.body.userId},data,(err,doc)=>{
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

    router.get("/helpStuAll",async (req,res)=>{
        async function getStu(teaLevel,tea,state){
            await Help.aggregate([{
                $lookup:{
                    from: 'students',
                    localField: "userId",
                    foreignField: "userId",
                    as: "student"
                }
            },{
                 $match:{
                    [teaLevel]:tea,
                    [state]:{ $ne:"padding" }
                 }
            }],function (err,doc) {
                if(err) {
                    res.send({
                        success:false,
                        data:doc
                    })
                }else{
                    res.send({
                        success:true,
                        data:doc
                    })
                }
            })
        }
        if(req.query.level == 3){
            let tea=req.query.major_id
            await getStu("major_id",tea,"stateClass")
        }else if(req.query.level == 2){
            let tea=req.query.college_id
            await getStu("college_id",tea,"stateMajor")
        }else{
            await Help.aggregate([{
                $lookup:{
                    from: 'students',
                    localField: "userId",
                    foreignField: "userId",
                    as: "student"
                }
            },{
                 $match:{
                    stateCollege:{ $ne:"padding" },
                    
                 }
            }],function (err,doc) {
                if(err) {
                    res.send({
                        success:false,
                        data:doc
                    })
                }else{
                    res.send({
                        success:true,
                        data:doc
                    })
                }
            })
        }
    })

    router.get("/rewardStuAll",async (req,res)=>{
        async function getStu(teaLevel,tea,state){
            await Reward.aggregate([{
                $lookup:{
                    from: 'students',
                    localField: "userId",
                    foreignField: "userId",
                    as: "student"
                }
            },{
                 $match:{
                    [teaLevel]:tea,
                    [state]:{ $ne:"padding" },
                 }
            }],function (err,doc) {
                if(err) {
                    res.send({
                        success:false,
                        data:doc
                    })
                }else{
                    res.send({
                        success:true,
                        data:doc
                    })
                }
            })
        }
        if(req.query.level == 3){
            let tea=req.query.major_id
            await getStu("major_id",tea,"stateClass")
        }else if(req.query.level == 2){
            let tea=req.query.college_id
            await getStu("college_id",tea,"stateMajor")
        }else{
            await Reward.aggregate([{
                $lookup:{
                    from: 'students',
                    localField: "userId",
                    foreignField: "userId",
                    as: "student"
                }
            },{
                 $match:{
                    stateCollege:{ $ne:"padding" },
                    
                 }
            }],function (err,doc) {
                if(err) {
                    res.send({
                        success:false,
                        data:doc
                    })
                }else{
                    res.send({
                        success:true,
                        data:doc
                    })
                }
            })
        }
    })
    
    router.post("./changePsw",async (req,res)=>{
        let psw = req.body.newpsw
        let data={
            psw
        }
        Teacher.update({userId:req.body.userId},data,(err,doc)=>{
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

    app.use("/teacher/api",router)
}