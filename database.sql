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
    gender      ENUM ('男','女') NOT NULL,
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
    fund             TEXT,
    start_time       TEXT,
    finish_time      TEXT
#     FOREIGN KEY (principal_id) REFERENCES research_studio (id)
#         ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE sub_topic
(
    id           INT PRIMARY KEY AUTO_INCREMENT,
    finish_time  TEXT,
    fund         TEXT,
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
    gender             ENUM ('男','女') NOT NULL,
    title              TEXT,
    age                INT,
    research_direction TEXT,
    studio_id          INT
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
    sub_topic_id  INT NOT NULL,
    join_time     TEXT,
    workload      TEXT,
    fund          TEXT
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
INSERT INTO secretary VALUES (NULL,'郭德纲','男',50,'2020-1-1','基础工作');
INSERT INTO secretary VALUES (NULL,'于谦','男',50,'2020-1-1','基础工作');
INSERT INTO research_studio VALUES (NULL,'数据科学与智能软件','机器学习',1,'2020-1-1','5年',1);
INSERT INTO research_studio VALUES (NULL,'软件构建理论与方法','新型软件体系结构',6,'2020-1-1','5年',2);
INSERT INTO research_studio VALUES (NULL,'大数据系统与云计算','新型云计算平台与云服务',13,'2020-1-1','6年',2);
INSERT INTO room VALUES (NULL,'B7-111','100.5',1);
INSERT INTO room VALUES (NULL,'B7-112','125.5',1);
INSERT INTO room VALUES (NULL,'B7-113','200.5',2);
INSERT INTO room VALUES (NULL,'B7-114','150.5',3);

INSERT INTO researcher VALUES (NULL,'杨晓伟','男','副院长',50,'机器学习',1);
INSERT INTO researcher VALUES (NULL,'黄翰'  ,'男','教授',40,'数据挖掘',1);
INSERT INTO researcher VALUES (NULL,'刘艳霞','女','副教授',40,'数据挖掘',1);
INSERT INTO researcher VALUES (NULL,'吴秋霞','女','副研究员',40,'机器学习',1);
INSERT INTO researcher VALUES (NULL,'程兴国','男','讲师',40,'数据挖掘',1);

INSERT INTO researcher VALUES (NULL,'张平健','男','教授',40,'软件体系结构',2);
INSERT INTO researcher VALUES (NULL,'奚建清','男','教授',40,'软件体系结构',2);
INSERT INTO researcher VALUES (NULL,'汤德佑','男','副教授',40,'群体智能',2);
INSERT INTO researcher VALUES (NULL,'黄敏'  ,'女','副教授',40,'信息处理与服务',2);
INSERT INTO researcher VALUES (NULL,'陈虎'  ,'男','副教授',40,'信息处理与服务',2);
INSERT INTO researcher VALUES (NULL,'林连南','男','讲师',30,'群体智能',2);
INSERT INTO researcher VALUES (NULL,'陈春华','男','讲师',30,'高效能计算',2);

INSERT INTO researcher VALUES (NULL,'李东','男','教授',40,'数据库系统',3);
INSERT INTO researcher VALUES (NULL,'徐杨','男','讲师',40,'分布式系统',3);
INSERT INTO researcher VALUES (NULL,'何月涵','女','助理',40,'扫地',3);

INSERT INTO project VALUES (NULL,13,'云计算平台DCloud','高性能云计算综合协同平台','20万','2018-1-1','2020-1-1');
INSERT INTO project VALUES (NULL,8,'语言识别系统','客户语言自动识别关键技术研究','20万','2017-1-1','2019-1-1');

INSERT INTO sub_topic VALUES (NULL,'2019-1-1','5万','指标1',13,1);
INSERT INTO sub_topic VALUES (NULL,'2019-5-1','15万','指标2',14,1);
INSERT INTO sub_topic VALUES (NULL,'2019-10-1','20万','指标3',8,2);

INSERT INTO join_project VALUES (NULL,13,1,1,'2018-1-1','总负责','5W');
INSERT INTO join_project VALUES (NULL,14,1,2,'2018-1-1','技术指导','15W');
INSERT INTO join_project VALUES (NULL,8,2,1,'2018-1-1','技术指导','15W');

