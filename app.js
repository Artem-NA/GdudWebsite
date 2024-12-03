const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./routes/middleware');
const authRoutes = require('./routes/authController');
const galleryRoutes = require('./routes/galleryRoutes');
const otherRoutes = require('./routes/otherRoutes');
const contactRoutes = require('./routes/contactRoutes'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(sessionMiddleware);

app.use('/auth', authRoutes);
app.use('/gallery', galleryRoutes); 
app.use(contactRoutes); 
app.use(otherRoutes);

// 404 middleware
const notFoundHandler = (req, res, next) => {
    res.render('404', { pageTitle: '404' });
};
app.use(notFoundHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
