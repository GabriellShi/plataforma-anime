DROP DATABASE IF EXISTS plataforma_animes_db;

-- Cria banco de dados
CREATE DATABASE plataforma_animes_db;

-- Seleciona banco de  dados para uso
USE plataforma_animes_db;

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











-- Altera tabela
 -- ALTER TABLE news ADD description1 TEXT(1000)  NOT NULL;
  
 -- Apagar Coluna
 
  -- ALTER TABLE news
 -- DROP COLUMN image;


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



