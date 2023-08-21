import { FC, ReactNode } from "react"
import useGlobal from "../hooks/useGlobal"
import { $path, navigate } from "../states/routes"

type Props = {
  path: string,
  children: ReactNode,
  hasAccess?: boolean
}

export const Route: FC<Props> = ({path, children, hasAccess = true}) => {
  const currentPath = useGlobal($path)
  if (path !== currentPath) return null
  if (!hasAccess) {
    setTimeout(() => {
      navigate("/")
    }, 0) 
    return null
  }
  return <>{children}</>
}
