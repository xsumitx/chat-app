const SibApiV3Sdk = require('sib-api-v3-sdk');
const express = require('express');
//const emailp=req.body.email;
//require('dotenv').config({ path: '../.env' }); // Path to your .env file


async function sendTransactionalEmail(emailp,userId) {
  
  try{
   // const emailp=req.body.email;

  const defaultClient = SibApiV3Sdk.ApiClient.instance;

  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey ='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';
   const url=`http://localhost:3000/newpassword/${userId}`
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.subject = "PLEASE UPDATE ";
  sendSmtpEmail.htmlContent = `Click <a href="${url}">here</a> to reset your password.`;
  sendSmtpEmail.sender = { "name": "GATE UPDATE", "email": "apestogetherstrong321@gmail.com" };
  sendSmtpEmail.to = [{ "email": emailp, "name": "RAJENDER S/O SHAMSHER SINGH" }];

  
    const { body } = await apiInstance.sendTransacEmail(sendSmtpEmail);
   // console.log(uuids)
    console.log('Email sent successfully. Response:', body);
 } catch (error) {
    console.error('Error sending email:', error.response ? error.response.text : error.message);
  }
}

// Call the function
module.exports=sendTransactionalEmail;