ALTER TABLE public.student_parent ADD is_approved bool NULL DEFAULT false;

UPDATE public.student_parent SET is_approved = false;

ALTER TABLE public.student_parent ALTER COLUMN is_approved SET NOT NULL;

CREATE TABLE IF NOT EXISTS "section_test" (
    "student_id" INTEGER NOT NULL  REFERENCES "student_parent" ("id"),
    "lesson_id" INTEGER NOT NULL  REFERENCES "lesson" ("id"),
    "lesson_section_id" INTEGER NOT NULL  REFERENCES "lesson_section" ("id"),
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "question_answers" JSON[],
    "total_marks" INTEGER NOT NULL DEFAULT 0,
    "student_marks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("student_id","lesson_id","lesson_section_id")
);

CREATE TABLE IF NOT EXISTS "assessment_test" (
    "student_id" INTEGER NOT NULL  REFERENCES "student_parent" ("id"),
    "lesson_assessment_id" INTEGER NOT NULL  REFERENCES "lesson_assessment" ("id"),
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "question_answers" JSON[],
    "total_marks" INTEGER NOT NULL DEFAULT 0,
    "student_marks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("student_id","lesson_assessment_id")
);

CREATE TYPE enum_student_parent_registration_type AS ENUM('ADMIN', 'SELF');

ALTER TABLE public.student_parent ADD registration_type enum_student_parent_registration_type NOT NULL DEFAULT 'ADMIN';

ALTER TABLE public.lesson_section ALTER COLUMN tag DROP NOT NULL;

INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (19,'VS3F','View S3 Files','true','S3 Files','2021-03-04 11:34:39','2021-03-04 11:34:39');
INSERT INTO privilege(id,code,description,status,"group",created_at,updated_at) VALUES (20,'ES3F','Add/Edit S3 Files','true','S3 Files','2021-03-04 11:34:39','2021-03-04 11:34:39');

INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,19,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
INSERT INTO role_privilege(role_id,privilege_id,status,created_by,updated_by,created_at,updated_at) VALUES (1,20,'true',1,1,'2021-03-04 11:35:02','2021-03-04 11:35:02');
