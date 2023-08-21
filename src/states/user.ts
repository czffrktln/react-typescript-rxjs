import { BehaviorSubject } from "rxjs";
import { $token, login as requestLogin } from "../api/Own";
import jwt_decode from 'jwt-decode'
import { z } from "zod";
import { $path, navigate } from "./routes"

const UserSchema = z.object({
  email: z.string(),
  sub: z.string()
})
type UserType = z.infer<typeof UserSchema>

const decodeUser = (token: string | null): UserType|null => {
  if (!token) return null
  const decoded = jwt_decode(token)
  const result = UserSchema.safeParse(decoded)
  if (result.success === false) return null
  return result.data
}

export const $user = new BehaviorSubject<UserType|null>(decodeUser($token.getValue()))
$token.subscribe(token => $user.next(decodeUser(token)))

// export const $user = new BehaviorSubject<UserType|null>(decodeUser(localStorage.getItem("token")))
// // nezzuk meg a lejaratot szepen

export const login = async (code: string): Promise<void> => {
  const token = await requestLogin(code)  
  const user = decodeUser(token)
  if (!user) return navigate("/"); 
  $user.next(user)
  localStorage.setItem("token", token!) // ! biztos hogy nem null
  navigate("/dashboard")
}

$path.subscribe((path) => {
  if (path === "/callback") {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const code = urlSearchParams.get("code")
    if (code) login(code)
  }
})

export const logout = () => {
  localStorage.removeItem("token")
  $user.next(null)
}


// const _user = new BehaviorSubject<UserType|null>(null)
// export const $user = _user.asObservable()

// export const login = async (code: string) => {
//   const token = await requestLogin(code)
//   if (!token) return console.log("token", token);
  
//   const decodedToken = jwt_decode(token)
//   const result = UserSchema.safeParse(decodedToken)
//   if (result.success === false) return console.log(result.error);
  
//   _user.next(result.data)
//   localStorage.setItem("token", token)
// }

// export const logout = () => {
//   localStorage.removeItem("token")
//   _user.next(null)
// }