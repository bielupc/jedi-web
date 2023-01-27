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


// Callback test
function print(text){
  console.log(text);
}


const getUser = (id, callback) => {
  for (let i = 0; i < db.length; i++){
    if (db[i].id === id){
      return callback(`The user with ${id} is ${db[i].name}`);
    }
  }
  console.log("User not found");
}


