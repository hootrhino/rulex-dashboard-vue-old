import request from '@/utils/request'

export function list() {
    return request({ url: 'inends', method: 'get' })
}
export function create(data) {
    return request({ url: 'inends', method: 'post', data })
}

export function remove(uuid) {
    return request({
        method: 'delete',
        url: 'inends?uuid=' + uuid
    })
}

export function detail(uuid) {
    return request({
        method: 'get',
        url: 'inends?uuid=' + uuid
    })
}
// 127.0.0.1:2580/api/v1/inends/models?uuid=IN:a721cdbab5164e4a89ef2f12abe9ec70
export function getDataModels(uuid) {
    return request({
        method: 'get',
        url: 'inends/models?uuid=' + uuid
    })
}
