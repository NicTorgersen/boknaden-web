(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('NewItemCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            NewItemCtrl
        ])

    function NewItemCtrl ($scope, store, $location, growl, AdService, AuthService) {
        $scope.flyer = {}

        var defaultFlyer = { adname: '', courseid: 0, aditems: [] },
            defaultAdItem = { image: '', isbn: '', price: 0, text: '', description: '' }

        $scope.isAuthenticated = AuthService.isAuthenticated()

        if (!$scope.isAuthenticated)
            $location.path('/store')

        $scope.adItem
    }

})();
