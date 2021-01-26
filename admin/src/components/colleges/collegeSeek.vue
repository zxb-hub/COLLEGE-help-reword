<template>
  <seekForm
    :collegeId="collegeId"
    :college="college"
    :username="username"
    level=2
    :DataList="DataList"
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
      username: "用户名",
      level: "权限等级",
      DataList: [],
    };
  },
  methods: {
    getData: function () {
      this.$http.http.get("./teacher?level=2").then((res) => {
        this.DataList = res.data.data;
      });
    },
  },
};
</script>

<style>
</style>