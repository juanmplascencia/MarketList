var user = require('../controllers/users.js');
const path = require('path');

module.exports = function(app) {
    app.get('/users',user.showAll);
    app.post('/users',user.create);
    app.delete('/users/:id', user.remove);
    app.put('/users/:id', user.update);
    app.all("*", (req,res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"));
    });
}