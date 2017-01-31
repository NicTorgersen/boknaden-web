(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.controller('BookstoreCtrl', ['$scope', BookstoreCtrl])

    function BookstoreCtrl ($scope) {
        var defBooks = [
            {
                bookId: 1,
                bookName: "Engelsk",
                author: "Nåværende Engelsklærer III",
                picture: "",
                seller: "Johan Jørgensen",
            },
            {
                bookId: 2,
                bookName: "IT-Strategi",
                author: "Petter Gottschalk",
                picture: "",
                seller: "Johan Jørgensen",
            },
            {
                bookId: 3,
                bookName: "Objektorientert Systemutvikling Og UML",
                author: "Viggo Holmstedt",
                picture: "",
                seller: "Fagbokforlaget",
            },
        ]

        function calculateCustomerPrice (price) {
            $scope.priceCalculated = (price * 1.1).toFixed(2)
        }

        $scope.calculateCustomerPrice = calculateCustomerPrice
        $scope.books = defBooks
        $scope.addingNew = false
    }

})();
