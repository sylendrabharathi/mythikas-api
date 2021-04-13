ALTER TABLE public.lesson ADD tag text NULL;

-- enum_lesson_assessment_assessment_type;

CREATE TYPE enum_lesson_assessment_assessment_type AS ENUM (
	'post',
	'pre');

-- public.lesson_assessment definition

CREATE TABLE public.lesson_assessment (
	id serial NOT NULL,
	"name" varchar(255) NOT NULL,
	description varchar(255) NULL,
	assessment_type enum_lesson_assessment_assessment_type NOT NULL,
	status bool NOT NULL DEFAULT true,
	lesson_id int4 NOT NULL,
	questions _json NULL,
	created_by int4 NOT NULL,
	updated_by int4 NOT NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT lesson_assessment_pkey PRIMARY KEY (id)
);


-- public.lesson_assessment foreign keys

ALTER TABLE public.lesson_assessment ADD CONSTRAINT lesson_assessment_created_by_fkey FOREIGN KEY (created_by) REFERENCES user_teacher(id);
ALTER TABLE public.lesson_assessment ADD CONSTRAINT lesson_assessment_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lesson(id);
ALTER TABLE public.lesson_assessment ADD CONSTRAINT lesson_assessment_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES user_teacher(id);

-- enum_lesson_watching_status;
CREATE TYPE enum_lesson_watching_status AS ENUM (
	'IN-PROGRESS',
	'DONE');

-- public.lesson_watching definition


CREATE TABLE public.lesson_watching (
	student_id int4 NOT NULL,
	lesson_id int4 NOT NULL,
	section_id int4 NOT NULL,
	status enum_lesson_watching_status NOT NULL DEFAULT 'IN-PROGRESS'::enum_lesson_watching_status,
	started_on timestamptz NOT NULL,
	last_watched_on timestamptz NOT NULL,
	watched_seconds int4 NULL,
	created_at timestamptz NOT NULL,
	updated_at timestamptz NOT NULL,
	CONSTRAINT lesson_watching_pkey PRIMARY KEY (student_id, lesson_id, section_id)
);


-- public.lesson_watching foreign keys

ALTER TABLE public.lesson_watching ADD CONSTRAINT lesson_watching_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lesson(id);
ALTER TABLE public.lesson_watching ADD CONSTRAINT lesson_watching_section_id_fkey FOREIGN KEY (section_id) REFERENCES lesson_section(id);
ALTER TABLE public.lesson_watching ADD CONSTRAINT lesson_watching_student_id_fkey FOREIGN KEY (student_id) REFERENCES student_parent(id);    

