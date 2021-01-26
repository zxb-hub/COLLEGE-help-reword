<template>
  <div>
    <el-select
      id="college"
      v-model="college"
      placeholder="请选择学院"
      @change="changeData($event)"
    >
      <el-option
        v-for="item in collegeList"
        :key="item.college_id"
        :value="item"
        :label="item.college"
      >
      </el-option>
    </el-select>

    <el-input
      v-model="Major"
      placeholder="请填入专业名称"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>

    <el-input
      v-model="Major_id"
      placeholder="请填入专业id"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>

    <el-button @click="postMajor">点击提交</el-button>

    <el-table :data="majorList" height="330" border style="width: 100%">
      <el-table-column prop="college[0].college" label="学院名称"></el-table-column>
      <el-table-column prop="college[0].college_id" label="学院编号"> </el-table-column>
      <el-table-column prop="major" label="专业名称"> </el-table-column>
      <el-table-column fixed="right" label="操作">
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
      collegeList: [],
      majorList: [],
      college: "",
      college_id: "",
      Major: "",
      Major_id: "",
      formList: {},
      isShow: false,
    };
  },
  methods: {
    getData: async function (path) {
      let result = await new Promise((resolve, reject) => {
        this.$http.http
          .get(path)
          .then((res) => {
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return result;
    },
    postMajor: function () {
      let This = this;
      if (!this.Major || !this.Major_id) {
        alert(`学院信息或学院编号为空，请正确填写`);
        return;
      } else {
        this.$confirm(`在${this.college}下创建${this.Major}专业？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            This.$http.http
              .post("/major", {
                college_id: This.college_id,
                major: This.Major,
                major_id: This.Major_id,
              })
              .then((res) => {
                if (res.data.success === 0) {
                  alert(`创建失败：${res.data.data}`);
                } else {
                  res.data.college = this.college
                  this.majorList.push(res.data)
                  this.$message({
                    type: "success",
                    message: `创建${res.data.major}专业成功!`,
                  });
                }
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
      // console.log(this.college_id)
    },
    //数据绑定，选择改变时
    changeData: function (e) {
      this.college = e.college;
      this.college_id = e.college_id;
    },
    remove:function(e) {
        this.$http.http.get(`/removeM?_id=${e._id}&name='Major'`).then((res) => {
        if (res.data.success === true) {
          
          this.$router.go(0)
          this.$message("删除成功");
        } else {
          this.$message("删除失败:", res.data.data);
        }
      });
    }
  },
  created() {
    this.getData("http://127.0.0.1:3000/common/api/college").then((res) => {
      this.collegeList = res;
    });
    this.getData("./majorAll").then((res) => {
      this.majorList = res;
    });
  },
};
</script>

<style>
</style>