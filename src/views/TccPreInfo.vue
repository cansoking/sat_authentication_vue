<template>
    <div>
        <el-card :key="0" class="box-card">
            <div slot="header" class="clearfix">
                <span style="font-size: 30px; font-weight: 600;"> TCC预置信息管理</span>
            </div>
            <template>
                <el-table stripe
                    :data="tableData.filter(data => !search || data.id.toString().toLowerCase() === search.toLowerCase())"
                    max-height="690px" border style="width: 100%">
                    <el-table-column prop="id" label="编号(ID)" width="200">
                    </el-table-column>
                    <el-table-column prop="dkenc" label="默认加密密钥(Dkenc)" width="300">
                    </el-table-column>
                    <el-table-column prop="dkauth" label="默认认证密钥(DKauth)" width="300">
                    </el-table-column>
                    <el-table-column prop="wkenc" label="工作加密密钥(Wkenc)" width="300">
                    </el-table-column>
                    <el-table-column prop="k" label="身份保护密钥(K)" width="300">
                    </el-table-column>
                    <el-table-column align="center">
                        <template slot="header" slot-scope="scope">
                            <el-input v-model="search" size="mini" placeholder="输入编号搜索" />
                        </template>
                        <template slot-scope="scope">
                            <el-popover v-model="visible[scope.$index]" placement="left" width="300" trigger="click">
                                <el-form size="mini" label-position="top" ref="form" :model="edit_temp_form.cur_table_data">
                                    <el-form-item required label="默认加密密钥(Dkenc)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.dkenc"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="默认认证密钥(DKauth)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.dkauth"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="工作加密密钥(Wkenc)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.wkenc"></el-input>
                                    </el-form-item>
                                    <el-form-item required label="身份保护密钥(K)">
                                        <el-input :maxlength="8" v-model="edit_temp_form.cur_table_data.k"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">确认修改</el-button>
                                    </el-form-item>
                                </el-form>
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                                    slot="reference">编辑</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-row v-if="total_page_num != 0" type="flex" :gutter="0" justify="center" style="padding-top: 1%;">
                <el-col :span="10" :offset="0">
                    <el-pagination :pager-count="7" background :current-page.sync="cur_page_num"
                        @current-change="handleCurrentChange" :page-size="15" :total="total_page_num">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'SatAuthTccPreInfo',

    data() {
        return {
            search: '',
            cur_page_num: 1,
            total_page_num: 0,
            edit_temp_form: {
                cur_idx: 0,
                cur_table_data: {}
            },
            tableData: [],
            visible: []
        };
    },

    mounted() {
        this.getDataByPage(1, 15)
        this.$store.state.aside_cur_page = "tccpreinfo"
    },

    methods: {
        getDataByPage(page_num, page_size) {
            var that = this;
            this.$axios.get("http://localhost:8080/satquery/pretcc/getPreTccInfoByPage?curPage=" + page_num + "&pageSize=" + page_size).then
                (function (response) {
                    console.log("地面控制中心预置信息表获取成功");
                    that.total_page_num = response.data.total;
                    that.tableData = response.data.list;
                    for (let i = 0; i < that.tableData.length; i++) {
                        that.visible[i] = false
                    }
                }, function (err) {
                    console.log("地面控制中心预置信息表数据获取失败");
                })
        },
        handleCurrentChange(val) {
            this.getDataByPage(val, 15);
        }, handleEdit(index, row) {
            this.edit_temp_form.cur_idx = index;
            // 深拷贝
            this.edit_temp_form.cur_table_data = JSON.parse(JSON.stringify(this.tableData[index]));
        },
        // handleDelete(index, row) {
        //     this.edit_temp_form.cur_idx = index;
        //     // 深拷贝
        //     this.edit_temp_form.cur_table_data = JSON.parse(JSON.stringify(this.tableData[index]));
        //     this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.$axios.delete("http://localhost:8080/satquery/pretcc/deletePreTccByID/" + this.tableData[index].id).then(res => {
        //             if (res.data) {
        //                 this.tableData.splice(index, 1);
        //                 this.$message({
        //                     type: 'success',
        //                     message: '删除成功!'
        //                 });
        //             } else {
        //                 this.$message({
        //                     type: 'error',
        //                     message: '删除失败!'
        //                 });
        //             }
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },
        onSubmit() {
            this.$axios.put("http://localhost:8080/satquery/pretcc/updatePreTcc", this.edit_temp_form.cur_table_data).then((res) => {
                if (res.data) {
                    this.$set(this.tableData, this.edit_temp_form.cur_idx, this.edit_temp_form.cur_table_data);
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改失败!'
                    });
                }
                this.visible[this.edit_temp_form.cur_idx] = false
            })
        }
    },
};
</script>

<style></style>