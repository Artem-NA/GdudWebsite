//imports
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Reusable function to render pages
const renderPage = (req, res, page, pageTitle) => {
    const loggedIn = req.session.customer ? true : false;
    const username = loggedIn ? req.session.customer.username : null;
    res.render(page, { username: username, pageTitle: pageTitle, loggedIn: loggedIn });
};

const renderPageParameter = (req, res, page, pageTitle,parameter) => {
    const loggedIn = req.session.customer ? true : false;
    const username = loggedIn ? req.session.customer.username : null;
    res.render(page, { username: username, pageTitle: pageTitle, loggedIn: loggedIn ,imageUrl:parameter});
};

//------------------ HOME PAGE ---------------------------------------------------------------------------
router.get('/', (req, res) => {
    renderPage(req, res, 'home', 'Tene Panter!');
});



//--------------- CAR MAIN PAGE ----------------------------------------------------------------------------


router.get('/cars', (req, res) => {
    const loggedIn = req.session.customer ? true : false;
    const username = loggedIn ? req.session.customer.username : null;
    // Render the result page with the selected image
    res.render('cars', { carModel:"",carInfo: "",imageUrl:"/img/default.jpg",pageTitle:"רכבי הטנא", loggedIn, username });
});


//---------------- ABOUT US --------------------------------------------------------------------------------
router.get('/aboutUs', (req, res) => {
    renderPage(req, res, 'aboutUs', 'About Us');
});

//-------------- Cars Calendar ------------------------------------------------------------------------------
router.get('/calender', (req, res) => {
    renderPage(req, res, 'calender copy', 'Calendar');
});

//------------ Selected Date -------------------------------------------------------------------------------
router.get('/date', (req, res) => {
    renderPage(req, res, 'date', 'Date');
});

router.get('/selected-date', (req, res) => {
    const selectedDate = req.query.selectedDate;
    // Redirect to another page or handle as needed
    res.send(`You selected: ${selectedDate}`);
});

//---------Weapons Page ----------------------------------------------------------------------------------
router.get('/weapons', (req, res) => {
    renderPage(req, res, 'weapons', 'נשקים');
});

//----------CANVAS PAGE ----------------------------------------------------------------------------------
router.get('/canva', (req, res) => {
    renderPage(req, res, 'canva', 'The Panteron');
});


//--------------TESTS------------------------------------------------------------------------------------









//----------------------VIDEOS--------------------------------


router.get('/videos', (req, res) => {
    const loggedIn = req.session.customer ? true : false;
    const username = loggedIn ? req.session.customer.username : null;
    res.render("videos", { pageTitle: "סרטוני עזר",username: username, loggedIn: loggedIn });
});


router.get('/files', (req, res) => {
    const loggedIn = req.session.customer ? true : false;
    const username = loggedIn ? req.session.customer.username : null;
    res.render("files", { pageTitle: "קבצי עזר ",username: username, loggedIn: loggedIn });
});


//---------------------CHAT BOT-------------------------------


// Chatbot route to handle incoming messages
router.post('/chatbot', (req, res) => {
    const userMessage = req.body.message.toLowerCase(); // Get user message and convert to lowercase
    let reply;
    let redirectUrl = null; // Initialize redirect URL
    if(userMessage.includes('$$$$'))
    {
        // Set up the transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Mail options to send the message to your email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,  // sending the message to yourself
            subject: 'הודעה חריגה שצריכה תשומת לב מאתר הטנא',
            text: `הודעה:\n\n${userMessage}`  // only include the message
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) 
                console.log(error);       });
        reply = "בקשתך נשלחה ומענה צפוי בהקדם האפשרי";
    }
    else if (userMessage.includes('היי') || userMessage.includes('שלום')) {
        reply = 'מה נשמע ,במה אוכל לעזור?';
    } else if (userMessage.includes(' לעזור לי')||userMessage.includes(' עזרה')) {
        reply = 'כן בהחלט, במה תרצה עזרה?';
    } else if (userMessage.includes('טלת')|| userMessage.includes('טל"ת')) {
        reply = 'כן אני יכול להראות לך איך מחליפים טלת';
        redirectUrl = '/video1'; 
    } else if (userMessage.includes('מתי')||userMessage.includes('שעות פתיחה')||userMessage.includes('פתוחים')) {
        reply = "אנחנו עובדים מ9 בבוקר ועד 12 ולאחר מכן מ13:00 עד 18:00 לצורך פעילות חריגה תגיבו לי למה צריך מענה,שם, מספר טלפון ובסיום ההודעה תגיבו $$$$";
    } else if (userMessage.includes('שם')||userMessage.includes('שמך')||userMessage.includes('יצרן')||userMessage.includes('יצר')) {
        reply = ' אני ארט-בוט והיצרן שלי זה ארטיום שתקוע בחימוש';
    } else if (userMessage.includes('בית')||userMessage.includes('הביתה')) {
        reply = "גם לי בא אבל היי אנחנו במלחמה ";
    } else if (userMessage.includes('לא יודע')||userMessage.includes('כלום')) {
        reply = "אז מה אתה פונה אלי אתה לא מבין שאין לי זמן גם ככה";
    } else if (userMessage.includes("מחילה")||userMessage.includes('סליחה')) {
        reply = "הכל טוב כולם עושים טעויות גם אני לפעמים ";
    } else if (userMessage.includes('נשק')||userMessage.includes('אופטיקה')) {
        reply = "כן מיד מעביר אותך לאופטיקה ונשק";
        redirectUrl = '/weapons';
    } else {
        reply = 'אני מצטער אבל לא הבנתי את השאלה, נסה שנית';
    }

    // Send the response and redirect URL if applicable
    res.json({ reply, redirectUrl });
});

// Add a route to render the chatbot page
router.get('/chatbot', (req, res) => {
    renderPage(req, res, 'chatbot', 'עוזר אישי של חיילי גדוד 49');
});



//----------TEST --------------------------
router.get('/test', (req, res) => {
    renderPage(req, res, 'test', 'Tene Panter!');
});




//router to move data between js files
module.exports = router;

