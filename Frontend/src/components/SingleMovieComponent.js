import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';


function SingleMovieComponent(){
    var [movie,setMovie] = useState({})
    var [like,setLike] = useState(false)
    useEffect(async ()=>{
        const {id} = useParams()
        const res =  await axios.get(`http://localhost:3001/api/movie/${id}`);
        setMovie(res.data)
    })
    function handleLike(id){
        if(!like){
            // setLike(! like)
            axios.put(`http://localhost:3001/api/movie/like/${id}`)
                .then( res => 
                    setLike(true)
                )
                .catch(err => console.log(err)) 
        }
        else{
            axios.delete(`http://localhost:3001/api/movie/like/${id}`)
                .then( res => 
                    setLike(false)
                )
                .catch(err => console.log(err)) 
        }
    }

    return (
        <>

        </>
    )
}
