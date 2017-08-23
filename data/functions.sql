/* 
  FUNÇÃO PARA DESCOBRIR QUAIS RUAS ESTÃO MAIS PERTO DE UM PONTO 
*/
CREATE OR REPLACE FUNCTION public.nearest_way(
    IN coords character varying,
    IN quant integer,
    IN srid integer)
  RETURNS TABLE(id integer, osm_id bigint, source integer, target integer, osm_name character varying, x1 double precision, y1 double precision, x2 double precision, y2 double precision, geom_way geometry) AS
$BODY$
	SELECT id, osm_id, source, target, osm_name, x1, y1, x2, y2, geom_way FROM osm_2po_4pgr ORDER BY geom_way <-> ST_GeometryFromText('POINT(' || $1 ||  ')',$3) LIMIT $2
$BODY$
  LANGUAGE sql STABLE
  
/* 
  FUNÇÃO DE AGREGAÇÃO PARA O CALCULO DE ROTAS (RUAS SEM REPETIÇÃO) 
*/
  
CREATE OR REPLACE FUNCTION public.route_agg(
    IN source integer,
    IN target integer,
    IN k integer,
    IN directed boolean)
  RETURNS TABLE(geom geometry, way_name text, km double precision, seq integer, direction double precision) AS
$BODY$
DECLARE 
	var_r record;
	tmp_name text;
	tmp_geom geometry;
	last_geom geometry;
	is_first boolean;
	counter integer;
BEGIN
	tmp_name := '*************';
	is_first := true; 
	counter := 0;
	FOR var_r IN ( select * from calc_rotas_v3($1, $2, $3, $4) as r INNER JOIN osm_2po_4pgr as g ON r.edge = g.id order by seq) LOOP

		if ( var_r.osm_name is null ) then 
			var_r.osm_name := '(Sem Nome)';
		end if;

		if ( not is_first ) then
			if ( tmp_name <> var_r.osm_name  ) then
				geom := tmp_geom;
				way_name := tmp_name;
				km := ST_Length(tmp_geom::geography)/1000 ;
				km := round( km::numeric,2 );
	
				tmp_name := var_r.osm_name;
				tmp_geom := var_r.geom_way;	
				
				seq := counter;
				counter := counter + 1;		
				RETURN NEXT;
			else
				tmp_geom := ST_Union(tmp_geom, var_r.geom_way);
			end if;
		else
			tmp_name := var_r.osm_name;
			tmp_geom := var_r.geom_way;
			is_first := false;
		end if;

		last_geom := var_r.geom_way;

	END LOOP;
	
	geom := tmp_geom;
	way_name = tmp_name;
	km = ST_Length(tmp_geom::geography)/1000;
	km := round( km::numeric,2 );
	seq = counter;
	RETURN NEXT;
		
	
END; $BODY$
  LANGUAGE plpgsql VOLATILE


/* 
  FUNÇÃO DE CALCULO DE ROTAS 
*/	
CREATE OR REPLACE FUNCTION public.calc_rotas_v3(
    IN source integer,
    IN target integer,
    IN k integer,
    IN directed boolean)
  RETURNS TABLE(seq integer, path_id integer, path_seq integer, node bigint, edge bigint, cost double precision, agg_cost double precision) AS
$BODY$
SELECT 
    *
FROM 
    pgr_ksp(
     'SELECT id, source, target, cost, reverse_cost FROM osm_2po_4pgr as r, 
             (SELECT st_buffer(st_envelope(st_collect(geom_way)), 0.5) as box FROM osm_2po_4pgr as l1 
            WHERE l1.source = ' || $1 || ' OR l1.target = ' || $2 || ') as box
            WHERE r.geom_way && box.box',$1, $2, $3, directed:=$4
    )  
 $BODY$
  LANGUAGE sql STABLE



/*
	FUNÇÃO QUE RETORNA O ESTADO ONDE ESTÁ UM PONTO
*/

CREATE OR REPLACE FUNCTION public.qualestado(oque geometry)
  RETURNS character varying AS
$BODY$

select 
	pl.name from planet_osm_polygon pl
where	
	ST_Within( $1, pl.way ) 
and
	pl.admin_level = '4'  -- Pais = 2 // Cidade = 8

$BODY$
  LANGUAGE sql STABLE STRICT


/*
	FUNÇÃO QUE RETORNA A CIDADE ONDE ESTÁ UM PONTO
*/


CREATE OR REPLACE FUNCTION public.qualcidade(oque geometry)
  RETURNS character varying AS
$BODY$

select 
	pl.name from planet_osm_polygon pl
