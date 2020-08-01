--
-- pbgwfgfbhhmssmQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-08-01 04:10:10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 210 (class 1259 OID 16559)
-- Name: admin; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.admin (
    admin_id integer NOT NULL,
    admin_aadhar bigint NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    department character varying(255) NOT NULL,
    admin_city character varying(255) NOT NULL,
    admin_contact integer NOT NULL,
    present_address character varying(255) NOT NULL,
    permanent_address character varying(255) NOT NULL,
    joined_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.admin OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 209 (class 1259 OID 16557)
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 209
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.admin_id;


--
-- TOC entry 211 (class 1259 OID 16582)
-- Name: admin_signin; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.admin_signin (
    email character varying(255) NOT NULL,
    password character(60) NOT NULL,
    admin_id integer NOT NULL
);


ALTER TABLE public.admin_signin OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 206 (class 1259 OID 16495)
-- Name: reports; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.reports (
    report_id integer NOT NULL,
    gov_admin character varying(30) NOT NULL,
    area_of_gov_admin character varying(30) NOT NULL,
    report_city character varying(255) NOT NULL,
    report_details character varying(10000) NOT NULL,
    for_self character(5) DEFAULT true NOT NULL,
    incident_date character varying(50) NOT NULL,
    files character varying(255)[] NOT NULL,
    report_submit_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_email character varying(255) NOT NULL
);


ALTER TABLE public.reports OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 205 (class 1259 OID 16493)
-- Name: reports_report_id_seq; Type: SEQUENCE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE SEQUENCE public.reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_report_id_seq OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 205
-- Name: reports_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER SEQUENCE public.reports_report_id_seq OWNED BY public.reports.report_id;


--
-- TOC entry 202 (class 1259 OID 16413)
-- Name: signin; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.signin (
    user_email character varying(255) NOT NULL,
    user_password character(60) NOT NULL
);


ALTER TABLE public.signin OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 208 (class 1259 OID 16536)
-- Name: status; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.status (
    status_id integer NOT NULL,
    status character varying(100) NOT NULL,
    status_feedback character varying(10000),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    report_id integer NOT NULL,
    admin_id integer NOT NULL
);


ALTER TABLE public.status OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 207 (class 1259 OID 16534)
-- Name: status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE SEQUENCE public.status_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_status_id_seq OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 207
-- Name: status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER SEQUENCE public.status_status_id_seq OWNED BY public.status.status_id;


--
-- TOC entry 204 (class 1259 OID 16420)
-- Name: users; Type: TABLE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(100) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_aadhar bigint NOT NULL,
    user_contact integer NOT NULL,
    user_joined_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    reports integer[]
);


ALTER TABLE public.users OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 203 (class 1259 OID 16418)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: pbgwfgfbhhmssm
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO pbgwfgfbhhmssm;

--
-- TOC entry 2902 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2724 (class 2604 OID 16562)
-- Name: admin admin_id; Type: DEFAULT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- TOC entry 2719 (class 2604 OID 16498)
-- Name: reports report_id; Type: DEFAULT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.reports ALTER COLUMN report_id SET DEFAULT nextval('public.reports_report_id_seq'::regclass);


--
-- TOC entry 2722 (class 2604 OID 16539)
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.status ALTER COLUMN status_id SET DEFAULT nextval('public.status_status_id_seq'::regclass);


--
-- TOC entry 2717 (class 2604 OID 16423)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2892 (class 0 OID 16559)
-- Dependencies: 210
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.admin (admin_id, admin_aadhar, name, email, department, admin_city, admin_contact, present_address, permanent_address, joined_on) FROM stdin;
15	111111111112	fwwfwf fwewefewfe	efef@fddf.yttr	wrwrrw	wrrwrrt	1111111112	present_address	rerrttrrert	2020-07-30 06:05:53.92907
16	114455223698	erege rgrre	mal@mal.mal	heduhedhe	eddeww	1234567896	dewedwed	edwdwedwedwd	2020-07-30 14:28:13.901153
18	111111111113	fwwfwf fwewefewfe	mal@mal1.mal	wrwrrw	wrrwrrt	1111111113	present_address	rerrttrrert	2020-07-31 12:12:06.286838
\.


