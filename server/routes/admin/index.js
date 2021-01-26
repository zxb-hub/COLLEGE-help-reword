const { syncIndexes } = require("../../models/studentData");

module.exports = (app) => {
  const express = require("express");
  const Teacher = require("../../models/teacher");
  const Student = require("../../models/studentData");
  const College = require("../../models/collegeData");
  const Major = require("../../models/majorData");
  const Class = require("../../models/classData");
  const Admin = require("../../models/admin");
  const router = express.Router();

  router
    .route("/class")
    .get(async (req, res) => {
      await Class.find(
        {
          college_id: req.query.college_id,
          major_id: req.query.major_id,
        },
        (err, doc) => {
          res.send({
            success: 1,
            data: doc,
          });
        }
      );
    })
    .post(async (req, res) => {
      await Class.create(
        {
          college_id: req.body.college_id,
          class_id: req.body.class_id,
          major_id: req.body.major_id,
          class: req.body.class,
        },
        (err, doc) => {
          if (err) {
            res.send({
              success: 0,
              message: "添加失败",
              err: err,
            });
          } else {
            res.send({
              success: 1,
              message: "添加成功",
              doc: doc,
            });
          }
        }
      );
    });

  router.get("/majorAll", async (req, res) => {
    await Major.aggregate(
      [
        {
          $lookup: {
            from: "colleges",
            localField: "college",
            foreignField: "college",
            as: "college",
          },
        },
      ],
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          res.send({
            success: 1,
            data: doc,
          });
        }
      }
    );
  });

  router
    .route("/teacher")
    .post(async (req, res) => {
      await Teacher.create(
        {
          username: req.body.name,
          userId: req.body.username,
          psw: req.body.psw,
          college_id: req.body.college,
          major_id: req.body.major,
          level: req.body.level,
        },
        (err, doc) => {
          if (err) {
            res.send({
              success: 0,
              message: "添加失败",
              err: err,
            });
          } else {
            res.send({
              success: 1,
              message: "添加成功",
              doc: doc,
            });
          }
        }
      );
    })

    .get(async (req, res) => {
      await Teacher.aggregate(
        [
          {
            $match: {
              level: req.query.level,
            },
          },
          {
            $lookup: {
              from: "colleges",
              localField: "college_id",
              foreignField: "college_id",
              as: "college",
            },
          },
        ],
        (err, doc) => {
          if (err) {
            res.send({
              success: 0,
              message: "查询失败",
              err: err,
            });
          } else {
            res.send({
              success: 1,
              message: "查询成功",
              doc: doc,
            });
          }
        }
      );
    });

  router.get("/removeT", async (req, res) => {
    await Teacher.deleteOne(
      {
        _id: req.query._id,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          res.send({
            success: true,
            data: doc,
          });
        }
      }
    );
  });

  router.get("/removeS", async (req, res) => {
    await Student.deleteOne(
      {
        _id: req.query._id,
      },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            success: 1,
            data: doc,
          });
        }
      }
    );
  });

  router.get("/removeC", async (req, res) => {
    await College.deleteOne(
      {
        _id: req.query._id,
      },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            data: doc,
          });
        }
      }
    );
  });

  router.get("/removeM", async (req, res) => {
    await Major.deleteOne(
      {
        _id: req.query._id,
      },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            success: true,
            data: doc,
          });
        }
      }
    );
  });

  router.post("/college", async (req, res) => {
    await College.find(
      { college: req.body.college, college_id: req.body.college_id },
      (err, doc) => {
        if (doc.length === 0) {
          College.create(
            { college: req.body.college, college_id: req.body.college_id },
            (err, doc) => {
              if (err) {
                res.send({
                  success: false,
                  data: "存储错误",
                });
              } else {
                res.send({
                  success: true,
                  data: doc,
                });
              }
            }
          );
        } else {
          res.send({
            success: false,
            data: "已存在",
          });
        }
      }
    );
  });

  router
    .route("/student")
    .post(async (req, res) => {
      await Student.create(req.body.data, (doc, err) => {
        if (err) {
          res.send(err);
        } else {
          data = {
            success: 0,
            doc: doc,
          };
          console.log(111, data);
          res.send(data);
        }
      });
    })
    .get(async (req, res) => {
      await Student.find({}, (doc, err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({
            success: 1,
            data: doc,
          });
        }
      });
    });

  router.post("/admin", async (req, res) => {
    await Admin.create(req.body, (err, doc) => {
      if (err) {
        res.send({
          success: false,
          data: doc,
        });
      } else {
        res.send({
          success: true,
          data: doc,
        });
      }
    });
  });

  router.post("/login", async (req, res) => {
    await Admin.find(
      {
        userId: req.body.userId,
        psw: req.body.psw,
      },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          if (doc.length === 0) {
            res.send({
              success: false,
              data: "账号密码有误",
            });
          } else {
            res.send({
              success: true,
              data: doc,
            });
          }
        }
      }
    );
  });

  router.post('/changePsw',async (req,res) => {
    let psw = req.body.newpsw
        let data={
            psw
        }
        Admin.updateOne({userId:req.body.userId},data,(err,doc)=>{
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


  app.use("/admin/api", router);
};
