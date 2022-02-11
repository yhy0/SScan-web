// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import token from '@/utils/token';

/** 获取规则列表 GET /api/rule */
export async function getXrayReport(params, options) {
  return request('/api/getXrayReport', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function getReport(url, options) {
  console.log(url);
  return request(url, {
    method: 'GET',
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

export async function addRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */

export async function removeRule(data, options) {
  return request('/api/rule', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}
