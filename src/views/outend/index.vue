<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> 输出目标管理</span>
        </div>
        <el-button
          type="primary"
          icon="el-icon-help"
          @click="
            () => {
              this.createDialogVisible = true;
            }
          "
          >新 建</el-button
        >
        <el-button type="success" @click="refreshList" icon="el-icon-refresh"
          >刷 新</el-button
        >

        <el-dialog
          title="新建目标"
          :visible.sync="createDialogVisible"
          width="800px"
          top="2%"
          :show-close="false"
          :before-close="() => {}"
        >
          <el-form
            :model="createForm"
            status-icon
            :rules="createFormRules"
            ref="createForm"
          >
            <el-form-item
              label="目标名称"
              label-width="90px"
              label-position="left"
              prop="name"
            >
              <el-input v-model="createForm.name" placeholder="输出目标名称"></el-input>
            </el-form-item>
            <el-form-item
              label="目标类型"
              label-width="90px"
              label-position="left"
              prop="type"
            >
              <el-select
                v-model="createForm.type"
                placeholder="输出目标类型"
                filterable
                style="width: 500px"
                @change="onSelectChange"
              >
                <el-option label="MQTT 桥接" value="MQTT"></el-option>
                <el-option label="MQTT 遥测" value="MQTT_TELEMETRY_TARGET"></el-option>
                <el-option label="MONGO 单节点" value="MONGO_SINGLE"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="目标配置"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <v-jsoneditor
                style="height: 400px"
                v-model="createForm.config"
                :options="options"
              ></v-jsoneditor>
            </el-form-item>

            <el-form-item
              label="备注信息"
              label-width="90px"
              label-position="left"
              prop="description"
            >
              <el-input
                v-model="createForm.description"
                autocomplete="off"
                placeholder="备注信息"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                () => {
                  this.createDialogVisible = false;
                  this.createForm = {};
                }
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="createOutEnd">提 交</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-table :data="outendsTableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="uuid" label="UUID" width="360px"> </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="240px"
          :filters="[
            { text: 'MQTT 协议桥接', value: 'MQTT' },
            { text: 'MQTT 遥测', value: 'MQTT_TELEMETRY_TARGET' },
            { text: 'MongoDb 存储', value: 'MONGO_SINGLE' },
          ]"
          :filter-method="filterType"
        >
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="description" label="信息"> </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          :filters="[
            { text: '正常', value: 1 },
            { text: '异常', value: 0 },
          ]"
          :filter-method="filterState"
          width="80px"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === 1" type="success">正常</el-tag>
            <el-tag v-else type="danger">异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="details(scope.row)"
              >详情</el-button
            >

            <el-button size="mini" type="danger" @click="removeOutEnd(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="输出目标详情" :visible.sync="detailDialogVisible" width="30%">
        <v-jsoneditor
          style="height: 400px"
          v-model="outEndDetail"
          :options="detailOptions"
        ></v-jsoneditor>

        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              () => {
                detailDialogVisible = false;
                outEndDetail = {};
              }
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Vue from "vue";
import VJsoneditor from "v-jsoneditor/src/index";
import { list } from "@/api/outend";
import { remove } from "@/api/outend";
import { create } from "@/api/outend";
import { Message } from "element-ui";
import out_types from "./out_type";
Vue.use(VJsoneditor);
export default {
  components: {
    VJsoneditor,
  },
  name: "OutEnd",
  methods: {
    onSelectChange(v) {
      this.createForm.config = out_types[v];
    },
    removeOutEnd(row) {
      let thiz = this;
      remove(row.uuid).then((response) => {
        Message({
          message: response.msg,
          type: "success",
          duration: 5 * 1000,
        });
        thiz.getList();
      });
    },
    details(row) {
      this.outEndDetail = row;
      this.detailDialogVisible = true;
    },
    refreshList() {
      this.getList();
      Message({
        message: "刷新成功",
        type: "success",
        duration: 5 * 1000,
      });
    },
    createOutEnd() {
      let thiz = this;
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          create(this.createForm).then((_response) => {
            Message({
              message: "创建成功",
              type: "success",
              duration: 5 * 1000,
            });
            this.createDialogVisible = false;
            this.createForm = {};
            thiz.getList();
          });
          return true;
        } else {
          return false;
        }
      });
    },
    //
    getList() {
      list().then((response) => {
        this.outendsTableData = response.data;
      });
    },
    //
    filterType(value, row) {
      return row.type === value;
    },
    //
    filterState(value, row) {
      return row.state === value;
    },
    //
  },
  created() {
    this.getList();
  },
  data() {
    return {
      options: {
        modes: ["tree", "code", "preview"],
        mode: "code",
        ace: ace,
      },
      detailOptions: {
        modes: ["code"],
        mode: "code",
        ace: ace,
      },
      ///
      detailDialogVisible: false,
      outEndDetail: {},
      ///
      createDialogVisible: false,
      createForm: {
        type: null,
        name: null,
        description: null,
        config: {
          example_config_key: "example_config_value", //example
        },
      },

      createFormRules: {
        type: [{ required: true, message: "输入类型", trigger: ["blur", "change"] }],
        name: [{ required: true, message: "输入名称", trigger: ["blur", "change"] }],
        description: [
          { required: true, message: "输入描述", trigger: ["blur", "change"] },
        ],
        config: [{ required: true, message: "输入配置", trigger: ["blur", "change"] }],
      },

      outendsTableData: [],
    };
  },
};
</script>
