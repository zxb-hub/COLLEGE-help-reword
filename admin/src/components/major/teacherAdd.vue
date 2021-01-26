<template>
  <addForm :showList="showList" :showClass="showClass" :showMajor="showMajor" @post="postM"></addForm>
</template>

<script>
import addForm from '../common/form/addForm'
export default {
  components:{
    addForm,
  },
  data(){
    return {
      showList:true,
      showClass:false,
      showMajor:true,
      teacher:[],

    }
  },
  methods:{
    postM:function(e){
      console.log(e)
      this.teacher = e;
      this.teacher.level = 3;
      this.$http.http.post("./teacher",this.teacher).then(res=>{
        this.$message(res.data.message)
        this.$router.push('./teacherSeek')
      })
  }
  }
}
</script>

<style>

</style>