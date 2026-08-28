require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");
require("./models");


const PORT = process.env.PORT || 8000;

sequelize
    .authenticate()
    .then(() => {
        console.log("Database Connected Successfully");

        return sequelize.sync();
    })
    .then(() => {
        console.log("Database Synced Successfully");

        app.listen(PORT, () => {
            console.log(`Server Running On Port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });