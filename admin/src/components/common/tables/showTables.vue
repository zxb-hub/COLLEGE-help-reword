<template>
      <el-table :data="majorList" height="330" border style="width: 100%">
      <el-table-column prop="college" label="学院名称"></el-table-column>
      <el-table-column prop="college_id" label="学院编号"> </el-table-column>
      <el-table-column prop="major" label="专业名称"> </el-table-column>
      <el-table-column prop="major_id" label="专业编号"> </el-table-column>
      <el-table-column prop="class" label="班级" v-if="showClass"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
export default {
  data(){
      return{}
  },
  props:['majorList',"showClass"],
  methods:{
      remove: function (e) {
        this.$emit('remove',e)
    },
  },
  created(){
    console.log(111,this.majorList)
  }
}
</script>

<style>

</style>