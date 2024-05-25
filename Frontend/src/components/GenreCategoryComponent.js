import { useState } from "react"

function GenreCategoryComponent(){
    const {genre,setGenre}=useState()
    async function handleGenre(){
        try{
            axios.get("http://localhost:3001/api/admin/movie/getAllGenres")
        }
    }
    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bd-dark" style={"widht:280px;"}>
            <link to="/byGenre/"></link>
        </div>
        </>
    )
}