import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function AddBook(){

    const [title,setTitle] = useState("")
    const [isbn,setIsbn] = useState("")
    const [author,setAuthor] = useState("")
    const [describe,setDescribe] = useState("")
    const [publishingDate,setPublishingDate] = useState("")
    const [publisherName,setPublisherName] = useState("")
    const navigate = useNavigate()

    const submitHandler = (e) =>{
        e.preventDefault()
        // console.log(title)
        // console.log(isbn)
        // console.log(author)
        // console.log(describe)
        // console.log(publishingDate)
        // console.log(publisherName)
        addBook()
    }


    const addBook = ()=>{
        fetch("https://book-store-assign-back.onrender.com/addbook",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:title,
                isbn:isbn,
                authorName:author,
                description:describe,
                publishingDate:publishingDate,
                publisherName:publisherName
            })
        }).then(res=>res.json())
        .then(result=>{
            toast.success(result.message,{
                position:toast.POSITION.TOP_CENTER
            })
            return navigate("/booklist")
            
        })
    }
    return <div className="book">
        <div>
            <Link to="/booklist"><button>Show Book List</button></Link>
        </div>
        <form className="book-form" onSubmit={e=>submitHandler(e)}>
            <h2>Add Book</h2>
            <h6>create bew book</h6>

            <div className="book-fields"> 
                <input required placeholder="Title of the Book" type="text" onChange={e=>{
                    setTitle(e.target.value)
                }} value={title}/>
            </div>
            <div className="book-fields">
                <input required placeholder="ISBN" type="number" onChange={e=>{
                    setIsbn(e.target.value)
                }} value={isbn}/>
            </div>
            <div className="book-fields">
                <input required placeholder="Author" type="text" onChange={e=>{
                    setAuthor(e.target.value)
                }} value={author}/>
            </div>
            <div className="book-fields">
                {/* <textarea required placeholder="Describe the book" ></textarea> */}
                <input required placeholder="Describe the book" type="text" onChange={e=>{
                    setDescribe(e.target.value)
                }} value={describe}/>
            </div>
            <div className="book-fields">
                <input required placeholder="Date/month/year" type="text" onChange={e=>{
                    setPublishingDate(e.target.value)
                }} value={publishingDate}/>
            </div>
            <div className="book-fields">
                <input required placeholder="Publisher of the Book" type="text" onChange={e=>{
                    setPublisherName(e.target.value)
                }} value={publisherName} />
            </div>
            <div className="book-fields" >
                <input type="submit" style={{cursor:"pointer"}} />
            </div>
        </form>
    </div>
}
export default AddBook