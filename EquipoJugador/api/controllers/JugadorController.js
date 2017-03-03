/**
 * JugadorController
 *
 * @description :: Server-side logic for managing jugadors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  listarJugadores: function (req, res) {
    var parametros = req.allParams();
    Jugador.find({
      where: {idEquipo: parametros.idEquipo}
    })
      .populate("idEquipo")
      .exec(function (errorInesperado, jugadoresEcontrados) {
        if (errorInesperado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha producido un problema en la carga de los jugadores",
              rawError: errorInesperado,
              url: "/listarEquipos"
            }
          });
        }
        res.view('vistas/Jugador/listarJugadores', {
          jugadores: jugadoresEcontrados,
          idEquipo: parametros.idEquipo
        });
      });
  },
  crearJugador: function (req, res) {
    var parametros = req.allParams();
    var jugadorNuevo = {
      nombre: parametros.nombreJugador,
      fichadoHasta: parametros.fichadoHasta,
      posicion: parametros.posicion,
      idEquipo: parametros.idEquipo
    };
    Jugador.create(jugadorNuevo)
      .exec(function (errorEncontrado, jugadorCreado) {
        if (errorEncontrado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha producido un error al crear el nuevo jugador",
              rawError: errorEncontrado,
              url: "/CrearJugador?idEquipo=" + parametros.idEquipo
            }
          });
        }
        Jugador.find({
            where: {
              idEquipo: parametros.idEquipo
            }
          }
        )
          .exec(function (errorInesperado, jugadoresEncontrados) {
            if (errorInesperado) {
              return res.view('vistas/error', {
                error: {
                  descripcion: "Se presento un error con la carga de los jugadores",
                  rawError: errorInesperado,
                  url: "/listarJugadores?idEquipo=" + parametros.idEquipo
                }
              });
            }
            res.view('vistas/Jugador/listarJugadores', {
              jugadores: jugadoresEncontrados,
              idEquipo: parametros.idEquipo
            });
          });
      });
  },
  borrarJugador: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Jugador.destroy({
        id: parametros.id
      }).exec(function (errorIndefinido, jugadorBorrado) {
        if (errorIndefinido) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Error al borrar el Jugador",
              rawError: errorIndefinido,
              url: "/listarJugadores?idEquipo=" + parametros.idEquipo
            }
          });
        }
        Jugador.find({
          where: {
            idEquipo: parametros.idEquipo
          }
        }).exec(function (errorEncontrado, jugadoresEncontrados) {
          if (errorEncontrado) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Ocurrio un problema en la carga de los Equipos",
                rawError: errorEncontrado,
                url: "/listarJugadores?idEquipo=" + parametros.idEquipo
              }
            });
          }
          res.view('vistas/Jugador/listarJugadores', {
            jugadores: jugadoresEncontrados,
            idEquipo: parametros.idEquipo
          });
        });
      });
    }
    else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Jugador",
          rawError: "No envia ID",
          url: "/listarJugadores?idEquipo=" + parametros.idEquipo
        }
      });
    }
  },
  actualizarJugador: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Jugador.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, jugadorEncontrado) {
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
          return res.view('vistas/Jugador/actualizarJugador', {
            jugador: jugadorEncontrado,
            idEquipo: parametros.idEquipo
          });
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
  },

  actualizacionJugador: function (req, res) {
    var parametros = req.allParams();
    var jugadorAEditar = {
      nombre: parametros.nombreJugador,
      fichadoHasta: parametros.fichadoHasta,
      posicion: parametros.posicion,
      idEquipo: parametros.idEquipo
    };
    Jugador.update({
      id: parametros.idJugador
    }, jugadorAEditar).exec(function (errorInesperado, jugadorActualizado) {
      if (errorInesperado) {
        return res.view('vistas/error', {
          error: {
            descripcion: "Se ha presentado un problema al actualizar el jugador",
            rawError: errorInesperado,
            url: "/listarJugadores?idEquipo=" + parametros.idEquipo
          }
        });
      }
      Jugador.find({
        where: {
          idEquipo: parametros.idEquipo
        }
      }).exec(function (errorEncontrado, jugadoresEncontrados) {
        if (errorEncontrado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha encontrado un error inesperado en la carga de los Jugadores",
              rawError: errorEncontrado,
              url: "/listarJugadores?idEquipo=" + parametros.idEquipo
            }
          });
        }
        res.view('vistas/Jugador/listarJugadores', {
          jugadores: jugadoresEncontrados,
          idEquipo: parametros.idEquipo
        });
      })
    })

  }
};

