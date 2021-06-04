ALTER TABLE public.student_parent DROP CONSTRAINT student_parent_phone_number_key;

ALTER TABLE public.student_parent ADD CONSTRAINT student_fname_lname_phone_number_unique UNIQUE (first_name, last_name, phone_number);