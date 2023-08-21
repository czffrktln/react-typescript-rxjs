import { BehaviorSubject } from "rxjs"

export const $path = new BehaviorSubject(window.location.pathname)

export const navigate = (nextPage: string): void => {
  window.history.pushState({}, "", nextPage)
  $path.next(nextPage)
}

window.addEventListener("popstate", () => {
  $path.next(window.location.pathname)
})
