(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('MyCurriculumCtrl', [
            '$scope',
            '$location',
            'growl',
            'AuthService',
            MyCurriculumCtrl
        ])

    function MyCurriculumCtrl ($scope, $location, growl, AuthService) {

    }

})();
