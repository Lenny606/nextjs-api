//bearer TOKEN
const validate = (token: any) => {
    const validToken = true
    if (!validToken || !token) {
        return false
    }
    return true
}

export function authMiddleware(req: Request) {
    const token = req.headers.get('authorization')?.split(' ')[1]

    const isValid = validate(token)

    return { isValid };
}