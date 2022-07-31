import service from '@/utils/service'

// 登录接口
export function doLogin(data: object) {
  return service({
    method: 'post',
    url: '/login',
    data: data
  })
}

// 注册接口
export function doSignIn(data: object) {
  return service({
    method: 'post',
    url: '/signIn',
    data: data
  })
}

// token验证接口
export function checkToken(username: string, token: string) {
  return service({
    method: 'post',
    url: '/token',
    data: {
      username,
      token
    }
  })
}

// 获取学生列表数据接口
export function studentList() {
  return service({
    method: 'get',
    url: '/student'
  })
}

// 删除学生数据接口
export function delStudentData(id: number) {
  return service({
    method: 'delete',
    url: '/student/delete',
    data: { id }
  })
}

// 新建学生数据接口
export function newStudentData(data: object) {
  return service({
    method: 'post',
    url: '/student/new',
    data: data
  })
}

// 更新学生数据接口
export function updateStudentData(data: Object) {
  return service({
    method: 'put',
    url: '/student/update',
    data
  })
}

// 获取用户列表接口（带密码）
export function postUsersList() {
  return service({
    method: 'post',
    url: '/users'
  })
}

// 获取用户列表接口（不带密码）
export function getUsersList() {
  return service({
    method: 'get',
    url: '/users'
  })
}

// 更新用户权限接口
export function updatePermissions(id: number, state: boolean) {
  return service({
    method: 'put',
    url: '/users/permissions',
    data: {
      id,
      state
    }
  })
}

// 更新用户登录状态接口
export function updateLoginState(id: number, state: boolean) {
  return service({
    method: 'put',
    url: '/users/loginState',
    data: {
      id,
      state
    }
  })
}

// 删除用户接口
export function delUser(id: number) {
  return service({
    method: 'delete',
    url: '/users/delete',
    data: { id }
  })
}

// 更新用户信息接口
export function updateUser(data: object) {
  return service({
    method: 'put',
    url: '/users/update',
    data: data
  })
}

// 添加用户接口
export function addUser(data: object) {
  return service({
    method: 'post',
    url: '/users/add',
    data: data
  })
}

// 个人用户修改密码接口
export function changePasswd(passwd: string, username: string) {
  return service({
    method: 'post',
    url: '/user/passwd',
    data: {
      passwd,
      username
    }
  })
}

// 个人用户修改用户名接口
export function changeUsername(newName: string, oldName: string) {
  return service({
    method: 'post',
    url: '/user/username',
    data: {
      newName,
      oldName
    }
  })
}