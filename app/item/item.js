(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ItemCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            AdStoreCtrl
        ])

    function AdStoreCtrl ($scope, store, $location, growl, AdService, AuthService) {
        
    }

})();
