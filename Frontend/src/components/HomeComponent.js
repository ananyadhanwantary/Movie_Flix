import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
function HomeComponent() {
  const navigate = useNavigate();
  async function handleGetMovie(e) {
    e.preventDefault();
    try {
      navigate('/getMovie');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
    <br/><br/><br/>
      <div className="container-fluid  py-5 vh-100">
        <div className="row">
          <Carousel >
            <Carousel.Item >
              {/* <ExampleCarouselImage text="First slide" /> */}
              <img
                className="d-block w-25 center"
                // src="https://wallpapers.com/images/hd/movie-poster-background-p5qblffj7cvswl5g.jpg"
                src="https://hips.hearstapps.com/hmg-prod/images/netflix-thanksgiving-movies-64de904b09410.jpg?crop=1.00xw:1.00xh;0,0&resize=500:*"
                alt="Third slide"
              />
              <Carousel.Caption >
                <h3>Extensive content</h3>
                <p>
                  range of content, including blockbuster hits,<br/> classic films,
                  indie gems, and popular TV series.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Second slide" /> */}
              <img
                className="d-block w-25 center"
                src="https://s.studiobinder.com/wp-content/uploads/2022/11/Movie-Genres-Types-of-Movies-List-of-Genres-and-Categories-Featured.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Genre Browsing</h3>
                <p>
                  navigate through a list of genres such as <br></br>Action,
                  Comedy, Drama, Horror, Romance, Sci-Fi, Documentary, and more
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              {/* <ExampleCarouselImage text="Third slide" /> */}
              <img
                className="d-block w-25"
                src="https://media.istockphoto.com/id/1542598409/photo/movie-podium-background-with-movie-objects-3d-rendering.webp?b=1&s=170667a&w=0&k=20&c=VUwlXnJCjj7A811-dxcwhb9gZ-yp48ymZ2Jmm4lOlto="
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Popularity Indicators</h3>
                <p>
                  showcases movie popularity and highlights what is currently
                  favored by the community.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="col text-center">
            <h1 className="display-3">Movie-Flix</h1>
            <p className="lead">Your Ultimate Movie Streaming Solution</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={(e) => handleGetMovie(e)}
            >
              Explore Now
            </button>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
