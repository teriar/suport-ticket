# Front de login con angular

## herramientas utilizadas
 -angular.js 19.2.17 con assets
 -tailwindcss 
 -primeng

 ## estructura

 - components -> componentes reutilizables que reciben objetos para su funcionalidad
 - enviroment -> varibles de entorno para rutas y valores
 - guard -> encargado de protejer rutas que requieren autentificacion
 - layouts -> puntos de entrada para spa para diferencias rutas protejidas
 - pages -> paginas dentro del aplicativo unicas
 - services -> encargado de peticiones http para envio y recepcion de respuestas por parte del backen
 - validators -> utlidades de validacion de parametros
 - interfaces -> interfaces para declarar estructuras de datos
 - ## elementos raices
   * app.component.ts - app.component.html -> paginas de inicio realiza la tarea de inicializar el router y permite realizar importaciones de nivel alto
   * app.route.ts -> configuracion de rutas dentro del aplicativo donde se declaran la pagina main (layouts) y sus hijos para  redireccion asi como declaracion de guard para proteccion de rutas
   * main.ts -> core de configuracion de angular y arranque principal

## ejecuccion
### Nota: para ejecutar se requiere instalacion de angular 19 y Node en el S.O

1. ejecutar npm install para descargar dependencias
2. completar enviroment.ts en caso de ser necesario , para deploy se requiere generar enviroment.prod.ts y completar las variables de entorno requeridas que se encuentran en enviroment.ts
3. ejecutar ng serve -o || ng serve --port {valor}, adicional se puede configurar comandos para su ejecucion en angular.json


## guia ilustrada

1. pagina de login y registros 

   ![alt text](/Readme-images/login.png)  

  Pagina de Inicio, para habilitar su funcionalidad se require presionar boton No soy un robot que se conecta con servicio de google desde el backen y permite habilitar los formularios, opcion secundaria es loggearse con google 

2. Funcionalidad Registo 
  
   ![alt text](/Readme-images/register.png)

   Dentro de la pagina de inicio al presional el boton de registro  cambia a este apartado, de igual manera permite registro con google o el registro usual donde se debe ingresar nick , mail, y password para poder registrarse  

3. Aclaratoria de funciones
    
    ![alt text](/Readme-images/validaciones.png)

  el sistema mantiene sus formularios por formularios reactivos con validaciones internas consultado a la api antes de intentar registrarse para advertir al usuario si ya el nick esta en uso o el email ya se registro lo cual inhabilita el registro. una vez registrado envia a una pagina protegido por jwt y guard de angular.    

4. Autentificacion correcto y redireccion a ruta protejida


     ![alt text](/Readme-images/imagen-home.png)

     si la autentificacion sale bien seras redirigo a una pagina protegida por el guard, puedes probar eliminar del localstorage los token que validan el inicio para verificar la funcionalidad del guard, solo mantiene componentes de prueba que vienen de otros puntos dado que la funcionalidad de este codigo es mostrar autentificacion.