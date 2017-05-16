(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('MessagesService', [
            'apiUrl',
            '$http',
            'AuthService',
            MessagesService
        ])

    function MessagesService (apiUrl, $http, AuthService) {
        this.getAllMessages = getAllMessages
        this.newMessage = newMessage

        function getAllMessages (page, chatid) {
            var params = {
                    page: page,
                    chatid: chatid,
                }

            return $http({
                url: apiUrl + '/messages',
                method: 'GET',
                params: params,
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }

        function newMessage (message, recipientid) {
            var message = message

            if (message.length < 1) {
                return false
            }

            return $http({
                url: apiUrl + '/messages',
                method: 'POST',
                data: {
                    recipientid: recipientid,
                    message: message
                },
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }
    }


})()
