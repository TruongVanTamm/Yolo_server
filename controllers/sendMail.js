const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const { MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, MAILING_SERVICE_REFRESH_TOKEN, SENDER_EMAIL_ADDRESS } = process.env;

const oauth2Client = new OAuth2(MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, MAILING_SERVICE_REFRESH_TOKEN, OAUTH_PLAYGROUND);

// send mail
const sendEmail = (to, url,txt) => {
	oauth2Client.setCredentials({
		refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
	});

	const accessToken = oauth2Client.getAccessToken();
	const smtpTransport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: SENDER_EMAIL_ADDRESS,
			clientId: MAILING_SERVICE_CLIENT_ID,
			clientSecret: MAILING_SERVICE_CLIENT_SECRET,
			refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
			accessToken,
		},
	});

	const mailOptions = {
		from: SENDER_EMAIL_ADDRESS,
		to: to,
		subject: "Yolo",
		html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color:  #4267b2;">Chăm sóc khách hàng Yolo.</h2>
            <p>Để hoàn tất việc xác thực Email, vui lòng bấm vào nút bên dưới, Yolo vinh hạnh được hỗ trợ bạn:
            </p>
			<div style="  display: flex;">
			<a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 0 auto">${txt}</a>
			</div>
            <p>Nếu nút bấm không hoạt đông, vui lòng bấm vào liên kết dưới đây:</p>
            <div>${url}</div>
            </div>
        `,
	};

	smtpTransport.sendMail(mailOptions, (err, infor) => {
		if (err) return err;
		return infor;
	});
};

module.exports = sendEmail;
