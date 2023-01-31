# API
Part del servidor accessible des del frontend. Es necesita u HTTP Client com *AXIOS*, que es promise-based.

No hi ha un estàndar però sobre el domini de la web s'afegeixen sub-rutes d'on obtenir les dades. Normalment les dades venen en format JSON.

En un fitxer JSON totes les propietats venen en format string.

* De JSON a objecte --- JSON.parese(string en json)
* De objecte a JSON --- JSON.stringify(objecte)

## HTTP
Per una petició necesitem una ruta i un mètode.
* GET --- Obtenir informació (tots o un id)
* POST --- Crees un recurs nou (no cal especificar path específic)
* PUT --- Modificar recursos existents (cal id)

Amb la consola pestanya network podem veure totes les peticions, si status code es 200, tot ok.

## AXIOS
Importat per CDN abans del fitxer JS propi. Cada funció sobre l'objecte axios retorna una promise.

Les funcions retornen un objecte on .data estàn les dades. El .status_code retorna el status code.

Amb el mètode post, el payload es l'objecte que creem al URL si tenim els permisos. També requereix un segon paràmetres que és el payload en sí.

Mètode + URL = endpoint

Amb el mètode put podem utilitzar template strings i colocar l'id del element que volem canviar.

Amb el delete nomes passem la url amb l'id especificat i s'elimina l'element.

Amb get obtenim un array, però si especifiquem un id ens retorna el objecte JS.o

Al URL amb ? podem introduir paràmetres i buscar per propietats.