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
          :key="item._id"
          :value="item.college"
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
          :key="item._id"
          :value="item.major"
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
          :key="item._id"
          :value="item.class"
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
        await this.$http.http.get(`http://localhost:3000/common/api/major?college=${e}`).then((res) => {
          this.majorList = res.data.data;
          this.classList = res.data.data.classList
        });
      } else {
        this.$emit("collegeData", { college: this.college });
      }
    },
    getClass: async function (e) {
      if(this.showClass){
        await this.$http.http.get(`http://localhost:3000/common/api/class?college=${this.college}&major=${e}`).then(res=>{
          this.classList = res.data.data
        })
      }else{
        this.$emit("classData", { college: this.college, major: this.major});
      }
      
    },
    classData: async function () {
      this.$emit("classData", { college: this.college, major: this.major ,class:this.Class});
    },
    //
  },
  created() {
    this.getCollege("http://localhost:3000/common/api/college").then((res) => {
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