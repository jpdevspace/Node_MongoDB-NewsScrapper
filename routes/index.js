const express = require('express');
const router = express.Router();
const request = require('request'); // to easily make HTTP request
const cheerio = require("cheerio"); // Scraping tool
const Article = require('../models/Articles');

// GET '/' Display main page
router.get('/', (req, res) => {
    res.render('index', { mainPage: true} );
});

// GET '/scrape' Scrape news websites
router.get('/scrape', (req, res) => { 
    const wiredURL = "https://www.wired.com/most-recent/";  // Making the request to get the HTML

    request(wiredURL, (err, response, html) => {    // Making request to get the HTML code
        if (err) { console.log(error) };    // Check for errors
        
        const $ = cheerio.load(html);  // Load the HTML into Cheerio 
        
        let wiredResult = [];   // To store all the results to then save them in DB
        let wiredParentSelector = "li.archive-item-component";  // The parent selector element to use

        $(wiredParentSelector).each( (i, element) => {
            wiredResult.push({
                title: $(element).find('h2.archive-item-component__title').text(),
                body: $(element).find('p.archive-item-component__desc').text(),
                url: $(element).find('a').attr('href'),
                source: "Wired",
                saved: false
            });
        });


        Article.create(wiredResult)
            .then( dbArticle => {
                res.render('scrape', {articles: dbArticle});
            })
            .catch( err => {
                console.error(err);
                res.redirect('/');
            })
        
    });
    
});

// GET '/save/:id' Saves article for later viewing
router.put('/save/:id', (req, res) => {
    Article.findByIdAndUpdate(req.params.id, { $set: {saved: true} }, { new: true })
        .then( article => {
            res.send("Article updated");
        })
        .catch( err => {
            console.error(err);
            res.redirect('/');
        })
});

// GET '/save' Show all saved articles
router.get('/save', (req, res) => {
    Article.find({ saved: true })
        .then(dbArticles => {
            res.render('savedArticles', { articles: dbArticles });
        })
        .catch( err => {
            console.error(err);
            res.redirect('/');
        })
});

module.exports = router;