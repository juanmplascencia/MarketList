let path = require('path');
let Users = require('./../controllers/users');
let Items = require('./../controllers/items');

module.exports = function(app) {
    //route to retrieve all users
    app.get('/users',Users.index);
    //route to create a user
    app.post('/users',Users.create);
    //route to retrieve a user
    app.get('/users/:id',Users.show);
    //route to logout user
    app.delete('/users/:id', Users.logout);
    //route to get user from session
    app.get('/session', Users.session);
    //route to add user to session
    app.post('/session', Users.authenticate);
    //route to logout user
    app.delete('/session', Users.logout);
    //route to retrieve all items
    app.get('/items', Items.index);
    //route to create an item
    app.post('/items', Items.create);
    //route to update an item
    app.patch('/items/:id', Items.update);
    //route to destroy an item
    app.delete('/items/:id', Items.destroy);
    //route to text
    app.get('/items/:id/text', Items.text);

    app.all("*", (req,res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"));
    });
}