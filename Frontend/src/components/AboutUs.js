function AboutUs() {
  return (
    <>
      <div className="container-fluid d-flex flex-column mt-3 bg-opacity-75 bg-black ">
        <div className=" d-flex flex-row   p-5">
          <div className="col-6 d-flex flex-column justify-content-center align-content-center p-5">
            <div className="display-4 fw-bold p-1">Welcome to Movie Flix</div>
            <div className="p-1 h4 fw-normal mt-1">
              Your ultimate destination for discovering and enjoying movies
              tailored to your taste.
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center p-3">
            <img
              alt=""
              className="h-75 w-auto"
              src="https://i.pinimg.com/564x/d1/92/c8/d192c88de1a298fd30ce5ef3ed9c2871.jpg"
              data-uia="nmhp-card-animation-asset-image"
            />
          </div>
        </div>
        <div className=" d-flex flex-row   p-5">
          <div className="col-6 d-flex justify-content-center align-items-center p-3">
            <img
              alt=""
              className="h-75 w-auto"
              src="https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQSdzE354yA9fsMjuadHmwb0MUhCYo0XH3oL0vZc8-ywGKADwq1y1K-tXp6BW7Ekbpn8AnHDYGbbpp1weUtB5xXINaBjnWDuYUKDcvyFP7UnQ_9D0C6usmZjNq6B9DqFt9dl_5Ii1AzBSl4tnPf6IwURr8NY.jpg?r=eb4"
              data-uia="nmhp-card-animation-asset-image"
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center align-content-center p-5">
            <div className="display-4 fw-bold p-1">Enjoy on your TV</div>
            <div className="p-1 h4 fw-normal mt-1">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </div>
          </div>
        </div>
        <div className=" d-flex flex-row   p-5">
          <div className="col-6 d-flex flex-column justify-content-center align-content-center p-5">
            <div className="display-4 fw-bold p-1">Our Strory</div>
            <div className="p-1 h4 fw-normal mt-1">
              MovieFlix was born out of a love for movies and a desire to make
              it easier for everyone to find films they'll love.
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center p-3">
            <img
              alt=""
              className="h-75 w-auto"
              src="https://images.yourstory.com/cs/wordpress/2015/03/yourstory_FilmySphere_Film_Creativity.jpg?mode=crop&crop=faces&ar=16:9?width=3840&q=75"
              data-uia="nmhp-card-animation-asset-image"
            />
          </div>
        </div>
        <div className=" d-flex flex-row   p-5">
          <div className="col-6 d-flex justify-content-center align-items-center p-3">
            <img
              alt=""
              className="h-75 w-auto"
              src="https://img.freepik.com/premium-photo/cozy-evening-home-watching-movie-with-popcorn-tv-remote-nearby_948953-3843.jpg"
              data-uia="nmhp-card-animation-asset-image"
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center align-content-center p-5">
            <div className="display-4 fw-bold p-1">Our Commitment</div>
            <div className="p-1 h4 fw-normal mt-1">
            At MovieFlix, we are committed to continuously improving our platform to better serve you.<br/><br/>
            Thank you for choosing MovieFlix. Sit back, relax, and enjoy the show!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
