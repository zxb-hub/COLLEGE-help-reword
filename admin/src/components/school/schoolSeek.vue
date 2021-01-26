<template>
  <seekForm :collegeId='collegeId' :username='username' level=1></seekForm>
</template>

<script>
import seekForm from '../common/tables/seekForm'
export default {
  components:{
    seekForm
  },
     data() {
    return {
      schoolData:[],
      collegeId:'所属组织',
      username:'用户名',
    }
  }
}
</script>

<style>

</style>