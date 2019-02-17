CREATE TABLE account(
	id_user serial PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP,
	id_role integer NOT NULL,

	FOREIGN KEY (id_role)
		REFERENCES role (id_role)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
);

CREATE TABLE role(
	id_role serial,
	name_role VARCHAR(30) UNIQUE NOT NULL,

	PRIMARY KEY (id_role)
);