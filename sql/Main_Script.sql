-- CREATE DATABASE If NOT EXISTS brain_beat;

-- USE brain_beat;
-- Enums
CREATE TYPE enum_lesson_syllabus AS ENUM (
	'CBSE',
	'ICSE',
	'STATE_BOARD');

	
CREATE TYPE enum_student_parent_gender AS ENUM (
	'M',
	'F');

CREATE TYPE enum_lesson_syllabus AS ENUM (
	'CBSE',
	'ICSE',
	'STATE_BOARD');

	
CREATE TYPE enum_student_parent_gender AS ENUM (
	'M',
	'F');

-- Role Table
CREATE TABLE IF NOT EXISTS public."role" (
	id serial NOT NULL,
	name varchar(255) NOT NULL,
	description varchar(255) NULL,
	status bool NOT NULL DEFAULT true,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT role_name_key UNIQUE (name),
	CONSTRAINT role_pkey PRIMARY KEY (id)
);

-- Privilege Table
CREATE TABLE IF NOT EXISTS public.privilege (
	id serial NOT NULL,
	code varchar(255) NOT NULL,
	description varchar(255) NULL,
	status bool NOT NULL DEFAULT true,
	"group" varchar(255) NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT privilege_code_key UNIQUE (code),
	CONSTRAINT privilege_pkey PRIMARY KEY (id)
);

-- User/Teacher Table
CREATE TABLE IF NOT EXISTS public.user_teacher (
	id serial NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	gender varchar(255) NOT NULL,
	phone_number varchar(255) NOT NULL,
	email_id varchar(255) NOT NULL,
	date_of_birth date NULL,
	role_id int4 NULL,
	status bool NOT NULL DEFAULT true,
	"password" text NOT NULL,
	last_login_at timestamptz NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT user_teacher_email_id_key UNIQUE (email_id),
	CONSTRAINT user_teacher_phone_number_key UNIQUE (phone_number),
	CONSTRAINT user_teacher_pkey PRIMARY KEY (id)
);

-- user_teacher foreign keys
ALTER TABLE public.user_teacher ADD CONSTRAINT user_teacher_role_id_fkey FOREIGN KEY (role_id) REFERENCES role(id) ON UPDATE CASCADE ON DELETE SET NULL;

-- role_privilege
CREATE TABLE IF NOT EXISTS public.role_privilege (
	role_id int4 NOT NULL,
	privilege_id int4 NOT NULL,
	status bool NOT NULL DEFAULT false,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT role_privilege_pkey PRIMARY KEY (role_id, privilege_id)
);

-- role_privilege foreign keys
ALTER TABLE public.role_privilege ADD CONSTRAINT role_privilege_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.role_privilege ADD CONSTRAINT role_privilege_privilege_id_fkey FOREIGN KEY (privilege_id) REFERENCES privilege(id);
ALTER TABLE public.role_privilege ADD CONSTRAINT role_privilege_role_id_fkey FOREIGN KEY (role_id) REFERENCES role(id);
ALTER TABLE public.role_privilege ADD CONSTRAINT role_privilege_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- Standard
CREATE TABLE IF NOT EXISTS public.standard (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NULL,
	status bool NOT NULL DEFAULT true,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT standard_name_key UNIQUE (name),
	CONSTRAINT standard_pkey PRIMARY KEY (id)
);

-- Standard foreign keys
ALTER TABLE public.standard ADD CONSTRAINT standard_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.standard ADD CONSTRAINT standard_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- Subject
CREATE TABLE IF NOT EXISTS public.subject (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NULL,
	status bool NOT NULL DEFAULT true,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT subject_name_key UNIQUE (name),
	CONSTRAINT subject_pkey PRIMARY KEY (id)
);

-- Subject foreign keys
ALTER TABLE public.subject ADD CONSTRAINT subject_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.subject ADD CONSTRAINT subject_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- Student_parent definition
CREATE TABLE IF NOT EXISTS public.student_parent (
	id serial NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	gender enum_student_parent_gender NOT NULL,
	phone_number varchar(255) NOT NULL,
	email_id varchar(255) NULL,
	date_of_birth date NULL,
	"password" text NOT NULL,
	parent_first_name varchar(255) NOT NULL,
	parent_last_name varchar(255) NOT NULL,
	status bool NOT NULL DEFAULT true,
	standard_id int4 NOT NULL,
	promo_code varchar(255) NULL,
	syllabus varchar(255) NOT NULL,
	address text NULL,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT student_parent_phone_number_key UNIQUE (phone_number),
	CONSTRAINT student_parent_pkey PRIMARY KEY (id)
);


-- student_parent foreign keys
ALTER TABLE public.student_parent ADD CONSTRAINT student_parent_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.student_parent ADD CONSTRAINT student_parent_standard_id_fkey FOREIGN KEY (standard_id) REFERENCES standard(id);
ALTER TABLE public.student_parent ADD CONSTRAINT student_parent_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- Lesson
CREATE TABLE IF NOT EXISTS public.lesson (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description text NULL,
	status bool NOT NULL DEFAULT true,
	standard_id int4 NULL,
	subject_id int4 NULL,
	syllabus enum_lesson_syllabus NOT NULL,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT lesson_pkey PRIMARY KEY (id)
);


