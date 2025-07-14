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

