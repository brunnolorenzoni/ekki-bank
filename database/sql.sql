INSERT INTO ekki.users (name, cpf, phone, createdAt) VALUES ('Bruno', '02702702736', '+5551993888840', NOW());
INSERT INTO ekki.users (name, cpf, phone, createdAt) VALUES ('Rodrigo', '02702702733', '+5551993888841', NOW());

INSERT INTO ekki.user_account (id_user, balance_value, limit_value) VALUES (7, 1000, 500);
INSERT INTO ekki.user_account (id_user, balance_value, limit_value) VALUES (8, 1000, 500);


INSERT INTO ekki.user_contacts (id_user, id_user_contact) VALUES (7, 8), (8,7);