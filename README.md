# Programmering i TypeScript - moment 4 - Angular II
Uppgiften, och webbplatsen, går ut på att hämta information om kurser på Webbutvecklingsprogrammet och presentera dem i en tabell med hjälp av HTTPClient och HTTP-anrop.

Tabellen innehåller tre kolumner:
- kurskod
- kursnamn
- progression

Användaren ska kunna sortera datan i kolumnerna, samt söka efter specifik data där tabellen uppdaterar sig efter sökfrasen på ett logisk sätt.

Webbplatsen använder sig av Angular v.20.


## Lösning
Uppgiften löstes främst tillsammans med det tillgängliga lärarledda materialet och Angular egna webbplats "Angular Material" (https://material.angular.dev). Flera olika moduler har laddats ner, 
bland annat MatSortModule (för sortering av kurser) och MatTableModule (för skapandet av tabellen). 

Själva uppbyggnanden består av:
- home: här visas all data.
- table: har hand om majoriteten av det som har med tabellen att göra.
- courses-service: hämtar kurserna från API:t. 
- course: ett interface som bestämmer hur kurserna ska vara uppbyggda.


