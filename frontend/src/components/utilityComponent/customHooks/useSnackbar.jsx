import { useState } from "react"
export default function useSnackbar() {
    const [snackbar,setSnackBar] = useState({open:false,message:'',severity:''})
    const showSnackbar = ({message,severity}) => {
        setSnackBar({open:true,message,severity})
      }
    
      const closeSnackbar = ()=>{
        setSnackBar({open:false,message:"",severity:""})
      }

      return {snackbar,showSnackbar,closeSnackbar}
}