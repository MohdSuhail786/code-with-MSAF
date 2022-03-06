import { useLayoutEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { role } from "../../../config"
import { fetchData } from "../../../middleware/RequestHandler"
import { getUserData, isUserLoggedIn, logout } from "../../../utils"
import { login } from "../../student/Login/store/action"

export default function useAuth() {
    const [userRole,setUserRole] = useState('unknown')
    
    useLayoutEffect(async()=>{
      const role = !isUserLoggedIn() ? 'unknown' : await fetchUserRole() 
      setUserRole(role)
    },[])
  
    const fetchUserRole = async() => {
      if(!localStorage.accessToken) return 'unknown'
      const res = await fetchData(`/verify-token`,{})
      if(!res.auth) {
        logout()
        return 'unknown'
      }
      localStorage.user = JSON.stringify(res.data.user)
      return res.data.user.role
    }
    return {userRole,setUserRole}
}