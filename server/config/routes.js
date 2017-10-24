let path = require('path');
let Users = require('./../controllers/users');
let Items = require('./../controllers/items');

module.exports = function(app) {
    //route to show all users
    app.get('/users',Users.showAll);
    //route to create a user
    app.post('/users',Users.create);
    //route to delete a user
    app.delete('/users/:id', Users.remove);
    //route to update a user
    app.put('/users/:id', Users.update);

    app.get('/session', Users.session);
    app.post('/session', Users.authenticate);

    app.get('/items', Items.index);
    app.post('/items', Items.create);
    app.patch('/items/:id', Items.update);
    app.delete('/items/:id', Items.destroy);

    app.all("*", (req,res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"));
    });
}