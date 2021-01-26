<template>
   <addForm :showList="showList" :showMajor="showMajor" @post="postS"></addForm>
</template>

<script>
import addForm from '../common/form/addForm'
export default {
   components:{
    addForm,
  },
  data(){
    return {
      showList:false,
      showMajor:false,
      teacher:[]
    }
  },
  methods:{
    postS:function(e) {
      this.teacher = e;
      this.teacher.level = 1;
      this.$http.http.post("./teacher",this.teacher).then(res=>{
        this.$message(res.data.message)
        this.$router.push('./schoolSeek')
      })
    }
  }
};
</script>

<style>
</style>