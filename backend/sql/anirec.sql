CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	email varchar(50),
	username varchar(50),
	password varchar(900),
	session_id VARCHAR,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE anime (
	id INTEGER PRIMARY KEY,
	name varchar(200),
	jap_name varchar(200),
	season varchar(50),
	episodes INTEGER,
	status varchar(30),
	format varchar(30),
	start_date DATE,
	end_date DATE,
	average_score float,
	cover_image varchar(500),
	banner_image varchar(500)
);

CREATE TABLE review (
	id INTEGER PRIMARY KEY,
	description text,
	summary text,
	rating INTEGER,
	score INTEGER,
	anime_id int,
	user_id int
);

ALTER TABLE review ADD CONSTRAINT user_review FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE review ADD CONSTRAINT anime_review FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE user_anime_activity (
	id INTEGER PRIMARY KEY,
	status varchar(50),
	episode_watched integer,
	score integer,
	user_id int,
	anime_id int
);


ALTER TABLE user_anime_activity ADD CONSTRAINT user_aa FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE user_anime_activity ADD CONSTRAINT anime_aa FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE user_favorite_anime (
	id serial PRIMARY KEY,
	user_id int,
	anime_id int
);


ALTER TABLE user_favorite_anime ADD CONSTRAINT user_fa FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE user_favorite_anime ADD CONSTRAINT anime_fa FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE anime_episodes (
	id serial PRIMARY KEY,
	name varchar(700),
	site varchar(50),
	url varchar(500),
	anime_id integer
);

ALTER TABLE anime_episodes ADD CONSTRAINT anime_epi FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE  anime_genre(
	id serial PRIMARY KEY,
	name varchar(60),
	anime_id INTEGER
);


ALTER TABLE anime_genre ADD CONSTRAINT anime_gen FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE character (
	id INTEGER PRIMARY KEY,
	name varchar(100),
	image varchar(400),
	gender varchar(50),
	description text	 
);

CREATE TABLE anime_character (
	id serial PRIMARY KEY,
	anime_id INTEGER,
	character_id INTEGER
);

ALTER TABLE anime_character ADD CONSTRAINT anime_ac FOREIGN KEY (anime_id) REFERENCES anime (id);
ALTER TABLE anime_character ADD CONSTRAINT char_ac FOREIGN KEY (character_id) REFERENCES character (id);


CREATE TABLE anime_staff (
	id serial PRIMARY KEY,
	staff_name varchar(50),
	language varchar(50),
	character_id integer
);

ALTER TABLE anime_staff ADD CONSTRAINT anime_staff_ch FOREIGN KEY (character_id) REFERENCES character (id);


CREATE TABLE anime_studio (
	id serial PRIMARY KEY,
	anime_id integer,
	studio_name varchar(100)
);

ALTER TABLE anime_studio ADD CONSTRAINT anime_st FOREIGN KEY (anime_id) REFERENCES anime (id);


CREATE TABLE tag (
	id INTEGER PRIMARY KEY,
	name varchar(50),
	description text,
	category varchar(50)
);

CREATE TABLE anime_tag (
	id serial PRIMARY KEY,
	tag_id integer,
	anime_id integer
);

ALTER TABLE anime_tag ADD CONSTRAINT anime_t FOREIGN KEY (anime_id) REFERENCES anime (id);
ALTER TABLE anime_tag ADD CONSTRAINT tag_t FOREIGN KEY (tag_id) REFERENCES tag (id);


CREATE TABLE anime_trailer (
	id INTEGER PRIMARY KEY,
	trailer_id varchar(50),
	site varchar(300),
	thumbnail varchar(900)
);

ALTER TABLE anime ADD CONSTRAINT trail_const FOREIGN KEY (id) REFERENCES anime (id);