--
-- TOC entry 2893 (class 0 OID 16582)
-- Dependencies: 211
-- Data for Name: admin_signin; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.admin_signin (email, password, admin_id) FROM stdin;
efef@fddf.yttr	$2b$10$.XkVQkmidRdIevDolIhuKeUQwUpRiIZHv6ifvs5A.tGVCQnlOOlGC	15
mal@mal.mal	$2b$10$tCF1Jy9WApuUius/AG6Y4u7cJZwBLXoQq0coT0j/SWEfkIrZ37Lha	16
mal@mal1.mal	$2b$10$NdQrUGcIC4rOpL6DuT5cTuAnPoPR7KJoz3EZ2V2Gs7NflUCRGv4mi	18
\.


--
-- TOC entry 2888 (class 0 OID 16495)
-- Dependencies: 206
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.reports (report_id, gov_admin, area_of_gov_admin, report_city, report_details, for_self, incident_date, files, report_submit_on, user_email) FROM stdin;
2	Airport	Airlines and Baggage	Ahmedabad	hrhrrh	self 	Mon Feb 10 2020 00:00:00 GMT+0530 (IST)	{UploadsVideos1595839349069_mal@mal.mal_BirdNoSound.mp480023.webm,UploadsTexts1595839349439_mal@mal.mal_sample.txt,"UploadsApplications1595839349440_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-27 14:12:29.473625	mal@mal.mal
3	Banking	Rules and Regulations	Amalapuram	hrhrrhdasasd	self 	Mon Feb 10 2020 00:00:00 GMT+0530 (IST)	{UploadsVideos1595839376843_mal@mal.mal_BirdNoSound.mp480023.webm,UploadsTexts1595839377255_mal@mal.mal_sample.txt,"UploadsApplications1595839377256_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-27 14:12:57.275438	mal@mal.mal
4	Commercial-Tax-Sales-Tax-VAT	Service Tax	New Delhi	fjfjjffjfjfjfjhfhjffhfyyjfyfj	other	Wed Feb 12 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595840828015_mal@mal1.mal_images.jpeg,UploadsImages1595840828016_mal@mal1.mal_photo-1533387520709-752d83de3630.jpeg,UploadsImages1595840828016_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 14:37:08.501551	mal@mal1.mal
5	Commercial-Tax-Sales-Tax-VAT	Service Tax	New Delhi	fjfjjffjfjfjfjhfhjffhfyyjfyfj	other	Wed Feb 12 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595841322979_mal@mal1.mal_images.jpeg,UploadsImages1595841322981_mal@mal1.mal_photo-1533387520709-752d83de3630.jpeg,UploadsImages1595841322981_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 14:45:23.309465	mal@mal1.mal
6	Banking	Exchanges and Deposits of Cash	Abohar	alallla	self 	Mon Feb 03 2020 00:00:00 GMT+0530 (IST)	{UploadsTexts1595842412749_mal@mal1.mal_sample.txt}	2020-07-27 15:03:32.843321	mal@mal1.mal
7	Airport	Airlines and Baggage	Amalapuram	malamalamlamalmalmalmalmalalamlamalmmalmalmlmalamlamlam	self 	Wed Feb 05 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1595843206991_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 15:16:47.224792	mal@mal1.mal
8	Banking	Exchanges and Deposits of Cash	Ahmadnagar	ulalalal	self 	Tue Feb 11 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595843784741_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 15:26:24.812997	mal@mal1.mal
9	Airport	Airlines and Baggage	Ahmadnagar	jjjj	self 	Wed Feb 05 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595843990224_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 15:29:50.241095	mal@mal1.mal
10	Airport	Airlines and Baggage	Amalapuram	malamalmal	self 	Mon Feb 03 2020 00:00:00 GMT+0530 (IST)	{UploadsTexts1595845190027_mal@mal1.mal_sample.txt}	2020-07-27 15:49:50.066148	mal@mal1.mal
11	Airport	Airlines and Baggage	Ahmadnagar	malal	self 	Mon Feb 10 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1595846465813_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 16:11:06.214962	mal@mal1.mal
12	Airport	Airlines and Baggage	Ahmadnagar	iubliulviuvliuv	self 	Mon Feb 10 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1595846516531_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 16:11:56.573643	mal@mal1.mal
13	Airport	Airlines and Baggage	Gumla	osobe	self 	Sun Feb 02 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595846556339_mal@mal1.mal_photo-1533387520709-752d83de3630.jpeg}	2020-07-27 16:12:36.495052	mal@mal1.mal
14	Airport	Airlines and Baggage	Adilabad	vyoyvuyvuvyovy	self 	Mon Feb 03 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595846833427_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 16:17:13.537149	mal@mal1.mal
15	Airport	Airlines and Baggage	Adilabad	vyoyvuyvuvyovy	self 	Mon Feb 03 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595846929923_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg}	2020-07-27 16:18:49.976839	mal@mal1.mal
16	Airport	Airlines and Baggage	Ahmadnagar	malmla	self 	Mon Jul 27 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1595854676485_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 18:28:07.902181	mal@mal1.mal
17	Airport	Airlines and Baggage	Jamshedpur	mlamalmamlalmma	self 	Mon Jul 27 2020 00:00:00 GMT+0530 (IST)	{UploadsTexts1595856360725_mal@mal1.mal_sample.txt}	2020-07-27 18:56:01.316776	mal@mal1.mal
18	Airport	Airlines and Baggage	Adityapur	gchgcjfcjfcycgjfchyyrrxyrxtrxtrxrrt	self 	Mon Jul 27 2020 00:00:00 GMT+0530 (IST)	{UploadsVideos1595861913447_mal@mal1.mal_BirdNoSound.mp480023.webm,UploadsTexts1595861914992_mal@mal1.mal_sample.txt,"UploadsApplications1595861915010_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 20:28:35.551314	mal@mal1.mal
19	Airport	Customs	Lalganj	lallallalalal	self 	Mon Jul 27 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1595862588360_mal@mal1.mal_6c4907cd2f9539cc2d0660ddef792769.jpg,UploadsVideos1595862588375_mal@mal1.mal_BirdNoSound.mp480023.webm,UploadsTexts1595862589009_mal@mal1.mal_sample.txt}	2020-07-27 20:39:49.19767	mal@mal1.mal
20	Airport	Airlines and Baggage	Amalapuram	uyyviv	self 	Mon Jul 27 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1595865671336_mal@mal1.mal_A_Sample PDF.pdf"}	2020-07-27 21:31:14.038883	mal@mal1.mal
21	Airport	Airlines and Baggage	Abhayapuri	malmldosodsd	self 	Tue Jul 28 2020 00:00:00 GMT+0530 (IST)	{UploadsVideos1595937188382_undefined_BirdNoSound.mp480023.webm,UploadsTexts1595937188614_undefined_sample.txt,"UploadsApplications1595937188615_undefined_A_Sample PDF.pdf"}	2020-07-28 17:23:08.672219	mal@mal.mal
22	Airport	Customs	Ambedkar Nagar	mlmmlmlmlmlamalmalmalmalamlamlamlamalmalmalmalamlamlamalmalmalamlamlamlamlamalmmalmalmalamlammlamlamlamalmmalmalmalmalmalmalmalmalmalmalmalm	self 	Tue Jul 07 2020 00:00:00 GMT+0530 (IST)	{UploadsImages1596121605685_undefined_photo-1533387520709-752d83de3630.jpeg,UploadsVideos1596121605823_undefined_BirdNoSound.mp480023.webm,UploadsTexts1596121606280_undefined_sample.txt}	2020-07-30 20:36:47.947404	mal@mal.mal
23	Airport	Airlines and Baggage	Ahmadnagar	maopoytt	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"UploadsApplications1596182982026_undefined_A_Sample PDF.pdf"}	2020-07-31 13:39:43.065686	mal@mal.mal
24	Airport	Airlines and Baggage	Amalapuram	lala	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications1596183639367_undefined_A_Sample PDF.pdf"}	2020-07-31 13:50:39.430627	mal@mal.mal
25	Airport	Airlines and Baggage	Ahmadnagar	mal	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications\\\\1596187956767_undefined_A_Sample PDF.pdf"}	2020-07-31 15:02:38.111909	mal@mal.mal
26	Airport	Airlines and Baggage	Amalapuram	kkkkkkkkk	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Videos\\\\1596193451102_undefined_BirdNoSound.mp480023.webm","Uploads\\\\Texts\\\\1596193451286_undefined_sample.txt","Uploads\\\\Applications\\\\1596193451286_undefined_A_Sample PDF.pdf"}	2020-07-31 16:34:11.590917	mal@mal.mal
27	Airport	Airlines and Baggage	Ahmadnagar	ugtfityy	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Texts\\\\1596209187616_mal@mal.mal_sample.txt"}	2020-07-31 20:56:28.070258	mal@mal.mal
28	Airport	Airlines and Baggage	Amalapuram	klklklklklklklklklklklklklkkl	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Videos\\\\1596210505770_mal@mal.mal_BirdNoSound.mp480023.webm","Uploads\\\\Texts\\\\1596210506224_mal@mal.mal_sample.txt","Uploads\\\\Applications\\\\1596210506224_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-31 21:18:26.620968	mal@mal.mal
29	Airport	Airlines and Baggage	Amalapuram	mal	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications\\\\1596217397413_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-31 23:13:17.82002	mal@mal.mal
30	Airport	Airlines and Baggage	Amalapuram	mal	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications\\\\1596217508079_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-31 23:15:08.095858	mal@mal.mal
31	Airport	Customs	Akola	fjjyryrjyjyjyj	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Videos\\\\1596217648265_mal@mal.mal_BirdNoSound.mp480023.webm"}	2020-07-31 23:17:28.863028	mal@mal.mal
32	Airport	Airlines and Baggage	Ajmer	ruruururururu	self 	Fri Jul 31 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Videos\\\\1596218395753_mal@mal.mal_BirdNoSound.mp480023.webm","Uploads\\\\Texts\\\\1596218395917_mal@mal.mal_sample.txt","Uploads\\\\Applications\\\\1596218395918_mal@mal.mal_A_Sample PDF.pdf"}	2020-07-31 23:29:56.045233	mal@mal.mal
33	Airport	Airlines and Baggage	Abhayapuri	yuyuyuytiytititi	self 	Sat Aug 01 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications\\\\1596222526443_mal@mal.mal_A_Sample PDF.pdf"}	2020-08-01 00:38:47.614413	mal@mal.mal
34	Airport	Airlines and Baggage	Baranui	hjuy	self 	Sat Aug 01 2020 00:00:00 GMT+0530 (IST)	{"Uploads\\\\Applications\\\\1596222635145_mal@mal.mal_A_Sample PDF.pdf"}	2020-08-01 00:40:35.204249	mal@mal.mal
\.


