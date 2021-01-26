<template>
<addForm :showList="isList" :showClass="isClass" @post="postC"></addForm>

</template>

<script>
import addForm from '../common/form/addForm'
export default {
  components:{
    addForm
  },
  data() {
    return {
      isList:true,
      isClass:false,
      collegeT:[]
    }
  },
  methods: {
    postC:function (e) {
      console.log(e)
      this.collegeT = e;
      this.collegeT.level=2
      this.$http.http.post('./teacher',this.collegeT).then(res=>{
        this.$message(res.data.message)
        this.$router.push('./collegeSeek')
      })
    }
  },
};
</script>

<style>
</style>>

