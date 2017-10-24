var user = require('../controllers/users.js');
const path = require('path');

module.exports = function(app) {
    //route to show all users
    app.get('/users',user.showAll);
    //route to create a user
    app.post('/users',user.create);
    //route to delete a user
    app.delete('/users/:id', user.remove);
    //route to update a user
    app.put('/users/:id', user.update);
    app.all("*", (req,res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"));
    });
}