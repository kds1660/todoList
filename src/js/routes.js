angular.module('listRoutes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider','$locationProvider',
        function ($stateProvider, $urlRouterProvider,$locationProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    views: {
                        '': {template: ''},
                        'login@login': {
                            template: '<login-element></login-element>',
                            controller: 'loginController'
                        },
                        'list@login': {
                            template: '<h1>Not Logged</h1>'
                        }
                    }
                })
                .state('logged', {
                    url: '/logged',
                    views: {
                        '': {template: ''},
                        'login@logged': {
                            templateUrl: 'templates/logged.html',
                            controller: 'loginController'
                        },
                        'list@logged': {
                            templateUrl: 'templates/list.html',
                            controller: 'listController'
                        }
                    }
                });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
            $urlRouterProvider.otherwise("/login");
        }]);