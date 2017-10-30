var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');
var User = require('../modules/db/dbService').User;
var userCredentials = {"name": "test", "password": "test"};
var authenticatedUser = request.agent(app);

before(function (done) {
    User.destroy({where: {name: userCredentials.name}}).then(function () {
    });
    User.create({name: userCredentials.name, password: userCredentials.password}).then(function (result) {
        userCredentials.id = result.id;
    });
    done();
});

/*after(function (done) {
 User.destroy({where: {name: userCredentials.name}}).then(function () {
 });
 done();
 });*/


before(function (done) {
    authenticatedUser
        .post('/api/users')
        .send(userCredentials)
        .end(done);
});

describe('user tasks', function (done) {

    it('should return for get tasks 200 ,if user logged', function (done) {
        authenticatedUser.get('/api/tasks')
            .expect(200)
            .end(done)
    });

    it('create task 200 and return id,if user logged ', function (done) {
        authenticatedUser.post('/api/tasks')
            .send({
                user_id: userCredentials.id,
                text: 's',
                date: new Date(),
                executed: 0
            })
            .expect(200)
            .expect(function (res) {
                expect(res.body.id).be.a('number');
            })
            .end(done)
    });

    it('should return for tasks edit/update 200 ,if user logged', function (done) {
        authenticatedUser.put('/api/tasks/6')
            .send({text: ''})
            .expect(200);

        authenticatedUser.post('/api/tasks/6')
            .send({execute: 0})
            .expect(200)
            .end(done);
    });

    it('should return for tasks edit/update 400 ,if not send all data', function (done) {
        authenticatedUser.post('/api/tasks/9')
            .expect(400);

        authenticatedUser.post('/api/tasks/9')
            .expect(400);

        authenticatedUser.post('/api/tasks')
            .send({
                user_id: userCredentials.id,
                date: new Date(),
                executed: 0
            })
            .expect(400)
            .end(done);
    });

    it('should return for tasks 403 ,if user not logged', function (done) {
        request(app).get('/api/tasks')
            .expect(403);
        request(app).put('/api/tasks')
            .expect(403);
        request(app).post('/api/tasks')
            .expect(403)
            .end(done);
    });
});


describe('user login', function (done) {

    it('should return userName ,if user logged', function (done) {
        authenticatedUser.get('/api/users/logged')
            .expect(200)
            .expect(function (res) {
                expect(res.body.message).to.equal('test');
            })
            .end(done)
    });

    it('after logout cant use protected rotes', function (done) {
        authenticatedUser.get('/api/users/logout')
            .expect(200)
            .end(function () {
                authenticatedUser.get('/api/tasks')
                    .expect(403)
                    .end(done);
            })
    });
});
