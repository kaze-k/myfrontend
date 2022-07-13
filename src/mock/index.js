const Mock = require('mockjs')

// 没有后端时临时测试的假数据

// 设置拦截ajax的请求时间
Mock.setup({
    timeout: '200-600'
})

const userList = {
    data: {
        userinfo: {
            username: "kaze",
            password: "asd123",
            token: Mock.mock('@word(100)'),
            id: "100"
        }
    },
    meta: {
        status: 200,
        message: "success"
    }
}

// 定义请求方式和路径
export default {
    'get|/user': userList
}

Mock.mock("/user/login", "post", req => {
    const { username, password } = JSON.parse(req.body)
    if (username === userList.data.userinfo.username && password === userList.data.userinfo.password) {
        return {
            code: 0,
            msg: '登录成功',
            status: 200,
            token: userList.data.userinfo.token,
            username: userList.data.userinfo.username
        }
    } else if (username === userList.data.userinfo.username && password !== userList.data.userinfo.password) {
        return {
            code: -2,
            msg: '密码错误',
            status: 200
        }
    }
    else {
        return {
            code: -1,
            msg: '用户名和密码错误',
            status: 200,
        }
    }
})