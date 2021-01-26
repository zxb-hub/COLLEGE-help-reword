<template>
  <studentsForm :dataList='dataList'></studentsForm>
</template>

<script>
import studentsForm from '../common/tables/studentsForm'
export default {
  components:{
    studentsForm
  },
  data() {
    return {
      dataList:[]
    };
  },
  
  methods: {
     getStuData: function (){
       this.$http.http.get('student').then(res=>{
         res.data.forEach(doc=>{
           doc.sex = doc.sex?"男":"女"
         })
         this.dataList = res.data
       })
     }
  },
  created(){
    this.getStuData()
  }
};
</script>

<style>
</style>