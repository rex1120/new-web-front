<template>
    <div class="SysUser">
        <div class="user_head">
            <el-row>
                <el-col :span="24">
                    <el-input
                            class="search_cls"
                            placeholder="请输入姓名"
                            prefix-icon="el-icon-search"
                            v-model="searchObj.userName"
                            @keyup.enter.native="searchAction"
                    >
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="addUser">新增用户</el-button>
                </el-col>
            </el-row>
        </div>
        <div>
            <user-list ref="userList" :searchObj="searchObj"></user-list>
        </div>
    </div>
</template>


<script>
    import UserList from './UserList'

    export default {
        name: "SysUser",
        props: {},
        components: {
            UserList
        },
        data() {
            return {
                searchObj: {
                    userName: "",
                }
            };
        },
        mounted() {
        },
        methods: {
            //新增用户
            addUser() {
                this.$router.push({
                    path: "UserForm",
                })
            },
            //查找
            searchAction() {
                this.$refs.userList.pageChange(1)
                console.log(this.searchObj);
                console.log("查找")
            },
        },
    }
</script>
<style lang="less" scoped>
    .SysUser {
        .user_head {
            background-color: #B0E0E6;
            color: #333;
            height: 150px;
            line-height: 60px;

            /deep/ .el-col {
                padding: 10px;
            }

            /deep/ .el-input--prefix .el-input__inner {
                background-color: slategray;
                color: wheat;
            }
        }

        .el-aside {
            color: #333;
        }
    }
</style>

