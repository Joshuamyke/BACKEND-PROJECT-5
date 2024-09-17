const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bycryptjs = require("bycryptjs")
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const favoriteRoutes = require('./routes/favorites');
const dotenv = require('dotenv').config();
const auth = require('./middleware/auth');
const cors = require("cors")

//CONNECT TO DATABASE

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });



//APPLICATION 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));
app.use('/recipes', auth, require('./routes/recipes'));
app.use('/favorites', auth, require('./routes/favorites'));
app.use(cors())

app.use((err, req, res, next) => {
   console.error(err);
   return res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(process.env.PORT, () => {
   console.log(`Server listening on port ${process.env.PORT}`);
});

//YET TO START INSTALLING DEPENDENCIES AND TESTING THE SERVER AND DATABASE



//SIR YOU WILL BE GETTING ERRORS TESTING THE BACKEND 
//I'VE NOT CREATED A DATABASE YET

