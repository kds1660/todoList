loginModule.directive("loginElement", function () {
    return {
        restrict: "E",
        templateUrl: "templates/login.html",
        scope: false,
        link: function (scope, elem, attrs) {

            elem[0].addEventListener('keyup', function (e) {
                var key = e.which || e.keyCode;

                if (key == 13) {
                    scope.login();
                }
            })
        }
    }
});