const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
    const{name,email,contact,userQuery}=req.body;
    console.log(name,email,contact,userQuery)
    let body=`Dear ${name},
Thank you for showing interest in Aditya Gym.
We appreciate your query ${userQuery}.
We will share all the details you requested very soon. If you have any more questions, please feel free to reply to this email or contact us at 6387743431].
Looking forward to seeing you at the gym!

Best regards,  
Aditya Yadav `

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "ssy81462@gmail.com",
            pass: "qgvh lwgg urcy bwkq",
        },
    });

    const info = await transporter.sendMail({
    from:'"Aditya Yadav" <ssy81462@gmail.com>',
    to: `${email}`,
    subject:"Thank You for Contacting Aditya Gym",
    text: `${body}`,
  })
  .then((result)=>{
   res.send("Thanks For contacting us",result);
  })
   
}
module.exports = sendMail;