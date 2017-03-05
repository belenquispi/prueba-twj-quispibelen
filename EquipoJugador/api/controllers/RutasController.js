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
    Equipo.find()
      .exec(function (errorEncontrado, equiposEncontrados) {
        if (errorEncontrado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha producido un error inesperado",
              rawError: errorInesperado,
              url: "/listarJugadores?idEquipo=" + parametros.idEquipo
            }
          })
        }
        return res.view('vistas/Jugador/crearJugador', {
          equipos: equiposEncontrados,
          idEquipo: req.allParams().idEquipo
        });
      })
  },
  actualizarJugador: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Jugador.findOne({
        id: parametros.id
      }).populate("idEquipo")
        .exec(function (errorInesperado, jugadorEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha producido un error inesperado",
              rawError: errorInesperado,
              url: "/listarJugadores?idEquipo=" + parametros.idEquipo
            }
          });
        }
        if (jugadorEncontrado) {
          Equipo.find()
            .exec(function (errorEncontrado, equiposEncontrados) {
              if(errorEncontrado){
                return res.view('vistas/error',{
                  error: {
                    descripcion: "Se ha producido un error inesperado",
                    rawError: errorInesperado,
                    url: "/listarJugadores?idEquipo=" + parametros.idEquipo
                  }
                })
              }
              return res.view('vistas/Jugador/actualizarJugador', {
                jugador: jugadorEncontrado,
                equipos:equiposEncontrados,
                idEquipo: parametros.idEquipo
              });
            })
        }
        else {
          return res.view('vista/error', {
            error: {
              descripcion: "El jugador con el id: " + parametros.id + " no existe",
              rawError: "No existe el Jugador",
              url: "/listarJugadores?idEquipo=" + parametros.idEquipo
            }
          });
        }
      });

    }
  }
};

