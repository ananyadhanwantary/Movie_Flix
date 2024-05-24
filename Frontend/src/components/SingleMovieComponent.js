import { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom';

function SingleMovieComponent(){
    var [movie,setMovie] = useState({})
    var [like,setLike] = useState(false)
    useEffect(async ()=>{
        const {id} = useParams()
        const res =  await axios.get(`http://localhost:3001/api/movie/${id}`);
        setMovie(res.data)
        setLike

    })
    function handleLike(id){
        const navigate= useNavigate()
        const token = localStorage.getItem("token")
        axios.get(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
            .then(res => {
                if(res.data.status)
                    navigate("/login")
                else
                    setLike(res.data.liked)
            })

        if(!like){
            axios.put(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
                .then( res => {
                    if(res.status===200)
                        setLike(true)

                })
                .catch(err => console.log(err)) 
        }
        else{
            axios.delete(`http://localhost:3001/api/movie/like/${id}`,{ headers: {Authorization: `Bearer ${token}`}})
                .then( res => {
                    if(res.status===200)
                        setLike(true)
                })
                .catch(err => console.log(err)) 
        }
    }
    function addComment(id){
        const navigate= useNavigate()
        const token = localStorage.getItem("token")
        axios.put(`http://localhost:3001/api/comment/${id}`,)

    }
    return (
        <>

        </>
    )
}
