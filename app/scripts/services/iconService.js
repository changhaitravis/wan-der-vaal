'use strict'; 
 
angular.module('wanDerVaal')
.service('iconService', function($http){
   
  var images = {};
  var fonts = {};
  
  var fs = require('fs');
  var file = fs.readdirSync(process.cwd() + '/images'); 
  console.log(file); 
});