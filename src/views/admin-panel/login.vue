<!--描述:登录页面
日期：2020年11月27日
添加人：骆超
-->
<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
            <h2 class="login-title">管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password"></el-input>
            </el-form-item>
            <div class="login-button">
                <el-button type="primary" @click="onLogin">登录</el-button>
                <el-button @click="onLogin">注册</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        props: {},
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                loginRules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: 'blur'},
                        {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: 'blur'},
                        {min: 6, max: 16, message: "密码6-16位", trigger: 'blur'}
                    ]
                },
            }
        },
        created() {

        },
        mounted() {

        },
        computed: {},
        methods: {
            //登录的方法
            onLogin() {
                console.log("登录操作")
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        console.log('验证通过！');
                        this.$router.push({name: 'main-view'});
                    } else {
                        console.error('验证不通过！');
                        return false;
                    }
                });
            }
        },
    };
</script>

<style lang="less" scoped>
    /* 背景 */
    .login-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        min-width: 1000px;
        z-index: -10;
        zoom: 1;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        background: #fff url("../../assets/login.jpg") no-repeat center 0;

        .login-form {
            width: 350px;
            margin: 160px auto; /* 上下间距160px，左右自动居中*/
            background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
            padding: 30px;
            border-radius: 20px; /* 圆角 */
            opacity: 0.9;
            /* 标题 */

            .login-title {
                color: #303133;
                text-align: center;
            }

            .login-button {
                text-align: center;
                /deep/.el-button+.el-button{
                    margin-left: 20px;
                }
                /*el-button{*/
                /*    margin-left: 10px;*/
                /*}*/
            }
        }
    }


</style>
