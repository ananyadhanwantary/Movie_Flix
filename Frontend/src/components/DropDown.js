import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { ListGroup } from 'react-bootstrap';

function DropDown() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await axios.get("http://localhost:3001/api/movie/getAllGenres");
                var l=response.data
                l.splice(0,0,"All")
                // setGenres();
                setGenres(l)
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
    <>
    <Dropdown>
      <Dropdown.Toggle className='bg-black' id="dropdown-basic">
        Genres
      </Dropdown.Toggle>
      <Dropdown.Menu className='p-0 bg-secondary'>
        
        <ListGroup>
            {genres.map((genre, index) => (
                <ListGroup.Item 
                    className='px-2 bg-secondary'
                    key={index}
                    action
                    onClick={() => handleGenreClick(genre)}
                >
                    <div className='px-2 rounded dropdown-item '>{genre}</div>
                    
                </ListGroup.Item>
            ))}
        </ListGroup>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default DropDown;