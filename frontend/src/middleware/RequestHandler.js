// const proxy = process.env.REACT_APP_API_KEY;

import { setUserData } from "../utils";

const proxy = "https://codingworms.herokuapp.com";
// const proxy = "http://localhost:8000";
export async function fetchData(path,requestOptions) {
    
    requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type' : "application/json",
        'Accept' : 'application/json',
        'Authorization' : localStorage.accessToken
    } 

    const res = await (await fetch(proxy+path,requestOptions)).json()
    if(res.status !== 'unauthorized') {
        return {...res,auth:true}
    }
    const payload = {
        token: localStorage.refreshToken
    }
    const newRequestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }

    const {data,status} = await(await fetch(proxy+'/refresh-token',newRequestOptions)).json()
    if(status === 'unauthorized') {
        return {auth:false}
    }

    setUserData(data.user,data.accessToken,data.refreshToken)
    return await fetchData(path,requestOptions)
}
