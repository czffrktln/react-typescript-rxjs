import { FC, useEffect } from "react"
import { $messages, loadData } from "../states/messages"
import useGlobal from "../hooks/useGlobal"
import { $user, login, logout } from "../states/user"
import { Route } from "./Route"
import { getSecret } from "../api/Own"

const googleLink = "https://accounts.google.com/o/oauth2/v2/auth"
const clientId = "665656248711-h7gchpi9tpohaqrgtni6rglg8nd57tv2.apps.googleusercontent.com"
const redirectUri = "http://localhost:5173/callback"
const scope = "openid%20email%20profile"
const responseType = "code"

const googleLoginUrl = `${googleLink}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`

const Main: FC = () => {

  const messages = useGlobal($messages)

  const user = useGlobal($user)


  return (
  <main>
    
    <a href={googleLoginUrl}>LOGIN</a>
    <button onClick={logout}>LOGOUT</button>

    <Route path="/dashboard" hasAccess={!!user}><div>Dashboard</div></Route>
    <Route path="/second"><div>SECOND</div></Route>
    <Route path="/third"><div>THIRD</div></Route>

    <button onClick={getSecret}>secret</button>

    <button onClick={loadData}>Load messages</button>
    {messages.map(msg => {
      return <div>
        <h2>{msg.sender}</h2>
        <h2>{msg.receiver}</h2>
        <h2>{msg.message}</h2>
      </div>
    })}
  </main>

  )
}
export default Main