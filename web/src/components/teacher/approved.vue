<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="college_id" label="学院" width="150">
    </el-table-column>
    <el-table-column prop="major_id" label="专业" width="120">
    </el-table-column>
    <el-table-column prop="class_id" label="班级" width="180">
    </el-table-column>
    <el-table-column prop="studentName" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="userId" label="学号" width="120"> </el-table-column>
    <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
    <el-table-column prop="english" label="英语成绩" width="120">
    </el-table-column>
    <el-table-column prop="profession" label="专业课成绩" width="120">
    </el-table-column>
    <el-table-column
      prop="desc"
      label="申请情况"
      width="300"
      :show-overflow-tooltip="true"
    >
    </el-table-column>
    <el-table-column prop="statePass" label="是否通过" width="120" fixed="right">
    </el-table-column>
    <el-table-column label="操作" width="150" fixed="right">
      <template slot-scope="scope">
        <el-button @click="open(scope.row)" type="info" size="small"
          >查看</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    let Title;
    if (this.tables === "help") {
      Title = "helpStuAll";
    } else {
      Title = "rewardStuAll";
    }
    return {
      tableData: [],
      teaLevel: sessionStorage.getItem("level"),
      major_id: sessionStorage.getItem("major_id"),
      college_id: sessionStorage.getItem("college_id"),
      title: Title,
      
    };
  },
  props: ["tables"],
  methods: {
    getStuData() {
      this.$http.http
        .get(
          `teacher/api/${this.title}?level=${this.teaLevel}&major_id=${this.major_id}&college_id=${this.college_id}`
        )
        .then((res) => {
          let data = res.data.data;
          data.forEach((x) => {
            x.english = x.student[0].english;
            x.profession = x.student[0].profession;
            x.sex = x.student[0].sex ? "男" : "女";
            x.class_id = x.student[0].class_id;
            if(x.level == 3){
              if(x.stateClass === "pass"){
                  x.statePass="通过"
              }else{
                  x.statePass="驳回"
              }
            }else if(x.level == 2){
                if(x.stateClass === "pass"){
                  x.statePass="通过"
              }else{
                  x.statePass="驳回"
              }
            }else{
                if(x.stateClass === "pass"){
                  x.statePass="通过"
              }else{
                  x.statePass="驳回"
              }
            }
          });
          this.tableData = data;
          console.log(this.tableData)
        });
    },
    open(e) {
      this.$alert(`${e.desc}`, "申请说明", {
        confirmButtonText: "确定",
      });
    },
  },
  created() {
    this.getStuData();
  },
};
</script>

<style>
</style>