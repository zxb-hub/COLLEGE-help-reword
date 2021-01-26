<template>
  <addForm showList=true showMajor=true showAch=true showClass=true @post="stuPost"></addForm>
</template>

<script>
import addForm from "../common/form/addForm";
export default {
  components:{
    addForm
  },
  methods:{
    stuPost:function (data) {
      
      this.$http.http.post('student',{data:data}).then(res=>{
        if(res.status === 200 && res.statusText === "OK"){
          this.$router.push('./studentSeek')
        }else{
          alert('错误信息：',res.data.success)
        }
      })
    }
  }
}
</script>

<style>

</style>