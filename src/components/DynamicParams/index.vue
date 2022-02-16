<template>
  <div class="dynamic-params">
    <el-form
      ref="dynParFormRef"
      label-position="left"
      label-width="auto"
      :model="registerParams"
    >
      <el-row :gutter="10">
        <el-col
          v-for="(item, index) in dynparams.children"
          :key="index"
          :span="6"
        >
          <el-form-item
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
              v-model.trim="registerParams[item.name]"
              type="text"
              size="small"
              :placeholder="item.placeholder"
              clearable
              @change="changed($event, item.name)"
            />
            <el-input-number
              v-if="item.type == 'el-input-number'"
              v-model.trim="registerParams[item.name]"
              size="small"
              style="width: 100%"
              controls-position="right"
              :placeholder="item.placeholder"
              @change="changed($event, item.name)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 动态增加项目 注册参数 -->
    <el-row
      v-for="(item, index) in moreRegisterParams"
      :key="index"
      :gutter="10"
    >
      <el-col
        v-for="(childrenItem, childrenIndex) in dynparams.children"
        :key="childrenIndex"
        :span="childrenIndex == 3 ? 5 : 6"
      >
        <el-form-item :label="childrenItem.label">
          <el-input
            v-if="childrenItem.type == 'el-input-text'"
            v-model.trim="item[childrenItem.name]"
            size="small"
            clearable
            type="text"
            :placeholder="childrenItem.placeholder"
          />
          <el-input-number
            v-if="childrenItem.type == 'el-input-number'"
            v-model.trim="item[childrenItem.name]"
            size="small"
            style="width: 100%"
            controls-position="right"
            :placeholder="childrenItem.placeholder"
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

    <div class="row-center-center">
      <el-button type="primary" size="small" @click="addRegisterParams">
        增加参数
      </el-button>
      <el-button type="primary" size="small" @click="saveRegisterParams">
        保存参数
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicParams',

  props: {
    dynparams: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      registerParams: {},
      moreRegisterParams: [],
      moreDynparams: [],
      result: [],
      saveDisable: true
    }
  },

  watch: {
    dynparams() {
      this.setDefaultValue()
    },
    moreRegisterParams() {
      this.calcItems()
    }
  },

  created() {
    this.setDefaultValue()
  },

  methods: {
    // 赋初值
    setDefaultValue() {
      this.registerParams = {}
      this.moreRegisterParams = []
      this.moreDynparams = []
      this.result = []
      if (this.dynparams.children && this.dynparams.children.length > 0) {
        this.dynparams.children.forEach((item1, index1) => {
          const obj1 = item1
          if (Object.prototype.toString.call(obj1) === '[object Object]') {
            this.registerParams[item1.name] = this.deepClone(item1.value)
          }
        })
        this.registerParams = Object.assign({}, this.registerParams)
      }
    },

    calcItems() {
      if (this.moreRegisterParams.length >= 1) {
        this.saveDisable = false
      } else {
        this.saveDisable = true
      }
    },

    // 新增注册参数
    addRegisterParams() {
      const obj = { ...this.registerParams }
      this.moreRegisterParams.push(obj)
    },

    deleteRegisterParams(item, index) {
      this.moreRegisterParams.splice(index, 1)
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
      this.$set(this.registerParams, key, val)
    },

    saveRegisterParams() {
      this.$refs.dynParFormRef.validate((valid) => {
        if (valid) {
          this.result = [...this.moreRegisterParams]
          this.result.unshift(this.registerParams)
          this.$emit('childChanged', this.result)
          return true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-params {
  padding-left: 40px;
  .row-center-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
