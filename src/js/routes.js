angular.module('listRoutes', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
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
            $urlRouterProvider.otherwise("/login");
        }]);