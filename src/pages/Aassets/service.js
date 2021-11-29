// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import token from '@/utils/token';

/** 获取规则列表 GET /api/assets */
export async function assets(params, options) {
    return request('/api/assets', {
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
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'PUT',
        ...(options || {}),
    });
}

/** 新建规则 POST /api/assets */

export async function addAssets(data, options) {
    return request('/api/assets', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'POST',
        ...(options || {}),
    });
}
/** 删除规则 DELETE /api/assets */
export async function removeAssets(data, options) {
    return request('/api/assets', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'DELETE',
        ...(options || {}),
    });
}


