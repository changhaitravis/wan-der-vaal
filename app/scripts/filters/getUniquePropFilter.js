'use strict'; 
 
 angular.module('gcatomIntraApp')
 .filter('getUniqueProp', function() {
    return function(input, key) {
        if(input){
            var unique = {};
            var uniqueList = [];
            for(var i = 0; i < input.length; i++){
                console.log(key);
                var userGroupsArray;
                if(typeof input[i][key] === 'string'){
                    userGroupsArray = [input[i][key] ];
                }else{
                    userGroupsArray = input[i][key] ;
                }
                for(var j = 0; j < userGroupsArray.length; j++){
                    if(typeof unique[userGroupsArray[j]] === "undefined"){
                        unique[userGroupsArray[j]] = "";
                        uniqueList.push(userGroupsArray[j]);
                    }
                }
            }
            console.log(uniqueList);
            return uniqueList;
        }
    };
}); 
