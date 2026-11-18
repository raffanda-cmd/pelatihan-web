--
-- PostgreSQL database dump
--

\restrict M3e6z4PrWeAjKLlJbU9fvVuX3wE7NANCqh4GcuFSpWKrh4bZiL1ybXJ931qitSe

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-18 20:24:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16476)
-- Name: student_accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_accounts (
    id character varying(255) NOT NULL,
    id_mhs character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.student_accounts OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16444)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id character varying(36) NOT NULL,
    nim character varying(50) NOT NULL,
    nama character varying(100) NOT NULL,
    tanggal_lahir date NOT NULL,
    jurusan character varying(50) CONSTRAINT students_kelas_not_null NOT NULL,
    alamat text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by character varying(255),
    updated_by character varying(255),
    deleted_at timestamp without time zone,
    deleted_by character varying(255),
    updated_at timestamp without time zone
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 4917 (class 0 OID 16476)
-- Dependencies: 220
-- Data for Name: student_accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_accounts (id, id_mhs, email, password, created_at) FROM stdin;
90a14703-98e6-4ccd-86d5-e3665ce0e1d6	f89ddf3b-8da6-49b3-b946-525a0c7ea5fd	jane@example.com	$2b$10$owMmrbbxbbr3sRDJU40uZe4dxWJXoAEyo4aTGiZDTgjyUIXYbBoau	2026-11-14 11:55:51.316927
acf090a7-3264-4285-a8b7-98c42b5e1131	7fecb9db-a0b8-4966-ac44-d5b873cdc49b	pratama@example.com	$2b$10$T5rofSxCX.7lwqXUDpp9ze.pcxboCEeJPFAlFHRlVcEi.t/iExoNW	2026-11-18 17:20:36.615749
\.


--
-- TOC entry 4916 (class 0 OID 16444)
-- Dependencies: 219
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.students (id, nim, nama, tanggal_lahir, jurusan, alamat, created_at, created_by, updated_by, deleted_at, deleted_by, updated_at) FROM stdin;
b0389f2b-ea3b-4397-aba1-5f7db482909a	2026001	Budi Santoso	2005-05-15	TI-1A	Jakarta	2026-11-10 14:00:51.401056	\N	\N	\N	\N	\N
f89ddf3b-8da6-49b3-b946-525a0c7ea5fd	12145678	jane doe	1999-12-31	IF-1	Jl. Merdeka No. 100	2026-11-14 11:55:51.316927	system	\N	\N	\N	2026-11-14 12:13:04.672338
7fecb9db-a0b8-4966-ac44-d5b873cdc49b	1232141	andi pratamax	2026-11-17	ti-2a	bogor	2026-11-18 17:20:36.615749	admin	\N	\N	\N	2026-11-18 17:21:04.98947
\.


--
-- TOC entry 4765 (class 2606 OID 16489)
-- Name: student_accounts student_accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_accounts
    ADD CONSTRAINT student_accounts_email_key UNIQUE (email);


--
-- TOC entry 4767 (class 2606 OID 16487)
-- Name: student_accounts student_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_accounts
    ADD CONSTRAINT student_accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 16460)
-- Name: students students_nim_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_nim_key UNIQUE (nim);


--
-- TOC entry 4763 (class 2606 OID 16458)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 16490)
-- Name: student_accounts fk_student_account; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_accounts
    ADD CONSTRAINT fk_student_account FOREIGN KEY (id_mhs) REFERENCES public.students(id) ON DELETE CASCADE;


-- Completed on 2026-11-18 20:24:54

--
-- PostgreSQL database dump complete
--

\unrestrict M3e6z4PrWeAjKLlJbU9fvVuX3wE7NANCqh4GcuFSpWKrh4bZiL1ybXJ931qitSe

