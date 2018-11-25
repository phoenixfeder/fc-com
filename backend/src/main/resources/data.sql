ALTER TABLE flash_card AUTO_INCREMENT=100000;
INSERT INTO flash_card(id, back_text, front_text, title) VALUES
(100000, 'Dies ist ein Text, der Hinten auf einer Flashcard stehen könnte!', 'Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte!', 'Hello World'),
(100001, 'Lösung', 'Frage', 'TestCard');

INSERT INTO user(id, username, email, password, role_id) VALUES
(1, 'testuser', 'test.user@fc.de', '123456', 1),
(2, 'expireduser', 'expired.user@fc.de', '123456', 1);

INSERT INTO verification_token(id, expiry_date, token, user_id) VALUES
(1, '2030-03-03 00:00:00', 'abcdefghij', 1),
(2, '2010-03-03 00:00:00', 'abcdefghij', 2);

INSERT INTO role(id, name) VALUES
(1, 'user'),
(2, 'admin');