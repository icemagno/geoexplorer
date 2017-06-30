CREATE OR REPLACE FUNCTION public.pointscanner(IN routegeometry text, IN criteria text, IN source text)
  RETURNS TABLE(way geometry, name text, distance double precision, tags hstore, operator text, admin_level text, z_order integer) AS
$BODY$
DECLARE 
	geomRoute geometry;
	routeBB box2d;
	sql text;
BEGIN
	geomRoute = ST_GeomFromText( $1 ,4326);
	routeBB := ST_Extent(geomRoute);

	sql := 'SELECT pt.way, pt.name, ST_Distance( $1, ST_Transform(pt.way,4326) ) * 111195 as distance, pt.tags, pt.operator, pt.admin_level, pt.z_order '
	 || ' FROM ' || source || ' pt where $2 && ST_Transform(pt.way,4326) and ' || criteria;

	RETURN QUERY EXECUTE sql USING geomRoute, routeBB;
END; $BODY$
  LANGUAGE plpgsql VOLATILE

