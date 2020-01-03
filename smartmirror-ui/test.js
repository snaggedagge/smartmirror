'use strict';
module.exports = function(server) {
  // todoList Routes
  server.route('/tasks')
    .get(function(req, res) {
      var lol = {lol: 'test', hey: 12};
      res.json(lol);
    });
};
