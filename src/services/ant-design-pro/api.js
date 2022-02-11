// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import token from '@/utils/token';

/** 获取当前的用户 GET /api/user/currentUser */
export async function currentUser(options) {
  return request('/api/user/currentUser', {
    headers: {
      Authorization: 'JWT ' + token.get(),
    },
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/user/logout */
export async function outLogin(options) {
  return request('/api/user/logout', {
    headers: {
      Authorization: 'JWT ' + token.get(),
    },
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body, options) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/assets */
export async function rule(params, options) {
  return request('/api/assets', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 新建规则 POST /api/assets */

export async function addRule(options) {
  return request('/api/assets', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/assets */

export async function removeRule(options) {
  return request('/api/assets', {
    method: 'DELETE',
    ...(options || {}),
  });
}
