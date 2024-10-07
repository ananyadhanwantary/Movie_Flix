const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("req.files: ",req.files, file.fieldname)
        if(file.fieldname === 'movie')
            cb(null, __dirname+"/movies"); 
        else if(file.fieldname === 'poster')
            cb(null, __dirname+"/posters");
    },
    filename: (req, file, cb) => {
        const {movieName,releaseYear }= req.body
        console.log(file)
        if(file.fieldname === 'movie'){
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            fname = `${movieName}-${releaseYear}-movie.${extension}`
            req.movieFile = fname;
        }
        else if(file.fieldname === 'poster'){
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            fname = `${movieName}-${releaseYear}-poster.${extension}`
            req.posterFile = fname;
        }
        cb(null, fname); 
    }
});

const uploadhandler = multer({ storage: storage });
const upload = uploadhandler.fields([{name: "movie"}, {name: "poster"}])

module.exports = {upload}