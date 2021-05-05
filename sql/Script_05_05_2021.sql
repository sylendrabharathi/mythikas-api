ALTER TABLE public.student_parent ADD is_approved bool NULL DEFAULT false;

UPDATE public.student_parent SET is_approved = false;

ALTER TABLE public.student_parent ALTER COLUMN is_approved SET NOT NULL;
