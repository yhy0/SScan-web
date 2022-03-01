// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import token from '@/utils/token';

/** 获取规则列表 GET /api/rule */
export async function xray(params, options) {
    return request('/api/getXrayVul', {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        params: { ...params },
        ...(options || {}),
    });
}
/** 新建规则 PUT /api/rule */

export async function updateRule(data, options) {
    return request('/api/rule', {
        data,
        method: 'PUT',
        ...(options || {}),
    });
}
/** 新建规则 POST /api/rule */

export async function addXrayTarget(data, options) {
    return request('/api/addXrayTarget', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'POST',
        ...(options || {}),
    });
}
/** 删除规则 DELETE /api/rule */

export async function removeXray(data, options) {
    return request('/api/delXrayVul', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'DELETE',
        ...(options || {}),
    });
}
