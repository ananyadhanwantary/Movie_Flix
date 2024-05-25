function GenreComponent(){
    const [movies,setMovies]=useState({})
    async function handleByGenre(genre){
        try{
            axios.get(`http://localhost:3001/api/admin/movie/bygenre/${genre}`)
            .then((response)=>setGenre(response.data))
        }
        catch(err){
            console.log(err)
        }
        
    }
    return(
        <>
        <div className="container d-flex justify-content-center align-content-center">
            <div className="row justify-content-center">
                {movies.map((movie) =>
                    <div className="col-lg p-3"  key={movie._id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.moviePosterUrl} />
                            <Card.Body>
                                <Card.Title>{movie.movieName}</Card.Title>
                                <Card.Text>
                                    {movie.movieCast}
                                </Card.Text>
                                <Card.Link onClick={() => handleSingleMovie(movie._id)}>See More</Card.Link>
                                <br /><br />
                                <Button variant="primary">Play Movie</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </div>
        </>

    )
}