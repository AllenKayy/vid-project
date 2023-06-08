const { genreValidator } = require('../validators/genreValidator');
const Genre = require('../models/genreModel');

module.exports = {
    getAllGenres: async (req, res) => {
        const genres = await Genre.find();
        res.status(200).json({
            status: "success",
            message: genres.length < 1 ? "No genre found" : `${genres.length} genres found`,
            genres
        });
    },

    createGenre: async (req,res) => {
        const { genre, description } = req.body;
        const validatedGenre = genreValidator.validate({ genre, description })
        if(validatedGenre.error) throw new Error(genre.error.details[0].message)
        
        const newGenre = await Genre.create({ genre, description });

        res.status(201).json({
            status: "success",
            message: "Genre created successfully",
            genre: newGenre 
        });
    },

    getSingleGenre: async (req, res) => {
        const genreId = req.params.id;
        if(!genreId) {
            return res.status(400).json({
                    status: "failed",
                    message: "Pass in a valid Id"
            });
        };
        const genre = await Genre.findOne({ _id: genreId })
        if (!genre) {
            return res.status(404).json({
                status: "failed",
                message: `Genre with the id ${genreId} does not exist`
        });
        }
        res.status(200).json({
            status: "success",
            message: `Found genre with id ${genreId}`,
            genre
        });
    },

    updateGenre: async (req, res) => {
        const genreId = req.params.id;
        if(!genreId) throw new Error("Id must be a valid number");

        const { genre, description } = req.body;
        const updatedGenre = await Genre.findByIdAndUpdate(genreId, { genre, description }, { new: true });
        if (!updatedGenre) throw new Error(`Genre with the id ${genreId} does not exist`);

        res.status(201).json({
            status: "success",
            message: `Successfully updated genre with id ${genreId}`,
            genre: updatedGenre
        });
    },

    deleteGenre: async (req, res) => {
        const genreId = req.params.id;
        if (!genreId) throw new Error("Pass in a valid id");

        const genre = await Genre.findByIdAndRemove(genreId);
        if (!genre) {
            return res.status(404).json({
                status: "failed",
                message: "Genre not found"
            });
        }    
        res.status(200).json({
            status: "success",
            message: `Genre with the id ${genreId} was deleted successfully`,
            genre: genre
        });
    }
}
