'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `INSERT INTO TwilioMessages VALUES
      (25, 'Collect_Fallback', 'On dirait que jai des problèmes. Veuilez accepter mes excuses. Comment puis-je vous aider aujourd hui?', 'Both', 'French', NOW(), NOW()),
      (26, 'Fallback', 'Je suis désolé de ne pas avoir tout à fait compris. Veuillez le répéter.', 'Both', 'French', NOW(), NOW()),
      (27, 'Goodbye', 'Au revoir merci! Veuillez nous contacter si vous avez besoin de quelque chose. Au revoir!', 'Both', 'French', NOW(), NOW()),
      (28, 'Greetings', 'Bonjour vous avez réjoindre le centre dinformation de COVID-19 et de services dauto-assistance', 'Both', 'French', NOW(), NOW()),
      (29, 'Menu','Pour le texte des dernières nouvelles de COVID-19.\n Pour COVID-19 triage Texto 2.\n Pour COVID-19 auto-isolement Texto 3.\n Pour COVID-19 conseils de prevention Texto 4.\n Pour sortir Texto 5.\n','SMS','French', NOW(), NOW()),
      (30, 'NewsUpdate','À partir du 20 mars 20 h 30, 311 de cas confirmé en Ontario, 217 de cas en Colombie-Britannique, 195 cas en Alberta, 139 cas en Québec et au total 971 cas en Canada','SMS','French', NOW(), NOW()),
      (31, 'Safety-Tips','Lavez les mains reguliérement. .\r Changez les vêtemens regulièrement après le retour chez vous. \r Lavez les manteuax chaque 1-2 jours. \r  Toussez ou éternuez dans le creux de votre bras, plutôt que dans votre main. \r Désinfectez les surfaces et les ustensiles chaque jour. \r Ouvrez grand les fenêtres ou par ajuster le climatiseur. \r Fournissez un espace protegé pour les membres vulnérables chez vous. \r Évitez tout voyage non essentiel, intérieur inclus. \r Évitez de manger dans les lieux publics\r','Both','French', NOW(), NOW()),
      (32, 'Self-Isolation','Vous devez vous isoler. \r Si vous avez voyagé à létranger pendand la derniére 14 jours. \r Si vous avez des symptômes de COVID-19 \r Si vous avez été proche dun cas confirmé de COVID-19.\r Veuillez ne pas visiter un clinique durgence, médecin de famille ou une clinique sauf que les symptômes ont aggravé.. \r Veuillez ne pas visiter les lieux publics, restez chez vous, et les visiteurs sont interdit pendant cette période.','Both','French', NOW(), NOW()),
      (33, 'Symptoms','Le fièvre plus grand que 38°C   ou  100.4°F. Un toux constant et souffle court.', 'Both', 'French', NOW(), NOW()),
      (34, 'Questions','Souffrez-vous de lune des situations suivantes: difficulté respiratoire sévère (par exemple, lutte pour chaque respiration, parler en mots simples), douleur thoracique sévère, difficulté à se réveiller, sensation de confusion, perte de conscience. \n Répondre Oui ou Non', 'Both', 'French', NOW(), NOW()),
      (35, 'Evaluate-Answers','Appelez le 911 ou rendez-vous au service durgence le plus proche. Nutilisez pas les transports en commun, couvrez la toux, évitez de vous toucher le visage et suivez les autres directives','Both','French', NOW(), NOW()),
      (36, 'Questions2','Souffrez-vous de lune des situations suivantes: \n Essoufflement au repos, incapacité de sallonger en raison de difficultés respiratoires, problèmes de santé chroniques que vous avez du mal à gérer en raison de votre maladie respiratoire actuelle. \n Répondre Oui ou Non', 'Both', 'French', NOW(), NOW()),
      (37, 'Questions3','Le reste de cette évaluation vous posera des questions pour déterminer si vous aurez besoin ou non dun test COVID-19. Avez-vous lun des éléments suivants: \n Température supérieure à 38 ° C ou 100,4 ° F, toux, essoufflement, douleurs musculaires, fatigue, mal de tête, mal de gorge, écoulement nasal ou diarrhée. \n Les symptômes chez les jeunes enfants peuvent également être non spécifiques (par exemple, léthargie, mauvaise alimentation). \n Répondre Oui ou Non','Both','French', NOW(), NOW()),
      (38, 'Evaluate-Answers3','Étant donné que vous ne présentez aucun symptôme COVID-19, vous naurez probablement pas besoin de subir un test de dépistage du COVID-19. Si vous ressentez des symptômes de COVID-19, faites à nouveau cette auto-évaluation. Si vous avez besoin de plus dinformations, visitez https://www.canada.ca/coronavirus. Si vous ressentez dautres symptômes et souhaitez une évaluation, contactez votre fournisseur de soins primaires (par exemple, un médecin de famille) ou votre ligne locale de télésanté.','Both','French', NOW(), NOW()),
      (39, 'Questions4','Au cours des 14 derniers jours, avez-vous eu des contacts étroits avec une personne confirmée comme ayant COVID-19 OU voyagé à lextérieur du Canada. \n Répondre Oui ou Non','Both','French', NOW(), NOW()),
      (40, 'Evaluate-Answers4A','Il existe de nombreux virus courants autres que COVID-19 qui peuvent provoquer vos symptômes. Sur la base de vos réponses, vous navez probablement pas besoin dêtre testé pour COVID-19 pour le moment. Si vos symptômes saggravent ou si vous êtes préoccupé, allez à https://www.canada.ca/coronavirus, contactez votre fournisseur de soins primaires (par exemple, un médecin de famille) ou appelez votre ligne de télésanté locale','Both','French', NOW(), NOW()),
      (41, 'Evaluate-Answers4B','Veuillez appeler HealthLine 811. Basé sur les réponses que vous venez de fournir, veuillez appeler HealthLine 811 pour faire évaluer vos symptômes. HealthLine 811 connaît actuellement de gros volumes dappels et répondra à votre appel le plus rapidement possible. Veuillez pas vous rendre à lurgence, au médecin de famille ou à la clinique sans rendez-vous. Parce que vous avez (ou avez eu) des symptômes, vous devez vous isoler jusquà ce que les résultats de votre test soient disponibles. Cela signifie ne pas aller dans les lieux publics, rester à la maison et ne pas avoir de visiteurs. Si vous avez des questions, visitez https://www.canada.ca/coronavirus','Both','French', NOW(), NOW()),
      (42, 'getPostalCode','Pour les 3 centres dévaluation les plus proches de vous, entrez les 3 premiers chiffres de votre code postal (par exemple: A1A)','Both','French', NOW(), NOW()),
      (43, 'getCenterDetails','Les 3 centres dévaluation les plus proches de vous sont:','Both','French', NOW(), NOW()),
      (44, '911advise','Si vos symptômes saggravent considérablement, composez le 911 ou rendez-vous au service durgence le plus proche.', 'Both', 'French', NOW(), NOW()),
      (45, 'Menu',',,, Pour,,, COVID-19,,, Actualités,,, Mise à jour,,, Appuyez sur,, 1,,,, Pour,,, COVID-19,,, Triage,,, Appuyez sur,, , 2,,,, Pour,,, COVID-19,,, Auto-isolation,,, Appuyez sur,,, 3,,,, Pour,,, COVID-19,,, Conseils,,, Préventative ,,, Appuyez sur ,,, 4,,, Pour,,, quitter,,, appuyez sur,,, 5','Voice','French', NOW(), NOW()),
      (46, 'NewsUpdate','En date du, 20 mars, 19 h 30, 311, confirmés, cas, en, Ontario, 271, cas, en, BC, 195, cas, en, Alberta, 139, Cas, en, Québec, et, 971, cas confirmés au Canada','Voice','French', NOW(), NOW()),
      (47, 'getHospitalPostalCode', 'Pour les 3 hôpitaux les plus proches de vous, entrez les 3 premiers chiffres de votre code postal (par exemple: A1A)','Both','French', NOW(), NOW()),
      (48, 'getHospitalDetails', 'Les 3 hôpitaux les plus proches de chez vous sont', 'Both', 'French', NOW(), NOW());
    `)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TwilioMessages', null, {})
  }
}
