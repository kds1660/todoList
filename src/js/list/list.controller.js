listModule.controller('listController', ['$scope', '$rootScope', 'toastr', 'moment', 'listServices',
    function ($scope, $rootScope, toastr, moment, listServices) {
        $scope.list = {
            done: [],
            todo: []
        };

        listServices.apiRequest.get().$promise.then(function (response) {
            for (var i = 0; i < response.length; i++) {
                response[i].date = listServices.toLocalTime(response[i].date);
                if (response[i].executed) {
                    $scope.list.done.push(response[i]);
                } else {
                    $scope.list.todo.push(response[i]);
                }
            }
        }, function (response) {
        });

        $scope.executeTask = function ($index) {
            listServices.apiRequest.save({
                task: $scope.list.todo[$index].id,
                execute: 1
            }).$promise.then(function (response) {
                toastr.success(response.message, 'Success');
                $scope.list.todo[$index].executed = true;
                $scope.list.done.push($scope.list.todo[$index]);
                $scope.list.todo.splice($index, 1);
            }, function (response) {
                toastr.error(response.data.message, 'Error');
            });
        };

        $scope.removeTask = function ($index) {
            listServices.apiRequest.delete({task: $scope.list.done[$index].id}).$promise.then(function (response) {
                toastr.success(response.message, 'Success');
                $scope.list.done.splice($index, 1);
            }, function (response) {
                toastr.error(response.data.message, 'Error');
            });
        };

        $scope.restoreTask = function ($index) {
            listServices.apiRequest.save({
                task: $scope.list.done[$index].id,
                execute: 0
            }).$promise.then(function (response) {
                toastr.success(response.message, 'Success');
                $scope.list.done[$index].executed = false;
                $scope.list.todo.push($scope.list.done[$index]);
                $scope.list.done.splice($index, 1)
            }, function (response) {
                toastr.error(response.data.message, 'Error');
            });
        };

        $scope.addTask = function () {
            $scope.editText = {
                text: '',
                date: new Date
            };
            listServices.editElement($scope).then(function () {
                listServices.apiRequest.save($scope.editText).$promise.then(function (response) {
                    $scope.editText.id = response.id;
                    $scope.editText.date = listServices.toLocalTime($scope.editText.date);
                    toastr.success(response.message, 'Success');
                    $scope.list.todo.push($scope.editText);
                }, function (response) {
                    toastr.error(response.data.message, 'Error');
                });
            }, function () {
            });
        };

        $scope.editTask = function ($index) {
            //show modal window for action
            $scope.editText = {
                task: $scope.list.todo[$index].id,
                text: $scope.list.todo[$index].text
            };
            listServices.editElement($scope).then(function () {
                listServices.apiRequest.update($scope.editText).$promise.then(function (response) {
                    toastr.success(response.message, 'Success');
                    $scope.list.todo[$index].text = $scope.editText.text;
                }, function (response) {
                    toastr.error(response.data.message, 'Error');
                });
            }, function () {
            });
        };

        $scope.filterList = function () {
            var filterValue = angular.element(document.querySelector('.filter')).val();

            if (filterValue !== '') {
                angular.forEach(angular.element(document.querySelectorAll('li')), function (elm) {
                    var text = elm.querySelector('span').innerText;

                    if (text.substr(0, filterValue.length) !== filterValue) {
                        angular.element(elm).css('display', 'none');
                    } else {
                        angular.element(elm).css('display', 'block')
                    }
                })
            } else {
                angular.element(document.querySelectorAll('li')).css('display', 'block');
            }
        };

        $scope.sortList = function (value) {
            function sortByProp(value) {
                return function (a, b) {

                    if (a[value] < b[value]) {
                        return -1
                    }

                    if (a[value] > b[value]) {
                        return 1
                    }
                    return 0
                }
            }

            $scope.list.done.sort(sortByProp(value));
            $scope.list.todo.sort(sortByProp(value));
        }
    }]);
