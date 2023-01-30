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

const getUser = async id => {
    const result = db.find( user => user.id === id );

    if (!result) {
        throw(`The user with id: ${id} does not exist.`);
    }

    return result;
};

const getAspects = async id => {
    try {
        const user = await getUser(id);
        const result = aspects.find( aspect => aspect.id === id );

        if(!result) throw('Uknown force user');

        return({...user, ...result});
    } catch (error) {
        console.log(error)
    }

    

}

// const getAspects = async id => {
//     try {
//         const user = await getUser(id);
//         if(!result) throw('Uknown force user');
//         const result = aspects.find( aspect => aspect.id === id );
//         return({...user, ...result});
//     } catch (error) {
//         throw('Uknown force user');
//     }
// }


getAspects(1)
.then(user => console.log(user))
.catch(err => console.log('[ERR]: ',err));     