<template>
    <div class="UserList">
        <div class="table-wrap" ref="tableOuterLayer">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :height="tableHeight"
                    sortable="custom"
                    highlight-current-row
                    :row-class-name="userRowClass"
                    @row-contextmenu="rightClick"
                    @sort-change="sortChange"
            >
                <el-table-column type="index"/>
                <el-table-column
                        prop="userName"
                        label="头像"
                        min-width="100">
                    <template slot-scope="scope">
                        <el-avatar src="https://empty" @error="errorHandler">
                            <img v-if="scope.row.headPicture" :src="scope.row.headPicture"/>
                        </el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="loginName"
                        label="用户名"
                        sortable
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        sortable
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="contactWay"
                        label="联系方式"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="bornDate"
                        label="出生日期"
                        sortable
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip
                        min-width="200"
                >
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    layout="total,prev, pager, next,sizes"
                    :total="page.total"
                    :page-sizes="[10, 20, 50, 100]"
                    @size-change="sizeChange"
                    @current-change="pageChange"
                    @prev-click="pageChange"
                    @next-click="pageChange"
            >
            </el-pagination>
        </div>
        <div id="contextmenu"
             v-show="menuVisible"
             class="menu">
            <div class="contextmenu__item"
                 @click="editData">修改
            </div>
            <div class="contextmenu__item"
                 @click="deleteUser">删除
            </div>
        </div>
    </div>
</template>


<script>
    import {userPageList} from "@/js/SysUser";

    export default {
        name: "UserList",
        props: {
            searchObj: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {},
        data() {
            return {
                menuVisible: false,
                tableData: [],
                tableHeight: 0,
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                },
                orderColumn: "",
                isAsc: false,
            };
        },
        created() {
            this.getPageList();
        },
        mounted() {
            this.$nextTick(() => {
                this.tableHeight = window.innerHeight - this.$refs.tableOuterLayer.getBoundingClientRect().top - 62;
            })
        },
        methods: {
            //查看
            deleteUser() {
                console.log("删除")
                console.log(this.currentRow)
            },

            //编辑
            editData() {
                this.$router.push({
                    path: "UserForm",
                    name: 'UserForm',
                    params: {
                        userObj: this.currentRow
                    }
                })
            },

            userRowClass({row, rowIndex}) {
                if (rowIndex % 4 === 0) {
                    return 'yello_cls';
                } else if (rowIndex % 4 === 2) {
                    return 'green_cls';
                } else {
                    return '';
                }

            },

            sizeChange(size) {
                this.page.current = 1;
                this.page.size = size;
                this.getPageList();
            },

            pageChange(current) {
                this.page.current = current;
                this.getPageList();
            },

            errorHandler() {
                return true
            },


            //排序事件
            sortChange(column) {
                if (column.order) {
                    this.isAsc = column.order === 'ascending';
                    this.orderColumn = column.prop;
                } else {
                    this.isAsc = false;
                    this.orderColumn = "";
                }
                this.page.current = 1;
                this.getPageList();
            },

            getPageList() {
                userPageList({
                    page: this.page,
                    isAsc: this.isAsc,
                    orderColumn: this.orderColumn,
                    userName: this.searchObj.userName
                }).then(res => {
                    if (res.code == 0) {
                        this.tableData = res.data.records
                        this.page.total = parseInt(res.data.total)
                    }
                })
            },

            rightClick(row, column, event) {
                this.testModeCode = row.testModeCode
                this.menuVisible = false // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
                this.menuVisible = true // 显示模态窗口，跳出自定义菜单栏
                event.preventDefault() //关闭浏览器右键默认事件
                this.currentRow = row
                var menu = document.querySelector('.menu')
                this.styleMenu(menu, event)
            },
            foo() {
                // 取消鼠标监听事件 菜单栏
                this.menuVisible = false
                document.removeEventListener('click', this.foo) // 关掉监听，
            },
            styleMenu(menu, event) {
                if (event.clientX > 1800) {
                    menu.style.left = event.clientX - 100 + 'px'
                } else {
                    menu.style.left = event.clientX + 1 + 'px'
                }
                document.addEventListener('click', this.foo) // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
                if (event.clientY > 700) {
                    menu.style.top = event.clientY - 30 + 'px'
                } else {
                    menu.style.top = event.clientY - 10 + 'px'
                }
            },

        },
    }
</script>
<style lang="less" scoped>
    .UserList {

        /deep/ .el-table .yello_cls {
            background: oldlace;
        }

        /deep/ .el-table .green_cls {
            background: #f0f9eb;
        }

        /deep/ .el-pagination {
            position: fixed;
            left: 0px;
            bottom: -10px;
            width: 100%;
            height: 50px;
            text-align: center;
        }

        .contextmenu__item {
            display: block;
            line-height: 34px;
            text-align: center;
        }

        .contextmenu__item:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .menu {
            position: absolute;
            background-color: #fff;
            width: 100px;
            font-size: 12px;
            color: #444040;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 8px;
            border: 1px solid rgba(0, 0, 0, 0.15);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
            white-space: nowrap;
            z-index: 1000;
            .contextmenu__item:hover {
                border-radius: 8px;
                cursor: pointer;
                background: #66b1ff;
                border-color: #66b1ff;
                color: #fff;
            }
        }


    }
</style>

