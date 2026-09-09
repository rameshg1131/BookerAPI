import { APIRequestContext,request } from "@playwright/test";

import {env} from '../Config/env'



export async function getAuthToken():Promise<string>
{
    const authContext:APIRequestContext = await request.newContext(
        {
            baseURL: env.baseUrl
   })
   
   const response = await authContext.post("/auth",
    {
        headers:{
            'Content-Type' : 'application/json'
        },
        data:{
            username:env.username,
            password:env.password
        }
    })

    if(!response.ok())
    {
        console.log("Authentication failed")
    }

    const responsebody = await response.json()
    return responsebody.token
}