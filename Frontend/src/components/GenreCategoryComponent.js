import { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
function GenreCategoryComponent(){
    const [genre,setGenre]=useState([])
    useEffect(()=>{
        try{
            axios.get("http://localhost:3001/api/admin/movie/getAllGenres")
            .then(response=>{
                console.log(response.data)
                setGenre(response.data)
            })
        }
        catch(err){
            console.log(err)
        }
    },[])
    return (
        <>
        <p>{genre}</p>{
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white bd-dark">
            {
            genre.map((g) =>
            <Link to={{
                pathname:'/byGenre' ,
                state:g
            }} >{g}</Link>
            )}
            </div>
        }
        
        </>
    )
}
export default GenreCategoryComponent