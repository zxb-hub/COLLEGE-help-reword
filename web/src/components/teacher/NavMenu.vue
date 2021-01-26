<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="助学金申请人员" name="help">
        <showTables tables="help"></showTables>
    </el-tab-pane>
    <el-tab-pane label="奖学金金申请人员" name="reward">
        <showTables tables="reward"></showTables>
    </el-tab-pane>
    <el-tab-pane label="已审批助学金名单" name="helpApproved">
        <approved tables="help"></approved>
    </el-tab-pane>
    <el-tab-pane label="已审批奖学金名单" name="rewardApproved">
        <approved tables="reward"></approved>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import showTables from './Tables'
import approved from './approved'



export default {
    components:{
        showTables,
        approved
        },
  data() {
    return {
        activeName:"help"
    }
  },
  methods: {
    
  },
};
</script>

<style>
</style>