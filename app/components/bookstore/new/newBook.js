(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnNewBook', [bnNewBook])

    function bnNewBook () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/bookstore/new/newBook.html',
            controller: NewBookCtrl,
            scope: {
                'books': '=',
                'visible': '=',
            },
            link: function (scope, elm, attrs) {
                let btn = elm.find('button')
                console.log(elm.parent()[0].offsetParent)
                btn.on('click', function () {
                    // $("body").animate({scrollTop: 0}, "slow");
                })
            },
        }
    }

    function NewBookCtrl ($scope) {
        let defBook = {
            bookName: '',
            author: '',
            picture: '',
            seller: '',
            price: 0,
        }

        $scope.priceCalculated = 0
        $scope.book = defBook

        function addBook () {
            $scope.books.push($scope.book)
            $scope.book = defBook
            toggleVisible()
        }

        function toggleVisible () {
            $scope.visible = !$scope.visible
        }

        function calculateCustomerPrice () {
            $scope.priceCalculated = ($scope.book.price * 1.1).toFixed(2)
        }

        $scope.calculateCustomerPrice = calculateCustomerPrice
        $scope.addBook = addBook
        $scope.toggleVisible = toggleVisible
    }

})();
