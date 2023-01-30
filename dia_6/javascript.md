#JavaScript

##Variables
* Var
* Let
* Const --> S'ha d'asignar valor al declarar i es constant.

###Tipus
* Undefined --> Sense valor asignat
* Null --> No val res, explícitament
* Number --> Ints i floats
* Bool --> En minúscula
* String --> "" o '' 
typeof variable --> string del tipus

### var vs let
Let s'utilitza més i només canvia el scope.

El scoop de var és tota la funció, mentre que let només entre els {}.

##Objects
```js
var song = {
name:"Bohemian Rhapsody",
artist:"Queen",
album:"A Night at the Opera",
fullName: function(){ this.name + " - " + this.artist },
duration:5.55
};
song.duration
song["duration"]
```

##Destructuring
```js
let {name, duration} = song
//si es un array
let [first, second] = bag
```
Al primer mapeja el nom de la variable al nom de la propietat si coincideixen. En el cas de l'array van mapejats un a un per ordre, per tant, el nom de la variable no importa.

##Spread Operator
```js
var a = [0, 1, 2]
var b = [3, 4, 5]
var c = [...a, ...b]
```
Crea un sol array amb el contingut dels dos arrays. 

Els objectes normalment venen declarats amb const.

Les propietates duplicades les sobreescriu l'últim element.

## Syntax
* && and
* || or
* ! not
* === equivalència de valor i **tipus**
* // comentaris 1 línia
* /* */ comentaris doble línia

## Funcions

```js
function nom(){
	return 1;
}

const nom = () => {
	return 1;
}
// passa a 
const nom = () => reutrn 1
```

this --> punter de l'element de referència


## Callbacks
Passes una funció com a paràmetre que l'executarà en algun moment determinat per la funció on es pasa el callback com a paràmetre.

id : id podem fer id

## Truthy i Falsy
String buit es false
0 es false
null i undefined son false

Una funció pot necesitar 3 parametres i rebren menys, simplement pendran undefined com a valor.

## Promises
Fas set de una new promise((resolve, reject) => f)
On f té la mateixa estructura que una funció callback. Ara no ens cal crear el callback explícitament, al cridar la funció ho explicitem.

```js
getUser(3)
.then( whatReturns => console.log(whatReturns))
//.then() per encadenar promises
.catch( err => console.log(err)) // si s'activa el reject
```

## Async i await
Amb promises encadenades, coloquem async abans dels parametes de les dues funcions ara normals(sense promsies). A la segona funció, que es la única que cridarem, crearem una variables amb await f() on tindrem la sortida de la primera funció. Els errors seran throw() i el return() seran com els resolve. 

Al cridar les funcions només caldrà cridar la segona, controlar-hi el seu then i el seu catch.

```js
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
```

##DOM
Document variable global amb tots els elements.
createElement --> Crea un nodo.
appendChild --> Afegeix el nodo com a codi HTML.

Script tag va al header.

.innerHTML substitueix tot el contigunt entre les etiquetes.

###Events
window.onload = function(){
	tot el codi que manipula i accedeix elemenents
	(document.getElementById())
}
Permet posar l'import de JS al head.

onbeforeunload --- Abans de abandonar la pagina

onchange --- Quan el valor està canviant.

onclick --- Al clickar
...

Com es fa realment:

document.getElementById("ex1").addEventListener("click", function(){ alert("done") });

Els callbacks de les funcions pels submits tenen la forma handleAccio.



