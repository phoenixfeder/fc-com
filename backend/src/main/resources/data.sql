ALTER TABLE flash_card AUTO_INCREMENT=100000;
INSERT INTO flash_card(id, back_text, front_text, title) VALUES
(100000, 'Dies ist ein Text, der Hinten auf einer Flashcard stehen könnte!', 'Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte!', 'Hello World'),
(100001, 'Lösung', 'Frage', 'TestCard');

INSERT INTO user(id, username, email, password, role_id, enabled) VALUES
(1, 'testuser', 'test.user@fc.de', '$2a$10$gba/UpsDbHZmPCMUS4LkEeO8fY53BmGfmNgrObtWQ8zcW1BYWC/Im', 1, false),
(2, 'expireduser', 'expired.user@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1, false);
(3, 'enableduser', 'enabled.user@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1, true)

INSERT INTO verification_token(id, expiry_date, token, user_id) VALUES
(1, '2030-03-03 00:00:00', 'abcdefghij', 1),
(2, '2010-03-03 00:00:00', 'abcdefghij', 2);

INSERT INTO role(id, name) VALUES
(1, 'user'),
(2, 'admin');