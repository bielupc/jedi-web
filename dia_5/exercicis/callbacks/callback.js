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


function callback(err, user){
  if(err){
    return console.log(err);
  }
  console.log(`The user's name is ${user}`)
}

const getUser = (id, callback) => {
  for (let i = 0; i < db.length; i++){
    if (db[i].id === id){
      return callback(null, db[i].name);
    }
  }
  callback(`User ${id} not found`);
}

getUser(4, callback)