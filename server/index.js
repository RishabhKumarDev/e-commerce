import dotenv from 'dotenv/config';
import connectDB from './db/db.js'
import app from './server.js';

(async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, (req, res) => {
            console.log("App is listening to",`http://localhost:${process.env.PORT}` );
        })
    } catch (error) {
        console.log("Error in connection");
        process.exit(1);
    }
})();
