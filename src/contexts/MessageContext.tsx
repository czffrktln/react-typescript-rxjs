import { createContext, FC, ReactNode, useContext, useState } from "react";

const MessageContext = createContext<MessageContextType | null>(null)

export type Message = {
  sender: string,
  receiver: string,
  message: string
}

const useMessages = () => {

  const [ messages, setMessages ] = useState<Message[]>([])
    
  const loadData = () => {
    setMessages([
      {sender: "Joe", receiver: "Taylor", message: "Hello"},
      {sender: "Taylor", receiver: "Joe", message: "Szia"},
      {sender: "Joe", receiver: "Taylor", message: "Szevasz"},
    ])
  }

  return { messages, loadData }
}

type Props = {
  children: ReactNode
}

type MessageContextType = {
  loadData: () => void
  messages: Message[]
}

export const MessageProvider: FC<Props> = ({children}) => {
  const { messages, loadData } = useMessages()
  return (
    <MessageContext.Provider value={{messages, loadData}}>
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageContext = () => {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error("UseMessageContext must be used in MessageContextProvider")
  }
  return context
}

