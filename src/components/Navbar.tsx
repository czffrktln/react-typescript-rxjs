import { FC, useState } from "react"
import { $messages } from "../states/messages"
import useGlobal from "../hooks/useGlobal"
import { $user } from "../states/user"
import { navigate } from "../states/routes"


const Navbar: FC = () => {
  
  const user = useGlobal($user)
  const messages = useGlobal($messages)
  
  const hasMessages = messages.length > 0

  
  
  return (
    <nav>
      <button onClick={() => navigate("/first")}>First</button>
      <button onClick={() => navigate("/second")}>Second</button>
      <button onClick={() => navigate("/third")}>Third</button>

      

      {user && <h2>Hello {user.email}</h2>}
      {hasMessages ? <h1>You have new messages</h1> : <h1>You have no messages</h1>}
    </nav>
  )
}
export default Navbar