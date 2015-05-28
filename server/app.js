var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
module.exports = app;

var publicPath = path.join(__dirname, '../public');
var indexHtmlPath = path.join(__dirname, '../index.html');

var FlashCardModel = require('./models/flash-card-model');
var _ = require('lodash');

app.use(express.static(publicPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());




app.get('/cards', function (req, res) {

    var modelParams = req.query.category ? { category: req.query.category } : {};

    FlashCardModel.find(modelParams, function (err, cards) {
        setTimeout(function () {
            res.send(cards);
        }, Math.random() * 1000);
    });

});

app.post('/cards', function (req, res) {

    var card = req.body;

    FlashCardModel.create(card).then(function (createdCard) {
        res.send(createdCard);
    }, function (err) {
        res.status(500).send(err.message);
    });

});

app.delete('/cards', function (req, res) {

    FlashCardModel.remove({ _id: req.query.card }, function(err) {
        res.send("deleted " + req.query.card);
    }, function (err) {
        res.status(500).send(err.message);
    });

});

app.get('/getCardInfo', function (req, res) {

    FlashCardModel.findOne({ _id: req.query.card }, function (err, card) {
        res.send(card);
    });

});

app.post('/updateCard', function (req, res) {

    console.log('sdfgsdfsdfsdfsdfsdfsdfs test');
    console.log("updating card", req.body.params.id);

    FlashCardModel.findOneAndUpdate({ _id: req.body.params.id }, req.body.params.fullCard, {new: false}, function (err, updatedCard) {
        res.send(updatedCard);
    });

});

app.get('/*', function (req, res) {
    res.sendFile(indexHtmlPath);
});
