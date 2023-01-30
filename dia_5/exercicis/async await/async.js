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


const getUser = async id => {
  for (let i = 0; i < db.length; i++){
    if (db[i].id === id){
      return(db[i]);
    }
  }
  throw(`User ${id} not found`);
};

const getFaction = async id => {
  const user = await getUser(id)
  for (let i = 0; i < aspects.length; i++){
    if (aspects[i].id === user.id){
      return({...user, ...aspects[i]})
    }
  }
  throw(`Aspects of ${user.name} not found`)
};


getFaction(1)
.then(presentUser => console.log(presentUser))
.catch(err => console.log(err))
