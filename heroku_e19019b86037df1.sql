DROP DATABASE IF EXISTS heroku_e19019b86037df1;

-- Cria banco de dados
CREATE DATABASE heroku_e19019b86037df1;

-- Seleciona banco de  dados para uso
USE heroku_e19019b86037df1;

-- Cria tabela de usuário
CREATE TABLE users(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nomedeuser VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    is_active TINYINT DEFAULT 1,
    is_admin TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insere um ou mais usuário
INSERT INTO users (nome, nomedeuser, email, senha, is_admin)
VALUES ("gabriel", "Gabriel_Shi", "gabriel@gmail.com", "Naruto67", "1");

-- Lista todos os usuários
SELECT * FROM users;



-- Cria tabela de usuário
CREATE TABLE animes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    estudio VARCHAR(100) NOT NULL,
    sinopse TEXT(1000) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    capa VARCHAR(500),
    tipo VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    likes VARCHAR(900) NOT NULL,
    dislikes VARCHAR(900) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adiciona um Novo Anime
-- ALTER TABLE animes ADD likes VARCHAR(900) NOT NULL;

-- Insere um ou mais usuário
INSERT INTO animes (nome, autor, estudio, sinopse, genero)
VALUES ("Bleach", "Tite Cubo", "tv tokyo", "Chegou a ultima tempora", "Ação");

-- Lista todos os usuários
SELECT * FROM animes;





-- Cria tabela de usuário
CREATE TABLE episodios(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data VARCHAR(100) NOT NULL,
    image VARCHAR(500),
	animes_id INT UNSIGNED,
    numero_episodio INT NOT NULL,
	video_url VARCHAR(500),
    FOREIGN KEY (animes_id) REFERENCES animes(id),
	filmes_id INT UNSIGNED,
    FOREIGN KEY (filmes_id) REFERENCES filmes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

 -- Apagar Coluna
--   ALTER TABLE episodios DROP COLUMN anime_id;


-- Adiciona um Novo Anime
 -- ALTER TABLE episodios ADD FOREIGN KEY (filmes_id) REFERENCES filmes(id);


-- Insere um ou mais usuário
INSERT INTO episodios (anime_id, numero_episodio, nome, data, video_url, image )
VALUES  
(84, 1, 'Episódio 1', '28/09/2023', 'URL do vídeo do Episódio 1', 'https://animesgames.cc/wp-content/uploads/2023/09/jujutsu-kaisen-2-episodio-9-animes-online.jpg'),
(84, 2, 'Episódio 2', '28/09/2023', 'URL do vídeo do Episódio 2', 'https://animesgames.cc/wp-content/uploads/2023/09/jujutsu-kaisen-2-episodio-9-animes-online.jpg');

-- Lista todos os usuários
SELECT * FROM episodios;






-- Cria tabela de usuário
CREATE TABLE filmes(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    estudio VARCHAR(100) NOT NULL,
    sinopse TEXT(1000) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    capa VARCHAR(500),
    tipo VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Adiciona um Novo Anime
 -- ALTER TABLE animes ADD FOREIGN KEY (filmes_id) REFERENCES filmes(id);


-- Insere um ou mais usuário
INSERT INTO filmes (nome, autor, estudio, sinopse, genero, tipo)
VALUES ("Bleach", "Tite Cubo", "tv tokyo", "Chegou a ultima tempora", "Ação", "Legendado");

-- Lista todos os usuários
SELECT * FROM filmes;




-- Cria tabela de usuário
CREATE TABLE lancamento (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    horario VARCHAR(100) NOT NULL,
    dia VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    streaming VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO lancamento (
titulo, horario, dia, image, streaming
)

VALUES 
	(
"tate no yusha", "08", "domingo", "0b5bd355eb900ff34ade.jpg", "disney"
    );

-- Lista todos os usuários
SELECT * FROM lancamento;	




-- Cria tabela de usuário
CREATE TABLE pedidos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    anime VARCHAR(100) NOT NULL,
    comentario VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pedidos (
usuario, email, anime, comentario
)

VALUES 
	(
"Gabriel", "gabrielshi@", "Naruto", "traz pra mim"
    );

-- Lista todos os usuários
SELECT * FROM pedidos;


-- Cria tabela de usuário
CREATE TABLE comentariosanimes (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    comentario VARCHAR(500),
	animes_id INT UNSIGNED,
    FOREIGN KEY (animes_id) REFERENCES animes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lista todos os usuários
SELECT * FROM comentariosanimes;


-- Altera tabela
 -- ALTER TABLE news ADD description1 TEXT(1000)  NOT NULL;
  
 -- Apagar Coluna
  -- ALTER TABLE animes DROP COLUMN dislikes;


-- UPDATE users SET is_admin = 1 WHERE id = 16;

-- Deleta o usuário a partir do id
 -- DELETE FROM news WHERE id = 54;

-- Atualiza dados de uma linha
-- UPDATE users 
-- SET 
	-- name = "Henrique Atualizado", 
    -- email = "batatinha@email.com",
   --  birthdate = "1800-11-01"
-- WHERE id = 3;



