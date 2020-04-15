const email = require('nodemailer');

const id = 'matathresh1740@gmail.com';
const pw = 'thekal12!';

const send = (toEmail, code) => {
    const trans = email.createTransport({
        service: 'gmail',
        auth: {
            user: id,
            pass: pw
        }
    });

    const options = {
        from: id,
        to: toEmail,
        subject: '소식 인증 메일 입니다.',
        text: `안녕하세요 소식입니다.
가입을 축하드리며 아래 링크를 누르시면 자동으로 인증이 완료되어 서비스 이용이 가능합니다. 
http://localhost:3000/auth?code=` + code
    }

    trans.sendMail(options, (err, info) => {
        err ? console.log(err) : console.log("전송 완료!");
    });
}

module.exports = send;