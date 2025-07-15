create database vetcenter;
\c vetcenter;

CREATE TABLE especies (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE razas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especie_id INTEGER NOT NULL,
    FOREIGN KEY (especie_id) REFERENCES especies(id) ON DELETE CASCADE,
    UNIQUE (nombre, especie_id) -- evita duplicados como "Labrador" dos veces en perros
);


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    clave TEXT NOT NULL  
);

CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER,
    sexo VARCHAR(10),
    usuario_id INTEGER NOT NULL,
    raza_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (raza_id) REFERENCES razas(id) ON DELETE SET NULL
);


CREATE TABLE estados_mascotas (
  id SERIAL PRIMARY KEY,
  estado VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE mascotas
ADD COLUMN estado_id INTEGER;

ALTER TABLE mascotas
ADD CONSTRAINT fk_estado
FOREIGN KEY (estado_id) REFERENCES estados_mascotas(id)
ON DELETE SET NULL;

CREATE TABLE adopciones (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  mascota_id INTEGER NOT NULL,
  fecha_adopcion DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (mascota_id) REFERENCES mascotas(id) ON DELETE CASCADE,
  UNIQUE (mascota_id)
);

UPDATE mascotas
SET estado_id = (
  SELECT id FROM estados_mascotas WHERE estado = 'Disponible'
)
WHERE estado_id IS NULL;

ALTER TABLE mascotas
ALTER COLUMN estado_id SET DEFAULT 1;

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
