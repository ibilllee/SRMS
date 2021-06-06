DROP
    DATABASE srms;
CREATE
    DATABASE IF NOT EXISTS srms DEFAULT CHARSET utf8mb4;

USE
    srms;

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
    id          INT PRIMARY KEY,
    NAME        TEXT                 NOT NULL,
    gender      ENUM ('man','woman') NOT NULL,
    age         INT,
    employ_time DATE,
    duty        TEXT
);

CREATE TABLE research_studio
(
    id                 INT PRIMARY KEY,
    NAME               TEXT NOT NULL,
    research_direction TEXT NOT NULL,
    principal_id       INT,
    p_start_time       DATE,
    p_term             DATE,
    secretary_id       INT,

    FOREIGN KEY (secretary_id) REFERENCES secretary (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE room
(
    id        INT PRIMARY KEY,
    address   TEXT NOT NULL,
    acreage   FLOAT,
    studio_id INT,
    FOREIGN KEY (studio_id) REFERENCES research_studio (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE project
(
    id               INT PRIMARY KEY,
    principal_id     INT,
    NAME             TEXT NOT NULL,
    research_content TEXT,
    fund             DOUBLE,
    start_time       DATE,
    finish_time      DATE,
    FOREIGN KEY (principal_id) REFERENCES research_studio (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE sub_topic
(
    id           INT PRIMARY KEY,
    finish_time  DATE,
    fund         DOUBLE,
    tech_index   TEXT,
    principal_id INT,
    project_id   INT,
    FOREIGN KEY (principal_id) REFERENCES research_studio (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (project_id) REFERENCES project (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE researcher
(
    id                 INT PRIMARY KEY,
    NAME               TEXT                 NOT NULL,
    gender             ENUM ('man','woman') NOT NULL,
    title              TEXT,
    age                INT,
    research_direction TEXT,
    studio_id          INT,
    sub_topic_id       INT,
    FOREIGN KEY (studio_id) REFERENCES research_studio (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (sub_topic_id) REFERENCES sub_topic (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE achievement
(
    id          INT PRIMARY KEY,
    NAME        TEXT NOT NULL,
    TIME        DATE,
    rankId      INT,
    TYPE        ENUM ('patent','paper','software_copyright'),
    patent_type ENUM ('invention','utility_model','exterior'),
    project_id  INT,
    FOREIGN KEY (project_id) REFERENCES project (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE cooperator
(
    id      INT PRIMARY KEY,
    NAME    TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE person
(
    id           INT PRIMARY KEY,
    mail         TEXT NOT NULL,
    office_phone TEXT NOT NULL,
    mobile_phone TEXT NOT NULL
);

CREATE TABLE contribute_to
(
    id             INT PRIMARY KEY,
    researcher_id  INT NOT NULL,
    achievement_id INT NOT NULL,
    FOREIGN KEY (researcher_id) REFERENCES researcher (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (achievement_id) REFERENCES achievement (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE join_project
(
    id            INT PRIMARY KEY,
    researcher_id INT NOT NULL,
    project_id    INT NOT NULL,
    join_time     DATE,
    workload      TEXT,
    fund          DOUBLE,
    FOREIGN KEY (researcher_id) REFERENCES researcher (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (project_id) REFERENCES project (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE with_other
(
    id            INT PRIMARY KEY,
    cooperator_id INT NOT NULL,
    project_id    INT NOT NULL,
    TYPE          ENUM ('commission','cooperation','supervision'),
    FOREIGN KEY (cooperator_id) REFERENCES cooperator (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (project_id) REFERENCES project (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE per_coo
(
    id            INT PRIMARY KEY,
    cooperator_id INT NOT NULL,
    person_id     INT NOT NULL,
    TYPE          ENUM ('contact','principal'),
    FOREIGN KEY (cooperator_id) REFERENCES cooperator (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (person_id) REFERENCES person (id)
        ON DELETE RESTRICT ON UPDATE RESTRICT
);