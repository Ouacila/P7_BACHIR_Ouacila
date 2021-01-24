const express = require("express");
const app = express();
const helmet = require("helmet");
var session = require("cookie-session");
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const userRoutes = require("./routes/user");

app.use;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
/* Ces headers permettent :
d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).*/

// Empêche l'ouverture de la page dans le cadre ou l'iframe pour protéger du détournement de clic
app.disable("x-powered-by");

var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 heure
app.use(
    session({
        name: "session",
        keys: ["userId"],
        cookie: {
            secure: true,
            httpOnly: true,
            expires: 24,
        },
    })
);

app.use(bodyParser.json());
app.use("/api", userRoutes);

app.use(helmet());

module.exports = app;