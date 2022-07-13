export function setToken(tokenKey: string, token: any): any {
    return localStorage.setItem(tokenKey, token)
}

export function getToken(tokenKey: string): any {
    return localStorage.getItem(tokenKey)
}

export function removeToken(): any {
    return localStorage.clear()
}