var database = require("../config/database.config");
var usuario = {};

usuario.login = function(data, callback) {
  if(database) {
    var consulta = 'SELECT * FROM Usuario WHERE usuario_nick = "' + data.nick + '" AND usuario_pass = "' + data.contrasena +'";';
		console.log(consulta)
		database.query(consulta, [data.nick, data.contrasena], function(error, resultado){
			if(error) {
				throw error;
			} else {
				console.log(resultado[0]);

				callback(resultado);
			}
		});
	}
}

usuario.selectAll = function(callback) {
	if(database) {
		var consulta = 'SELECT * FROM Usuario';
		database.query(consulta, function(error, resultado){
			if(error) throw error;
			callback(resultado);
		});
	}
}

usuario.selectUsuario = function(idUsuario, callback) {
  if(database) {
    var consulta = 'CALL sp_selectUsuario(?);';
		database.query(consulta, idUsuario, function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
	}
}

usuario.selectHistorial = function(idUsuario, callback) {
  if(database) {
    var consulta = 'CALL sp_selectHistorial(?);';
		database.query(consulta, idUsuario, function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(resultado[0]);
			}
		});
  }
}


usuario.insert = function(data, callback) {
  if(database) {
    database.query('CALL SP_AgregarUsuario(?, ?);',
    [data.nick, data.contrasena],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback({"affectedRows": resultado.affectedRows});
      }
    });
  }
}

usuario.update = function(data, callback){
	if(database) {
		database.query('CALL sp_updateUsuario(?,?,?)',
		[data.idUsuario, data.nick, data.contrasena],
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(data);
			}
		});
	}
}

usuario.delete = function(idUsuario, callback) {
	if(database) {
		database.query('CALL sp_deleteUsuario(?)', idUsuario,
		function(error, resultado){
			if(error){
				throw error;
			} else {
				callback({"mensaje":"Eliminado"});
			}
		});
	}
}

module.exports = usuario;
