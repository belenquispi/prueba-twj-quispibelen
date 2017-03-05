/**
 * EquipoController
 *
 * @description :: Server-side logic for managing equipoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearEquipo: function (req, res) {
    var parametros = req.allParams();
    var equipoCrear = {
      nombre: parametros.nombreEquipo,
      fechaCreacion: parametros.fechaCreacion,
      paisResidencia: parametros.paisResidencia
    };
    Equipo.create(equipoCrear).exec(function (err, equipoCreado) {
      if (err) {
        return res.view('vistas/error', {
          error: {
            descripcion: "Error al crear el Equipo",
            rawError: err,
            url: "/CrearEquipo"
          }
        });
      }
      Equipo.find().exec(function (errEncontrado, equiposEncontrados) {
        if (errEncontrado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se presento un problema al cargar los Equipos",
              rawError: errEncontrado,
              url: "/listarEquipos"
            }
          });
        }
        res.view('vistas/Equipo/listarEquipos', {equipos: equiposEncontrados});
      })
    });

  },
  listarEquipos: function (req, res) {
    Equipo.find().exec(function (errorEncontrado, equiposEncontrados) {
      if (errorEncontrado) {
        return res.view('vistas/error', {
          error: {
            desripcion: "Problema a cargar todos los equipos registrados",
            rawError: errorEncontrado,
            url: "/listarEquipos"
          }
        });
      }
      res.view('vistas/Equipo/listarEquipos', {equipos: equiposEncontrados});

    });

  },
  borrarEquipo: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Equipo.destroy({
        id: parametros.id
      })
        .exec(function (errorIndefinido, equipoBorrado) {
        if (errorIndefinido) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Error al borrar el Equipo",
              rawError: errorIndefinido,
              url: "/listarEquipos"
            }
          });
        }
        Equipo.find().exec(function (errorEncontrado, equiposEncontrados) {
          if (errorEncontrado) {
            return res.view('vistas/error', {
              error: {
                descripcion: "Ocurrio un problema en la carga de los Equipos",
                rawError: errorEncontrado,
                url: "/listarEquipos"
              }
            });
          }
          res.view('vistas/Equipo/listarEquipos', {
            equipos: equiposEncontrados
          });
        });
      });
    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Equipo",
          rawError: "No envia ID",
          url: "/listarEquipos"
        }
      });
    }
  },

  actualizacionEquipo: function (req, res) {
    var parametros = req.allParams();
    var equipoAActualizar = {
      nombre: parametros.nombreEquipo,
      fechaCreacion: parametros.fechaCreacion,
      paisResidencia: parametros.paisResidencia
    };
    Equipo.update({
      id: parametros.idEquipo
    }, equipoAActualizar).exec(function (errorInesperado, equipoActualizado) {
      if (errorInesperado) {
        return res.view('vistas/error', {
          error: {
            descripcion: "Se ha presentado un problema al actualizar el equipo",
            rawError: errorInesperado,
            url: "/listarEquipos"
          }
        });
      }
      Equipo.find().exec(function (errorEncontrado, equiposEncontrados) {
        if (errorEncontrado) {
          return res.view('vistas/error', {
            error: {
              descripcion: "Se ha encontrado un error inesperado en la carga de los Equipos",
              rawError: errorEncontrado,
              url: "/listarEquipos"
            }
          });
        }
        res.view('vistas/Equipo/listarEquipos', {
          equipos: equiposEncontrados
        });
      })
    })

  }
};


