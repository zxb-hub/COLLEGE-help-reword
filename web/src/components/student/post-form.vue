<template>
  <el-form ref="form" :model="form" label-width="80px" size="medium">
    <el-form-item label="所属学院">
      <el-input v-model="form.college" disabled></el-input>
    </el-form-item>
    <el-form-item label="所属专业">
      <el-input v-model="form.major" disabled></el-input>
    </el-form-item>
    <el-form-item label="所属班级">
      <el-input v-model="form.Class" disabled></el-input>
    </el-form-item>
    <el-form-item label="申请人">
      <el-input v-model="form.name" style="width: 100px" disabled></el-input>
    </el-form-item>
    <el-form-item label="申请类型">
      <el-select v-model="form.type" placeholder="请选择" :disabled="form.disable">
        <el-option label="奖学金" value="reward"></el-option>
        <el-option label="助学金" value="help"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="申请说明">
      <el-input
        type="textarea"
        v-model="form.desc"
        maxlength="300"
        show-word-limit
        :autosize="{ minRows: 4, maxRows: 10 }"
        style="width: 350px"
        :disabled="form.disable"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-steps :space="200" :active="form.active" finish-status="success" :process-status="form.stateIcon">
        <el-step title="填表"></el-step>
        <el-step title="辅导员审核"></el-step>
        <el-step title="学 院 审核"></el-step>
        <el-step title="学生处审核"></el-step>
        <el-step :title="form.state"></el-step>
      </el-steps>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :disabled="form.disable"
        >提交</el-button
      >
      <el-button @click="resetFields()" :disabled="form.disable"
        >取消</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userId: sessionStorage.getItem("userId"),
        name: sessionStorage.getItem("username"),
        college: sessionStorage.getItem("college"),
        major: sessionStorage.getItem("major"),
        Class: sessionStorage.getItem("class"),
        type: "",
        desc: "",
        disable: "",
        active: "",
        state: "",
        stateIcon: "finish",
      },
    };
  },

  methods: {
    onSubmit() {
      this.$http.http
        .post(`/student/api/${this.form.type}`, {
          desc: this.form.desc,
          userId: this.form.userId,
          studentName: this.form.name,
          major_id: this.form.major,
          college_id: this.form.college,
          stateClass: "padding",
          stateMajor: "padding",
          stateCollege: "padding",
        })
        .then((res) => {
          if (res.data.success === true) {
            this.form.active = 1;
            this.form.disable = true;
            alert("提交成功");
          } else {
            alert(res.data.data);
          }
        });
    },
    resetFields() {
      this.$confirm("此操作将重置表单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.form.type = "";
          this.form.desc = "";
          this.$message({
            type: "success",
            message: "重置成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置",
          });
        });
    },
    StateActive(state) {
      let This = this;
      let College = state + "StateCollege";
      let Major = state + "StateMajor";
      let Class = state + "StateClass";
      if (sessionStorage.getItem(Class) === "pass") {
        if (sessionStorage.getItem(Major) === "pass") {
          if (sessionStorage.getItem(College) === "pass") {
            return 3;
          }else{
            This.form.stateIcon = "error";
            return 3;
          }
        } else{
           This.form.stateIcon = "error";
            return 2;
        }
      } else {
        This.form.stateIcon = "error";
        return 1;
      }
        
      
    },
    formData: function () {
      if (!(sessionStorage.getItem("help") == "undefined")) {
        this.form.desc = sessionStorage.getItem("help");
        this.form.type = "help";
        this.form.disable = true;
        this.form.active = this.StateActive("help");
      } else if (!(sessionStorage.getItem("reward") == "undefined")) {
        this.form.desc = sessionStorage.getItem("reward");
        this.form.type= "reward";
        this.form.disable = true;
        this.form.active = this.StateActive("reward");
      } else {
        this.form.desc = "";
        this.form.type = "";
        this.form.disable = false;
        this.form.active = 0;
        this.form.state = "待定";
      }
    },
  },
  created() {
    this.formData()
  },
};
</script>

<style>
</style>