var db = [
  {
  id:1,
  name: "anakin"
  },
  {
  id: 2,
  name: "obi"
  }
];

var aspects = [
  {
  id:1,
  faction: "sith",
  forceSide: "dark"
  },
  {
  id: 3,
  faction: "jedi",
  forceSide: "light"
  }
]; 


const getUser = id => {
  return new Promise( (resolve, reject)  => {
    for (let i = 0; i < db.length; i++){
      if (db[i].id === id){
        resolve(db[i]);
      }
    }
    reject(`User ${id} not found`);
  })
};

const getFaction = user => {
  return new Promise ( (resolve, reject) => {
    for (let i = 0; i < aspects.length; i++){
      if (aspects[i].id === user.id){
        resolve({...user, ...aspects[i]})
      }
    }
    reject(`Aspects of ${user.name} not found`)
  })
};

getUser(2)
.then(user => getFaction(user))
.then(presentUser => console.log(presentUser))
.catch(err => console.log(err))
