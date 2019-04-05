INSERT INTO flash_card(id, back_text, front_text, title) VALUES
(100000, 'Dies ist ein Text, der Hinten auf einer Flashcard stehen könnte!', 'Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte!', 'Hello World'),
(100001, 'Lösung', 'Frage', 'TestCard');

INSERT INTO role(id, name) VALUES
(1, 'dbConnector'),
(2, 'admin');

INSERT INTO user(id, username, email, password, role_id, enabled, date_of_birth) VALUES
(1, 'testuser', 'test.dbConnector@fc.de', '$2a$10$gba/UpsDbHZmPCMUS4LkEeO8fY53BmGfmNgrObtWQ8zcW1BYWC/Im', 1, false, '2000-01-01'),
(2, 'expireduser', 'expired.dbConnector@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1, false, '1987-03-25'),
(3, 'enableduser', 'enabled.dbConnector@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1, true, '1980-04-28'),
(4, 'admin', 'admin.dbConnector@fc.de','$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 2, true, '1999-04-01');

INSERT INTO verification_token(id, expiry_date, token, user_id) VALUES
(1, '2030-03-03 00:00:00', 'abcdefghij', 1),
(2, '2010-03-03 00:00:00', 'abcdefghij', 2);