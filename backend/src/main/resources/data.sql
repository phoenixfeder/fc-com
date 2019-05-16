INSERT INTO role(id, name)
VALUES (1, 'user'),
       (2, 'admin');

INSERT INTO user(id, username, email, password, role_id, enabled, date_of_birth)
VALUES (1, 'testuser', 'test.user@fc.de', '$2a$10$gba/UpsDbHZmPCMUS4LkEeO8fY53BmGfmNgrObtWQ8zcW1BYWC/Im', 1, false,
        '2000-01-01'),
       (2, 'expireduser', 'expired.user@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1,
        false, '1987-03-25'),
       (3, 'enableduser', 'enabled.user@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 1, true,
        '1980-04-28'),
       (4, 'admin', 'admin.user@fc.de', '$2a$10$cibeyz8xZSR5Ohc.hA7n6ePfsWagaOk.VHa8VGICBiwvPywRSYttm', 2, true,
        '1999-04-01');

INSERT INTO verification_token(id, expiry_date, token, user_id)
VALUES (1, '2030-03-03 00:00:00', 'abcdefghij', 1),
       (2, '2010-03-03 00:00:00', 'abcdefghij', 2);

INSERT INTO flash_card_box(id, title, description, owner, creation_date, last_changed)
VALUES (1, 'Deutsch', 'Goethes Faust im Arsch', 3, '2019-04-09 16:00:00', '2019-04-09 16:00:00'),
       (2, 'English', 'Basics', 3, '2019-04-09 16:00:00', '2019-04-09 16:00:00'),
       (3, 'Chemie', 'Meth für Anfänger', 3, '2019-04-09 16:00:00', '2019-04-09 16:00:00');

INSERT INTO flash_card(id, back_text, front_text, title, flashcardbox)
VALUES (100000, 'Dies ist ein Text, der Hinten auf einer Flashcard stehen könnte!',
        'Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte! Dies ist ein Text, der Vorne auf einer Flashcard stehen könnte!',
        'Hello World', 1),
       (100001, 'Lösung', 'Frage', 'TestCard', 1);

INSERT INTO user_viewable_boxes(user_id, box_id)
VALUES (4, 1);

INSERT INTO flash_card_statistics(flashcard_id, trials, failed_trials, deck, user_id)
VALUES (100000, 0, 0, 'A', 3),
       (100001, 0, 0, 'A', 3);
