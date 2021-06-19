DROP DATABASE srms;

CREATE DATABASE
    IF NOT EXISTS srms
    DEFAULT CHARSET utf8mb4;

USE srms;

DROP TABLE IF EXISTS per_coo;
DROP TABLE IF EXISTS with_other;
DROP TABLE IF EXISTS join_project;
DROP TABLE IF EXISTS contribute_to;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS cooperator;
DROP TABLE IF EXISTS achievement;
DROP TABLE IF EXISTS researcher;
DROP TABLE IF EXISTS sub_topic;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS research_studio;
DROP TABLE IF EXISTS secretary;

CREATE TABLE secretary
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        TEXT                 NOT NULL,
    gender      ENUM ('man','woman') NOT NULL,
    age         INT,
    employ_time TEXT,
    duty        TEXT
);

CREATE TABLE research_studio
(
    id                 INT PRIMARY KEY AUTO_INCREMENT,
    name               TEXT NOT NULL,
    research_direction TEXT NOT NULL,
    principal_id       INT,
    p_start_time       TEXT,
    p_term             TEXT,
    secretary_id       INT

#     FOREIGN KEY (secretary_id) REFERENCES secretary (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE room
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    address   TEXT NOT NULL,
    acreage   FLOAT,
    studio_id INT
#     FOREIGN KEY (studio_id) REFERENCES research_studio (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE project
(
    id               INT PRIMARY KEY AUTO_INCREMENT,
    principal_id     INT,
    name             TEXT NOT NULL,
    research_content TEXT,
    fund             DOUBLE,
    start_time       TEXT,
    finish_time      TEXT
#     FOREIGN KEY (principal_id) REFERENCES research_studio (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE sub_topic
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    finish_time  TEXT,
    fund         DOUBLE,
    tech_index   TEXT,
    principal_id INT,
    project_id   INT
#     FOREIGN KEY (principal_id) REFERENCES research_studio (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (project_id) REFERENCES project (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE researcher
(
    id                 INT PRIMARY KEY AUTO_INCREMENT,
    name               TEXT                 NOT NULL,
    gender             ENUM ('man','woman') NOT NULL,
    title              TEXT,
    age                INT,
    research_direction TEXT,
    studio_id          INT,
    sub_topic_id       INT
#     FOREIGN KEY (studio_id) REFERENCES research_studio (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (sub_topic_id) REFERENCES sub_topic (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE achievement
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        TEXT NOT NULL,
    TIME        TEXT,
    rankId      INT,
    type        ENUM ('patent','paper','software_copyright'),
    patent_type ENUM ('invention','utility_model','exterior'),
    project_id  INT
#     FOREIGN KEY (project_id) REFERENCES project (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE cooperator
(
    id      INT PRIMARY KEY AUTO_INCREMENT,
    name    TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE person
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    mail         TEXT NOT NULL,
    office_phone TEXT NOT NULL,
    mobile_phone TEXT NOT NULL
);

CREATE TABLE contribute_to
(
    id             INT PRIMARY KEY AUTO_INCREMENT,
    researcher_id  INT NOT NULL,
    achievement_id INT NOT NULL
#     FOREIGN KEY (researcher_id) REFERENCES researcher (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (achievement_id) REFERENCES achievement (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE join_project
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    researcher_id INT NOT NULL,
    project_id    INT NOT NULL,
    join_time     TEXT,
    workload      TEXT,
    fund          DOUBLE
#     FOREIGN KEY (researcher_id) REFERENCES researcher (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (project_id) REFERENCES project (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE with_other
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    cooperator_id INT NOT NULL,
    project_id    INT NOT NULL,
    type          ENUM ('commission','cooperation','supervision')
#     FOREIGN KEY (cooperator_id) REFERENCES cooperator (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (project_id) REFERENCES project (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE per_coo
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    cooperator_id INT NOT NULL,
    person_id     INT NOT NULL,
    type          ENUM ('contact','principal')
#     FOREIGN KEY (cooperator_id) REFERENCES cooperator (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT,
#     FOREIGN KEY (person_id) REFERENCES person (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE user
(
    id            INT PRIMARY KEY AUTO_INCREMENT,
    username 			VARCHAR(255) NOT NULL,
    password 			TEXT NOT NULL
);

INSERT INTO user VALUES (NULL,'user','user');
INSERT INTO secretary VALUES (NULL,'陶乾秘书','woman',30,'2020-1-1','normal');
INSERT INTO secretary VALUES (NULL,'高松秘书','woman',40,'2020-1-1','normal');
INSERT INTO research_studio VALUES (NULL,'陶乾工作室','AI',NULL,'2020-1-1','1year',1);
INSERT INTO research_studio VALUES (NULL,'高松工作室','C',NULL,'2020-1-1','1year',2);
INSERT INTO room VALUES (NULL,'B7-111','100.5',1);
INSERT INTO room VALUES (NULL,'B7-112','12.5',1);
INSERT INTO room VALUES (NULL,'B7-113','200.5',2);
INSERT INTO researcher VALUES (NULL,'陶乾','man','副院长',40,'AI',1,NULL);
INSERT INTO researcher VALUES (NULL,'陶乾乾','man','副院长',30,'AI',1,NULL);
INSERT INTO researcher VALUES (NULL,'高松','man','校长',55,'C',2,NULL);