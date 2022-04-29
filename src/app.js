require('./db/connection');
const {default: mongoose} = require('mongoose');
const yargs = require('yargs');
const { addMovie, listMovie, deleteMovie, updateMovie } = require('./movie/methods');
const app = async (yargsObj) => {
    try {
        if (yargsObj.add) {
            //add movie function
            await addMovie({title: yargsObj.title, actor: yargsObj.actor});
            console.log(`successfully added ${yargsObj.title}, featuring ${yargsObj.actor}`);
        } else if (yargsObj.list) {
            //list movies from database
            console.log(await listMovie());
        }
        else if (yargs.update) {
            //update movies from database using filter
            console.log(await updateMovie(yargsObj.oldEntry, yargsObj.newEntry));
        }   
            
        else if (yargsObj.delete) {
            //deletes a movie from database using filter
            await deleteMovie({title: yargsObj.title})
            console.log (`successfully removed ${yargsObj.title} from database `)
        }
        else {
            console.log('incorrect command')
        }
        await mongoose.disconnect()
    } catch (error) {
        console.log(error);
        await mongoose.disconnect()
    }
};
app(yargs.argv);