-- public.lesson foreign keys
ALTER TABLE public.lesson ADD CONSTRAINT lesson_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.lesson ADD CONSTRAINT lesson_standard_id_fkey FOREIGN KEY (standard_id) REFERENCES standard(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE public.lesson ADD CONSTRAINT lesson_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subject(id) ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE public.lesson ADD CONSTRAINT lesson_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);


-- Lesson_section definition
CREATE TABLE IF NOT EXISTS public.lesson_section (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description text NULL,
	status bool NOT NULL DEFAULT true,
	lesson_id int4 NOT NULL,
	url text NOT NULL,
	tag text NOT NULL,
	"label" text NOT NULL,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT lesson_section_pkey PRIMARY KEY (id)
);


-- public.lesson_section foreign keys
ALTER TABLE public.lesson_section ADD CONSTRAINT lesson_section_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.lesson_section ADD CONSTRAINT lesson_section_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lesson(id);
ALTER TABLE public.lesson_section ADD CONSTRAINT lesson_section_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- Lesson_question definition
CREATE TABLE IF NOT EXISTS public.lesson_question (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NULL,
	status bool NOT NULL DEFAULT true,
	lesson_section_id int4 NOT NULL,
	questions _json NULL,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT lesson_question_pkey PRIMARY KEY (id)
);

-- public.lesson_question foreign keys
ALTER TABLE public.lesson_question ADD CONSTRAINT lesson_question_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.lesson_question ADD CONSTRAINT lesson_question_lesson_section_id_fkey FOREIGN KEY (lesson_section_id) REFERENCES lesson_section(id);
ALTER TABLE public.lesson_question ADD CONSTRAINT lesson_question_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);


-- Insert Data

-- Insert Role Data
INSERT INTO role(id,name,description,status,created_at,updated_at) VALUES (1,'Admin',NULL,'true','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO role(id,name,description,status,created_at,updated_at) VALUES (2,'Teacher',NULL,'true','2021-03-04 11:34:39','2021-03-04 11:34:39');

-- Insert Privilege
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (1,'VDAS','View Dashboard','true','DASHBOARD','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (2,'VSUB','View Subject(s)','true','SUBJECT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (3,'MSUB','Add/Edit Subject','true','SUBJECT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (4,'DSUB','Delete Subject','true','SUBJECT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (5,'VSTA','View Standard(s)','true','STANDARD','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (6,'MSTA','Add/Edit Standard','true','STANDARD','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (7,'DSTA','Delete Standard','true','STANDARD','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (8,'VLES','View Lesson(s)','true','LESSON','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (9,'MLES','Add/Edit Lesson','true','LESSON','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (10,'DLES','Delete Lesson','true','LESSON','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (11,'VSTU','View Student(s)','true','STUDENT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (12,'MSTU','Add/Edit Student','true','STUDENT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (13,'DSTU','Delete Student','true','STUDENT','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (14,'VUST','View User/Teacher(s)','true','USER/TEACHER','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (15,'MUST','Add/Edit User/Teacher','true','USER/TEACHER','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (16,'DUST','Delete User/Teacher','true','USER/TEACHER','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (17,'VROP','View Role & Privilege(s)','true','ROLE & PRIVILEGE','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (18,'MROP','Add/Edit Role & Privilege','true','ROLE & PRIVILEGE','2021-03-04 11:34:39','2021-03-04 11:34:39');

-- Insert User/Teacher
INSERT INTO user_teacher(id,first_name,last_name,gender,phone_number,email_id,date_of_birth,role_id,status,password,last_login_at,created_at,updated_at) VALUES (1,'Admin','A','M',9597035766,'admin@mythikas.com',NULL,1,'true','c15d4484b0e2f74d1a5baf1d48a2a0fdc01b9f8b0c6c11d380d2dbf2c83bd087',NULL,'2021-03-04 11:35:02','2021-03-04 11:35:02');

-- Insert Role_Privilege
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,1,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,2,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,4,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,5,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,6,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,7,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,8,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,9,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,10,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,11,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,12,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,13,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,14,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,15,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,16,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,17,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,18,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,2,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,4,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,5,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,6,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,7,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,8,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,9,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,10,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,11,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,12,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,13,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,15,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,16,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,17,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,18,'false',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,3,'false',1,1,'2021-03-04 11:35:02','2021-03-05 10:31:33');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,3,'true',1,1,'2021-03-04 11:35:02','2021-03-05 10:34:34');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,1,'true',1,1,'2021-03-04 11:35:02','2021-03-05 12:35:45');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (2,14,'true',1,1,'2021-03-04 11:35:02','2021-03-05 12:42:20');



