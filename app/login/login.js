(function () {
    'use strict'

    angular
        .module('boknaden')
        .controller('LoginCtrl', [
            '$scope',
            '$location',
            'UserService',
            'AuthService',
            'CourseService',
            'growl',
            LoginCtrl
        ])

    function LoginCtrl ($scope, $location, UserService, AuthService, CourseService, growl) {
        if (AuthService.isAuthenticated()) {
            $location.path('/store')
        }

        var userDefault = {
            firstname: '',
            lastname: '',
            email: '',
            pass: 'lol123',
            pass2: '',
            username: 'nictorgersen',
            phone: '',
            terms: false,
            course: {},
        }

        $scope.user = userDefault
        $scope.activeTab = 0

        function reset () {
            $scope.user = userDefault
        }

        function doLogin () {
            if ($scope.user.username.length > 0 && $scope.user.pass.length > 0) {
                if ($scope.user.username === userDefault.username && $scope.user.pass === userDefault.pass) {
                    AuthService.verify($scope.user.username, $scope.user.pass).then(function (response) {
                        var path = $location.search().return || '/store'
                        $location.path(path).search({})
                    }, function (err) {
                        growl.error('Feil brukernavn eller passord', { title: 'Feil' })
                    })
                }
            }
        }

        function doRegister (user) {
            console.log(user)
            UserService.create(user).then(function (response) {
                if (response.data.err) {
                    growl.error(response.data.err, { title: 'Feil' })
                } else {
                    growl.success('Du er nå registrert. Vi sender deg en e-post.', { title: 'Grattis!' })
                    reset()
                    $scope.activeTab = 0
                }
            })
        }

        $scope.doLogin = doLogin
        $scope.doRegister = doRegister

        $scope.toggleLogin = function () {
            reset()
            $scope.login = !$scope.login
        }
        $scope.toggleRegister = function () {
            reset()
            $scope.register = !$scope.register
        }
        $scope.go = function (path) {
            $location.path(path)
        }
    }

})()
