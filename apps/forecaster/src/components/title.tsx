import { Children } from "react"

export const TitleHeader = ({children}: {children: React.ReactNode} ) => {
  return (
    <h1 className={`text-h2 text-white`}>
      {children}
    </h1>
  )
}
