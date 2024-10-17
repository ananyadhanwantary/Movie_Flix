import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import { ListGroup, Row, Col } from 'react-bootstrap';
const API_URL = process.env.REACT_APP_API_URL

function DropDown() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [langs, setLangs] = useState([]);
    const [lang, setLang] = useState("All");
    const [genre, setGenre] = useState("All");
    
    useEffect(() => {
      async function fetchGenres() {
          try {
              const response = await axios.get(API_URL+"api/movie/getAllGenres");
              var l=response.data
              l.splice(0, 0, "All")
              setGenres(l)
          } catch (err) {
              console.log(err);
          }
      }
      async function fetchLangs() {
        try {
            const response = await axios.get(API_URL+"api/movie/getAllLangs");
            var l=response.data
            l.splice(0, 0, "All")
            setLangs(l)
        } catch (err) {
            console.log(err);
        }
      }
      fetchGenres();
      fetchLangs();
    }, []);

    function handleGenreClick(g) {
      setGenre(g);
      navigate(`/getMovie`, { state: { movieGenre: g, movieLanguage: lang } });
      console.log(g, lang)
    }

    function handleLangClick(l) {
      setLang(l);
      navigate(`/getMovie`, { state: { movieGenre: genre, movieLanguage: l } });
      console.log(genre, l)
    }

    return (
      <Row className="justify-content-start">
        <Col xs="auto" className="m-2">
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
                    <div className='px-2 rounded dropdown-item'>{genre}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        <Col xs="auto" className="m-2">
          <Dropdown>
            <Dropdown.Toggle className='bg-black' id="dropdown-basic">
              Languages
            </Dropdown.Toggle>
            <Dropdown.Menu className='p-0 bg-secondary'>
              <ListGroup>
                {langs.map((lang, index) => (
                  <ListGroup.Item 
                    className='px-2 bg-secondary'
                    key={index}
                    action
                    onClick={() => handleLangClick(lang)}
                  >
                    <div className='px-2 rounded dropdown-item'>{lang}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );
}

export default DropDown;
