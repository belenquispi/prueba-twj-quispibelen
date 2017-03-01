/**
 * Equipo.js
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
    fechaCreacion:{
     type:date,
      required:true
    },
    paisResidencia:{
      type:string,
      required:true
    },
    jugadores:{
      collection:'Jugador',
      via:'idJugador'
    }

  }
};

