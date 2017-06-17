(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ChangeCourseModalCtrl', [
            '$scope',
            'AuthService',
            'ProfileService',
            '$uibModalInstance',
            ChangeCourseModalCtrl
        ])

    function ConfirmInterestsModalCtrl ($scope, AuthService, ProfileService, $uibModalInstance) {

        $scope.confirmSelection = function () {
            $uibModalInstance.close($scope.message)
        }
        $scope.dismiss = function () {
            $uibModalInstance.dismiss('cancel')
        }
    }

})();
