# A-Welzijn Notification Callouts

v1.0.12

### Hoe het eruit ziet

![Screenshot](https://s3.amazonaws.com/f.cl.ly/items/1S1v2a0F0T2k0u0G1M1X/callout.PNG)

### Hoe het te gebruiken

```javascript
"dependencies": {
	"awelzijn-notification-callout": "latest"
 }
```
```javascript
var app = angular.module('yourApp', [
	'awelzijn.notificationcallout'
]);
```

```html
<a-welzijn-notification-callout></a-welzijn-notification-callout>
```
Deze directive gebruik je bij voorkeur in de header van elke pagina. 
Deze zal elke alert (die aangemaakt wordt door de [notification-service](https://github.com/A-welzijn/notification-service)) in een [Tink](https://github.com/tinkkit) callout gaan tonen.
Succes- en waarschuwingsboodschappen kunnen worden gesloten, foutboodschappen niet.