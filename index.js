// step 1 after installation, .gitignore, initial commit & nodemon: imports
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios');
const baseURL = "https://ckx-movies-api.herokuapp.com";

// step 2: create app
let app = express();

// step : set up view engines

// step : setup wax on with hbs

// step : set up for forms
app.use(express.urlencoded({
    extended: false
  }))
// step 5: set up routes

// display movies in new route
// specify route u want the movies to display in
app.get('/movies', async (req, res) => {
    // retrieve data from axios
    let axiosResponse = await axios.get(baseURL + '/movies');
    // res.render'file name for displaying data.hbs'
    res.render('movies.hbs', { // now go create movies.hbs and add #each so the entries can be iterated
        // parsing over api data
        'movies': axiosResponse.data
    })
})
// create new movie entry
// display page to key in data
app.get('/create', (req, res) => {
    // render on page of choice
    res.render('create.hbs')
}) // now go create the create.hbs and add a form to it

app.post('/create', async(req,res)=> {
    let title = req.body.title;
    let plot = req.body.plot;

    await axios.post(baseURL + '/movie/create', {
        title:title,
        plot:plot
    })
    res.redirect('/movies')
})


// step 4: test route (rmb to put url route in browser)
app.get('/test', (req, res) => {
    res.send('hi');
})

// step 3: server set-up
app.listen(3000, () => {
    console.log("server started");
})