--
-- TOC entry 2884 (class 0 OID 16413)
-- Dependencies: 202
-- Data for Name: signin; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.signin (user_email, user_password) FROM stdin;
mal@mal.mal	$2b$10$xo/.hRjEU54omxxjSTlG3./JTp7NH5rmNL4Rpz.g6ADjLyh4C/FEG
mal@mal1.mal	$2b$10$SbjANntTaycIwbMhfv02Ke342mBEgwWtfQfHT8enX5D9Ysn.nwseq
\.


--
-- TOC entry 2890 (class 0 OID 16536)
-- Dependencies: 208
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.status (status_id, status, status_feedback, created_at, user_id, report_id, admin_id) FROM stdin;
6	Under Process	malamamg1213113ghghhg	2020-07-30 14:58:07.695	18	20	16
8	Under Process	malamamg1213113ghghhg	2020-07-30 15:02:02.165713	18	21	16
9	closed	closed	2020-07-30 15:05:24.386	18	18	16
12	Closed	chal	2020-07-31 17:35:17.595	17	26	18
\.


--
-- TOC entry 2886 (class 0 OID 16420)
-- Dependencies: 204
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: pbgwfgfbhhmssm
--

COPY public.users (user_id, user_name, user_email, user_aadhar, user_contact, user_joined_on, reports) FROM stdin;
17	pool danger mal	mal@mal.mal	123112141124	1234511191	2020-07-26 13:13:48.433631	{1,2,3,4,21,22,23,24,25,26,27,28,29,30,31,32,33,34}
18	pool danger mal	mal@mal1.mal	123112741124	1234571191	2020-07-27 14:32:06.095867	{4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20}
\.


