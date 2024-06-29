
function AboutUs() {
    return (
        <>
        <div className="container-fluid d-flex flex-row mt-3 bg-opacity-75 bg-black vh-100">
            <div className="col-6 d-flex flex-column justify-content-center align-content-center p-5">
                <div className="display-4 fw-bold p-1">
                Enjoy on your TV
                </div>
                <div className="p-1 h4 fw-normal mt-1">
                Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.
                </div>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center p-3">
                <img alt="" className="h-75 w-auto" src="https://i.pinimg.com/564x/d1/92/c8/d192c88de1a298fd30ce5ef3ed9c2871.jpg" data-uia="nmhp-card-animation-asset-image" />
            </div>
        </div>
        </>
    )
}

export default AboutUs;