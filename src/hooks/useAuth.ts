import { useState, useEffect } from 'react'

/* Constants */
import { localStorageItems as items } from '@src/constants'

const useAuth = (): { token: string | null } => {
   const [token, setToken] = useState(() => {
      const token = localStorage.getItem(items.TOKEN)
      return token || null
   })

   const handleChangeStorage = (/* e: WindowEventMap['storage'] */) => {
      setToken(() => {
         const token = localStorage.getItem(items.TOKEN)
         return token || null
      })
   }

   useEffect(() => {
      window.addEventListener('storage', handleChangeStorage)

      return () => {
         window.removeEventListener('storage', handleChangeStorage)
      }
   }, [])

   return { token }
}

export default useAuth