--
-- TOC entry 2903 (class 0 OID 0)
-- Dependencies: 209
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pbgwfgfbhhmssm
--

SELECT pg_catalog.setval('public.admin_id_seq', 18, true);


--
-- TOC entry 2904 (class 0 OID 0)
-- Dependencies: 205
-- Name: reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pbgwfgfbhhmssm
--

SELECT pg_catalog.setval('public.reports_report_id_seq', 34, true);


--
-- TOC entry 2905 (class 0 OID 0)
-- Dependencies: 207
-- Name: status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pbgwfgfbhhmssm
--

SELECT pg_catalog.setval('public.status_status_id_seq', 12, true);


--
-- TOC entry 2906 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pbgwfgfbhhmssm
--

SELECT pg_catalog.setval('public.users_user_id_seq', 18, true);


--
-- TOC entry 2743 (class 2606 OID 16570)
-- Name: admin admin_aadhar_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_aadhar_key UNIQUE (admin_aadhar);


--
-- TOC entry 2745 (class 2606 OID 16574)
-- Name: admin admin_contact_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_contact_key UNIQUE (admin_contact);


--
-- TOC entry 2747 (class 2606 OID 16572)
-- Name: admin admin_email_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_email_key UNIQUE (email);


--
-- TOC entry 2749 (class 2606 OID 16568)
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 2751 (class 2606 OID 16586)
-- Name: admin_signin admin_signin_email_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin_signin
    ADD CONSTRAINT admin_signin_email_key UNIQUE (email);


