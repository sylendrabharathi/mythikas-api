ALTER TABLE public.student_parent ADD is_approved bool NULL DEFAULT false;

UPDATE public.student_parent SET is_approved = false;

ALTER TABLE public.student_parent ALTER COLUMN is_approved SET NOT NULL;

CREATE TABLE IF NOT EXISTS "section_test" (
    "student_id" INTEGER NOT NULL  REFERENCES "student_parent" ("id"),
    "lesson_id" INTEGER NOT NULL  REFERENCES "lesson" ("id"),
    "lesson_section_id" INTEGER NOT NULL  REFERENCES "lesson_section" ("id"),
    "date" TIMESTAMP WITH TIME ZONE NOT NULL, "question_answers" JSON[],
    "total_marks" INTEGER NOT NULL DEFAULT 0,
    "student_marks" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("student_id","lesson_id","lesson_section_id")
);