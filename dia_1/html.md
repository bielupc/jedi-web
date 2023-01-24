# HTML

## Etiquetes importants

head --> Metadata
body --> Contingut
div --> Contenidor per agrupar
p --> Paragraf (funciona com a div per textos llargs)
span --> Per ex. Per canviar color de una part del text dins de p
a --> link (anchor)
*Utilitzem un ident per cada nivell de profunditat*

## Atributs

Amb HTML5 apareixen noves etiquetes amb la mateixa funció però amb noms més descriptius.

href --> Link a una pagina html, un enllaç o amb #id a un id
colspan --> Quantes files ocupa una columna
alt --> Text que surt si no es pot fer display de una imatge (bo pel seo)

## Contenidors

header --> Capçalera de la pagina
nav --> Links de navegació

## Taules

thead --> Etiquetes de les fileres
tbody --> Dades
th --> Entry en negreta
td --> Entry normal
tr --> Fila

## Links

target --> Com s'obre el link (_blank obre en una nova pestanya)
rel="noopener noreferrer" --> Evita atacs informàtics

## Llistes
ul --> Unordered list
ol --> Ordered list
li --> List item

## Comentaris
CTL + SHFT + / --> Comentar les linies seleccionades
```html
<!-- per fer comentaris -->
```

## Forms
* No cal fer servir el acction per enviar l'input.
* Afegir l'atribut name es bo pel SEO.
* Afegir un button amb type submit enviara les dades del formulari.
* Etiqueta de label amb el for apuntant al id del input per enllaçar.
* <br> es pot fer servir per fer line breaks si no emprem CSS.
* Fieldset dins del formulari per enquadrar-lo i legend pel títol.
* Radio buttons amb el mateix name perquè siguin excoloents, el id por ser qualsevol. **diferent que amb for dels labels?**
* iframe per videos de youtube, agafar el embed que dona al compartir un video el propi YouTube.
* Si no funciona l'enllaç, cambiar el autoplay pel mute.
