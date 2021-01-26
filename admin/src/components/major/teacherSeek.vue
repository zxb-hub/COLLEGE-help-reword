<template>
  <seekForm
    :collegeId="collegeId"
    :college="college"
    :major="major"
    :username="username"
    :DataList="DataList"
    level=3
  ></seekForm>
</template>

<script>
import seekForm from "../common/tables/seekForm";

export default {
  components: {
    seekForm,
  },
  data() {
    return {
      collegeId: "所属组织级别",
      college: "所属学院",
      major: "所属专业",
      username: "用户名",
      DataList: [],
    };
  },
};
</script>

<style>
</style>