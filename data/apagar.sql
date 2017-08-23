
-- Apagar Camadas e suas entradas no dicionario
delete from dictionary where id_node_data in ( select id_node_data from public.node_data where layertype = 'DTA' )
delete from public.node_data where layertype = 'DTA'

-- Apagar cenarios
delete from public.scenery_node
delete from public.sceneries

-- Apagar feições
delete from public.node_data where layertype = 'FEI'
delete from public.feicao 


