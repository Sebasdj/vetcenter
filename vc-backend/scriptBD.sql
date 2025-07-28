create database vetcenter;
\c vetcenter;

-- Crear la base de datos
CREATE DATABASE vetcenter;
\c vetcenter;

-- Tabla de especies
CREATE TABLE especies (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de razas
CREATE TABLE razas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie_id INTEGER NOT NULL,
    FOREIGN KEY (especie_id) REFERENCES especies(id) ON DELETE CASCADE,
    UNIQUE (nombre, especie_id)
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    clave TEXT NOT NULL
);

-- Tabla de sexos de mascotas
CREATE TABLE mascotas_sexos (
    id SERIAL PRIMARY KEY,
    mascota_sexo VARCHAR(10) NOT NULL UNIQUE
);

-- Tabla de mascotas
CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER,
    sexo_id INTEGER,
    usuario_id INTEGER NOT NULL,
    raza_id INTEGER NOT NULL,
    estado_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (raza_id) REFERENCES razas(id) ON DELETE SET NULL,
    FOREIGN KEY (estado_id) REFERENCES estados_mascotas(id) ON DELETE SET NULL,
    FOREIGN KEY (sexo_id) REFERENCES mascotas_sexos(id) ON DELETE SET NULL
);

-- Tabla de estados de mascotas
CREATE TABLE estados_mascotas (
    id SERIAL PRIMARY KEY,
    estado VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de adopciones
CREATE TABLE adopciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    mascota_id INTEGER NOT NULL,
    fecha_adopcion DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
    UNIQUE (mascota_id)
);

-- Opcional: Insertar valores comunes en mascotas_sexos y estados_mascotas
INSERT INTO mascotas_sexos (mascota_sexo) VALUES ('Macho'), ('Hembra');

INSERT INTO estados_mascotas (estado) VALUES ('Disponible'), ('Adoptado'), ('En tratamiento');

-- Asignar estado por defecto a mascotas sin estado
UPDATE mascotas
SET estado_id = (
    SELECT id FROM estados_mascotas WHERE estado = 'Disponible'
)
WHERE estado_id IS NULL;

-- Definir valor por defecto para estado_id
ALTER TABLE mascotas
ALTER COLUMN estado_id SET DEFAULT 1;



/*

  INSERCION DE LOS DATOS


*/

INSERT INTO estados_mascotas (estado) VALUES
  ('Disponible'),
  ('Adoptado'),
  ('En tratamiento'),
  ('Perdido'),
  ('Fallecido');


insert into usuarios (nombre, correo, clave) values ('sebasra', 'sebasra@gmail.com', '123456');
insert into usuarios (nombre, correo, clave) values ('mariely', 'mariely@gmail.com', '123456');

INSERT INTO especies (nombre) VALUES 
  ('Perro'),
  ('Gato');


-- Supongamos que la especie "Perro" tiene ID = 1 y "Gato" = 2
INSERT INTO razas (nombre, especie_id) VALUES 
  ('Labrador Retriever', 1),
  ('Bulldog Francés', 1),
  ('Siamés', 2);


-- Supongamos que la especie "Perro" tiene ID = 1 y "Gato" = 2
INSERT INTO razas (nombre, especie_id) VALUES 
  ('Labrador Retriever', 1),
  ('Bulldog Francés', 1),
  ('Siamés', 2);


-- Suponiendo que:
-- usuario_id: 1 = Carlos, 2 = Lucía
-- raza_id: 1 = Labrador, 2 = Bulldog Francés, 3 = Siamés

INSERT INTO mascotas (nombre, edad, sexo, usuario_id, raza_id) VALUES 
  ('Firulais', 3, 'Macho', 1, 1),
  ('Luna', 2, 'Hembra', 2, 3),
  ('Toby', 5, 'Macho', 1, 2);


/* SCRIPT PARA ADOPTAR MASCOTA
DO $$
DECLARE
  v_estado_adoptado_id INTEGER;
  v_estado_actual_id INTEGER;
BEGIN
  -- Obtener ID del estado "Adoptado"
  SELECT id INTO v_estado_adoptado_id FROM estados_mascotas WHERE estado = 'Adoptado';

  -- Verifica que la mascota esté disponible antes de adoptar
  SELECT estado_id INTO v_estado_actual_id FROM mascotas WHERE id = 2;  -- mascota_id aquí

  IF v_estado_actual_id IS NULL OR
     (SELECT estado FROM estados_mascotas WHERE id = v_estado_actual_id) != 'Disponible' THEN
    RAISE EXCEPTION 'La mascota no está disponible para adopción.';
  END IF;

  -- Insertar adopción
  INSERT INTO adopciones (usuario_id, mascota_id) VALUES (1, 2);  -- usuario_id y mascota_id

  -- Actualizar estado de la mascota
  UPDATE mascotas
  SET estado_id = v_estado_adoptado_id
  WHERE id = 2;
END
$$;

*/
