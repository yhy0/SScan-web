// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import token from '@/utils/token';

/** 获取规则列表 GET /api/rule */
export async function rule(params, options) {
    return request('/api/scanInfo', {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        params: { ...params },
        ...(options || {}),
    });
}

/** 获取规则列表 GET /api/getAssets */
export async function getAssets(params, options) {
    return request('/api/getAssetsName', {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        params: { ...params },
        ...(options || {}),
    });
}

export async function Export(data, options) {

    return request(`/api/exportScanInfo`, {
        method: 'POST',
        data,
        responseType: 'blob', // 必须注明返回二进制流
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
    }).then(res => {
        const blob = new Blob([res]);
        const objectURL = URL.createObjectURL(blob);
        let btn = document.createElement('a');
        var time = Date.parse(new Date()).toString();//获取到毫秒的时间戳，精确到毫秒
        time = time.substr(0, 10);//精确到秒
        btn.download = time + ".csv";
        btn.href = objectURL;
        btn.click();
        URL.revokeObjectURL(objectURL);
        btn = null;;
    })
};

/** 新建规则 PUT /api/rule */

export async function updateRule(data, options) {
    return request('/api/scanInfo', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'PUT',
        ...(options || {}),
    });
}
/** 新建规则 POST /api/rule */

export async function addRule(data, options) {
    return request('/api/scanInfo', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'POST',
        ...(options || {}),
    });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(data, options) {
    return request('/api/scanInfo', {
        data,
        headers: {
            Authorization: 'JWT ' + token.get(),
        },
        method: 'DELETE',
        ...(options || {}),
    });
}
