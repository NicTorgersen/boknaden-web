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
            $scope.toggleSelectAll = toggleSelectAll
            $scope.test = function () {
                console.log($scope.selectedItems)
            }

            function toggleSelectAll () {
                if ($scope.selectedItems.length === $scope.allItems.length) {
                    $scope.selectedItems = []

                    for (var i = 0; i < $scope.allItems.length; i++) {
                        $scope.allItems[i].selected = false
                    }
                } else {
                    for (var i = 0; i < $scope.allItems.length; i++) {
                        var item = $scope.allItems[i]
                        if (!item.selected) {
                            item.selected = true
                            $scope.selectedItems.push(item)
                        }
                    }
                }
            }

            function addRemoveSelectedItem (item) {
                // Hvis item finnes i arrayet
                // fjerner vi det
                for (var i = 0; i < $scope.selectedItems.length; i++) {
                    if (JSON.stringify($scope.selectedItems[i]) === JSON.stringify(item)) {
                        $scope.selectedItems.splice(i, 1)
                        item.selected = false
                        return
                    }
                }

                // Hvis det ikke finnes
                // legger vi det til
                // og setter selected = true
                $scope.selectedItems.push(item)
                item.selected = true
            }
        }
    }
})()
