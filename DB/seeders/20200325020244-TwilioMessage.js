/* eslint-disable no-useless-escape */
'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `INSERT INTO TwilioMessages VALUES
      (1, 'Collect_Fallback','Looks like I''m having trouble. Apologies for that. Let''s start again, how can I help you today?','Both','English', NOW(), NOW()),
      (2, 'Fallback','I''m sorry didn''t quite get that. Please say that again.','Both','English', NOW(), NOW()),
      (3, 'Goodbye','Thank you! Please reach out again if you need anything. Goodbye.','Both','English', NOW(), NOW()),
      (4, 'Greetings','Hello You have reached COVID-19 Information and self triage help line','Both','English', NOW(), NOW()),
      (5, 'Information_Router','For COVID-19 News Update Text 1.\n For COVID-19 Triage Text 2.\n For COVID-19 Self-isolation Text 3.\n For COVID-19 Prevention Tips Text 4.\n For Exit Text 5.\n','SMS','English', NOW(), NOW()),
      (6, 'NewsUpdate','As  of  March  20  8:30 PM,  311 confirmed cases  in Ontario, 271  cases  in  BC, 195  cases in  Alberta, 139  Cases  in  Quebec and  971 confirmed cases  in  Canada','SMS','English', NOW(), NOW()),
      (7, 'Safety-Tips','Wash hands at the door and at regular intervals. \r Change Clothing when entering home from public space. \r Wash Coats every 1-2 Days. \r Avoid touching face, cover coughs & sneezes. \r Disinfect surfaces and utensils daily. \r Increase ventilation by opening windows or adjusting AC.\r Provide a protected space for vulnerable household members. \r Limit Non-essential travel even domestic. \r Limit eating in public spaces \r','Both','English', NOW(), NOW()),
      (8, 'Self-Isolation','You   must   self-isolate.\r If   you   have   travelled   internationally   within   the   last   14   days. \r If   you   have   any   COVID-19   symptoms.   \r If you had   close   contact   with   a    COVID-19   confirmed   case. \r Please   do   not   go   to   an   emergency   department,   family   doctor   or   walk-in   clinic  unless  your   symptoms   worsen.   \r Don''t   go   to   any   public   places,   stay   at   home,   and   don’t   have   any   visitors','Both','English', NOW(), NOW()),
      (9, 'Symptoms','Fever   greater   than   38°C   or   100.4°F.   Continuous   Cough.   and   Shortness   of   breath.','Both','English', NOW(), NOW()),
      (10, 'Questions','Are you experiencing any of the following: severe difficulty breathing (e.g., struggling for each breath, speaking in single words), severe chest pain, having a very hard time waking up , feeling confused , lost consciousness.\n Reply  Yes  or  No','Both','English', NOW(), NOW()),
      (11, 'Evaluate-Answers','Call 911 or go to the nearest Emergency Department. Don''t use public transport, cover cough, avoid touching face, and follow other guidelines','Both','English', NOW(), NOW()),
      (12, 'Questions2','Are you experiencing any of the following:\n Short of breath at rest , Inability to lie down because of difficulty breathing , Chronic health conditions that you are having difficulty managing because of your current respiratory illness.\n Reply Yes or  No','Both','English', NOW(), NOW()),
      (13, 'Questions3','The rest of this assessment will ask you questions to determine whether or not you will require COVID-19 testing. Do you have any of the following:\n Temperature greater than 38°C or 100.4°F , Cough , Shortness of breath , Muscle aches, Fatigue, Headache , Sore throat, Runny nose or Diarrhea.\n Symptoms in young children may also be non-specific (for example, Lethargy, Poor feeding).\n Reply Yes or No','Both','English', NOW(), NOW()),
      (14, 'Evaluate-Answers3','Since you don’t have any COVID-19 symptoms, you likely don’t need to be tested for COVID-19.If you get any COVID-19 symptoms, take this self-assessment again. If you need more information, visit https://www.canada.ca/coronavirus. If you are experiencing other symptoms and want assessment, contact your primary care provider (for example, family doctor) or your local tele health line.','Both','English', NOW(), NOW()),
      (15, 'Questions4','In the past 14 days have you had close contact with someone who is confirmed as having COVID-19 OR traveled outside Canada.\n Reply Yes or No','Both','English', NOW(), NOW()),
      (16, 'Evaluate-Answers4A','There are many common viruses other than COVID-19 that can cause your symptoms. Based on your responses you likely do not need to be tested for COVID-19 at this time. If your symptoms worsen, or if you are concerned, go to https://www.canada.ca/coronavirus, contact your primary care provider (for example, family doctor) or call your lcoal tele health line.','Both','English', NOW(), NOW()),
      (17, 'Evaluate-Answers4B','Please Call HealthLine 811.Based on the responses youve just provided, please call HealthLine 811 to have your symptoms assessed. HealthLine 811 is currently experiencing heavy call volumes and will get to your call as quickly as possible.Please do not go to an emergency department, family doctor or walk-in clinic.Because you have (or had) symptoms, you should self-isolate until your test results are available. That means dont go to any public places, stay at home, and dont have any visitors. If you have any questions, visit https://www.canada.ca/coronavirus','Both','English', NOW(), NOW()),
      (18, 'getPostalCode','For the 3 closest Assessment Centers to you, enter the first 3 digits of your postal code (for example: A1A)','Both','English', NOW(), NOW()),
      (19, 'getCenterDetails','The 3 closest assessment center to you are:','Both','English', NOW(), NOW()),
      (20, '911advise','If your symptoms significanly worsen call 911 or go to the nearest Emergency Department .','Both','English', NOW(), NOW()),
      (21, 'Information_Router',', , , For , , , COVID-19 , , , News , , , Update , , , Press , , , 1 , , , , For , , , COVID-19 , , , Triage , , , Press , , , 2 , , , , For , , , COVID-19 , , , Self-isolation , , , Press , , ,3 , , , , For , , , COVID-19 , , , Prevention , , , Tips , , , Press , , , 4 , , , For , , , exit , , , press , , , 5','Voice','English', NOW(), NOW()),
      (22, 'NewsUpdate','As , of ,March , 20 , 7:30 PM, 311 , confirmed ,  cases  , in  , Ontario ,  271,  cases,  in,   BC ,  195,  cases , in ,  Alberta , 139 ,  Cases , in ,  Quebec ,  and  , 971  , confirmed  , cases   in   Canada','Voice','English', NOW(), NOW()),
      (23, 'getHospitalPostalCode','For the 3 closest hospital to you, enter the first 3 digits of your postal code (for example: A1A)','Both','English', NOW(), NOW()),
      (24, 'getHospitalDetails', 'The 3 closest hospital\\'s to you are', 'Both', 'English', NOW(),NOW());
    `)
  },

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
