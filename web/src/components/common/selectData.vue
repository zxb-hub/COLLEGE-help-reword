<template>
  <div>
    <el-form-item label="选择学院">
      <el-select
        v-model="college"
        placeholder="请选择学院"
        @change="getMajor($event)"
      >
        <el-option
          v-for="item in collegeList"
          :key="item.college"
          :value="item.college_id"
          :label="item.college"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择专业" v-if="showMajor">
      <el-select
        v-model="major"
        placeholder="请选择专业"
        @change="getClass($event)"
      >
        <el-option
          v-for="item in majorList"
          :key="item.major"
          :value="item.major_id"
          :label="item.major"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="选择班级" v-if="showClass">
      <el-select
        v-model="Class"
        placeholder="请选择班级"
        @change="classData($event)"
      >
        <el-option
          v-for="item in classList"
          :key="item.class"
          :value="item.class_id"
          :label="item.class"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collegeList: [],
      majorList: [],
      classList: [],
      college: "",
      major: "",
      Class: "",
    };
  },
  props: ["showMajor", "showClass"],
  methods: {
    getCollege: async function (path) {
      let result = await new Promise((resolve, reject) => {
        this.$http.http
          .get(path)
          .then((res) => {
            if (typeof res.data.data[0].college === "object") {
              for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].college = res.data.data[i].college[0].college;
              }
            }
            resolve(res.data.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
      return result;
    },
    getMajor: async function (e) {
      if (this.showMajor) {
        await this.$http.http.get(`/major?college_id=${e}`).then((res) => {
          this.majorList = res.data.data;
          this.classList = res.data.data.classList
        });
      } else {
        this.$emit("Data", { college: e });
      }
    },
    getClass: async function (e) {
      if(this.showClass){
        await this.$http.http.get(`/class?college_id=${this.college}&major_id=${e}`).then(res=>{
          this.classList = res.data.data
        })
      }else{
        this.$emit("Data", { college: e.college_id, major: e.major_id});
      }
      
    },
    classData: async function () {
      this.$emit("Data", { college: this.college, major: this.major ,class:this.Class});
    },
  },
  created() {
    this.getCollege("http://127.0.0.1:3000/common/api/college").then((res) => {
      this.collegeList = res;
    });
  },
};
</script>

<style>
.selectClass label {
  width: 80px;
}
</style>