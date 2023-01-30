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

const aspects = [
    {
        id:1,
        faction: "sith",
        forceSide: "dark"
    }, 
    {
        id: 2,
        faction: "jedi",
        forceSide: "light"
    }
];

const getUser = id => {
    const result = db.find( user => user.id === id );

    return new Promise( (resolve, reject) => {

        if (!result) {
            reject(`The user with id: ${id} does not exist.`);
        } else {
            resolve(result);
        }

    } )
};

const getAspects = user => {
    const result = aspects.find( aspect => aspect.id === user.id );
    return new Promise ( (resolve, reject) => {
        if(!result)
            reject('Uknown force user')
        else 
            resolve ({...user, ...result})
    } )
}


getUser(1)
.then(user => getAspects(user))
.then(forceUser => console.log(forceUser))
.catch(err => console.log(err));