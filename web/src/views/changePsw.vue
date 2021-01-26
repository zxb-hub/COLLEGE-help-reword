<template>
  <div class="changePSW">
    <el-form
      label-position="right"
      label-width="80px"
      :model="pswForm"
      ref="pswForm"
      status-icon
      :rules="rules"
    >
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="pswForm.pass" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="pswForm.checkPass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pswForm')"
          >提交</el-button
        >
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.pswForm.checkPass !== '') {
            this.$refs.pswForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pswForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      pswForm: {
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{required: true, validator: validatePass }],
        checkPass: [{ required: true,validator: validatePass2}],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let This = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.http.post(`./${ sessionStorage.getItem("status") }/api/changePsw`,{userId:sessionStorage.getItem("userId"),newpsw:This.pswForm.pass})
          .then(res =>{
            if(res.data.success == true){
              sessionStorage.clear()
              this.$router.push("/")
            }else(
              alert(res.data.message)
            )
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
.changePSW {
  width: 360px;
  height: 150px;
  position: relative;
  margin: 240px auto 0;
}
</style>