where	
	ST_Within( $1, pl.way ) 
and
	pl.admin_level = '8'  -- Pais = 2 // Estado = 4

$BODY$
  LANGUAGE sql STABLE STRICT
 
/*
	FUNÇÃO DE GEOCODING DADO UMA COORDENADA
*/
 
 
CREATE OR REPLACE FUNCTION public.geocode_point(
    IN coords character varying,
    IN srid integer)
  RETURNS TABLE(admin_level character varying, name character varying, place character varying, ref character varying, tags hstore, type character varying) AS
$BODY$


select admin_level, "name", place, "ref", tags, "type" from (
SELECT admin_level, "name", place, "ref", tags, 'ADM'::text as "type"  
FROM planet_osm_polygon pl
WHERE ST_Within( ST_Transform(ST_GeometryFromText('POINT(' || $1 ||  ')',$2), 4326), pl.way ) 
) as t1
union 
select admin_level, "name", place, "ref", tags, 'RUA'::text as "type" from (
select '99999'::text as admin_level, ll."name", ll.place, ll."ref", ll.tags from planet_osm_line ll 
ORDER BY ll.way <-> ST_Transform(ST_GeometryFromText('POINT(' || $1 ||  ')',$2), 4326) LIMIT 1
) as t2
order by admin_level
$BODY$
  LANGUAGE sql STABLE
/*	 
	FUNÇÃO QUE VERIFICA SE UMA GEOMETRIA ESTÁ EM UMA CIDADE 
*/
	 
CREATE OR REPLACE FUNCTION public.estaNaCidade(oque Geometry, cidade_nome character varying)
  RETURNS boolean AS
$func$


select esta from (
select 
	ST_Within( $1, pl.way ) as esta from planet_osm_polygon pl
where	
	( pl."name" = $2 and pl.admin_level = '8' ) -- Pais = 2 // Estado = 4
) as t1 where t1.esta = true

$func$ LANGUAGE sql STABLE STRICT;	 

/*

select 
	ll.osm_id, ll."name", ST_AsText( ST_Transform(ST_StartPoint(ll.way),4326) ), ST_AsLatLonText( ST_StartPoint(ll.way) ) as coordinates
from 
	planet_osm_line ll
where 
	ll."name" like '%Leite%' 
and 
	estaNoEstado( ll.way, 'Rio de Janeiro')
and 
	estaNaCidade( ll.way, 'Niterói')
and 
	estaNoPais( ll.way, 'Brasil')


	
*/
	
/* 
  FUNÇÃO DE LOCALIZAÇÃO DE PONTOS DE INTERESSE PRÓXIMOS A UMA ROTA 
*/	
CREATE OR REPLACE FUNCTION public.pointscanner(
    IN routegeometry text,
    IN criteria text,
    IN source text)
  RETURNS TABLE(distance double precision, way geometry, name text, phone text, operator text, admin_level text, z_order integer, street text, alt_name text, iata text, icao text, aerodrome_type text, wikidata text, housename text, website text, gauge text, usage text, email text, image text, network text, ref text, postcode text, capacity text, official_name text, sport text, highway text, lanes text, surface text, oneway text, maxheight_physical text, maxheight text, maxspeed text, ibge_geocode text) AS
$BODY$
DECLARE 
	geomRoute geometry;
	routeBB box2d;
	sql text;
BEGIN
	geomRoute = ST_GeomFromText( $1 ,4326);
	routeBB := ST_Extent(geomRoute);

sql := 'SELECT ST_Distance( $1, ST_Transform(pt.way,4326) ) * 111195 as distance, pt.way, pt.name, pt.tags->''phone'' as phone, pt.operator, pt.admin_level, pt.z_order,'
|| ' pt."addr:street" as street, pt.tags->''alt_name'' as alt_name, pt.tags->''iata'' as iata, pt.tags->''icao'' as icao,'
|| ' pt.tags->''aerodrome:type'' as aerodrome_type, pt.tags->''wikidata'' as wikidata, pt."addr:housename" as housename,'
|| ' pt.tags->''website'' as website, pt.tags->''gauge'' as gauge, pt.tags->''usage'' as usage, pt.tags->''email'' as email,'
|| ' pt.tags->''image'' as image, pt.tags->''network'' as network, pt.tags->''ref'' as ref, pt."addr:postcode" as postcode,'
|| ' pt.tags->''capacity'' as capacity, pt.tags->''official_name'' as official_name, pt.tags->''sport'' as sport, '
|| ' pt.highway as highway, pt.tags->''lanes'' as lanes, pt.surface as surface, pt.oneway, pt.tags->''maxheight:physical'' as maxheight_physical,'
|| ' pt.tags->''maxheight'' as maxheight, pt.tags->''maxspeed'' as maxspeed, pt.tags->''IBGE:GEOCODIGO'' as ibge_geocode'
|| ' FROM ' || source || ' pt where $2 && ST_Transform(pt.way,4326) and ' || criteria;

	RETURN QUERY EXECUTE sql USING geomRoute, routeBB;
