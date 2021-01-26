<template>
  <div>
    <el-input
      v-model="college"
      placeholder="请填入学院名称"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>
    <el-input
      v-model="college_id"
      placeholder="请填入学院id"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>

    <el-button @click="postMajor" style="margin-left: 20px">点击提交</el-button>
    <el-table :data="collegeList" style="width: 100%" height="330">
      <el-table-column prop="college" label="已存在学院名" > </el-table-column>
      <el-table-column prop="college_id" label="学院编号"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      college: "",
      college_id: "",
      collegeList: [],
    };
  },
  methods: {
    getData: function () {
      this.$http.http.get("http://127.0.0.1:3000/common/api/college").then((res) => {
        this.collegeList.push(...res.data.data);
      });
    },
    postMajor: function () {
      let This = this;
      if (!this.college || !this.college_id) {
        alert(`学院信息或学院编号为空，请正确填写`);
        return;
      } else {
        this.$confirm(`确定创建${this.college}？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            This.$http.http
              .post("/college", {
                college: This.college,
                college_id: This.college_id,
              })
              .then((res) => {
                console.log(res);
                if (res.data.success === false) {
                  console.log(res.data.data);
                  alert(`创建失败：${res.data.data}`);
                } else {
                  this.$message({
                    type: "success",
                    message: `创建${res.data}成功!`,
                  });
                  
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消创建",
            });
          });
      }
    },
    remove:function(e) {
        this.$http.http.get(`/removeC?_id=${e._id}&name='College'`).then((res) => {
        if (res.data.success === true) {
          this.majorList = res.data.data
          this.$router.go(0)
          this.$message("删除成功");
        } else {
          this.$message("删除失败:", res.data.data);
        }
      });
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>