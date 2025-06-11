import { useEffect, useState } from "react"

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const res = await fetch("https://chat-app-cl4v.onrender.com/api/me", {
          credentials: "include" 
        })

        setIsAuthenticated(res.ok)
      } catch  {
        setIsAuthenticated(false)
      }
    }

    verificarAuth()
  }, [])

  return { isAuthenticated }
}
