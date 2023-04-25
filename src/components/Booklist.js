import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Header from "./Header"
function Booklist() {
    const [books, setBooks] = useState([])
    const [bookRecord, showBookRecord] = useState(false)
    const [book, viewBook] = useState({})
    const [editBox, showEditBox] = useState(false)

    const [title,setTitle] = useState("")
    const [isbn,setIsbn] = useState("")
    const [author,setAuthor] = useState("")
    const [describe,setDescribe] = useState("")
    const [publishingDate,setPublishingDate] = useState("")
    const [publisherName,setPublisherName] = useState("")

    const [id,setId] = useState("")


    useEffect(() => {
        fetch("https://book-store-assign-back.onrender.com/availablebooks", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setBooks(result)
            })
    }, [])


    const goToEdit = (bookTitle) => {
        console.log(bookTitle)
        showBookRecord(true)
        fetch("https://book-store-assign-back.onrender.com/editbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                title: bookTitle
            })
        })
            .then(res => res.json())
            .then(result => {
                viewBook(result)
            })

    }


    const deleteBook = (bookId) => {
        console.log(bookId)
        fetch("https://book-store-assign-back.onrender.com/deletebook", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify({
                _id: bookId
            })
        })
            .then(res => res.json())
            .then(result => {
                toast.success(result.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                const newBookArray = books.filter(item => item._id !== result._id)
                setBooks(newBookArray)
                window.location.reload()
            })


        }
    return <>
    <Header/>
    {!bookRecord && !editBox && <div>
        <h3>Book List</h3>
        <div>
            <Link to="/addbook"><button>+Add Bew Book</button></Link>
        </div>
        <div className="parent">
            {books.map((item, i) => {
                return <div key={i} className="allbooks" onClick={() => goToEdit(item.title)}>
                    <h2>{item.title}</h2>
                    <p>Description :<b>{item.description}</b></p>
                    <h6>Author :{item.authorName} <span style={{ float: "right" }}>Publisher :{item.publisherName}</span></h6>
                    <div>Published in: <b>{item.publishingDate}</b></div>
                    <div>ISBN: <b>{item.isbn}</b></div>
                </div>
            })}
        </div>
    </div>}
        {!editBox && bookRecord &&
            <>

                <div className="bookdetails">
                    <div style={{ border: "none" }}>
                        <button onClick={() => showBookRecord(false)} >Show Book List</button>
                        <h2>Book's Record</h2>
                        <h5>View Book's Info</h5>
                    </div>
                    <div><span>1 Title :</span><span className="right">{book.title}</span></div>
                    <div><span>2 Author :<span className="right">{book.authorName}</span></span></div>
                    <div><span>3 ISBN :</span ><span className="right">{book.isbn}</span></div>
                    <div><span>4 Publisher :</span><span className="right">{book.publisherName}</span></div>
                    <div><span>5 Published : Date</span><span className="right">{book.publishingDate}</span></div>
                    <div><span>6 Description :</span><span className="right">{book.description}</span></div>
                    <div><button onClick={() => deleteBook(book._id)} >Delete</button> <button onClick={() => {
                        showEditBox(true)
                        showBookRecord(false)
                        }} className="right">Edit</button></div>

                </div>
            </>}
            {editBox &&
            <form className="updateBookInfo" onSubmit={e=>{
                e.preventDefault()
                // editBook()
                showEditBox(false)

            }}>
                <div>
                    <label>Title</label>
                    <input  placeholder="Title of the Book" type="text" onChange={e=>{
                    setTitle(e.target.value)
                }} value={title}/>
                </div>
                <div>
                    <label>ISBN</label>
                    <input  placeholder="ISBN" type="number" onChange={e=>{
                    setIsbn(e.target.value)
                }} value={isbn}/>
                </div>
                <div>
                    <label>Author</label>
                    <input  placeholder="Author" type="text" onChange={e=>{
                    setAuthor(e.target.value)
                }} value={author}/>
                </div>
                <div>
                    <label>Description</label>
                    <input  placeholder="Describe the book" type="text" onChange={e=>{
                    setDescribe(e.target.value)
                }} value={describe}/>
                </div>
                <div>
                    <label>Published Date</label>
                    <input  placeholder="Date/month/year" type="text" onChange={e=>{
                    setPublishingDate(e.target.value)
                }} value={publishingDate}/>
                </div>
                <div>
                    <label>Publisher</label>
                    <input  placeholder="Publisher of the Book" type="text" onChange={e=>{
                    setPublisherName(e.target.value)
                }} value={publisherName} />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        }
    </>
}
export default Booklist