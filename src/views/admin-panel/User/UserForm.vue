<template>
    <div class="UserForm">
        <el-form ref="form" :model="userInfo" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="头像">
                        <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :show-file-list="false"
                                :on-success="uploadSuccess"
                                :data="{assortment:'headPicture'}"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="用户名" v-if="!userInfo.id">
                        <el-input v-model="userInfo.loginName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24" v-if="!userInfo.id">
                    <el-form-item label="密码">
                        <el-input type="password" v-model="userInfo.pwd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="昵称">
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系方式">
                        <el-input v-model="userInfo.contactWay"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-radio v-model="userInfo.gender" :label="1">男</el-radio>
                        <el-radio v-model="userInfo.gender" :label="0">女</el-radio>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期">
                        <el-date-picker
                                v-model="userInfo.bornDate"
                                :picker-options="pickerOptions"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="住址">
                        <el-input type="text" v-model="userInfo.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item class="form_foot_cls">
                <el-button type="primary" @click="saveUser">保存</el-button>
                <el-button @click="cancelAction">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    import {saveOrUpdateUser} from "@/js/SysUser";
    import {addDemoData} from "@/js/FirstVue";
    import {redisGet} from "@/js/PublicMethods";

    export default {
        name: "UserForm",
        props: {},
        components: {},
        data() {
            return {
                uploadUrl: "/api/FilesController/uploadFiles",
                userInfo: {
                    id:"",
                    loginName: "",
                    pwd: "",
                    userName: "",
                    headPicture:"",
                    bornDate: "",
                    contactWay:"",
                    gender: 1,
                    address: "",
                },
                imageUrl: "",
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now()||time.getTime() <Date.parse("1900-01-01 ");
                    },
                },
            };
        },
        mounted() {
            if (this.$route.params){
                this.userInfo = Object.assign({},this.$route.params.userObj)
                this.imageUrl = this.userInfo.headPicture
            }

            this.getRedisDataByKey();
        },
        methods: {
            getRedisDataByKey(){
                if (!localStorage.getItem('publicKey')){
                    redisGet({key:"publicKey"}).then(res=>{
                        if (res.data){
                            localStorage.setItem('publicKey', res.data)
                        }
                    })
                }
            },

            cancelAction(){
                this.$router.back(-1);
            },

            uploadSuccess(res, file) {
                if (res.data){
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.userInfo.headPicture = res.data.fileUrl
                }else{
                    this.$message.error("头像上传失败！")
                }
            },
            //清除文件列表
            clearFiles() {
                this.$refs.upload.submit();
            },

            //上传前事件
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            //保存或更新用户信息
            saveUser() {
                saveOrUpdateUser(this.userInfo).then(res=>{
                    if (res.code==0){
                        this.$message.success("保存用户信息成功！");
                        this.$router.back(-1);
                    }
                }).catch(err=>{
                    console.error(err)
                });
                console.log('保存');
            }
        }
    }
</script>
<style lang="less" scoped>
    .UserForm {
        margin-top: 7px;

        /deep/ .el-date-editor.el-input {
            width: 329px;
        }

        .form_foot_cls {
            text-align: center;
        }

        /deep/.avatar-uploader{
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon{
                font-size: 28px;
                color: #8c939d;
                width: 78px;
                height: 78px;
                line-height: 78px;
                text-align: center;
            }
            .avatar {
                width: 78px;
                height: 78px;
                display: block;
            }
        }
    }
</style>

