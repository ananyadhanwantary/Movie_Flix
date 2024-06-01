
// import { useEffect, useState } from "react"
// import axios from "axios"
// import {Link} from "react-router-dom"

// function GenreCategoryComponent(){
//     const [genre,setGenre]=useState([])
//     useEffect(()=>{
//         try{
//             axios.get("http://localhost:3001/api/admin/movie/getAllGenres")
//             .then(response=>{
//                 //console.log(response.data)
//                 setGenre(response.data)
//             })
//         }
//         catch(err){
//             console.log(err)
//         }
//     },[])
//     return (
//         <>
//         {
//             <div className="d-flex flex-column flex-shrink-0 p-3 text-white bd-dark">
//             {
//             genre.map((g) =>
//                 <Link to= "/byGenre" state= {{movieGenre: g}}  >{g}</Link>
//             )}
//             </div>
//         }
        
//         </>
//     )
// }
// export default GenreCategoryComponent

import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function GenreCategoryComponent() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await axios.get("http://localhost:3001/api/admin/movie/getAllGenres");
                setGenres(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGenres();
    }, []);

    function handleGenreClick(genre) {
        navigate(`/byGenre`, { state: { movieGenre: genre } });
    }

    return (
        <ListGroup className="mb-3">
            <ListGroup.Item variant="dark" className="text-white fw-bold">Genres</ListGroup.Item>
            {genres.map((genre, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleGenreClick(genre)}
                >
                    {genre}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default GenreCategoryComponent;
