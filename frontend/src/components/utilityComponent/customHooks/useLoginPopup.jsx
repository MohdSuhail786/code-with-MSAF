import { useState } from "react"
export default function useLoginPopup() {
    const [loginpopup,setLoginPopup] = useState({open:false,callback:()=>{}})
    const showLoginPopup = ({callback}) => {
        setLoginPopup({open:true,callback})
      }
    
      const closeLoginPopup = ()=>{
        setLoginPopup({open:false,callback:()=>{}})
      }

      return {loginpopup,showLoginPopup,closeLoginPopup}
}