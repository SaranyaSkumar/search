var bodyParser = require('body-parser');
const path = require('path');
var request = require('request');
const fuzzy = require('fuzzy');
const algoliasearch= require('algoliasearch')
var client = algoliasearch('4TX06DTB2K', '74a5ef841adf2d30ebf0a841c8a9703a');
var index = client.initIndex('data');

module.exports = function (app,passport) {

    app.get('/', function (req, res) {
        console.log("api", __dirname, path.resolve());
        res.sendFile(path.resolve() + '/public/index.html');
    });

    app.get('/data', function(req, res){
        var http = require('http');
        const request = require('request');
        const searchQuery = req.query;
        console.log("searchQuery", searchQuery)
        index.search(searchQuery, function (err, content) {
            let results;
            if(content && content.hits)
            {
                results = content.hits;
            }
            else{
                results=[]
            }
            console.log("algolia result length",results.length);
            results= results.slice(0, 6)
            console.log("results", results.length)
            res.json(results);
        });
    });

}