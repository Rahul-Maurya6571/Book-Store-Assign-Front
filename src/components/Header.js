import { useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        return navigate("/login")
    }
    return <header>
        <div>Book Listing</div>
        <div style={{cursor:"pointer"}} className="right" onClick={()=>logout()}>Logout</div>
    </header>
}
export default Header