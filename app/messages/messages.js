(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('MessagesCtrl', [
            '$scope',
            '$location',
            'growl',
            'ChatsService',
            'MessagesService',
            'AuthService',
            MessagesCtrl
        ])

    function MessagesCtrl ($scope, $location, growl, ChatsService, MessagesService, AuthService) {
        if (!AuthService.isAuthenticated()) {
            $location.path('/store')
            return
        }

        $scope.profile = AuthService.profile()
        $scope.messages = []
        $scope.context = {
            page: 1,
            itemsPerPage: 20,
            type: 'chats',
            chatid: null,
            totalItems: 0,
            newMessage: '',
            recipientid: null,
        }

        $scope.changeType = function (type) {
            $scope.context.type = type
            $scope.context.page = 1
            reload()
        }

        function reload () {
            $scope.showSpinner = true

            switch ($scope.context.type) {
                case 'chats':
                    ChatsService.getAllChats($scope.context.page).then(function (res) {
                        $scope.messages = res.data.chats
                        $scope.context.totalItems = res.data.chats.length
                        $scope.showSpinner = false
                    }, function (err) {
                        growl.error(err, {title: 'Error'})
                    })
                    break;
                case 'messages':
                    MessagesService.getAllMessages($scope.context.page, $scope.context.chatid).then(function (res) {
                        $scope.messages = res.data.chatMessages
                        $scope.context.totalItems = res.data.chatMessages.length
                        $scope.showSpinner = false
                    }, function (err) {
                        growl.error(err, {title: 'Error'})
                    })
                    break;
            }
        }

        $scope.reload = reload

        $scope.go = function (path) {
            $location.path(path)
        }

        $scope.openChat = function (chat) {
            $scope.context.type = 'messages'
            $scope.context.chatid = chat.chatid
            $scope.context.recipientid = (AuthService.profile().userid === chat.Initiator.userid) ? chat.Recipient.userid : chat.Initiator.userid
        }

        $scope.closeChat = function () {
            $scope.context.type = 'chats'
            $scope.context.page = 1
            $scope.context.chatid = null
            $scope.context.recipientid = null
        }

        $scope.sendMessage = function () {
            MessagesService.newMessage($scope.context.newMessage, $scope.context.recipientid).then(function (res) {
                if (res.data.success) {
                    reload()
                } else {
                    growl.error(res.data.message)
                }

                $scope.context.newMessage = ''
            })
        }

        $scope.$watch('context.page + context.type', function () {
            reload()
        })

        reload()

    }

})();
