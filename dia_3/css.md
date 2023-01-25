# CSS
S'aplica en cascada, un estil pot modificar algun que ja s'ha escrit anteriorment.

## Selectors
**Creats pel propi CSS**
* A etiquetes: h1, body, a...
**Creats per l'usuari**
* Id: #id - És únic i funciona per un sol element
* Class: .class - Per grups 

### Class
Una etiqueta pot tenir més d'una classe: class="primera-classe segona-classe".

Si alguns estils es repliquen, és bona pràctica agrupar-los en una mateixa classe.

Un selector por afectar només a una etiqueta dins d'un altra etiqueta.

"#id" per id's
.classe per classes
A per A's
B A per A's dintre de B's
A.classe per A's de classe 
A,B tots A's i B's
"*" selecciona tot el que esta dintre de: p *	
A + B selecciona tots B elements justs eguits de A
A ~ B agafara tots els B elements seguits de A
A > B tots els elements B directament fills de A
A:first-child A elements que siguin primer fill
A:only-child 
A:last-child
A B:nth-child(n) nth element B dins de A
:nth-last-child conta des del final
A:first-of-type
:nth-of-type(even/odd) o bé CADA_Xn + INICI
:only-of-type són de tipus únic dintre del pare
:last-of-type
:empty
:not
A[attr] Tots els A amb atribut attr, pots especificar attr="", attrs^="A" que començi per A, attrs$="B" que acabi per B, attrs*="C" continguin c

preferible utilitzar selectors que utilitzar id's o crear noves clases

## Hierarchy
Com més específic sigui el selector sencer més prioirtat
1. style dins etiqueta
2. id
3. clases i pseudo-clases (estats :visited)
4. etiquetes i pseudo-elements (parts d'un element p::first-line)

** !important donara prioritat sobre la resta**

/* comentaris css */

## Margins
Margin va del contenidor cap a fora
Padding dle contenidor cap a dins
El border es decoratiu els altes són per espaiar

## Position

Static, default, verticalment ocupant tota l'amplada. 

Relativa, mou amb top, left... respecte la seva posició estàtica. No usar per alinear no cou contingut dels costats.

Absolute, es posa en la seva posició estàtica i els altres elements ignoren que estigui allà. El reposicionament top left... es respecte el pare. **utilitat?**

Sticky, s'aplica quan l'element havia de desapareixer. Quan hagues de desapareixer s'aplicarà la transformació. **s'ha de posar un top i un contenidor**

Fixed, respecte el viewport, sempre visible.

## Display Flex
display: flex; --> Al pare
flex: 1; --> Child 50/50 d'espai horitzontal
Les propietats també van al pare
Alinea només als fills directes, si hi han fills sueltos, agrupar-los en un div.

**horitzontal**
* justify-content:
	* flex-start
	* flex-end
	* center
	* space-between - mateixa distancia entre els elements
	* space-around - mateixa distancia als dos costats entre els elements.
	* space-evenly - mateixa distribució a TOT contenidor

**verticalment**
* align-items:
	* flex-start
	* flex-end
	* center
	* baseline
	* stretch

**transformacions**
* flex-direction:
	* row
	* row-reverse
	* column
	* column-reverse
**else reverse canvien el start i end i vertical i horitzontal segueixen igual**

* order - altera la posició per n unitats
* align-self = align-items per individuals

* flex-wrap:
	* nowrap - 1 element per linia
	* wrap - en linies adicionals
	* wrap-reverse - linies adicionals en reversa

* flex-flow (direction i wrap):
	* ex: flex-flow: column wrap;

* align-content = align-items però alinea els espais horitzontals. (tot vertical, tot horitzontal)

## Display Grid
Primes poses la quadrícula i despres poses els elements.

grid-template-columns: auto auto auto;
grid-template-rows: auto auto auto;

pels elements dintre del grid:

* gird-column-start: n;
* grid-column-end: n;
* en comptes de n pots definir un span
* en comptes de n pots definir un repeat(5, 20%)
* es poden utilitzar diferentes unitats i fraccions fr
* grid-column: start/end;
* el mateix funciona amb row
* grid-area: row_s / col_s / row_end / col_end
* order també funciona
* grid-template: rows/columns

Propierats pel body 
  height: 100%;
  margin: 0;

##Animations
Amb CSS consumeixen menys.
animation-iteration-count -- quants cops es repeteix l'animació.

##Font Face
Per fonts pròpies.
Encara que sigui local, el path s'introdueix amb url()
Carpeta assets/fonts per gestionar-ho.

##Responsiveness
@media's es posen al final dels fitxers
no cal utilitzar screen podem directament (condició) and (condició)...
display: none ---> Desapareix element

