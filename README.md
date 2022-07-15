# myfrontend

> 我的第一个前端项目
>
> vue3+setup+element-plus前端项目，学生管理后台，包含管理员和普通用户的权限管理

后端仓库：[mybackend](https://github.com/kaze-k/mybackend)

效果展示：[www.lsh28.cn:5000](http://www.lsh28.cn:5000)

## 项目设置

### 安装项目依赖
```
yarn install
```

### 开发阶段的编译和热加载
```
yarn serve
```

### 项目打包
```
yarn build
```

### 检查和修复文件
```
yarn lint
```

### 自定义配置
Vue CLI 的[配置参考](https://cli.vuejs.org/zh/config/)。

## 项目部署

### Niginx配置
``` conf
server 
{
    location / {
        # vue-router在html5 history模式下的配置
        try_files $uri $uri/ /index.html;
    }

    # 后端API代理转发
    location ~ /api/ {
        proxy_pass http://xxx:xxx/
    }
}
```

vue Router [HTML5 History 模式](https://v3.router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

Nginx中文文档 [完整配置示例](https://www.nginx.cn/doc/example/fullexample2.html)

## 功能

- 初始页(登录和注册)
- 404页(没有此页面的路由时才会显示)
- 首页(没什么用)
- 用户中心
    - 修改当前用户密码
    - 修改当前用户密码
- 学生管理
    - 学生列表(需管理员权限)
        - 增删查改学生信息
    - 学生信息
        - 学生信息预览(查询)
- 权限管理
    - 管理员列表(需管理员权限)
        - 增删查改用户信息(修改用户密码和用户名、新增用户、设置管理员、设置登录状态)
    - 用户列表
        - 当前已注册用户的预览(用户名、是否为管理员、是否为可登录)

> 默认root为超级管理员，无法修改用户名和密码，无法在权限管理的两个页面中显示其信息。
>
> 其他用户注册后都为普通用户，需root用户提权为管理员。

## API

| 请求方式 | url                   | 参数                                                         | 功能 |
| ---- | ----                   | ----                                                      | ---- |
| post | /api/login             | data: { username, passwd }                                | 登录 |
| post | /api/signIn            | data: { username, passwd }                                | 注册 |
| post | /api/token             | data: { username, token }                                 | token验证 |
| get  | /api/student           | 无                                                         | 获取学生列表数据 |
| post | /api/student/delete    | data: id                                                  | 删除学生数据 |
| post | /api/student/new       | data: { id, num, class, Sname, sex, age, address, phone } | 新建学生数据 |
| post | /api/student/update    | data: { id, num, class, Sname, sex, age, address, phone } | 更新学生数据
| post | /api/users             | 无                                                         | 获取用户列表(带用户密码) |
| get  | /api/users             | 无                                                         | 获取用户列表(不带用户密码) |
| post | /api/users/permissions | data: { id, state }                                       | 更新用户权限 |
| post | /api/users/loginState  | data: { id, state }                                       | 更新用户登录状态 |
| post | /api/users/delete      | data: id                                                  | 删除用户 |
| post | /api/users/add         | data: { id, username, passwd }                            | 添加用户 |
| post | /api/user/passwd       | data: { passwd, username }                                | 用户修改密码 |
| post | /api/user/username     | data: { newName, oldName }                                | 用户修改用户名 |
