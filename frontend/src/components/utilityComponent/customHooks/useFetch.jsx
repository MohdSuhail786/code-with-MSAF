import { useContext } from "react";
import { useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { fetchData } from "../../../middleware/RequestHandler";

export default function useFetch(url,method) {
    const appContext = useContext(AppContext)
    const [data, setData] = useState(null);
    const [waiting, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(async()=>{
        setLoading(true);
        setData(null);
        setError(null);
        const response = await fetchData(url,{method})
        setLoading(false)
        if(!response.status) {
            appContext.showSnackbar({message:response.data,severity:"error"})
            setError(response.data)
            return
        }
        setData(response.data)
    },[url,method])

    return {data,waiting,error}
}