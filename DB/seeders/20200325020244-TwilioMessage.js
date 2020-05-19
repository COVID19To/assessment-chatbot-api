/* eslint-disable no-useless-escape */
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `INSERT INTO TwilioMessages VALUES
      (1,'Collect_Fallback','Looks like I''m having trouble. Apologies for that. Let''s start again, how can I help you today?','Both','English',NOW(),NOW()),
      (2,'Fallback','I''m sorry didn''t quite get that. Please say that again.','Both','English',NOW(),NOW()),
      (3,'Goodbye','Thank you! Please reach out again if you need anything. Goodbye.','Both','English',NOW(),NOW()),
      (4,'Greetings','Hello, you have reached COVID-19 information and self assessment line. If this is an emergency, please hang up and dial 911.','Both','English',NOW(),NOW()),
      (5,'Menu','For the latest Canadian case numbers, Reply 1.\n\n For self assessment, Reply 2.\n\n For self isolation tips, Reply 3.\n\n For prevention tip, Reply 4.\n\n For callback from healthcare provider, Reply 5.\n\n To subscribe to daily alerts about new cases in your postal code, Reply 6.\n\n To exit, Reply 7.\n ','SMS','English',NOW(),NOW()),
      (6,'NewsUpdate','As of May 19th 11:05 AM, 23384 confirmed cases in Ontario, 2444 cases in BC,  6683 cases in Alberta,  43627 Cases in Quebec, and  78488 confirmed cases in Canada.','Both','English',NOW(),NOW()),
      (7,'Safety-Tips','Wash hands at the door and at regular intervals. \r Change Clothing when entering home from public space. \r Wash Coats every 1-2 Days. \r Avoid touching face, cover coughs & sneezes. \r Disinfect surfaces and utensils daily. \r Increase ventilation by opening windows or adjusting AC.\r Provide a protected space for vulnerable household members. \r Limit Non-essential travel even domestic. \r Limit eating in public spaces \r','Both','English',NOW(),NOW()),
      (8,'Self-Isolation','You must self-isolate.\nIf you have travelled internationally within the last 14 days. \nIf you have any COVID-19 symptoms.   \nIf you had close contact with a COVID-19 confirmed   case. \nPlease do not go to an emergency department, family doctor or walk-in clinic unless your symptoms worsen.   \nDon''t go to any public places, stay at home, and don’t have any visitors','Both','English',NOW(),NOW()),
      (9,'Symptoms','Fever   greater   than   38°C   or   100.4°F.   Continuous   Cough.   and   Shortness   of   breath.','Both','English',NOW(),NOW()),
      (10,'Questions','Are you experiencing any of the following: severe difficulty breathing (e.g., struggling for each breath, speaking in single words), severe chest pain, having a very hard time waking up , feeling confused , lost consciousness.\n Reply  Yes  or  No','Both','English',NOW(),NOW()),
      (11,'Evaluate-Answers','Call 911 or go to the nearest Emergency Department. Do not use public transport, cover when you cough, avoid touching your face, and follow other COVID-19 prevention guidelines.','Both','English',NOW(),NOW()),
      (12,'Questions2','Are you experiencing any of the following:\n Short of breath at rest , inability to lie down because of difficulty breathing , chronic health conditions that you are having difficulty managing because of your current respiratory illness.\n Reply Yes or  No','Both','English',NOW(),NOW()),
      (13,'Questions3','The rest of this assessment will ask you questions to determine whether or not you will require COVID-19 testing. Do you have any of the following:\n Temperature greater than 38°C or 100.4°F , cough , shortness of breath , muscle aches, fatigue, headache , sore throat, runny nose or diarrhea.\n Symptoms in young children may also be non-specific (for example, lethargy, poor feeding).\n Reply Yes or No','Both','English',NOW(),NOW()),
      (14,'Evaluate-Answers3','Since you don’t have any COVID-19 symptoms, you likely don’t need to be tested for COVID-19.\nIf you get any COVID-19 symptoms, take this self-assessment again. \nIf you need more information, visit www.canada.ca/coronavirus. \nIf you are experiencing other symptoms and want assessment, contact your primary care provider (for example, family doctor) or your local tele health line.','Both','English',NOW(),NOW()),
      (15,'Questions4','In the past 14 days have you had close contact with someone who is confirmed as having COVID-19 OR traveled outside Canada.\n Reply Yes or No','Both','English',NOW(),NOW()),
      (16,'Evaluate-Answers4A','There are many common viruses other than COVID-19 that can cause your symptoms.\nBased on your responses you likely do not need to be tested for COVID-19 at this time. If your symptoms worsen, or if you are concerned, go to www.canada.ca/coronavirus, contact your primary care provider (for example, family doctor) or call your lcoal tele health line.','Both','English',NOW(),NOW()),
      (17,'Evaluate-Answers4B','Please Call HealthLine 811.Based on the responses youve just provided, please call HealthLine 811 to have your symptoms assessed. HealthLine 811 is currently experiencing heavy call volumes and will get to your call as quickly as possible.Please do not go to an emergency department, family doctor or walk-in clinic.Because you have (or had) symptoms, you should self-isolate until your test results are available. That means dont go to any public places, stay at home, and dont have any visitors. If you have any questions, visit https://www.canada.ca/coronavirus','Both','English',NOW(),NOW()),
      (18,'possibleTest','Based on the responses you''ve just provided, you may need to be tested for COVID-19.\nPlease do not go to an emergency department, family doctor or walk-in clinic.\nBecause you have (or had) symptoms, you should self-isolate until your test results are available. That means don''t go to any public places, stay at home, and don’t have any visitors. If you have any questions, visit www.canada.ca/coronavirus\nWould you like a call back from a health care provider to complete your assessment? Reply Yes or No','Both','English',NOW(),NOW()),
      (19,'getCenterDetails','The 3 closest assessment center to you are:','Both','English',NOW(),NOW()),
      (20,'911advise','If your symptoms significanly worsen call 911 or go to the nearest Emergency Department .','Both','English',NOW(),NOW()),
      (21,'Menu','For the latest Canadian case numbers, say latest numbers. \n  For self assessment, say assessment.\n  For self isolation tips, say isolation tips.\n  For prevention tip, say prevention tips.\n  For callback from healthcare provider, say callback.\n  To exit, say exit.\n ','Voice','English',NOW(),NOW()),
      (22,'NewsUpdate','As of May 19th 11:05 AM, 23384 confirmed cases in Ontario, 2444 cases in BC,  6683 cases in Alberta,  43627 Cases in Quebec, and  78488 confirmed cases in Canada.','Voice','English',NOW(),NOW()),
      (23,'getHospitalPostalCode','For the 3 closest hospital to you, reply the first 3 digits of your postal code (for example: A1A)','chat','English',NOW(),NOW()),
      (24,'getHospitalDetails','The 3 closest hospital''s to you are','Both','English',NOW(),NOW()),
      (49,'LanguageMenu','To continue in English say English, pour service en français, dites français','Voice','English',NOW(),NOW()),
      (50,'LanguageMenu','To continue in English reply 1 , pour service en français, répondez 2','SMS','English',NOW(),NOW()),
      (51,'EvaluateProvider','Thank you someone will call you soon\n','Both','English',NOW(),NOW()),
      (53,'getHospitalPostalCode','For the 3 closest hospital to you, say the first 3 digits of your postal code (for example: A1A)','Voice','English',NOW(),NOW()),
      (55,'getHospitalPostalCode','For the 3 closest hospital to you, reply the first 3 digits of your postal code (for example: A1A)','SMS','English',NOW(),NOW()),
      (56,'getHospitalPostalCode','For the 3 closest hospital to you, reply the first 3 digits of your postal code (for example: A1A)','slack','English',NOW(),NOW()),
      (59,'getNearestCasesPostalCode','To view a list of cases near you, please enter in your postal code.','Both','English',NOW(),NOW());       
    `)
  },
  // INSERT INTO `database_development`.`TwilioMessages` (`Name`, `Message`, `BotType`, `Language`) VALUES ('EvaluateProvider', 'Thankyou someone will call you soon', 'Both', 'English');
  // INSERT INTO `database_development`.`TwilioMessages` (`Name`, `Message`, `BotType`, `Language`) VALUES ('EvaluateProvider', 'Merci quelqu\'un vous appellera bientôt\n\n', 'Both', 'French');

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('TwilioMessages', null, {})
  }
}
