require("dotenv").config();

const secret= `${process.env.JWT_SECRET}`;
const expiration= '2h';
module.exports= {secret,expiration}