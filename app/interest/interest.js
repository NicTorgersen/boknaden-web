(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('InterestCtrl', [
            '$scope',
            '$location',
            '$routeParams',
            '$uibModal',
            'growl',
            'InterestService',
            'AdService',
            'AuthService',
            InterestCtrl
        ])

    function InterestCtrl ($scope, $location, $routeParams, $uibModal, growl, InterestService, AdService, AuthService) {
        if (!AuthService.isAuthenticated() || !AuthService.isVerified()) {
            $location.path('/store')
        }

        $scope.flyer = {}
        $scope.showSpinner = true
        $scope.selectedAdItems = []
        $scope.itemId = $routeParams.itemId
        $scope.submitInterests = submitInterests

        reload()

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.calculateTotalPrice = calculateTotalPrice

        function reload () {
            AdService.getAdForInterest($scope.itemId).then(function (res) {
                $scope.showSpinner = false
                $scope.flyer = res.data.ad
                if (!res.data.ad) {
                    
                }

            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

        function calculateTotalPrice () {
            var price = 0

            for (var i = 0; i < $scope.selectedAdItems.length; i++) {
                price += $scope.selectedAdItems[i].price
            }

            return price
        }

        function submitInterests () {
            /*
            Åpne et modalvindu og få tilbake noe greier derfra
            */
            if ($scope.selectedAdItems.length > 0) {
                var modalInstance = $uibModal.open({
                    animation: false,
                    templateUrl: 'app/interest/confirmInterestsModal/confirmInterestsModal.html',
                    controller: 'ConfirmInterestsModalCtrl',
                    resolve: {
                        adItems: function () {
                            return $scope.selectedAdItems
                        }
                    }
                })

                modalInstance.result.then(function (message) {
                    InterestService
                        .newInterest($scope.selectedAdItems, message)
                        .then(function (res) {
                            if (res.data.success) {
                                growl.success('Du har vist interesse for ' + $scope.selectedAdItems.length + (($scope.selectedAdItems.length === 1) ? ' objekt' : ' objekter') + '. Vi har opprettet en chat for deg med selgeren.', {title: 'Interesse'})
                                $scope.selectedAdItems = []
                                $location.path('/user/interests')
                            } else {
                                growl.error('Det skjedde en kritisk feil under operasjonen. Vennligst ta kontakt med administrator.', {title: 'Kritisk feil'})
                            }
                        })
                        .catch(function (err) {
                            console.log(err)
                            growl.error('Det skjedde en kritisk feil under operasjonen. Vennligst ta kontakt med administrator.', {title: 'Kritisk feil'})
                        })
                }, function () {})


            }
        }

    }

})();
