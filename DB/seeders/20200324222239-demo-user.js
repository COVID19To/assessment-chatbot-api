'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.sequelize.query(`INSERT INTO CenterDetails VALUES
    (null,'Health Sciences North Research Institute','56 Walford Road','Sudbury','ON','P3E 2H3','(705) 523-7100','ChIJXSBsyTFVLk0RXQNa7cR-1y0',46.5,-81.0,NOW(), NOW()),
    (null,'Ottawa’s COVID-19 Community Assessment Centre','151 Brewer Way','Ottawa','ON','K1S 5T1','(613) 247-4917','ChIJp013NdwFzkwR4y8YbV_XpNM',45.4,-75.7,NOW(), NOW()),
    (null,'Oakridge Arena','825 Valetta Street','London','ON','N6H 2Z2','(519) 661-4424','ChIJaR8AtEjwLogRtcMsHKtvZCM',43.0,-81.3,NOW(), NOW()),
    (null,'Peterborough Regional Health Centre','1 Hospital Drive','Peterborough','ON','K9J 7C6','(705) 743-2121','ChIJ49eXQlCM1YkR43UfWFgCgMM',44.3,-78.3,NOW(), NOW()),
    (null,'Barrie COVID-19 Assessment Centre','490 Huronia Rd','Barrie','ON','L4N 8X3','(866) 797-0000','ChIJieZHdYm8KogRN2OuIbpUWiQ',44.3,-79.7,NOW(), NOW()),
    (null,'East End Clinic','2757 King Street East','Hamilton','ON','L8G 5E4','(905) 974-9848','ChIJ38LCSPeYLIgREmaxheHU6m4',43.2,-79.8,NOW(), NOW()),
    (null,'West End Clinic','690 Main Street West','Hamilton','ON','L8S 1A4','(905) 974-9848','ChIJkZlun12bLIgR0R55Eti47Xw',43.3,-79.9,NOW(), NOW()),
    (null,'Trillium Health Partners - Credit Valley Hospital','2200 Eglinton Ave West','Mississauga','ON','L5M 2N1','(905) 813-2200','ChIJ6eEajoZBK4gRUahqXRVFWmg',43.6,-79.7,NOW(), NOW()),
    (null,'Trillium Health Partners - Mississauga Hospital','100 Queensway West','Mississauga','ON','L5B 1B8','(905) 848-7100','ChIJmQ1EjPZGK4gR7XMVDjV8rGQ',43.6,-79.6,NOW(), NOW()),
    (null,'William Osler Health System - Peel Memorial Centre for Integrated Health and Wellness','20 Lynch Street','Brampton','ON','L6W 2Z8','(905) 494-2120','ChIJ08P9fI0VK4gRxizQBNO00YM',43.7,-79.8,NOW(), NOW()),
    (null,'Sunnyside Building St. Joseph''s Health Centre','30 The Queensway','Toronto','ON','M6R 1B5','(416) 530-6704','ChIJuVPgpck1K4gRNSC4H4V1O8c',43.6,-79.4,NOW(), NOW()),
    (null,'Unity - St. Michael''s Hospital','209 Victoria Street','Toronto','ON','M5B 1T8','(416) 360-4000','ChIJ7SFqkzTL1IkRHP4f8xxifIQ',43.7,-79.4,NOW(), NOW()),
    (null,'Women''s College Hospital','76 Grenville Street','Toronto','ON','M5S 1B2','(416) 323-6400','ChIJ1Sstj7Y0K4gRw0hzg1oADIk',43.7,-79.4,NOW(), NOW()),
    (null,'Michael Garron Hospital','825 Coxwell Avenue','East York','ON','M4C 3E7','(416) 461-8272','ChIJh_bewWfM1IkROPuEa4baPLI',43.7,-79.3,NOW(), NOW()),
    (null,'Humber River Hospital','1235 Wilson Avenue','North York','ON','M3M 0B2','(416) 242-1000','ChIJd4i0AHUxK4gRX0B1g2DmXUw',43.7,-79.5,NOW(), NOW()),
    (null,'North York General Hospital','4001 Leslie Street','North York','ON','M2K 1E1','(416) 756-6000','ChIJO9pISr_S1IkR7BbyY-VbFtU',43.8,-79.4,NOW(), NOW()),
    (null,'Scarborough Health Network - Birchmount hospital','3030 Birchmount Road','Scarborough','ON','M1W 3W3','(416) 495-2400','ChIJjyeGyMHT1IkRyVCxgno80nU',43.8,-79.3,NOW(), NOW()),
    (null,'Mackenzie Health Richmond Hill Hospital Emergency Room','10 Trench Street','Richmond Hill','ON','L4C 4Z3','(905) 883-1212','ChIJ_yxTs8srK4gRKE1jWCD1UG8',43.9,-79.5,NOW(), NOW()),
    (null,'Sault Ste. Marie Clinic','165 Drive in Road','Sault Ste. Marie','ON','P6B 5X5','(705) 759-3434','ChIJkXm0cp83Nk0RKqSiPQ4GsXQ',46.5,-84.3,NOW(), NOW()),
    (null,'Cape Breton Regional Hospital','1482 George Street','Sydney','NS','B1P 1P3','(902) 567-8000','ChIJyWFCaGL7Z0sRLh4AWXAaesY',46.1,-60.2,NOW(), NOW()),
    (null,'St. Martha''s Regional Hospital','25 Bay Street','Antigonish','NS','B2G 2G4','(902) 867-4500','ChIJU3USHm1FXEsRYsS5ZPdTk2I',45.6,-62.0,NOW(), NOW()),
    (null,'East Side Health Centre','688 East River Road','New Glasgow','NS','B2H 3S1','(902) 752-3632','ChIJN7F2LlYZXEsRGIruYQ0Z9Bk',45.6,-62.6,NOW(), NOW()),
    (null,'Cumberland Regional Health Care Centre','19428 Highway 2','Amherst','NS','B4H 1N6','(902) 667-3361','ChIJeezh-mJJX0sR3OLuwRVhv-Q',45.8,-64.2,NOW(), NOW()),
    (null,'Colchester East Hants Health Centre','600 Abenaki Road','Truro','NS','B2N 5A1','(902) 893-5554','ChIJteAcd-1PWUsRdIpnGlIiXdk',45.3,-63.3,NOW(), NOW()),
    (null,'Valley Regional Hospital','150 Exhibition Street','Kentville','NS','B4N 5E3','(902) 678-7381','ChIJsyLKXSRXWEsR4a7ICYM9RB8',45.1,-64.5,NOW(), NOW()),
    (null,'Cobequid Community Health Centre','40 Freer Lane','Lower Sackville','NS','B4C 0A2','(902) 869-6100','ChIJDRBgUkWIWUsRVMiDi71PG4Y',44.8,-63.7,NOW(), NOW()),
    (null,'Dartmouth General Hospital ','325 Pleasant Street','Dartmouth','NS','B2Y 4G8','(902) 465-8300','ChIJuwZD_LsjWksR4jkJ9rlkzSQ',44.7,-63.5,NOW(), NOW()),
    (null,'Halifax Infirmary Robie Street Entrance','1799 Robie Street','Halifax','NS','B3H 2E2','(902) 473-2700','ChIJ6T4oCSwiWksR5dmYeVt8Ns0',44.6,-63.6,NOW(), NOW()),
    (null,'South Shore Regional Hospital','90 Glen Allan Drive','Bridgewater','NS','B4V 3S6','(902) 543-4603','ChIJf3wcHb9nV0sRbro9JVpTqPg',44.4,-64.5,NOW(), NOW()),
    (null,'Mount Carmel Clinic','886 Main Street','Winnipeg','MB','R2W 5L4','(204) 582-2311','ChIJ33xHgG5x6lIRSSvSL0z9upI',49.9,-97.1,NOW(), NOW()),
    (null,'Access Transcona','845 Regent Avenue West','Winnipeg','MB','R2C 3A9','(204) 938-5555','ChIJHfL5NRp66lIRbkztN3Ni9O8',49.9,-97.0,NOW(), NOW()),
    (null,'ACCESS Winnipeg West','280 Booth Drive','Winnipeg','MB','R3J 3R5','(204) 940-2040','ChIJW2xeOJgM6lIREnBLgUE8u4E',49.9,-97.3,NOW(), NOW()),
    (null,'ACCESS Fort Garry','135 Plaza Dr','Winnipeg','MB','R3T 6E8','(204) 940-7100','ChIJf8jP08N16lIRMSAKLb3djZI',49.8,-97.1,NOW(), NOW()),
    (null,'Collingwood General and Marine Hospital','459 Hume Street ','Collingwood ','ON','L9Y 1W9','(705) 445-2550','ChIJaQZKRuR7KogREEHMBpknHjY',44.5,-80.2,NOW(), NOW());
`)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('CenterDetails', null, {})
  }
}
