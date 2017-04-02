'use strict';

/**
 * @ngdoc function
 * @name gcatomIntraApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gcatomIntraApp
 */
angular.module('gcatomIntraApp')
  .controller('MainCtrl', function ($scope, $http) {
      
      $scope.control = {};
      $scope.loading = true;
      
      $scope.clearValues = function() {
            $scope.control = {};
      };
            
            $scope.userGroups = ['All', 'Budget Setup', 'Cash', 'Grant Analysts'];
            $scope.appTypes = ['Web', 'Excel', 'Access', 'Secure Terminal'];
            $scope.sortPatterns = ['name', 'application_source_owner', 'front_end'];
            
            $http.get('data.json').then(function successCallback(response){
                var data = response.data;
                $scope.infoSys = data;
                $scope.loading = false;
            });
    
  });
