import { API } from "../../backend";


// category calls
export const getCategories=()=>{
    return fetch(`${API}/categories`,{
        method:"GET",
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)  
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err))
}
export const deleteCategory=(categoryId,userId,token)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
        Authorization:`Bearer ${token}`
        }
        
}).then(response=>{return response.json()})
.catch(err=>console.log("THis is "+err))
}



// product calls
export const createProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
        Authorization:`Bearer ${token}`
        },
        body:product
}).then(response=>{console.log(response)
    return response.json()})
.catch(err=>console.log(err))
}
export const getProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET",
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}
export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
}).then(response=> {return response.json()})
.catch(err=>console.log(err))
}
export const updateProduct=(productId,userId,token,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
        Authorization:`Bearer ${token}`
        },
        body:product
}).then(response=>{return response.json()})
.catch(err=>console.log(err))
}
export const deleteProduct=(productId,userId,token)=>{

    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
        Authorization:`Bearer ${token}`
        }
        
}).then(response=>{return response.json()})
.catch(err=>console.log("THis is "+err))
}