const in_types = {
  MQTT: [
    {
      type: 'el-input-text',
      name: 'host',
      label: 'Mqtt Server 地址',
      value: '',
      required: false,
      placeholder: '127.0.0.1'
    },
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: 0,
      required: false,
      placeholder: '1883'
    },
    {
      type: 'el-input-text',
      name: 'topic',
      label: '订阅Topic',
      value: '',
      required: false,
      placeholder: 'rulex-data-1'
    },
    {
      type: 'el-input-text',
      name: 'clientId',
      label: '客户端ID',
      value: '',
      required: false,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'username',
      value: '',
      label: 'MQTT用户名',
      required: false,
      placeholder: 'rulex-1'
    },
    {
      type: 'el-input-text',
      name: 'password',
      label: 'MQTT密码',
      value: '',
      required: false,
      placeholder: 'rulex-1'
    }
    // label: "MQTT桥接",
    // host: "127.0.0.1",
    // port: 1883,
    // topic: "rulex-client-topic-1",
    // clientId: "rulex1",
    // username: "rulex1",
    // password: "******"
  ],

  HTTP: [
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: 0,
      required: false,
      placeholder: '2581'
    }
    // label: 'HTTP桥接',
    // port: 2581
  ],

  RULEX_UDP: [
    {
      type: 'el-input-text',
      name: 'host',
      label: 'UDP 服务地址',
      value: '',
      required: false,
      placeholder: '127.0.0.1'
    },
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: 0,
      required: false,
      placeholder: '2582'
    },
    {
      type: 'el-input-number',
      name: 'maxDataLength',
      label: '最大包长',
      value: 0,
      required: false,
      placeholder: '1024'
    }
    // label: 'UDP桥接',
    // port: 2582
    // maxDataLength: 1024
  ],

  COAP: [
    {
      type: 'el-input-number',
      name: 'port',
      label: '服务端口',
      value: 0,
      required: false,
      placeholder: '2583'
    }
    // label: 'COAP桥接',
    // port: 2583
  ],

  GRPC: [
    {
      type: 'el-input-number',
      label: '服务端口',
      name: 'port',
      value: 0,
      required: false,
      placeholder: '2584'
    }
    // label: 'GRPC桥接',
    // port: 2584
  ],

  UART_MODULE: [
    {
      type: 'el-input-text',
      name: 'address',
      label: '地址',
      value: '',
      required: false,
      placeholder: 'uart1'
    },
    {
      type: 'el-input-number',
      name: 'baudRate',
      label: '波特率',
      value: 0,
      required: false,
      placeholder: '115200'
    },
    {
      type: 'el-input-number',
      name: 'timeout',
      label: '超时',
      value: 0,
      required: false,
      placeholder: '5'
    },
    {
      type: 'el-input-number',
      name: 'dataBits',
      label: '数据位',
      value: 0,
      required: false,
      placeholder: '8'
    },
    {
      type: 'el-select',
      name: 'parity',
      label: '奇偶校验位',
      value: '',
      required: false,
      placeholder: '请选择',
      selectOptions: [
        { value: '', label: '请选择' },
        { value: 'N', label: '无校验' },
        { value: 'E', label: '偶校验' },
        { value: 'O', label: '奇校验' }
      ]
    },
    {
      type: 'el-input-number',
      name: 'stopBits',
      label: '停止位',
      value: 0,
      required: false,
      placeholder: '1'
    }
    // label: '通用串口',
    // address: 'uart1',
    // baudRate: 115200,
    // timeout: 5,
    // dataBits: 8,
    // parity: 'N',
    // stopBits: 1
  ],

  MODBUS_TCP_MASTER: [
    {
      type: 'el-input-number',
      name: 'timeout',
      label: '超时',
      value: 0,
      required: false,
      placeholder: '10'
    },
    {
      type: 'el-input-number',
      name: 'slaverId',
      label: '从机id',
      value: 0,
      required: false,
      placeholder: '1'
    },
    {
      type: 'el-input-number',
      name: 'frequency',
      label: '频率',
      value: 0,
      required: false,
      placeholder: '3'
    },
    {
      type: 'el-inline',
      label: '串口配置',
      name: 'rtuConfig',
      children: [
        {
          type: 'el-input-text',
          name: 'uart',
          label: '串口',
          value: '',
          required: false,
          placeholder: 'COM1'
        },
        {
          type: 'el-input-number',
          name: 'baudRate',
          label: '波特率',
          value: 0,
          required: false,
          placeholder: '115200'
        }
      ]
    },
    {
      type: 'el-inline',
      label: 'TCP配置',
      name: 'tcpConfig',
      children: [
        {
          type: 'el-input-text',
          name: 'ip',
          label: 'ip',
          value: '',
          required: false,
          placeholder: '127.0.0.1'
        },
        {
          type: 'el-input-number',
          name: 'port',
          label: '端口',
          value: 0,
          required: false,
          placeholder: '502'
        }
      ]
    },
    {
      type: 'el-inline',
      label: '注册参数',
      name: 'registerParams',
      children: [
        {
          type: 'el-input-number',
          name: 'function',
          label: '函数',
          value: 0,
          required: false,
          placeholder: '3'
        },
        {
          type: 'el-input-number',
          name: 'address',
          label: '地址',
          value: 0,
          required: false,
          placeholder: '0'
        },
        {
          type: 'el-input-number',
          name: 'quantity',
          label: '数量',
          value: 0,
          required: false,
          placeholder: '10'
        }
      ]
    }
    // label: 'Modbus TCP主模式',
    // timeout: 10,
    // slaverId: 1,
    // frequency: 3,
    // rtuConfig: {
    //   uart: 'COM1',
    //   baudRate: 115200
    // },
    // tcpConfig: {
    //   ip: '127.0.0.1',
    //   port: 502
    // },
    // registerParams: [
    //   {
    //     function: 3,
    //     address: 0,
    //     quantity: 10
    //   }
    // ]
  ],

  MODBUS_RTU_MASTER: [
    {
      type: 'el-input-number',
      name: 'timeout',
      label: '超时',
      value: 0,
      required: false,
      placeholder: '10'
    },
    {
      type: 'el-input-number',
      name: 'slaverId',
      label: '从机id',
      value: 0,
      required: false,
      placeholder: '1'
    },
    {
      type: 'el-input-number',
      name: 'frequency',
      label: '频率',
      value: 0,
      required: false,
      placeholder: '3'
    },
    {
      type: 'el-inline',
      label: '串口配置',
      name: 'rtuConfig',
      children: [
        {
          type: 'el-input-text',
          name: 'uart',
          label: '串口',
          value: '',
          required: false,
          placeholder: 'COM1'
        },
        {
          type: 'el-input-number',
          name: 'baudRate',
          label: '波特率',
          value: 0,
          required: false,
          placeholder: '115200'
        }
      ]
    },
    {
      type: 'el-inline',
      label: 'TCP配置',
      name: 'tcpConfig',
      children: [
        {
          type: 'el-input-text',
          name: 'ip',
          label: 'ip',
          value: '',
          required: false,
          placeholder: '127.0.0.1'
        },
        {
          type: 'el-input-number',
          name: 'port',
          label: '端口',
          value: 0,
          required: false,
          placeholder: '502'
        }
      ]
    },
    {
      type: 'el-inline',
      label: '注册参数',
      name: 'registerParams',
      children: [
        {
          type: 'el-input-number',
          name: 'function',
          label: '函数',
          value: 0,
          required: false,
          placeholder: '3'
        },
        {
          type: 'el-input-number',
          name: 'address',
          label: '地址',
          value: 0,
          required: false,
          placeholder: '0'
        },
        {
          type: 'el-input-number',
          name: 'quantity',
          label: '数量',
          value: 0,
          required: false,
          placeholder: '10'
        }
      ]
    }

    // label: 'Modbus RTU主模式',
    // timeout: 10,
    // slaverId: 1,
    // frequency: 3,
    // rtuConfig: {
    //   uart: 'COM1',
    //   baudRate: 115200
    // },
    // tcpConfig: {
    //   ip: '127.0.0.1',
    //   port: 502
    // },
    // registerParams: [
    //   {
    //     function: 3,
    //     address: 0,
    //     quantity: 10
    //   }
    // ]
  ],

  SNMP_SERVER: [
    {
      type: 'el-input-number',
      name: 'frequency',
      label: '频率',
      value: 0,
      required: false,
      placeholder: '5'
    },
    {
      type: 'el-input-number',
      name: 'timeout',
      label: '超时',
      value: 0,
      required: false,
      placeholder: '3'
    },
    {
      type: 'el-inline',
      label: '目标配置',
      name: 'targets',
      children: [
        {
          type: 'el-input-text',
          name: 'target',
          label: '目标地址',
          value: '',
          required: false,
          placeholder: '127.0.0.1'
        },
        {
          type: 'el-input-number',
          name: 'port',
          label: '端口',
          value: 0,
          required: false,
          placeholder: '161'
        },
        {
          type: 'el-input-text',
          name: 'transport',
          label: '传输模式',
          value: '',
          required: false,
          placeholder: 'udp'
        },
        {
          type: 'el-select',
          name: 'community',
          label: '开放',
          value: '',
          required: false,
          placeholder: '请选择',
          selectOptions: [
            { value: '', label: '请选择' },
            { value: 'public', label: '开放' },
            { value: 'private', label: '不开放' }
          ]
        },
        {
          type: 'el-input-number',
          name: 'version',
          label: '版本',
          value: 0,
          required: false,
          placeholder: '3'
        },
        {
          type: 'el-input-text',
          name: 'dataModels',
          label: '数据模型',
          value: '',
          required: false,
          placeholder: ''
        }
      ]
    }

    // label: "SNMP协议",
    // frequency: 5,
    // timeout: 3,
    // targets: [
    //   {
    //     target: "127.0.0.1",
    //     port: 161,
    //     transport: "udp",
    //     community: "public",
    //     version: 3,
    //     dataModels: [],
    //   },
    // ],
  ]
}
export default in_types

