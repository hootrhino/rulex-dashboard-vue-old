const out_types = {
  MQTT: [
    {
      type: 'el-input-text',
      name: 'host',
      label: '服务地址',
      value: '127.0.0.1',
      required: true,
      placeholder: '127.0.0.1'
    },
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: '1883',
      required: true,
      placeholder: '1883'
    },
    {
      type: 'el-input-text',
      name: 'dataTopic',
      label: '订阅Topic',
      value: 'rulex-data-1',
      required: true,
      placeholder: 'rulex-data-1'
    },
    {
      type: 'el-input-text',
      name: 'clientId',
      label: '客户端ID',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'username',
      label: 'MQTT用户名',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'password',
      label: 'MQTT密码',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    }
    // icon: '',
    // label: 'MQTT桥接',
    // host: '127.0.0.1',
    // port: 1883,
    // dataTopic: 'rulex-data-1',
    // clientId: 'rulex-1',
    // username: 'rulex-1',
    // password: '******'
  ],

  MQTT_TELEMETRY_TARGET: [
    {
      type: 'el-input-text',
      name: 'host',
      label: '服务地址',
      value: '127.0.0.1',
      required: true,
      placeholder: '127.0.0.1'
    },
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: '1883',
      required: true,
      placeholder: '1883'
    },
    {
      type: 'el-input-text',
      name: 's2cTopic',
      label: '订阅Topic',
      value: 'rulex-client-1',
      required: true,
      placeholder: 'rulex-client-1'
    },
    {
      type: 'el-input-text',
      name: 'toplogyTopic',
      label: '拓扑同步Topic',
      value: 'rulex-toplogy-1',
      required: true,
      placeholder: 'rulex-toplogy-1'
    },
    {
      type: 'el-input-text',
      name: 'logTopic',
      label: '日志同步Topic',
      value: 'rulex-logTopic-1',
      required: true,
      placeholder: 'rulex-logTopic-1'
    },
    {
      type: 'el-input-text',
      name: 'dataTopic',
      label: '自定义数据上传Topic',
      value: 'rulex-data-1',
      required: true,
      placeholder: 'rulex-data-1'
    },
    {
      type: 'el-input-text',
      name: 'stateTopic',
      label: '状态同步Topic',
      value: 'rulex-state-1',
      required: true,
      placeholder: 'rulex-state-1'
    },
    {
      type: 'el-input-text',
      name: 'clientId',
      label: '客户端ID',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'username',
      label: 'MQTT用户名',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'password',
      label: 'MQTT密码',
      value: 'rulex-1',
      required: true,
      placeholder: 'rulex-1'
    }
    // icon: '',
    // label: 'MQTT遥测',
    // host: '127.0.0.1',
    // port: 1883,
    // s2cTopic: 'rulex-client-1',
    // toplogyTopic: 'rulex-toplogy-1',
    // logTopic: 'rulex-logTopic-1',
    // dataTopic: 'rulex-data-1',
    // stateTopic: 'rulex-state-1',
    // clientId: 'rulex-1',
    // username: 'rulex-1',
    // password: '******'
  ],

  MONGO_SINGLE: [
    {
      type: 'el-input-text',
      name: 'mongoUrl',
      label: 'MongoDB URL',
      value: 'mongodb://user:password@127.0.0.1:27017/?authSource=admin',
      required: true,
      placeholder: 'mongodb://user:password@127.0.0.1:27017/?authSource=admin'
    },
    {
      type: 'el-input-text',
      name: 'database',
      label: 'MongoDB数据库',
      value: 'rulex',
      required: true,
      placeholder: 'rulex'
    },
    {
      type: 'el-input-text',
      name: 'collection',
      label: 'MongoDB集合',
      value: 'rulex_data',
      required: true,
      placeholder: 'rulex_data'
    }
    // icon: "",
    // label: "MongoDB单节点模式",
    // mongoUrl: "mongodb://user:password@127.0.0.1:27017/?authSource=admin",
    // database: "rulex",
    // collection: "rulex_data",
  ]
}
export default out_types
