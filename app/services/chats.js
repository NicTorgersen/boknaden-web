(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('ChatsService', [
            'apiUrl',
            '$http',
            'AuthService',
            ChatsService
        ])

    function ChatsService (apiUrl, $http, AuthService) {
        this.getAllChats = getAllChats

        function getAllChats (page) {
            var params = {
                    page: page
                }

            return $http({
                url: apiUrl + '/chats',
                method: 'GET',
                params: params,
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }
    }


})()