END; $BODY$
  LANGUAGE plpgsql VOLATILE  
/*

=================== OTIMIZAÇÃO =======================================                
 1. create indexes on ID, source and target columns.
 2. create index using GIST on geom column.
 3. vacuum
 4. cluster on geom column
 5. analyze
 
 
CREATE INDEX idx_hh_2po_4pgr_id
  ON public.hh_2po_4pgr
  USING btree
  (id);     
CREATE INDEX idx_hh_2po_4pgr_geom
  ON public.hh_2po_4pgr
  USING gist
  (geom);                 
ALTER TABLE hh_2po_4pgr CLUSTER ON idx_hh_2po_4pgr_geom;	


select * from route_agg(2799136, 1592338, 1, true)	
select * from calc_rotas_v3(2799136, 1592338, 5, true) as r INNER JOIN osm_2po_4pgr as g ON r.edge = g.id

		
select * from pointscanner('MULTILINESTRING( 
		(-43.1761935 -22.90642,-43.1755606 -22.9064116,-43.1754828 -22.9064106,-43.1753675 -22.9064091),
		(-43.176696 -22.9064062,-43.1761935 -22.90642),(-43.176805 -22.9064027,-43.176696 -22.9064062),
		(-43.1776911 -22.9049927,-43.1776625 -22.9050849,-43.1775227 -22.9055527,-43.1775045 -22.9056041,-43.1774504 -22.9057582),
		(-43.1782012 -22.9036858,-43.1778613 -22.9045254,-43.1777841 -22.9047287,-43.1777446 -22.9048326,-43.1777179 -22.9049164,-43.1776911 -22.9049927),
		(-43.1772218 -22.9063929,-43.1771252 -22.9063944,-43.1771118 -22.9063946,-43.1769202 -22.9064008,-43.176805 -22.9064027),
		(-43.1774504 -22.9057582,-43.1773182 -22.9061373,-43.1772868 -22.9062205,-43.1772218 -22.9063929),
		(-43.1834587 -22.9028997,-43.1833984 -22.9028862,-43.1830022 -22.9027778,-43.1825446 -22.9026278,-43.1821151 -22.9024891,-43.1816491 -22.9023374,-43.1815912 -22.9023186,-43.1813461 -22.9022388),
		(-43.1793173 -22.901581,-43.1791549 -22.9015418,-43.179105 -22.9015365,-43.1790457 -22.9015482,-43.1790174 -22.9015689,-43.178994 -22.9016082),
		(-43.1788184 -22.9020931,-43.1786726 -22.9025241,-43.1786518 -22.9025769,-43.1786063 -22.9026931),
		(-43.1813461 -22.9022388,-43.1806028 -22.9019969,-43.1805417 -22.901977,-43.1799074 -22.9017705),
		(-43.1799074 -22.9017705,-43.1797658 -22.9017244,-43.1793732 -22.9015989,-43.1793173 -22.901581),
		(-43.178994 -22.9016082,-43.1788184 -22.9020931),(-43.1784337 -22.9031366,-43.1782012 -22.9036858),
		(-43.1786063 -22.9026931,-43.17848 -22.9030174,-43.178461 -22.9030662,-43.1784337 -22.9031366))','amenity=''police''','planet_osm_point') where round(distance::numeric, 5) < 500
		
		
SELECT array_to_json( array_agg( t ) ) as result FROM ( select osm_name,source,target from nearest_way('-54.64209596130702  -16.45105478873363', 1, 4326) ) as t

select * from nearest_way('-54.64209596130702  -16.45105478873363', 1, 4326)		
	

SELECT pl.admin_level, pl."name", pl.place, pl."ref", ST_AsText(po.way) as geom
FROM planet_osm_polygon pl, planet_osm_point po 
WHERE ST_Within( po.way, pl.way ) 
and po.osm_id = 529749027 order by pl.admin_level::integer


SELECT admin_level, "name", place, "ref"  
FROM planet_osm_polygon pl
WHERE ST_Within( ST_Transform(ST_GeometryFromText('POINT(-54.64209596130702  -16.45105478873363)',4326), 900913), pl.way ) 
order by admin_level
	
			
*/  
		  
		  
		  