let out_types = {
    MQTT: {
        icon: "",
        label: "MQTT桥接",
        host: "127.0.0.1",
        port: 1883,
        dataTopic: "rulex-data-1",
        clientId: "rulex-1",
        username: "rulex-1",
        password: "******",
        // form: [
        //     {
        //         "type": "input",
        //         "field": "host",
        //         "title": "服务地址",
        //         "info": "Mqtt Server 地址",
        //         "hidden": false,
        //         "value": "127.0.0.1",
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "127.0.0.1",
        //             "showWordLimit": false
        //         }

        //     },
        //     {
        //         "type": "input",
        //         "field": "port",
        //         "title": "服务端口",
        //         "value": 1883,
        //         "info": "Mqtt Server 端口",
        //         "props": {
        //             "type": "number",
        //             "placeholder": "1883"
        //         },
        //         "hidden": false,
        //         "display": true

        //     },
        //     {
        //         "type": "input",
        //         "field": "dataTopic",
        //         "title": "订阅Topic",
        //         "info": "订阅Topic",
        //         "value": "rulex-data-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-data-1"
        //         }

        //     },
        //     {
        //         "type": "input",
        //         "field": "clientId",
        //         "title": "客户端ID",
        //         "info": "客户端ID",
        //         "value": "rulex-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "username",
        //         "value": "rulex-1",
        //         "title": "MQTT用户名",
        //         "info": "MQTT用户名",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "password",
        //         "title": "MQTT密码",
        //         "value": "rulex-1",
        //         "info": "MQTT密码",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "password",
        //             "placeholder": "rulex-1"
        //         }

        //     }
        // ]

    },
    MQTT_TELEMETRY_TARGET: {
        icon: "",
        label: "MQTT遥测",
        host: "127.0.0.1",
        port: 1883,
        s2cTopic: "rulex-client-1",
        toplogyTopic: "rulex-toplogy-1",
        logTopic: "rulex-logTopic-1",
        dataTopic: "rulex-data-1",
        stateTopic: "rulex-state-1",
        clientId: "rulex-1",
        username: "rulex-1",
        password: "******",
        // form: [
        //     {
        //         "type": "input",
        //         "field": "host",
        //         "title": "服务地址",
        //         "info": "Mqtt Server 地址",
        //         "hidden": false,
        //         "value": "127.0.0.1",
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "127.0.0.1",
        //             "showWordLimit": false
        //         }

        //     },
        //     {
        //         "type": "input",
        //         "field": "port",
        //         "title": "服务端口",
        //         "value": 1883,
        //         "info": "Mqtt Server 端口",
        //         "props": {
        //             "type": "number",
        //             "placeholder": "1883"
        //         },
        //         "hidden": false,
        //         "display": true

        //     },
        //     {
        //         "type": "input",
        //         "field": "s2cTopic",
        //         "title": "订阅Topic",
        //         "info": "订阅Topic",
        //         "value": "rulex-s2cTopic-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-s2cTopic-1"
        //         }

        //     },
        //     {
        //         "type": "input",
        //         "field": "toplogyTopic",
        //         "title": "拓扑同步 Topic",
        //         "info": "拓扑同步 Topic",
        //         "value": "rulex-toplogy-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-toplogy-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "logTopic",
        //         "title": "日志同步 Topic",
        //         "info": "日志同步 Topic",
        //         "value": "rulex-logTopic-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-logTopic-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "stateTopic",
        //         "title": "状态同步 Topic",
        //         "info": "状态同步 Topic",
        //         "value": "rulex-state-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-state-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "dataTopic",
        //         "title": "自定义数据上传 Topic",
        //         "info": "自定义数据上传 Topic",
        //         "value": "rulex-data-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-data-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "clientId",
        //         "title": "客户端ID",
        //         "info": "客户端ID",
        //         "value": "rulex-1",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "username",
        //         "value": "rulex-1",
        //         "title": "MQTT用户名",
        //         "info": "MQTT用户名",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "text",
        //             "placeholder": "rulex-1"
        //         }

        //     }, {
        //         "type": "input",
        //         "field": "password",
        //         "title": "MQTT密码",
        //         "value": "rulex-1",
        //         "info": "MQTT密码",
        //         "hidden": false,
        //         "display": true,
        //         "props": {
        //             "type": "password",
        //             "placeholder": "rulex-1"
        //         }

        //     }
        // ]
    },
    MONGO_SINGLE: {
        icon: "",
        label: "MongoDB单节点模式",
        mongoUrl: "mongodb://user:password@127.0.0.1:27017/?authSource=admin",
        database: "rulex",
        collection: "rulex_data",
        // form: [
        //     {
        //         "type": "input",
        //         "field": "mongoUrl",
        //         "title": "MongoDB URL",
        //         "value": "mongodb://user:password@127.0.0.1:27017/?authSource=admin",
        //         "info": "",
        //         "props": {
        //             "type": "text"
        //         },
        //         "hidden": false,
        //         "display": true,
        //         "validate": [
        //             {
        //                 "trigger": "change",
        //                 "mode": "",
        //                 "message": "",
        //                 "type": "string"
        //             }
        //         ]
        //     }, {
        //         "type": "input",
        //         "field": "database",
        //         "title": "MongoDB数据库",
        //         "value": "rulex",
        //         "info": "",
        //         "props": {
        //             "type": "text"
        //         },
        //         "hidden": false,
        //         "display": true,
        //         "validate": [
        //             {
        //                 "trigger": "change",
        //                 "mode": "",
        //                 "message": "",
        //                 "type": "string"
        //             }
        //         ]
        //     }, {
        //         "type": "input",
        //         "field": "collection",
        //         "title": "MongoDB集合",
        //         "value": "rulex_db",
        //         "info": "",
        //         "props": {
        //             "type": "text",
        //             "clearable": true,
        //             "showPassword": false
        //         },
        //         "hidden": false,
        //         "display": true,
        //         "validate": [
        //             {
        //                 "trigger": "change",
        //                 "mode": "",
        //                 "message": "",
        //                 "type": "string"
        //             }
        //         ]
        //     }
        // ]
    }
}
export default out_types
