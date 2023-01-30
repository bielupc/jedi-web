const db = [
    {
        id:1,
        name: "anakin"
    }, 
    {
        id: 2,
        name: "obi"
    }
];

const getUser = (id, callback) => {
    const result = db.find( user => user.id === id );

    /* Find */
    // for (let index = 0; index < db.length; index++) {
    //     if(callback(db[index])) return db[index];
    // }

    if (result) {
        return callback(null, result);
    }   
    
    callback(`Sorry, user with id: ${id} does not exist.`);
};


getUser(20, (err, user) => {
    if(err) {
        return  console.log(err);
    }

    console.log('This is the requested user: ', user);
})