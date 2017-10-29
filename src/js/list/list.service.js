listModule.factory('listServices', ['$resource','$http', '$q', '$uibModal','moment', function ($resource,$http, $q, $uibModal,moment) {
    return {
        apiRequest: $resource('/api/tasks/:task', {task: '@task'}, {
            'update': {
                method: 'put'
            },
            'get': {
                isArray: true
            }
        }),
        editElement: function ($scope) {
            var deferred = $q.defer();
            $http.get('templates/editModal.html').then(function (response) {
                $uibModal.open({
                    animation: true,
                    template: response.data,
                    scope:$scope
                }).result.then(function () {
                    deferred.resolve();
                }, function () {
                    deferred.reject();
                });
            });
            return deferred.promise;
        },
        toLocalTime:function (date) {
            return moment.utc(date).local().format('LLLL')
        }
    }
}]);