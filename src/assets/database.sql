
CREATE TABLE IF NOT EXISTS usuariotable(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	usuname TEXT,
	clave TEXT,
	nombre TEXT,
	direccion TEXT,
	moviliaria INTEGER
);

--moviliaria 1=true 0=false
INSERT or IGNORE INTO usuariotable VALUES (1, 'sett', 'mami','Sett','Noxus',1);
INSERT or IGNORE INTO usuariotable VALUES (2, 'rak.an', '1234','Rakan','jonia',1);
INSERT or IGNORE INTO usuariotable VALUES (3, 'xayah', 'putorakan','Xayah','jonia',0);
INSERT or IGNORE INTO usuariotable VALUES (4, 'sona', 'mute','Sona','demacia',0);

CREATE TABLE IF NOT EXISTS conductortable(
	id_conductor INTEGER PRIMARY KEY AUTOINCREMENT,
	conductor TEXT,
	entrada TEXT,
	salida TEXT,
	costo INTEGER
);

--condutor es la primary key usuariotable
INSERT or IGNORE INTO conductortable VALUES(1,'sett','8:30','12:15',1000);
INSERT or IGNORE INTO conductortable VALUES(2,'rakan','12:15','17:30',1200);

--tabla rellena el usuario sin auto, pero lo vera el conductor
--estado aceptado=1 rechazado=0 sinrevisar=2
CREATE TABLE IF NOT EXISTS pedidotable(
	id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
	id_chofer INTEGER,
	pasajero TEXT,
	direccion TEXT,
	hora TEXT,
	estado INTEGER
);

INSERT or IGNORE INTO pedidotable VALUES(1,2,'Juan','bollenar','12:30',2);
