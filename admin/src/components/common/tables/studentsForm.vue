<template>
  <el-table :data="dataList" stripe fit style="width: 100%" align="center">
    <el-table-column align="center" prop="college_id" label="所属学院" fit>
    </el-table-column>
    <el-table-column align="center" prop="major_id" label="所属专业" fit>
    </el-table-column>
    <el-table-column align="center" prop="profession" label="专业课成绩" fit>
    </el-table-column>
    <el-table-column align="center" prop="english" label="英语成绩" fit>
    </el-table-column>
    <el-table-column align="center" prop="studentName" label="学生姓名" fit>
    </el-table-column>
    <el-table-column align="center" prop="sex" label="性别" fit>
    </el-table-column>
    <el-table-column align="center" prop="userId" label="学生账号" fit>
    </el-table-column>
    <el-table-column align="center" prop="psw" label="账号密码" fit>
    </el-table-column>
    <el-table-column align="center" fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button type="danger" @click="handleDelete(scope.row)" size="mini"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      obj: "Student",
    };
  },
  inject: ["reload"],
  methods: {
    handleDelete: function (data) {
      this.$http.http
        .get(`remove?_id=${data._id}&obj=${this.obj}`)
        .then((res) => {
          if (res.data.success === 1) {
            alert("删除成功");
            this.reload();
          } else {
            alert("删除失败", res.data);
          }
        });
    },
  },
  props: ["dataList"]

};
</script>

<style>
</style>