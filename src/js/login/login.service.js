loginModule.factory('loginServices', ['$resource', function ($resource) {
    var loggedUser = '';
    return {
        apiRequest: $resource('/api/users/:user', {user: '@user'}, {
            'update': {
                method: 'put'
            }
        }),
        setUser: function (user) {
            loggedUser = user;
        },
        getUser: function () {
            return loggedUser;
        }
    }
}]);