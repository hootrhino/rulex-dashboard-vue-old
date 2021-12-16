<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span> 规则管理</span>
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
          title="新建规则"
          :visible.sync="createDialogVisible"
          width="1000px"
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
              label="规则名称"
              label-width="90px"
              label-position="left"
              prop="name"
            >
              <!-- --- -->
              <el-input v-model="createForm.name" placeholder="规则名称"></el-input>
              <!-- --- -->
            </el-form-item>
            <el-form-item
              label="输入资源"
              label-width="90px"
              label-position="left"
              prop="from"
            >
              <el-select
                v-model="createForm.from"
                multiple
                placeholder="请选择数据源"
                style="width: 800px"
              >
                <el-option
                  v-for="item in inEnds"
                  :key="item.uuid"
                  :label="item.name"
                  :value="item.uuid"
                >
                  <span style="float: left">{{ item.uuid }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.name
                  }}</span>
                </el-option>
              </el-select></el-form-item
            >
            <el-form-item
              label="规则回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.actions"
                :options="options"
                style="line-height: 1"
              />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="成功回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.success"
                :options="options"
                style="line-height: 1"
              />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="失败回调"
              label-width="90px"
              label-position="left"
              prop="config"
            >
              <!-- --- -->
              <codemirror
                v-model="createForm.failed"
                :options="options"
                style="line-height: 1"
              />
              <!-- --- -->
            </el-form-item>

            <el-form-item
              label="备注信息"
              label-width="90px"
              label-position="left"
              prop="description"
            >
              <el-input v-model="createForm.description" autocomplete="off"></el-input>
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
            <el-button type="warning" @click="validateRule">语法验证</el-button>
            <el-button type="primary" @click="createRule">提 交</el-button>
          </div>
        </el-dialog>
      </el-card>
      <el-table :data="rulesTableData" border style="width: 100%; margin-top: 10px">
        <el-table-column prop="uuid" label="UUID" width="360"> </el-table-column>
        <el-table-column prop="status" label="状态" width="80px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 1" type="success">运行中</el-tag>
            <el-tag v-else type="danger">已停止</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="300"> </el-table-column>
        <el-table-column prop="description" label="备注信息"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="details(scope.row)"
              >详情</el-button
            >
            <el-button size="mini" type="danger" @click="removeRule(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="规则详情"
        :visible.sync="detailDialogVisible"
        width="1000px"
        top="2%"
      >
        <el-form :model="ruleDetail" status-icon ref="ruleDetail">
          <el-form-item
            label="规则名称"
            label-width="90px"
            label-position="left"
            prop="name"
          >
            <!-- --- -->
            <el-input
              v-model="ruleDetail.name"
              placeholder="规则名称"
              :disabled="true"
            ></el-input>
            <!-- --- -->
          </el-form-item>
          <el-form-item
            label="输入资源"
            label-width="90px"
            label-position="left"
            prop="from"
          >
            <el-select
              v-model="ruleDetail.from"
              multiple
              disabled
              placeholder="请选择数据源"
              style="width: 800px"
            >
              <el-option
                v-for="item in inEnds"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid"
              >
                <span style="float: left">{{ item.uuid }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.name
                }}</span>
              </el-option>
            </el-select></el-form-item
          >
          <el-form-item
            label="规则回调"
            label-width="90px"
            label-position="left"
            prop="config"
          >
            <!-- --- -->
            <codemirror
              v-model="ruleDetail.actions"
              :options="options"
              style="line-height: 1"
            />
            <!-- --- -->
          </el-form-item>

          <el-form-item
            label="成功回调"
            label-width="90px"
            label-position="left"
            prop="config"
          >
            <!-- --- -->
            <codemirror
              v-model="ruleDetail.success"
              :options="options"
              style="line-height: 1"
            />
            <!-- --- -->
          </el-form-item>

          <el-form-item
            label="失败回调"
            label-width="90px"
            label-position="left"
            prop="config"
          >
            <!-- --- -->
            <codemirror
              v-model="ruleDetail.failed"
              :options="options"
              style="line-height: 1"
            />
            <!-- --- -->
          </el-form-item>

          <el-form-item
            label="备注信息"
            label-width="90px"
            label-position="left"
            prop="description"
          >
            <el-input
              v-model="ruleDetail.description"
              autocomplete="off"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              () => {
                this.detailDialogVisible = false;
              }
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Vue from "vue";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/darcula.css";
import "codemirror/mode/lua/lua.js";
import VJsonEditor from "v-jsoneditor/src/index";
Vue.use(VJsonEditor);
import { Message } from "element-ui";
import { list as inEndList } from "@/api/inend";
import { list } from "@/api/rule";
import { remove } from "@/api/rule";
import { create } from "@/api/rule";
import { validateRule } from "@/api/rule";
export default {
  name: "Rule",
  components: {
    codemirror,
    VJsonEditor,
  },
  methods: {
    onSelectChange(v) {},
    removeRule(row) {
      let thiz = this;
      remove(row.uuid).then((response) => {
        Message({
          message: response.msg,
          type: "success",
          duration: 5 * 1000,
        });
        thiz.getRuleList();
      });
    },
    details(row) {
      this.ruleDetail = row;
      this.detailDialogVisible = true;
    },
    refreshList() {
      this.getRuleList();
      this.getInEndList();
    },
    createRule() {
      let thiz = this;
      this.$refs["createForm"].validate((valid) => {
        if (valid) {
          create(this.createForm).then((_response) => {
            Message({
              message: "创建成功",
              type: "success",
              duration: 5 * 1000,
            });
            thiz.createDialogVisible = false;
            thiz.createForm = {};
            thiz.getRuleList();
          });
          return true;
        } else {
          return false;
        }
      });
    },
    //
    getRuleList() {
      list().then((response) => {
        this.rulesTableData = response.data;
      });
    },
    getInEndList() {
      inEndList().then((response) => {
        this.inEnds = response.data;
      });
    },
    validateRule(row) {
      validateRule(this.createForm).then((_response) => {
        Message({
          message: "语法验证成功",
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
  },
  created() {
    this.getRuleList();
    this.getInEndList();
  },
  data() {
    return {
      options: {
        tabSize: 4,
        mode: "text/x-lua",
        theme: "darcula",
        lineNumbers: true,
        line: true,
        lint: true,
        styleActiveLine: true,
        lineNumbers: true,
        foldGutter: true,
        styleSelectedText: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        gutters: ["CodeMirror-lint-markers"],
        hintOptions: {
          completeSingle: true,
        },
        extraKeys: {
          Tab: function (cm) {
            var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
            cm.replaceSelection(spaces);
          },
        },
        showHint: true,
      },
      //
      detailOptions: {
        modes: ["code"],
        mode: "code",
        ace: ace,
      },
      //
      ruleDetail: {},
      detailDialogVisible: false,
      //
      createDialogVisible: false,
      createForm: {
        name: "",
        description: "",
        from: [],
        actions:
          "--\n--规则回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nActions = {\n\tfunction(data)\n\t\t--rulexlib:log(data)\n\t\treturn true, data\n\tend\n}",
        failed:
          "--\n--失败回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nfunction Failed(error)\n\trulexlib:log(error)\nend\n",
        success:
          '--\n--成功回调，高级功能请查看文档:https://wwhai.github.io/rulex_doc_html/index.html\n--\nfunction Success()\n\t--rulexlib:log("success")\nend\n',
      },
      inEnds: [],
      createFormRules: {
        name: [{ required: true, message: "输入名称", trigger: ["blur", "change"] }],
        description: [
          { required: true, message: "输入描述", trigger: ["blur", "change"] },
        ],
        from: [{ required: true, message: "输入资源入口", trigger: ["blur", "change"] }],
        actions: [
          { required: true, message: "输入规则回调", trigger: ["blur", "change"] },
        ],
        failed: [
          { required: true, message: "输入成功回调", trigger: ["blur", "change"] },
        ],
        success: [
          { required: true, message: "输入失败回调", trigger: ["blur", "change"] },
        ],
      },

      rulesTableData: [],
    };
  },
};
</script>
