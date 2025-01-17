const express=require("express");
const mroute=express.Router();
const bcrypt = require('bcrypt');
 const {client}=require("../redis/redis");
const nodemailer = require('nodemailer');
const {Rmodel}=require("../models/user")
// Generate SMTP service account from ethereal.email
mroute.post("/sendotp",async(req,res)=>{
    let {email,password,mobile,Name}=req.body
    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
    
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'amolthakare630@gmail.com',
                pass: 'gpckhcmostfmxzii'

            }
        });
        // const email = req.body.email;
        let digits = '0123456789';
        let limit = 4;
        let otp = ''
        for (i = 0; i < limit; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
    
        }
        // Message object
        let message = {
            from: 'amolthakare630@gmail.com',
            to: `${req.body.email}`,
            subject: 'email testing 2',
            text: 'Hi rajanna',
            html: `<p><b>Hello</b> From We connect this is ur otp for weconnect ${otp}</p>`
        };
    
        transporter.sendMail(message, async(err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }
            await client.set("otp",otp)
            bcrypt.hash(password,5, async(err, hash)=>{
                if(err)
                {
                    console.log(err +"in hassing")
                }else{
                    req.body.password=hash
                    console.log(req.body)
            await client.hset("data",`${otp}`,JSON.stringify(req.body))
    res.status(200).send("otp send to mail")
                }
            // console.log('Message sent: %s', info.messageId);
            // // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
})
})

mroute.post('/verify', async(req, res) => {
    let otprecived = req.body.otp;
    let ot=await client.hget("data",otprecived)
   
    // console.log(otp)
    if (ot) {
       let data= await client.hget("data",otprecived)
       
       console.log(data)
       data=JSON.parse(data)
       await client.hdel('data',`${ot}`)
       await client.getdel('otp')
       let Data=new Rmodel(data)
       await Data.save()
       res.send("Verfied");
    }else{
        res.status(500).send("Invalid OTP")
    }
 
       
    
})


module.exports={mroute}
