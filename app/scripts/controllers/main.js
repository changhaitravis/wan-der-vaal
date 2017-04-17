'use strict';

/**
 * @ngdoc function
 * @name wanDerVaal.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wanDerVaal
 */
angular.module('wanDerVaal')
.controller('MainCtrl', function ($scope, $http, iconService) {
    
    $scope.control = {};
    $scope.loading = true;
    
    $scope.clearValues = function() {
        $scope.control = {};
    };
    
    //fetch keys or load schema in
    $scope.sortPatterns = ['name', 'application_source_owner', 'front_end'];
    
    $http.get('data.json').then(function successCallback(response){
        var data = response.data;
        $scope.infoSys = data.map(function(sys){
            sys.icon = iconService.getIconFor(sys);
            return sys;
        });
        console.log($scope.infoSys);
        $scope.loading = false;
    });
});
