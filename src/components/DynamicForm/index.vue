<template>
  <div class="dynamic-form">
    <el-form
      ref="configFormRef"
      :model="configForm"
      :rules="configFormRules"
      label-width="auto"
      label-position="left"
    >
      <template v-for="item in options">
        <el-form-item
          v-if="item.type !== 'el-inline'"
          :key="item.name"
          :label="item.label"
          :prop="item.name"
          :required="item.required"
        >
          <el-input
            v-if="item.type == 'el-input-text'"
            v-model.trim="configForm[item.name]"
            type="text"
            size="small"
            :placeholder="item.placeholder"
            clearable
            maxlength="20"
          />
          <el-input-number
            v-if="item.type == 'el-input-number'"
            v-model.trim="configForm[item.name]"
            size="small"
            style="width: 100%"
            controls-position="right"
            :placeholder="item.placeholder"
          />
          <el-select
            v-if="item.type === 'el-select'"
            v-model="configForm[item.name]"
            style="width: 100%"
            clearable
            size="small"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="itemChild in item.selectOptions"
              :key="itemChild.value"
              :label="itemChild.label"
              :value="itemChild.value"
            />
          </el-select>
        </el-form-item>

        <el-row v-if="item.type === 'el-inline'" :key="item.name" :gutter="15">
          <el-col
            v-for="childrenItem in item.children"
            :key="childrenItem.name"
            :span="calcSpan(item.children)"
          >
            <el-form-item
              :label="childrenItem.label"
              :prop="item.name + '.' + childrenItem.name"
            >
              <el-input
                v-if="childrenItem.type == 'el-input-text'"
                v-model="configForm[item.name][childrenItem.name]"
                size="small"
                clearable
                :placeholder="childrenItem.placeholder"
              />
              <el-input-number
                v-if="childrenItem.type == 'el-input-number'"
                v-model="configForm[item.name][childrenItem.name]"
                size="small"
                style="width: 100%"
                controls-position="right"
                clearable
                :placeholder="childrenItem.placeholder"
              />
              <el-select
                v-if="childrenItem.type == 'el-select'"
                v-model="configForm[item.name][childrenItem.name]"
                style="width: 100%"
                clearable
                size="small"
                :placeholder="childrenItem.placeholder"
              >
                <el-option
                  v-for="itemSon in childrenItem.selectOptions"
                  :key="itemSon.value"
                  :label="itemSon.label"
                  :value="itemSon.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <!-- 动态增加项目 注册参数 -->
      <el-row
        v-for="(item, index) in configForm.moreRegisterParams"
        :key="index"
        :gutter="15"
      >
        <el-col :span="8">
          <el-form-item
            label="函数"
            :prop="'moreRegisterParams.' + index + '.function'"
          >
            <el-input-number
              v-model="item.function"
              size="small"
              controls-position="right"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="地址"
            :prop="'moreRegisterParams.' + index + '.address'"
          >
            <el-input-number
              v-model="item.address"
              size="small"
              controls-position="right"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            label="数量"
            :prop="'moreRegisterParams.' + index + '.quantity'"
          >
            <el-input-number
              v-model="item.quantity"
              size="small"
              controls-position="right"
              style="width: 100%"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <i
            class="el-icon-delete"
            style="cursor: pointer"
            @click="deleteRegisterParams(item, index)"
          />
        </el-col>
      </el-row>
      <el-form-item v-if="protocol === 'MODBUS_TCP_MASTER' || protocol === 'MODBUS_RTU_MASTER'" class="button-item">
        <el-button type="primary" size="small" @click="addRegisterParams">
          增加参数
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    protocol: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      configForm: {
        moreRegisterParams: []
      },

      configFormRules: {
        host: [{ required: true, message: '请输入服务地址', trigger: ['blur', 'change'] }],
        port: [{ required: true, message: '请输入端口号', trigger: ['blur', 'change'] }],
        clientId: [{ required: true, message: '请输入客户端ID', trigger: ['blur', 'change'] }],
        topic: [{ required: true, message: '请输入订阅Topic', trigger: ['blur', 'change'] }],
        username: [{ required: true, message: '请输入MQTT用户名', trigger: ['blur', 'change'] }],
        password: [{ required: true, message: '请输入订阅MQTT密码', trigger: ['blur', 'change'] }],
        maxDataLength: [{ required: true, message: '请输入最大包长', trigger: ['blur', 'change'] }],
        address: [{ required: true, message: '请输入最大地址', trigger: ['blur', 'change'] }],
        baudRate: [{ required: true, message: '请输入波特率', trigger: ['blur', 'change'] }],
        timeout: [{ required: true, message: '请输入超时时长', trigger: ['blur', 'change'] }],
        dataBits: [{ required: true, message: '请输入数据位长度', trigger: ['blur', 'change'] }],
        parity: [{ required: true, message: '请选择奇偶校验位', trigger: ['blur', 'change'] }],
        stopBits: [{ required: true, message: '请输入停止位', trigger: ['blur', 'change'] }],
        slaverId: [{ required: true, message: '请输入从机ID', trigger: ['blur', 'change'] }],
        frequency: [{ required: true, message: '请输入频率', trigger: ['blur', 'change'] }],
        'rtuConfig.uart': [{ required: true, message: '请输入串口', trigger: ['blur', 'change'] }],
        'rtuConfig.baudRate': [{ required: true, message: '请输入波特率', trigger: ['blur', 'change'] }],
        'tcpConfig.ip': [{ required: true, message: '请输入IP地址', trigger: ['blur', 'change'] }],
        'tcpConfig.port': [{ required: true, message: '请输入端口号', trigger: ['blur', 'change'] }],
        'registerParams.function': [{ required: true, message: '请输入函数', trigger: ['blur', 'change'] }],
        'registerParams.address': [{ required: true, message: '请输入地址', trigger: ['blur', 'change'] }],
        'registerParams.quantity': [{ required: true, message: '请输入数量', trigger: ['blur', 'change'] }],
        'targets.target': [{ required: true, message: '请输入目标地址', trigger: ['blur', 'change'] }],
        'targets.port': [{ required: true, message: '请输入端口号', trigger: ['blur', 'change'] }],
        'targets.community': [{ required: true, message: '请选择是否开放', trigger: ['blur', 'change'] }],
        'targets.transport': [{ required: true, message: '请输入传输模式', trigger: ['blur', 'change'] }],
        'targets.version': [{ required: true, message: '请输入版本', trigger: ['blur', 'change'] }],
        'targets.dataModels': [{ required: true, message: '请输入数据模型', trigger: ['blur', 'change'] }]
      }
    }
  },

  watch: {
    options(val) {
      this.setDefaultValue()
    }
  },

  created() {
    this.setDefaultValue()
  },

  methods: {
    // 赋初值
    setDefaultValue() {
      this.configForm = {
        moreRegisterParams: []
      }
      if (this.options && this.options.length > 0) {
        this.options.forEach((item, index) => {
          if (item.children) {
            this.configForm[item.name] = {}
            item.children.forEach((i, j) => {
              if (
                !Object.prototype.hasOwnProperty.call(
                  this.configForm[item.name],
                  i.name
                )
              ) {
                this.configForm[item.name][i.name] = i.value
              }
            })
          } else {
            this.configForm[item.name] = item.value
          }
        })
        this.configForm = Object.assign({}, this.configForm)
      }
    },

    // 新增注册参数
    addRegisterParams() {
      this.configForm.moreRegisterParams.push({
        function: 0,
        address: 0,
        quantity: 0
      })
    },
    deleteRegisterParams(item, index) {
      this.configForm.moreRegisterParams.splice(index, 1)
    },

    // 校验数据
    validateForm() {
      let flag = null
      this.$refs.configFormRef.validate(valid => {
        if (valid) {
          flag = true
          // 将值回传
          this.$emit('onChanged', this.configForm)
        } else {
          flag = false
        }
      })
      return flag
    },

    calcSpan(e) {
      const itemNum = e.length
      if (itemNum === 2) {
        return 12
      } else if (itemNum === 3) {
        return 8
      } else if (itemNum === 6) {
        return 24
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-form {
  .button-item {
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      text-align: center;
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 15px;
  }
  /deep/ .el-form-item__label {
    text-align: left;
  }
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  /deep/ .el-form-item__error {
    padding-top: 0;
  }
}
</style>