--
-- TOC entry 2753 (class 2606 OID 16595)
-- Name: admin_signin admin_signin_pkey; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.admin_signin
    ADD CONSTRAINT admin_signin_pkey PRIMARY KEY (admin_id);


--
-- TOC entry 2737 (class 2606 OID 16509)
-- Name: reports reports_files_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_files_key UNIQUE (files);


--
-- TOC entry 2739 (class 2606 OID 16505)
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (report_id);


--
-- TOC entry 2727 (class 2606 OID 16417)
-- Name: signin signin_user_email_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.signin
    ADD CONSTRAINT signin_user_email_key UNIQUE (user_email);


--
-- TOC entry 2741 (class 2606 OID 16546)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status_id);


--
-- TOC entry 2729 (class 2606 OID 16426)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2731 (class 2606 OID 16430)
-- Name: users users_user_aadhar_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_aadhar_key UNIQUE (user_aadhar);


--
-- TOC entry 2733 (class 2606 OID 16432)
-- Name: users users_user_contact_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_contact_key UNIQUE (user_contact);


--
-- TOC entry 2735 (class 2606 OID 16428)
-- Name: users users_user_email_key; Type: CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_email_key UNIQUE (user_email);


--
-- TOC entry 2754 (class 2606 OID 16587)
-- Name: reports reports_user_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(user_email);


--
-- TOC entry 2757 (class 2606 OID 16577)
-- Name: status status_admin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin(admin_id);


--
-- TOC entry 2756 (class 2606 OID 16552)
-- Name: status status_report_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.reports(report_id);


--
-- TOC entry 2755 (class 2606 OID 16547)
-- Name: status status_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pbgwfgfbhhmssm
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2020-08-01 04:10:10

--
-- pbgwfgfbhhmssmQL database dump complete
--
