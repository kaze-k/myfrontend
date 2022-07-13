/* 验证用户名 1-8位 */
export function validateUsername(value: any):any {
    let reg = /^(?=.*\S)[\S]{1,8}$/
    return !reg.test(value) ? true : false
}

/* 验证密码 6-12位 包含数字和字符，可以有特殊符号 */
export function validatePassword(value:any):any {
    let reg = /^(?=.*\d)(?=.*[a-zA-Z])[\s\S]{6,12}$/
    return !reg.test(value) ? true : false
}