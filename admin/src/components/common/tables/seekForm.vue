<template>
  <el-table :data="DataList" stripe fit style="width: 100%" align="center">
    <el-table-column align="center" prop="level" fit label="权限等级">
    </el-table-column>
    <el-table-column
      align="center"
      prop="college_id"
      v-if="college"
      :label="college"
      fit
    >
    </el-table-column>
    <el-table-column
      v-if="major"
      align="center"
      prop="major_id"
      :label="major"
      fit
    >
    </el-table-column>
    <el-table-column align="center" prop="userId" label="用户账号" fit>
    </el-table-column>
    <el-table-column align="center" prop="username" label="用户名" fit>
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
      DataList: [],
    };
  },
  props: {
    collegeId: String,
    college: String,
    username: String,
    major: String,
    level: String,
  },
  methods: {
    getForm() {
      this.$http.http.get(`./teacher?level=${this.level}`).then((res) => {
        this.DataList = res.data.doc;
        this.collegeData();
      });
    },
    handleDelete(e) {
      this.$http.http.get(`/removeT?_id=${e._id}`).then((res) => {
        if (res.data.success === true) {
          this.$router.go(0);
          this.$message("删除成功");
        } else {
          this.$message("删除失败:", res.data.data);
        }
      });
    },
    collegeData: function () {
      return this.DataList.forEach((data) => {
        data.level = "第" + data.level + "级别";
      });
    },
  },
  created() {
    this.getForm();
  },
};
</script>

<style>
</style>