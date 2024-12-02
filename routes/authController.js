const express = require('express');

const router = express.Router();

const customerRoutes = require('./customer');



//------------LOGIN PAGE ------------------------------------------------------------
router.get('/log', (req, res) => {
       
        res.render('login', {pageTitle: 'Login'})
    
});
//---------CHECK LOGIN --------------------------------------------------------------
router.post('/log', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    // Example usage of the login function
    customerRoutes.login(username, password, (error, customer) => {
        if (error) {
            console.error('Error logging in:', error);
            res.status(500).send('Internal Server Error');
        } else {
            if (customer) {
                // Login successful, redirect to another page
                req.session.customer = customer;
                res.redirect('/');
            } else {
                // Invalid username or password
                res.send('<script>alert("Some information is incorrect. Try again."); window.location.href="/login";</script>');
            }
        }
    }); 
}); 
//------------------- LOG OUT -----------------------------------------------------
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect the user to the login page after logout
            res.redirect('/');
        }
    });
});



// Test valid credentials
/* customerRoutes.login('username', 'password', (error, customer) => {
    if (error) {
        console.error('Error logging in:', error);
    } else {
        if (customer) {
            console.log('Login successful:', customer);
        } else {
            console.log('Invalid username or password');
        }
    }
}); */

module.exports = router; 


