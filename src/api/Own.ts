import axios, { Axios, AxiosError } from 'axios'
import { BehaviorSubject } from 'rxjs'
import { z } from "zod"
import jwt_decode from 'jwt-decode'

const client = axios.create({baseURL: "http://localhost:8000"})

const get = async (path: string) => {
  try {
    const response = await client.get(path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data);

  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      endSession()
    }
  }
}

export const $token = new BehaviorSubject<string | null>(localStorage.getItem("token"))

export const endSession = () => {
  localStorage.removeItem("token")
  $token.next(null)
}

let tokenInterval: number | null = null
$token.subscribe(token => {
  if (tokenInterval)
    clearInterval(tokenInterval)
  tokenInterval = setInterval(() => {
    if (!token) return
    const decoded = jwt_decode(token) as any
    if (decoded.exp*1000 < new Date().getTime()) {
      endSession()
    }
  }, 1000)
})

const ResponseSchema = z.object({token: z.string()})
// type ResponseType = z.infer<typeof ResponseSchema>

export const login = async (code: string): Promise<string|null> => {
  try {
    const response = await client.post("/api/login", {code})
    const result = ResponseSchema.safeParse(response.data)
    if (result.success === false) return null
    const token = response.data.token
    $token.next(token)
    localStorage.setItem("token", token)
    return token
  } catch (error) {
    return null
  }
} 

export const getSecret = async () => {
  const data = await get("/api/secret")
  console.log(data);
}