(function () {
    'use strict'

    var app = angular.module('boknaden')

    app.directive('bnItemSelector', [
        bnItemSelector
    ])

    function bnItemSelector () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/directives/itemSelector/itemSelector.html',
            scope: {
                allItems: '=',
                selectedItems: '=',
            },
            controller: ['$scope', ItemSelectorCtrl]

        }

        function ItemSelectorCtrl ($scope) {
            $scope.addRemoveSelectedItem = addRemoveSelectedItem
            $scope.test = function () {
                console.log($scope.selectedItems)
            }

            function addRemoveSelectedItem (item) {
                // Hvis item finnes i arrayet
                // fjerner vi det
                for (var i = 0; i < $scope.selectedItems.length; i++) {
                    if ($scope.selectedItems[i] === item.aditemid) {
                        $scope.selectedItems.splice(i, 1)
                        item.selected = false
                        return
                    }
                }

                // Hvis det ikke finnes
                // legger vi det til
                // og setter selected = true
                $scope.selectedItems.push(item.aditemid)
                item.selected = true
            }
        }
    }
})()
