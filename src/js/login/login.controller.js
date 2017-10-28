loginModule.controller('loginController', ['$scope', '$rootScope', '$state', 'toastr', 'loginServices', function ($scope, $rootScope, $state, toastr, loginServices) {
    $scope.loginUser = {};

    loginServices.apiRequest.get({user: 'logged'}).$promise.then(function (response) {
        loginServices.setUser(response.message);
        $scope.userName = loginServices.getUser();

        if (loginServices.getUser()) {
            $state.go('logged');
        } else {
            $state.go('login');
        }
    });

    $scope.login = function () {
        loginServices.apiRequest.save($scope.loginUser).$promise.then(function (response) {
            toastr.success(response.message, 'Success');
            $state.go('logged');

        }, function (response) {
            toastr.error(response.data.message, 'Error');
        });
    };

    $scope.register = function () {

        if (!$scope.loginUser.name || !$scope.loginUser.password) {
            toastr.error('Set name/password', 'Error');
        } else {
            loginServices.apiRequest.update($scope.loginUser).$promise.then(function (response) {
                toastr.success(response.message, 'Success');
            }, function (response) {
                toastr.error(response.data.message, 'Error');
            })
        }
    };
    $scope.logout = function () {
        loginServices.apiRequest.get({user: 'logout'}).$promise.then(function (response) {
            toastr.success(response.message, 'Success');
            loginServices.setUser('');
            $state.go('login');
        }, function (response) {
            toastr.error(response.data.message, 'Error');
        })
    };
}]);
