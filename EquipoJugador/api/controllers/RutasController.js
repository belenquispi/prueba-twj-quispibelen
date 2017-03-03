/**
 * RutasController
 *
 * @description :: Server-side logic for managing rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req,res) {
    return res.view('vistas/home');
  },
  error: function (req, res) {
    return res.view('vistas/error', {
      error: {
        desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
        rawError: "Ruta equivocada",
        url: "/"
      }
    });
  },
  crearEquipo: function (req, res) {
    return res.view('vistas/Equipo/crearEquipo');
  },
  crearJugador: function (req, res) {
    return res.view('vistas/Jugador/crearJugador',{
      idEquipo:req.allParams().idEquipo
    });
  }
};

