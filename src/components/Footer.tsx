import { FC } from "react"
import { $messages } from "../states/messages"
import useGlobal from "../hooks/useGlobal"
import { $user } from "../states/user"
import useRXjs from "../hooks/useRXjs"

const Footer: FC = () => {

  const messages = useRXjs($messages)
  const user = useRXjs($user)

  // const user = useGlobal($user)
  // const messages = useGlobal($messages)

  // const user = useGlobal($user, null)
  // const messages = useGlobal($messages, [])

  const count = messages.length

  return (
    <footer>
        {user && <h2>Hello {user.email}</h2>}
        <h3>number of messages : {count}</h3>
      </footer>
  )
}
export default Footer