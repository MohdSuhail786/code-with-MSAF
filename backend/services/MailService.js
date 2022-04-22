var SibApiV3Sdk = require("sib-api-v3-sdk");
const { VERIFY_EMAIL_TEMPLATE, QUERY_EMAIL_TEMPLATE } = require("../constants");
const { logger } = require("./Logger");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
require("dotenv").config();
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

exports.sendVerificationEmail = async (user) => {
    try {
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
        sendSmtpEmail = {
        sender: { email: "thesuhailansari786246@gmail.com" },
        to: [
            {
            email: user.email,
            },
        ],
        subject: "Verify Account",
        htmlContent: VERIFY_EMAIL_TEMPLATE(user),
        };
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log("API called successfully. Returned data: " + data);
        logger.info(`Email sent successfully ${data}`)
    } catch (err) {
        logger.error(err);
        throw err;
    }
  }

  exports.sendQueryEmail = async (admin) => {
    try {
        var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
        sendSmtpEmail = {
        sender: { email: "thesuhailansari786246@gmail.com" },
        to: [
            {
            email: 'thesuhailansari786246@gmail.com',
            },
        ],
        subject: "Verify Account",
        htmlContent: QUERY_EMAIL_TEMPLATE(admin),
        };
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)
        console.log("API called successfully. Returned data: " + data);
        logger.info(`Email sent successfully ${data}`)
    } catch (err) {
        logger.error(err);
        throw err;
    }
  }