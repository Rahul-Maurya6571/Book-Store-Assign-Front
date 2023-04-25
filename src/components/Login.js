import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
function Login(){
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const submitHandler = (e)=>{
        console.log(name,password)
        e.preventDefault()

        fetch("https://book-store-assign-back.onrender.com/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:name,
                password:password
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            if(result.error){
                return alert(result.error)
            }
            else{
                localStorage.setItem("token",result.token)
                localStorage.setItem("user",result.user)
                alert(result.message)
                navigate("/booklist")
            }
        })
    }

    return <form className="login-form" onSubmit={e=>submitHandler(e)}>
        <h5>Member Login</h5>
        <div>
            <input placeholder="Username" onChange={(e)=>{
                setName(e.target.value)
            }} value={name}  required/>
        </div>
        <div>
            <input type="password"onChange={(e)=>{
                setPassword(e.target.value)
            }} value={password} required />
        </div>
        <div>
            <button>Login</button>
        </div>
        <h6>forgot password</h6>
        <Link to="/"><h5 style={{cursor:"pointer"}}>don't have an account ?</h5></Link>

    </form>
}
export default Login