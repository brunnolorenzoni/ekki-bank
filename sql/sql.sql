
INSERT INTO users(name, cpf, phone)
	VALUES ('Brunno Lorenzoni', '02702702733', '+5551999998888');
INSERT INTO accounts(user_id) VALUES (1);
	
INSERT INTO users(name, cpf, phone)
	VALUES ('Axl Rose', '02702702734', '+5551999998810');
INSERT INTO accounts(user_id) VALUES (2);
	
INSERT INTO users(name, cpf, phone)
	VALUES ('Slash', '02702702735', '+5551999998811');
INSERT INTO accounts(user_id) VALUES (3);
	
INSERT INTO users(name, cpf, phone)
	VALUES ('Duff', '02702702736', '+5551999998812');
INSERT INTO accounts(user_id) VALUES (
	4);

INSERT INTO users(name, cpf, phone)
	VALUES ('Izzy', '02702702737', '+5551999998813');
INSERT INTO accounts(user_id) VALUES (5);


INSERT INTO contacts(contact_id, user_id) VALUES (2, 1);
INSERT INTO contacts(contact_id, user_id) VALUES (3, 1);
INSERT INTO contacts(contact_id, user_id) VALUES (4, 1);


INSERT INTO transactions(amount, status, from_user_id, to_user_id) VALUES (100, 1, 1, 3);

	
SELECT * FROM users
SELECT * FROM accounts
SELECT * FROM contacts
SELECT * FROM transactions