<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> 输入资源管理</span>
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
          title="新建资源"
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
              label="资源名称"
              label-width="90px"
              label-position="left"
              prop="name"
            >
              <el-input v-model="createForm.name" placeholder="资源名称"></el-input>
            </el-form-item>
            <el-form-item
              label="资源类型"
              label-width="90px"
              label-position="left"
              prop="type"
            >
              <el-select
                v-model="createForm.type"
                placeholder="资源类型"
                filterable
                style="width: 500px"
                @change="onSelectChange"
              >
                <el-option label="MQTT 协议桥接" value="MQTT"></el-option>
                <el-option label="HTTP 协议接入" value="HTTP"></el-option>
                <el-option label="UDP 协议输入" value="UDP"></el-option>
                <el-option label="COAP 协议接入" value="COAP"></el-option>
                <el-option label="GRPC 协议接入" value="GRPC"></el-option>
                <el-option label="通用串口接入" value="UART_MODULE"></el-option>
                <el-option
                  label="MODBUS TCP MASTER 模式"
                  value="MODBUS_TCP_MASTER"
                ></el-option>
                <el-option
                  label="MODBUS RTU MASTER 模式"
                  value="MODBUS_RTU_MASTER"
                ></el-option>
                <el-option label="SNMP 协议接入" value="SNMP_SERVER"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="资源配置"
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
            <el-button type="primary" @click="createInEnd">提 交</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-table :data="tableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="uuid" label="UUID" width="340px"> </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="200px"
          :filters="[
            { text: 'MQTT 协议桥接', value: 'MQTT' },
            { text: 'HTTP 协议接入', value: 'HTTP' },
            { text: 'UDP 协议输入', value: 'UDP' },
            { text: 'COAP 协议接入', value: 'COAP' },
            { text: 'GRPC 协议接入', value: 'GRPC' },
            { text: '通用串口接入', value: 'UART_MODULE' },
            { text: 'MODBUS TCP MASTER 模式', value: 'MODBUS_TCP_MASTER' },
            { text: 'MODBUS RTU MASTER 模式', value: 'MODBUS_RTU_MASTER' },
            { text: 'SNMP 协议接入', value: 'SNMP_SERVER' },
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
            <el-button size="mini" type="danger" @click="removeInEnd(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="输出目标详情" :visible.sync="detailDialogVisible" width="30%">
        <v-jsoneditor
          style="height: 400px"
          v-model="inEndDetail"
          :options="detailOptions"
        ></v-jsoneditor>

        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              () => {
                detailDialogVisible = false;
                inEndDetail = {};
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
import { list } from "@/api/inend";
import { remove } from "@/api/inend";
import { create } from "@/api/inend";
import { Message } from "element-ui";
import in_types from "./in_type";
Vue.use(VJsoneditor);
export default {
  components: {
    VJsoneditor,
  },
  name: "InEnd",
  methods: {
    onSelectChange(v) {
      this.createForm.config = in_types[v];
    },
    removeInEnd(row) {
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
      this.inEndDetail = row;
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
    createInEnd() {
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
        this.tableData = response.data;
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
        templates: [],
      },
      ///
      detailOptions: {
        modes: ["code"],
        mode: "code",
        ace: ace,
      },
      ///
      detailDialogVisible: false,
      inEndDetail: {},
      //
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

      tableData: [],
    };
  },
};
</script>
