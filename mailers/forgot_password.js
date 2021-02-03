const nodemailer = require('../config/nodemailer');


//another way of exporting a method
exports.resetPasswordMail = (token) => {

    let htmlString = nodemailer.renderTemplate({token : token}, '/forgot_password.ejs');

    nodemailer.transporter.sendMail({
        from : 'beenakhan77x@gmail.com',
        to : token.user.email,
        subject : 'Password Reset',
        html : htmlString
    }, (err, info) => {
        if(err){console.log('error in sending mail', err); return;}
        return;
    });
}