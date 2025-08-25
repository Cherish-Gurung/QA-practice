const axios= require('axios');//api haru lina and response lina
import {expect} from '@playwright/test';

let apiurl

async function authenticateUser(username,password,{request}){
    const apiurl= await getApiBaseUrl();
    const headers={
        'Content':'application/json',
    };
    const response= await request.post('${apiUrl}/users/login',{
        data: requestBody,
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody= await response.json();
    const token= responseBody.token;
    return token;
}
async function createEntity(userData,accessToken,module,{request}){
    const apiURl=await getApiBaseUrl();
    const headers={
        'Content-Type':'application/json',
        'Accept':'application/json',
        'authorization': "Bearer" + accessToken,
    };
    const response =await request.post(apiURl+module,{
        headers,
        data:json.stringify(UserData),
    });

    const responseBody= await response.json();
    const statusCode= response.status();
    expect(statusCode).toBe(201);
    if(responseBody&&responseBody.id){
        return responseBody.id;
    }else{
        return null;
    }
}

async function deleteEntity(accessToken, module,{request}) {
    const apiUrl= await getApiBaseUrl();
    const headers={
        'Content-Type':'application/json',
        'Accept':'application/json',
        'authorization': "Bearer" + accessToken,
    };
    const response= await request.delete(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect(statusCode).toBe(200);
}

async function validateEntity(accessToken,module,{request}) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'authorization': "Bearer" + accessToken,
    } 
    const response= await request.delete(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect(statusCode).toBe(200);
}

async function getEntity(accessToken,module, status, {request}) {
    const apiUrl= await getApiBaseUrl();
    const headers={
        'Content-Type':'application/json',
        'Accept':'application/json',
        'authorization':"Bearer"+accessToken
    }
    const response= await request.delete(apiUrl+module,{
        headers,
    });
    const statusCode=response.status();
    expect (statusCode).toBe(parseInt(status));
    const responseBody= await response.json();
    if(responseBody&&responseBody[0]._id){
        return responseBody[0]._id;
    }else{
        return null;
    }
}
module.exports={authenticateUser,createEntity,deleteEntity,getEntity};