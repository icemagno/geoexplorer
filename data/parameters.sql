--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2016-09-12 13:30:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- TOC entry 2204 (class 0 OID 544944)
-- Dependencies: 234
-- Data for Name: spectral_parameters; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO spectral_parameters (index_id, id_experiment, id_activity, id_instance, adjacency, laplacian, slaplacian, optifunc, caixa1, gorder, mindegree, maxdegree, trianglefree, allowdiscgraphs, biptonly, maxresults, adjacencyb, laplacianb, slaplacianb, chromatic, chromaticb, click, clickb, largestdegree, numedges) VALUES (560, 354, 4275, 1476170, 'on', 'off', 'off', '\lambda_2+\chi', 'min', '9', '1', '7', 'off', 'off', 'off', '2', 'off', 'off', 'off', 'off', 'off', 'off', 'off', 'off', 'off');
INSERT INTO spectral_parameters (index_id, id_experiment, id_activity, id_instance, adjacency, laplacian, slaplacian, optifunc, caixa1, gorder, mindegree, maxdegree, trianglefree, allowdiscgraphs, biptonly, maxresults, adjacencyb, laplacianb, slaplacianb, chromatic, chromaticb, click, clickb, largestdegree, numedges) VALUES (559, 354, 4275, 1476170, 'on', 'off', 'off', '\lambda_2+\chi', 'min', '8', '1', '7', 'off', 'on', 'off', '2', 'off', 'off', 'off', 'off', 'off', 'off', 'off', 'off', 'off');
INSERT INTO spectral_parameters (index_id, id_experiment, id_activity, id_instance, adjacency, laplacian, slaplacian, optifunc, caixa1, gorder, mindegree, maxdegree, trianglefree, allowdiscgraphs, biptonly, maxresults, adjacencyb, laplacianb, slaplacianb, chromatic, chromaticb, click, clickb, largestdegree, numedges) VALUES (561, 355, 4291, 1476174, 'on', 'off', 'off', '\lambda_2+\chi', 'min', '8', '1', '7', 'off', 'on', 'off', '2', 'off', 'off', 'off', 'on', 'off', 'off', 'off', 'off', 'off');
INSERT INTO spectral_parameters (index_id, id_experiment, id_activity, id_instance, adjacency, laplacian, slaplacian, optifunc, caixa1, gorder, mindegree, maxdegree, trianglefree, allowdiscgraphs, biptonly, maxresults, adjacencyb, laplacianb, slaplacianb, chromatic, chromaticb, click, clickb, largestdegree, numedges) VALUES (562, 355, 4291, 1476174, 'on', 'off', 'off', '\lambda_2+\chi', 'min', '9', '1', '7', 'off', 'on', 'off', '2', 'off', 'off', 'off', 'on', 'off', 'off', 'off', 'off', 'off');


--
-- TOC entry 2210 (class 0 OID 0)
-- Dependencies: 235
-- Name: spectral_parameters_index_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('spectral_parameters_index_id_seq', 562, true);


-- Completed on 2016-09-12 13:30:57

--
-- PostgreSQL database dump complete
--

