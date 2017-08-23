--INSERT INTO node_data(id_node_data, layeralias, layername, originalserviceurl, serviceurl, id_node_parent, index_order, description, institute)

select id_node_data, layeralias, layername, originalserviceurl, serviceurl, id_node_parent, index_order, description, institute from (

select id as id_node_data, name as layeralias, cast('' as text) as layername, cast('' as text) as originalserviceurl,
        cast( '' as text) as serviceurl, parentid as id_node_parent, row_number() OVER() as index_order, cast('' as text) as description , cast('' as text) as institute  from subject 
        
union all

select se.id as id_node_data, se.title as layeralias, se.name as layername, cast( '' as text) as originalserviceurl,
	cast('http://172.21.81.43/geoserver/wms/' as text) as serviceurl, se.subjectid as id_node_parent, row_number() OVER() as index_order, se.description , se.institute 
	sp. from service se

) as t1

--INSERT INTO node_data(id_node_data, layeralias, layername, originalserviceurl, serviceurl, id_node_parent, index_order, description, institute)

--------------------------------------------------------------------

select id as id_node_data, name as layeralias, cast('' as text) as layername, cast('' as text) as originalserviceurl,
        cast( '' as text) as serviceurl, parentid as id_node_parent, row_number() OVER() as index_order, cast('' as text) as description , cast('' as text) as institute  from servicos.subject 
union all

select id as id_node_data, title as layeralias, name as layername, cast( '' as text) as originalserviceurl,
	cast('http://172.21.81.43/geoserver/wms/' as text) as serviceurl, subjectid as id_node_parent, row_number() OVER() as index_order, description , institute from servicos.service 


