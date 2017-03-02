/**
 * Jugador.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  nombre:{
    type:'string',
    required:true
  },
  fichadoHasta:{
    type:'date',
    required:true
  },
    posicion:{
    type:'string',
      required:true
    },
    idJugador:{
    model:'Equipo',
      required:true
    }
  }
};

