import { BehaviorSubject } from "rxjs"

type Message = {
  sender: string,
  receiver: string,
  message: string
}

export const $messages = new BehaviorSubject<Message[]>([])

export const loadData = () => {
  $messages.next([
    {sender: "Joe", receiver: "Taylor", message: "Hello"},
    {sender: "Taylor", receiver: "Joe", message: "Szia"},
    {sender: "Joe", receiver: "Taylor", message: "Szevasz"},
  ])
}

