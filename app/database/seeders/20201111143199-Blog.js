'use strict';

const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');
module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('blogs', [
        {
          title: 'PARÇA BÜTÜN İLİŞKİSİ',
          des: 'Soyut akıl yürütme, görsel uyaranın daha küçük bir parçası ve bütünü arasındaki ilişkiyi kavrama becerisini ifade etmektedir. ',
        
          },
        {
        title: 'BÜTÜNSEL & GÖRSEL ALGI',
        des: 'Görsel işlemleme, akıl yürütme, uyaranın bütün olarak değerlendirilmesini ifade etmektedir. ',
      
        },
        {
          title: 'UZUN SÜRELİ DİKKAT ',
          des: 'Dikkat ve konsantrasyonun belli bir uyaran üzerinde uzun süre sürdürülmesini ifade etmektedir.',
        
        },
        {
          title: 'AYIRT ETME & ORGANİZASYON',
          des: 'Görsel uyaranların birbirinden farklılaştıkları özellikleri algılamayı ve bunlara göre bir yapı oluşturmayı ifade etmektedir.',
        
        },
        {
          title: 'DİL BECERİSİ',
          des: 'İçinde bulunulan gelişim basamağına uygun olarak çıkarılan sesleri ve üretilen sözel ifadelerin gelişimini ifade etmektedir. Sözel akıcılık ve kelimeleri kullanma becerisini de kapsamaktadır.',
        
        },
        {
          title: 'EŞLEŞTİRME',
          des: 'Nesne ve kavramların benzeyen ortak özelliklerine göre aynı kategoriye alma becerisini ifade etmektedir',
        
        },
        {
          title: 'SIRALAMA',
          des: 'Görsel uyaranı boyut kavramını dikkate alarak algılama, algılanan boyuta göre bir sıraya dizme becerisini ifade etmektedir. ',
        
        }
    
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('blogs', null, {});
     
  }
};
