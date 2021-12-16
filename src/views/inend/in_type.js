let in_types = {
    MQTT: {
        label: "MQTT桥接",
        icon: "",
        host: "127.0.0.1",
        port: 1883,
        topic: "rulex-client-topic-1",
        clientId: "rulex1",
        username: "rulex1",
        password: "******"
    },
    HTTP: {
        icon: "",
        label: "HTTP桥接",
        port: 2581
    },

    UDP: {
        icon: "",
        label: "UDP桥接",
        port: 2582

    },
    COAP: {
        icon: "",
        label: "COAP桥接",
        port: 2583
    },
    GRPC: {
        icon: "",
        label: "GRPC桥接",
        port: 2584
    },
    UART_MODULE: {
        icon: "",
        label: "通用串口",
        "address": "uart1",
        "baudRate": 115200,
        "timeout": 5,
        "dataBits": 8,
        "parity": "N",
        "stopBits": 1
    },
    MODBUS_TCP_MASTER: {
        icon: "",
        label: "Modbus TCP主模式",
        "mode": "TCP",
        "timeout": 10,
        "slaverId": 1,
        "frequency": 3,
        "rtuConfig": {
            "uart": "COM1",
            "baudRate": 115200
        },
        "tcpConfig": {
            "ip": "127.0.0.1",
            "port": 502
        },
        "registerParams": [
            {
                "function": 3,
                "address": 0,
                "quantity": 10
            }
        ]

    },
    MODBUS_RTU_MASTER: {
        icon: "",
        label: "Modbus RTU主模式",
        "mode": "RTU",
        "timeout": 10,
        "slaverId": 1,
        "frequency": 3,
        "rtuConfig": {
            "uart": "COM1",
            "baudRate": 115200
        },
        "tcpConfig": {
            "ip": "127.0.0.1",
            "port": 502
        },
        "registerParams": [
            {
                "function": 3,
                "address": 0,
                "quantity": 10
            }
        ]

    },
    SNMP_SERVER: {
        icon: "",
        label: "SNMP协议",
        "frequency": 5,
        "timeout": 3,
        "targets": [
            {
                "target": "127.0.0.1",
                "port": 161,
                "transport": "udp",
                "community": "public",
                "version": 3,
                "dataModels": []
            }
        ]

    }
}
export default in_types
