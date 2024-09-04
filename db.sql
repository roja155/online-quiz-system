-- Use the quizdb database
create database quizdb;
USE quizdb;

-- Create a table to store quiz questions
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(255) NOT NULL,
    option1 VARCHAR(50) NOT NULL,
    option2 VARCHAR(50) NOT NULL,
    option3 VARCHAR(50) NOT NULL,
    option4 VARCHAR(50) NOT NULL,
    correct_answer VARCHAR(50) NOT NULL
);

-- Insert sample quiz questions
INSERT INTO quiz_questions (question_text, option1, option2, option3, option4, correct_answer)
VALUES 
    ('What is the capital of France?', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Paris'),
    ('Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Venus', 'Jupiter', 'Mars'),
    ('What is the largest mammal?', 'Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus', 'Blue Whale'),
    ('In which year did World War II end?', '1943', '1945', '1947', '1950', '1945'),
    ('Who wrote ''Romeo and Juliet''?', 'Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain', 'William Shakespeare');

SELECT*FROM quiz_questions;

USE quizdb;
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);
SELECT* FROM users;

