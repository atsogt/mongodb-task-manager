require("dotenv").config();
const nodemailer = require("nodemailer");

console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);
// const transporter = nodemailer.createTransport({
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// const sendEmail = async () => {
//   const info = await transporter.sendMail({
//     from: process.env.EMAIL, // sender address
//     to: "atsogt24@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
// };

// sendEmail();
