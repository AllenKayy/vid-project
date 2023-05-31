const { genreValidator } = require('../validators/genreValidator');
const { genres } = require('../models/genreModel');

let id =  0;

module.exports = {
    getAllGenres: (req, res) => {
        res.status(200).json({
            status: "success",
            message: genres.length < 1 ? "No genre found" : `${genres.length} genres found`,
            genres
        });
    },

    createGenre: (req,res) => {
        const genre = genreValidator.validate(req.body);
        if(genre.error) throw new Error(genre.error.details[0].message)
        const newGenre = { genre, id: ++id }
        genres.push(newGenre);
        res.status(201).json({
            status: "success",
            message: "Genre created successfully",
            newGenre
        });
    },

    getSingleGenre: (req, res) => {
        const genreId = Number(req.params.id);
        if(!genreId) {
            res.status(400).json({
                status: "failed",
                message: "Pass in a valid Id"
            });
        };
        const genre = genres.find(genre => genre.id === genreId)
        if(!genre) throw new Error(`Genre with the id ${genreId} does not exist`)
        res.status(200).json({
            status: "success",
            message: `Found genre with id ${genreId}`,
            genre
        });
    },

    updateGenre: (req, res) => {
        const genreId = Number(req.params.id);
        if(!genreId) throw new Error("Id must be a valid number")

        const newGenre = genres.find(genre => genre.id === genreId)
        if (!newGenre) throw new Error(`Genre with the id ${genreId} does not exist`)
        const { genre } = req.body;
        newGenre.genre = genre;
        res.status(201).json({
            status: "success",
            message: `Successfully updated genre with id ${genreId}`,
            newGenre
        });

        // if(genreId > genres.length) throw new Error(`Genre with the id ${genreId} does not exist`)
        // let genre = genres[genreId]
        // genre = req.body;
        // res.status(201).json({
        //     status: "success",
        //     message: `Successfully updated genre with id ${genreId}`,
        //     genre
        // });
    },

    deleteGenre: (req, res) => {
        const genreId = Number(req.params.id);
        const genre = genres.find(genre => genre.id === genreId)
        if (!(genreId && genre)) throw new Error("Pass in a valid Id")
        genres.splice(genres.indexOf(genre), 1);
        res.status(200).json({
            status: "success",
            message: `Genre with the id ${genreId} was deleted successfully`,
            genre
        });
    }
}
