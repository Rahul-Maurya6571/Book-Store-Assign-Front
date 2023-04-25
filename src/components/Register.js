import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
function Register(){
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const submitHandler = (e)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            return alert("password mismatch")
        }
        else{
            Register(name,password)
        }
    }

    const Register =(username,userPass)=>{
        console.log(username,userPass)
        fetch("https://book-store-assign-back.onrender.com/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                password:userPass
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            if(result.error){
                return alert(result.error)
            }
            else{
                alert(result.message)
                navigate("/login")
            }
        })
    }
    return <form className="register-form" onSubmit={e=>submitHandler(e)}>
        <h5>Register</h5>
        <div>
            <input placeholder="Username" type="email" onChange={(e)=>{
                setName(e.target.value)
            }} value={name}  required/>
        </div>
        <div>
            <input type="password" onChange={(e)=>{
                setPassword(e.target.value)
            }} value={password} required/>
        </div>
        <div>
            <input type="password" onChange={(e)=>{
                setConfirmPassword(e.target.value)
            }} value={confirmPassword} required />
        </div>
        <button>
            Register
        </button>
        <Link to="/login"><h6 style={{cursor:"pointer"}}>Member Login</h6></Link>
    </form>
}
export default Register