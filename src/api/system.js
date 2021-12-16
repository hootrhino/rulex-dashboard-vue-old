import request from '@/utils/request'

export function system() {
    return request({url: 'system', method: 'get'})
}
export function statistics() {
    return request({url: 'statistics', method: 'get'})
}
export function resourceCount() {
    return request({url: 'resourceCount', method: 'get'})
}
export function logs() {
    return request({url: 'logs', method: 'get'})
}
