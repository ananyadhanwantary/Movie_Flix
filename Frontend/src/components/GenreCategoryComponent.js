import { useState } from "react"

function GenreCategoryComponent(){
    const {genre,setGenre}=useState()
    async function handleGenre(){
        try{
            axios.get("http://localhost:3001/api/admin/movie/getAllGenres")
            .then(response=> setGenre(response.data))
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bd-dark" style={"widht:280px;"}>
        {genre.map((genre) =>
        <link to="/byGenre/:genre">{genre.name}</link>
        )}
        </div>
        </>
    )
}