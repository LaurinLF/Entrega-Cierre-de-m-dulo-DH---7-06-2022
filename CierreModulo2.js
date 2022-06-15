// Etapa 1:

let autosInfo = require("./autos.js");

let concesionaria = {
   autos: autosInfo,


/* Etapa2: Ahora que la concesionaria tiene los autos, es posible crear la funcionalidad buscarAuto que 
reciba por parámetro la patente y devuelva el auto al cual le corresponde. En caso de no encontrar el mismo, deberá retornar null. 
Para que todo funcione tenés que agregar el código que escribiste en el ejercicio anterior.*/


  
buscarAuto: function (patente){
    let autos = this.autos
    let autoBuscado = autos.filter(function(auto){
         return auto.patente == patente
    }) 
     if (autoBuscado.length > 0) {
        return autoBuscado[0]
     } else{
      return null
      }
},

/*Etapa 3: Ahora, María les pide que agreguen la funcionalidad de venderAuto que recibe la patente y, en caso de encontrar al automóvil, le asigna el estado de vendido.
Recordatorio: Para comenzar tenés que agregar el código que escribiste en el ejercicio anterior. Para resolver esta nueva funcionalidad, tendrás que utilizar la función buscarAuto*/

venderAuto: function (patente){
    let auto= this.buscarAuto(patente)

     if (auto != undefined){
        return auto.vendido = true
     }
    },



/*Funcionalidad extra: La primera es poder contar, como concesionaria, con la habilidad de poder tener la lista de autos para la venta. A lo cual, 
María, cree que es una tarea sencilla que Juan y vos pueden encarar solos, usando la función autosParaLaVenta, aunque por las dudas ella les recuerda 
que no deberían de aparecer los autos que ya fueron vendidos.
Para comenzar, tenés que agregar el código que escribiste en el ejercicio anterior. Tené en cuenta que estamos optimizando nuestro código, por lo cual, 
deberíamos utilizar el método filter.*/

autosParaLaVenta: function (){
    let autos = this.autos
    let autosEnVenta = autos.filter(function(auto){
     return auto.vendido == false
    })
    return autosEnVenta
},



/*María, contenta con el trabajo que realizaron, les pide otra funcionalidad extra. 
Resulta que a la concesionaria le suelen preguntar muy seguido cuáles de los autos para la venta son 0 km. 
Tené en cuenta que María considera que un auto 0 km es aquel que tenga un kilometraje menor a 100. Vas a tener que desarrollar la funcionalidad autosNuevos.
¿Cómo podés resolver esto reutilizando la función autosParaLaVenta?
Para comenzar, tenés que agregar el código que escribiste en el ejercicio anterior.*/

autosNuevos: function (){
    let autosDisponibles = this.autosParaLaVenta()
    let autoNuevo = autosDisponibles.filter(function(auto){
        return auto.km < 100
    })
     return autoNuevo
},


/* El cliente le pidió saber cuánto dinero generaron las ventas.
María te pide que completes la función listaDeVentas que devuelve una lista que contiene el precio de venta de cada auto vendido. A esto, Juan,
 que está al lado tuyo, se le escapa la frase "mmm.....estoy seguro que alguna función de arrays nos va a servir, pero no me acuerdo".
Para comenzar tenés que agregar el código que escribiste en el ejercicio anterior.*/

listaDeVentas: function (){
    let autos = this.autos;
    let autosVendidos = autos.filter(function(auto){
        return auto.vendido == true
})
     let arrayPrecios = []
     autosVendidos.forEach(function(auto){
         return arrayPrecios.push(auto.precio)
     })
     return arrayPrecios
},

/*Terminada esta función, María te pide que resuelvas la funcionalidad de totalDeVentas, 
que justamente nos devuelva la sumatoria del valor de todas las ventas realizadas. Acá el único requerimiento técnico explícito es que utilices la función reduce, ¡a codear!*/


totalDeVentas: function (){
    let arrayPrecios = this.listaDeVentas()   
    if (arrayPrecios.length == 0){
        return 0
    } else{
        let totalDeVentas = arrayPrecios.reduce(function(acum, precio){
            return acum + precio
           })
           return totalDeVentas
    }
   },

/*Muy contento el equipo por cómo viene el desarrollo, por la tarde, María te comenta que se agrega una funcionalidad muy importante:
la de verificar si una persona puede comprar o no un auto. Esta permite al sistema definir si una persona al consultar por un auto, puede comprarlo. Las personas 
solo sacan los autos en cuotas y tomando dos factores como condición de compra. 
1 = Una es el costo total: si el total de un auto excede lo que la persona considera caro, no va a comprar el auto. 
2 = Otra condición es su capacidad de pago en cuotas: si la capacidad de pago en cuotas supera al costo de la cuota, va a poder pagarlo. 
3 = Si ambas condiciones se cumplen, se realiza la compra.
Es por esto que María te pide que desarrolles la función puedeComprar que reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
Una persona va a ser representada mediante un objeto literal de la siguiente forma:
{
nombre: “Juan”,
capacidadDePagoEnCuotas: 20000,
capacidadDePagoTotal: 100000
}*/



puedeComprar: function(auto, persona){  
    if (auto.precio <= persona.capacidadDePagoTotal && (auto.precio / auto.cuotas) <= persona.capacidadDePagoEnCuotas){
        return true
    } else {
        return false
    }
   },

/*Ahora, te comprometiste a realizarla. 
Así que manos a la obra. Hay que escribir la función autosQuePuedeComprar, que recibe una persona y devuelve la lista de autos que puede comprar.
La función debe de realizar los siguientes pasos:
1) Obtener los autos para la venta
2) Por cada uno de los autos debe de probar si la persona puede comprarlo, ¿ya hay alguna funcionalidad que me permita hacer esto?.
3) Luego debemos retornar los que pueda comprar, ¿hay alguna manera de poder filtrar la lista de autos para la venta del punto 1 con el paso 2?*/

autosQuePuedeComprar: function(nombrePersona){

    let autosQuePuedeComprar = this.autosParaLaVenta().filter((auto)=>{
         return this.puedeComprar(auto, nombrePersona) === true;
     });
     return autosQuePuedeComprar
    }
 }



