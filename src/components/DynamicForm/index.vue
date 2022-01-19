<template>
  <div class="dynamic-form">
    <el-form
      ref="configFormRef"
      :model="configForm"
      label-width="auto"
      label-position="left"
    >
      <template v-for="item in options_">
        <el-form-item
          v-if="item.type !== 'el-inline'"
          :key="item.name"
          :label="item.label"
          :prop="item.name"
          :rules="[
            {
              required: item.required,
              message: `请输入${item.label}`,
              trigger: 'blur',
            },
          ]"
        >
          <el-input
            v-if="item.type == 'el-input-text'"
            v-model.trim="configForm[item.name]"
            type="text"
            size="small"
            :placeholder="item.placeholder"
            clearable
            maxlength="100"
            @change="changed($event, item.name)"
          />
          <el-input-number
            v-if="item.type == 'el-input-number'"
            v-model.trim="configForm[item.name]"
            size="small"
            style="width: 100%"
            controls-position="right"
            :placeholder="item.placeholder"
            @change="changed($event, item.name)"
          />
          <el-select
            v-if="item.type === 'el-select'"
            v-model="configForm[item.name]"
            style="width: 100%"
            clearable
            size="small"
            :placeholder="item.placeholder"
            @change="changed($event, item.name)"
          >
            <el-option
              v-for="itemChild in item.selectOptions"
              :key="itemChild.name"
              :label="itemChild.label"
              :value="itemChild.value"
            />
          </el-select>
        </el-form-item>

        <el-row v-if="item.type === 'el-inline'" :key="item.name" :gutter="10">
          <el-col
            v-for="childrenItem in item.children"
            :key="childrenItem.name"
            :span="calcSpan(item.children)"
          >
            <el-form-item
              :label="childrenItem.label"
              :prop="item.name + '.' + childrenItem.name"
              :rules="[
                {
                  required: childrenItem.required,
                  message: `请输入${childrenItem.label}`,
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                v-if="childrenItem.type == 'el-input-text'"
                v-model="configForm[item.name][childrenItem.name]"
                size="small"
                clearable
                :placeholder="childrenItem.placeholder"
                @change="changed($event, `${item.name}.${childrenItem.name}`)"
              />
              <el-input-number
                v-if="childrenItem.type == 'el-input-number'"
                v-model="configForm[item.name][childrenItem.name]"
                size="small"
                style="width: 100%"
                controls-position="right"
                clearable
                :placeholder="childrenItem.placeholder"
                @change="changed($event, `${item.name}.${childrenItem.name}`)"
              />
              <el-select
                v-if="childrenItem.type == 'el-select'"
                v-model="configForm[item.name][childrenItem.name]"
                style="width: 100%"
                clearable
                size="small"
                :placeholder="childrenItem.placeholder"
                @change="changed($event, `${item.name}.${childrenItem.name}`)"
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
        :gutter="10"
      >
        <el-col :span="6">
          <el-form-item
            label="标签"
            :prop="'moreRegisterParams.' + index + '.tag'"
            :rules="[
              { required: true, message: '请输入标签', trigger: 'blur' },
            ]"
          >
            <el-input v-model="item.tag" size="small" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="功能代码"
            :prop="'moreRegisterParams.' + index + '.function'"
            :rules="[{ required: true, message: `请输入${configForm.mode}`, trigger: 'blur' }]"
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
        <el-col :span="6">
          <el-form-item
            label="起始地址"
            :prop="'moreRegisterParams.' + index + '.address'"
            :rules="[
              { required: true, message: '请输入起始地址', trigger: 'blur' },
            ]"
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
        <el-col :span="5">
          <el-form-item
            label="读取数量"
            :prop="'moreRegisterParams.' + index + '.quantity'"
            :rules="[
              { required: true, message: '请输入读取数量', trigger: 'blur' },
            ]"
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
        <el-col :span="1" class="delete-icon">
          <i
            class="el-icon-delete"
            style="cursor: pointer"
            @click="deleteRegisterParams(item, index)"
          />
        </el-col>
      </el-row>

      <el-form-item v-if="!isEmpty(configForm.mode)" class="button-item">
        <el-button type="primary" size="small" @click="addRegisterParams">
          增加参数
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import in_types from './../../views/inend/in_type'
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      configForm: {
        moreRegisterParams: []
      },
      options_: [],
      tcpConfig: [],
      rtuConfig: [],
      mergeTcpConfig: [],
      mergeRtuConfig: []
    }
  },

  watch: {
    options() {
      this.options_ = this.options
    },
    options_() {
      this.setDefaultValue()
    }
  },

  created() {
    this.options_ = this.options
    this.initModbus()
  },

  methods: {
    // 赋初值
    setDefaultValue() {
      this.configForm = {
        moreRegisterParams: []
      }
      if (this.options_ && this.options_.length > 0) {
        this.options_.forEach((item1, index1) => {
          const obj1 = item1
          if (item1.children) {
            this.configForm[item1.name] = {}
            item1.children.forEach((item2, index2) => {
              this.configForm[item1.name][item2.name] = item2.value
            })
          } else {
            if (Object.prototype.toString.call(obj1) === '[object Object]') {
              this.configForm[item1.name] = this.deepClone(item1.value)
            }
          }
        })
        this.configForm = Object.assign({}, this.configForm)
      }
    },

    initModbus() {
      this.tcpConfig = in_types['TCP']
      this.rtuConfig = in_types['RTU']
    },

    // 新增注册参数
    addRegisterParams() {
      this.configForm.moreRegisterParams.push({
        tag: '',
        function: 3,
        address: 0,
        quantity: 10
      })
    },

    deleteRegisterParams(item, index) {
      this.configForm.moreRegisterParams.splice(index, 1)
    },

    // 校验数据
    validateForm() {
      let flag = null
      this.$refs.configFormRef.validate((valid) => {
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
      let colSpan = 24
      switch (e.length) {
        case 2:
          colSpan = 12
          break
        case 3:
          colSpan = 8
          break
        case 4:
          colSpan = 6
          break
        default:
          colSpan = 24
      }
      return colSpan
    },

    isEmpty(obj) {
      if (typeof obj === 'number' && !isNaN(obj)) {
        return false
      }
      if (!obj) {
        return true
      }
      return Object.keys(obj).length < 1
    },

    // 对象深拷贝
    deepClone(data) {
      var type = this.getObjectType(data)
      var obj
      if (type === 'array') {
        obj = []
      } else if (type === 'object') {
        obj = {}
      } else {
        // 不再具有下一层次
        return data
      }
      if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
          data[i] = (() => {
            if (data[i] === 0) {
              return data[i]
            }
            return data[i]
          })()
          if (data[i]) {
            delete data[i].$parent
          }
          obj.push(this.deepClone(data[i]))
        }
      } else if (type === 'object') {
        for (var key in data) {
          if (data) {
            delete data.$parent
          }
          obj[key] = this.deepClone(data[key])
        }
      }
      return obj
    },

    // 获取对象类型
    getObjectType(obj) {
      var toString = Object.prototype.toString
      var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
      }
      if (obj instanceof Element) {
        return 'element'
      }
      return map[toString.call(obj)]
    },

    changed(val, key) {
      if (val === 'TCP') {
        this.options_ = this.tcpConfig
        this.options_[0].value = 'TCP'
      } else if (val === 'RTU') {
        this.options_ = this.rtuConfig
        this.options_[0].value = 'RTU'
      }
      this.$set(this.configForm, key, val)
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
  .delete-icon {
    text-align: center;
  }
}
</style>
