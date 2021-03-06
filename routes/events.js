'use strict';

/**
* event controller file * autogenerated by mongoose-scaffold-crud **/

var events = require('express').Router(),
    Model = require('../models/model-events.js');

events.get('/', function (req, res) {
    Model.find(function (err, events) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error getting events.'
                });
            }
            return res.json(events);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('events/index', { events: events });
        }
    });
});
events.get('/formated', function (req, res) {
    Model.find(function (err, events) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error getting events.'
                });
            }
            let formatedEvents = new Array();
            events.forEach(e => {
                for (let start = new Date(e.startDate); start <= e.endDate; start.setDate(start.getDate() + 1)) {
                    if (e.days.find(e => e == start.getDay()) != undefined) {
                        var newStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(),
                            e.startTime.split(':')[0], e.startTime.split(':')[1], 0);
                        var newEnd = new Date(start.getFullYear(), start.getMonth(), start.getDate(),
                            e.endTime.split(':')[0], e.endTime.split(':')[1], 0);
                        formatedEvents.push({ 
                            start: newStart, 
                            end: newEnd, 
                            title: e.title,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            startTime: e.startTime,
                            endTime: e.endTime,
                            frequency: e.frequency,
                            days: e.days,
                            _id: e._id
                        });
                    }
                }
            })

            return res.json(formatedEvents);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('events/index', { events: events });
        }
    });
});
events.post('/', function (req, res) {
    var event = new Model({
        'title': req.body['title'],
        'startDate': req.body['startDate'],
        'endDate': req.body['endDate'],
        'startTime': req.body['startTime'],
        'endTime': req.body['endTime'],
        'frequency': req.body['frequency'],
        'days':  req.body['days[]'],
        '_id': req.body['_id']
    });
    event.save(function (err, event) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error saving item.',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: event._id
            });
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('events/edit', { event: event });
        }
    });
});

events.get('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, event) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error getting event.'
                });
            }
            if (!event) {
                return res.json(404, {
                    message: 'No such event.'
                });
            }
            return res.json(event);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!event) {
                return res.end('No such event');
            }
            return res.render('events/edit', { event: event, flash: 'Created.' });
        }
    });
});
events.get('/find/:desc', function (req, res) {
    var desc = req.params.desc;
    Model.findOne({ title: desc }, function (err, event) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error getting event.'
                });
            }
            if (!event) {
                return res.json(404, {
                    message: 'No such event.'
                });
            }
            return res.json(event);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!event) {
                return res.end('No such event');
            }
            return res.render('events/edit', { event: event, flash: 'Created.' });
        }
    });
});
events.put('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, event) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error saving event',
                    error: err
                });
            }
            if (!event) {
                return res.json(404, {
                    message: 'No such event'
                });
            }
            event['title'] = req.body['title'] ? req.body['title'] : event['title'];
            event['startDate'] = req.body['startDate'] ? req.body['startDate'] : event['startDate'];
            event['endDate'] = req.body['endDate'] ? req.body['endDate'] : event['endDate'];
            event['startTime'] = req.body['startTime'] ? req.body['startTime'] : event['startTime'];
            event['endTime'] = req.body['endTime'] ? req.body['endTime'] : event['endTime'];
            event['frequency'] = req.body['frequency'] ? req.body['frequency'] : event['frequency'];
            event['days'] = req.body['days[]'] ? req.body['days[]'] : event['days'];
            event['endDate'] = req.body['endDate'] ? req.body['endDate'] : event['endDate'];
            
            event.save(function (err, event) {
                if (err) {
                    return res.json(500, {
                        message: 'Error getting event.'
                    });
                }
                if (!event) {
                    return res.json(404, {
                        message: 'No such event'
                    });
                }
                return res.json(event);
            });
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!event) {
                return res.end('No such event');
            }
            event['name'] = req.body['name'] ? req.body['name'] : event['name'];
            event['start'] = req.body['start'] ? req.body['start'] : event['start'];
            event['end'] = req.body['end'] ? req.body['end'] : event['end'];
            event.save(function (err, event) {
                if (err) {
                    return res.send('500: Internal Server Error', 500);
                }
                if (!event) {
                    return res.end('No such event');
                }
                return res.render('events/edit', { event: event, flash: 'Saved.' });
            });
        }
    });
});

events.delete('/:id', function (req, res) {
    var id = req.params.id;
    Model.findOne({ _id: id }, function (err, event) {
        if (req.accepts('html', 'json') === 'json') {
            if (err) {
                return res.json(500, {
                    message: 'Error getting event.'
                });
            }
            if (!event) {
                return res.json(404, {
                    message: 'No such event'
                });
            }
            return res.json(event);
        } else {
            if (err) {
                return res.send('500: Internal Server Error', 500);
            }
            if (!event) {
                return res.end('No such event');
            }
            return res.render('events/index', { flash: 'Item deleted.' });
        }
    });
});

module.exports = events;