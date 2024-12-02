const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route for the main gallery page
router.get('/main', (req, res) => {
    const loggedIn = req.session.customer ? true : false;
    res.render('gallery_main', { username: loggedIn ? req.session.customer.username : null, pageTitle: 'Main Gallery', loggedIn });
});

// Combined Route for All Galleries
router.get('/galleries', (req, res) => {
    const loggedIn = req.session.customer ? true : false;
    
    // Image directories
    const imageDirs = {
        g1: path.join(__dirname, '..', 'public', 'img', 'aimonHilos'),
        g2: path.join(__dirname, '..', 'public', 'img', 'purim'),
        g3: path.join(__dirname, '..', 'public', 'img', 'pictures'),
        g4: path.join(__dirname, '..', 'public', 'img', 'erveMahlka'),
        g5: path.join(__dirname, '..', 'public', 'img', 'samalim')
    };

    // Read all images from directories
    const images = {
        g1: fs.readdirSync(imageDirs.g1).map(file => `/img/aimonHilos/${file}`),
        g2: fs.readdirSync(imageDirs.g2).map(file => `/img/purim/${file}`),
        g3: fs.readdirSync(imageDirs.g3).map(file => `/img/pictures/${file}`),
        g4: fs.readdirSync(imageDirs.g4).map(file => `/img/erveMahlka/${file}`),
        g5: fs.readdirSync(imageDirs.g5).map(file => `/img/samalim/${file}`),

    };

    // Render the combined gallery page
    res.render('gallery1', { 
        images, 
        username: loggedIn ? req.session.customer.username : null, 
        pageTitle: 'All Galleries', 
        loggedIn 
    });
});


module.exports = router;
