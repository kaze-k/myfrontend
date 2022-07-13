import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { validateUsername, validatePassword } from '@/utils/validate'
import type { FormInstance } from 'element-plus'
import router from '@/router'
import { setToken } from '../token'
import { doLogin, doSignIn } from '@/api'

// 数据类型接口
interface LoginForm {
  username: string;
  passwd: string;
}

interface SignInFrom  extends LoginForm {
  checkPassword: string;
}

interface LoginRules {
  username: {
    validator: (rule: any, value: any, callback: any) => void;
    trigger: string;
  }[];
  passwd: {
    validator: (rule: any, value: any, callback: any) => void;
    trigger: string;
  }[];
}

interface SignInRules extends LoginRules {
  checkPassword: {
    validator: (rule: any, value:any, callback: any) => void;
    trigger: string;
  }[]
}

// 用户名验证
const validatedUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("用户名不能为空!"))
  } else if (/\s/.test(value)) {
    callback(new Error("用户名不能含有空格!"))
  } else if (validateUsername(value)) {
    callback(new Error("请输入1-8位字符的用户名!"))
  } else {
    callback()
  }
}

// 密码验证
const validatedPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空!"))
  } else if (validatePassword(value)) {
    callback(new Error("请输入6-12位包含数字、字母的密码!"))
  } else {
    callback()
  }
}

// 二次密码验证
const validatedCheckPassword = (rule: any, value: any, callback: any) => {
  if(value !== signInForm.passwd) {
    callback(new Error("两次输入的密码不一致!"))
  }
  if (value === "") {
    callback(new Error("密码不能为空!"))
  } else if (validatePassword(value)) {
    callback(new Error("请输入6-12位包含数字、字母的密码!"))
  } else {
    callback()
  }
}

// 登录
export const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      doLogin(loginForm).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          ElMessage({ message: res.data.message, type: 'success', center: true })
          setToken("username", res.data.data.username)
          setToken("token", res.data.data.token)
          router.push("/home/")
        } else {
          ElMessage({ message: res.data.message, type: 'error', center: true, grouping: true })
        }
      })
    }
  })
}

// 注册
export const signIn = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      doSignIn(signInForm).then(res => {
        console.log(res)
        if (res.data.code === 0){
          ElMessage({ message: res.data.message, type: 'success', center: true })
          location.reload()
        } else {
          ElMessage({ message: res.data.message, type: 'error', center: true })
        }
      })
    }
  })
}

// 登录表单内容
export const loginForm = reactive<LoginForm>({
  username: "",
  passwd: ""
})

// 注册表单内容
export const signInForm = reactive<SignInFrom>({
  username: "",
  passwd: "",
  checkPassword: ""
})

// 登录表单规则
export const LoginRules = reactive<LoginRules>({
  username: [{ validator: validatedUsername, trigger: 'change' }],
  passwd: [{ validator: validatedPassword, trigger: 'change' }]
})

// 注册表单规则
export const SignInRules = reactive<SignInRules>({
  username: [{ validator: validatedUsername, trigger: 'change' }],
  passwd: [{validator: validatedPassword, trigger: 'change'}],
  checkPassword: [{ validator: validatedCheckPassword, trigger: 'change' }]
})

// 登录表单
export const dologin = ref<FormInstance>()

// 注册表单
export const dosignIn = ref<FormInstance>()