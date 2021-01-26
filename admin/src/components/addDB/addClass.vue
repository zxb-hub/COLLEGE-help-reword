<template>
  <div>
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
    <el-input
      v-model="Class"
      placeholder="请填入班级名称"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>
    <el-input
      v-model="Class_id"
      placeholder="请填入班级id"
      style="margin-top: 10px; width: 250px; margin-left: 20px"
    ></el-input>
    <el-button @click="postMajor">点击提交</el-button>

    <el-table :data="classList" style="width: 100%" height="330">
      <el-table-column prop="class" label="已存在班级"> </el-table-column>
      <el-table-column prop="class_id" label="班级编号"> </el-table-column>

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
      showClass: false,
      showMajor: true,
      classList: [],
      collegeList: [],
      majorList: [],
      major: "",
      college: "",
      Class:"",
      Class_id:""
    };
  },
  methods: {
    post: function () {
      let This = this;
      this.$http.http
        .get("http://127.0.0.1:3000/common/api/class")
        .then((res) => {
          This.classList = res.data.data;
        });
    },
    getData: function () {
      this.$http.http
        .get("http://127.0.0.1:3000/common/api/college")
        .then((res) => {
          this.collegeList.push(...res.data.data);
        });
    },
    getMajor: async function (e) {
      await this.$http.http
        .get(`http://localhost:3000/common/api/major?college=${e}`)
        .then((res) => {
          // console.log(res.data.data)
          this.majorList = res.data.data;
        });
    },
    postMajor:async function () {
      await this.$http.http
        .post(`http://localhost:3000/common/api/class`,{
          college:this.college,
          class_id: this.Class_id,
          major: this.major,
          class: this.Class,
        })
        .then((res) => {
          this.majorList = res.data.data;
          alert("添加成功")
          this.$router.go(0)
        });
    },
    getClass:async function (e) {
      await this.$http.http
        .get(`http://localhost:3000/common/api/class?college=${this.college}&major=${e}`)
        .then((res) => {
          console.log(res.data.data)
          this.classList = res.data.data;
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