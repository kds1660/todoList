var router = require('express').Router();
var passport = require('./../passport').passport;
var Task = require('./../db/dbService').Task;
var msg = require('./../../configs/messages.json');
var authCheck = require('./../authCheck');

router
    .get('/', authCheck, function (req, res) {

        Task.findAll({where: {user_id: req.user.id}}).then(function (match) {
            return res.json(match.map(function (el) {
                return {
                    id: el.id,
                    text: el.text,
                    date: el.date,
                    executed: el.executed
                };
            }));
        }).catch(function (error) {
            res.status(500).send({message: error.message});
        });

    })

    .post('/', authCheck, function (req, res) {
        Task.create({
            user_id: req.user.id,
            text: req.body.text,
            date: req.body.date,
            executed: 0
        }).then(function (match) {
            return res.status(200).send({message: msg.send.taskCreate, id: match.id});
        }).catch(function (error) {
            res.status(500).send({message: error.message});
        });

    })

    .post('/:id', authCheck, function (req, res) {
        Task.update({executed: req.body.execute}, {where: {id: req.params.id}}).then(function (match) {
            return res.status(200).send({message: req.body.execute ? msg.send.taskDone : msg.send.taskTodo});
        }).catch(function (error) {
            res.status(500).send({message: error.message});
        });

    })

    .put('/:id', authCheck, function (req, res) {
        Task.update({text: req.body.text}, {where: {id: req.params.id}}).then(function (match) {
            return res.status(200).send({message: msg.send.taskEdit});
        }).catch(function (error) {
            res.status(500).send({message: error.message});
        });

    })

    .delete('/:id', authCheck, function (req, res) {
        Task.destroy({where: {id: req.params.id}}).then(function () {
            return res.status(200).send({message: msg.send.taskDel});
        }).catch(function (error) {
            res.status(500).send({message: error.message});
        });
    });

module.exports = router;