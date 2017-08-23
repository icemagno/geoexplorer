update node_data set cqlfilter=null where layername = 'view_continentes' and layeralias = 'Continentes';
update node_data set cqlfilter='gid IN (2,3)' where layername = 'view_continentes' and layeralias = 'Américas';
update node_data set cqlfilter='gid = 3' where layername = 'view_continentes' and layeralias = 'América do Sul';
update node_data set cqlfilter='gid = 5' where layername = 'view_continentes' and layeralias = 'Antártida';
update node_data set cqlfilter='gid = 1' where layername = 'view_continentes' and layeralias = 'África';


update node_data set cqlfilter=null where layername = 'view_regioes_mundo' and layeralias = 'Regiões do Mundo';
update node_data set cqlfilter='gid IN (4, 5, 15, 18)' where layername = 'view_regioes_mundo' and layeralias = 'Regiões da América';
update node_data set cqlfilter='gid IN (7, 13, 14, 20, 23)' where layername = 'view_regioes_mundo' and layeralias = 'Regiões da África';
update node_data set cqlfilter='gid IN (9, 10, 16, 22, 25)' where layername = 'view_regioes_mundo' and layeralias = 'Regiões da Europa';


update node_data set cqlfilter=null where layername = 'view_paises' and layeralias = 'Países';
update node_data set cqlfilter='regiao = 18' where layername = 'view_paises' and layeralias = 'Países da América do Sul';
update node_data set cqlfilter='regiao IN (4,5)' where layername = 'view_paises' and layeralias = 'Países da América Central';
update node_data set cqlfilter='regiao = 15' where layername = 'view_paises' and layeralias = 'Países da América do Norte';


update node_data set cqlfilter=null where layername = 'view_estados_regiao' and layeralias = 'Estados / Províncias / Distritos';
update node_data set cqlfilter='regiao = 18' where layername = 'view_estados_regiao' and layeralias = 'Estados da América do Sul';
update node_data set cqlfilter='regiao IN (4,5)' where layername = 'view_estados_regiao' and layeralias = 'Estados da América Central';
update node_data set cqlfilter='regiao = 15' where layername = 'view_estados_regiao' and layeralias = 'Estados da América do Norte';
update node_data set cqlfilter='cod_pais = ''ARG''' where layername = 'view_estados_regiao' and layeralias = 'Estados da Argentina';
update node_data set cqlfilter='cod_pais = ''BOL''' where layername = 'view_estados_regiao' and layeralias = 'Estados da Bolívia';
update node_data set cqlfilter='cod_pais = ''CHL''' where layername = 'view_estados_regiao' and layeralias = 'Estados do Chile';
update node_data set cqlfilter='cod_pais = ''COL''' where layername = 'view_estados_regiao' and layeralias = 'Estados da Colômbia';
update node_data set cqlfilter='cod_pais = ''ECU''' where layername = 'view_estados_regiao' and layeralias = 'Estados do Equador';
update node_data set cqlfilter='cod_pais = ''PER''' where layername = 'view_estados_regiao' and layeralias = 'Estados do Peru';
update node_data set cqlfilter='cod_pais = ''PRY''' where layername = 'view_estados_regiao' and layeralias = 'Estados do Paraguai';
update node_data set cqlfilter='cod_pais = ''URY''' where layername = 'view_estados_regiao' and layeralias = 'Estados do Uruguai';
update node_data set cqlfilter='cod_pais = ''VEN''' where layername = 'view_estados_regiao' and layeralias = 'Estados da Venezuela';


update node_data set cqlfilter=null where layername = 'view_cidades_regiao' and layeralias = 'Cidades';
update node_data set cqlfilter='regiao = 18' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da América do Sul';
update node_data set cqlfilter='regiao IN (4,5)' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da América Central';
update node_data set cqlfilter='regiao = 15' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da América do Norte';
update node_data set cqlfilter='cod_pais = ''ARG''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Argentina';
update node_data set cqlfilter='cod_pais = ''BOL''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Bolívia';
update node_data set cqlfilter='cod_pais = ''CHL''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Chile';
update node_data set cqlfilter='cod_pais = ''COL''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Colômbia';
update node_data set cqlfilter='cod_pais = ''ECU''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Equador';
update node_data set cqlfilter='cod_pais = ''GUF''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Guiana Francesa';
update node_data set cqlfilter='cod_pais = ''GUY''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Guiana';
update node_data set cqlfilter='cod_pais = ''PER''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Peru';
update node_data set cqlfilter='cod_pais = ''PRY''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Paraguai';
update node_data set cqlfilter='cod_pais = ''SUR''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Suriname';
update node_data set cqlfilter='cod_pais = ''URY''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades do Uruguai';
update node_data set cqlfilter='cod_pais = ''VEN''' where layername = 'view_cidades_regiao' and layeralias = 'Cidades da Venezuela';


update node_data set cqlfilter=null where layername = 'view_mundo_lagos' and layeralias = 'Lagos do mundo';
update node_data set cqlfilter=null where layername = 'view_mundo_rios' and layeralias = 'Rios do mundo';
update node_data set cqlfilter=null where layername = 'view_pais_brasil' and layeralias = 'Brasil (origem Paises';
update node_data set cqlfilter=null where layername = 'view_regioes_br' and layeralias = 'Brasil (com Regiões';
update node_data set cqlfilter=null where layername = 'view_estados_brasil' and layeralias = 'Brasil (com Estados';
update node_data set cqlfilter=null where layername = 'view_regioes_br' and layeralias = 'Macroregiões do Brasil';

update node_data set cqlfilter='codigo = ''NO''' where layername = 'view_regioes_br' and layeralias = 'Região NORTE';
update node_data set cqlfilter='codigo = ''NE''' where layername = 'view_regioes_br' and layeralias = 'Região NORDESTE';
update node_data set cqlfilter='codigo = ''SE''' where layername = 'view_regioes_br' and layeralias = 'Região SUDESTE';
update node_data set cqlfilter='codigo = ''SU''' where layername = 'view_regioes_br' and layeralias = 'Região SUL';
update node_data set cqlfilter='codigo = ''CO''' where layername = 'view_regioes_br' and layeralias = 'Região CENTRO OESTE';


update node_data set cqlfilter='codigo = ''AMZ_AZUL''' where layername = 'view_fronteiras' and layeralias = 'Amazônia Azul';
update node_data set cqlfilter='codigo = ''MARTER12MN''' where layername = 'view_fronteiras' and layeralias = 'Mar Territorial 12 milhas';
update node_data set cqlfilter='codigo = ''ZEE''' where layername = 'view_fronteiras' and layeralias = 'Zona Econômica Exclusiva';
update node_data set cqlfilter='codigo = ''ESP_AEREO''' where layername = 'view_fronteiras' and layeralias = 'Espaço Aéreo';
update node_data set cqlfilter='codigo = ''FRON050''' where layername = 'view_fronteiras' and layeralias = 'Fronteira - faixa de 50 kilômetros';
update node_data set cqlfilter='codigo = ''FRON100''' where layername = 'view_fronteiras' and layeralias = 'Fronteira - faixa de 100 kilômetros';
update node_data set cqlfilter='codigo = ''FRON150''' where layername = 'view_fronteiras' and layeralias = 'Fronteira - faixa de 150 kilômetros';
update node_data set cqlfilter='codigo NOT IN (''AMZ_AZUL'', ''MARTER12MN'', ''ZEE'', ''ESP_AEREO'', ''FRON050'', ''FRON100'', ''FRON150'') ' where layername = 'view_fronteiras' and layeralias = 'Fronteira - Outras';



update node_data set cqlfilter='fronteira = ''FRON050''' where layername = 'view_uf_municipios_fronteira' and layeralias = 'Municípios - Fronteira de 50Km';
update node_data set cqlfilter='fronteira = ''FRON100''' where layername = 'view_uf_municipios_fronteira' and layeralias = 'Municípios - Fronteira de 100Km';
update node_data set cqlfilter='fronteira = ''FRON150''' where layername = 'view_uf_municipios_fronteira' and layeralias = 'Municípios - Fronteira de 150Km';


update node_data set cqlfilter='tipo = ''CM''' where layername = 'view_limites_militares' and layeralias = 'Todos - Comandos Militares';
update node_data set cqlfilter='tipo IN (''DN'', ''DNM'')' where layername = 'view_limites_militares' and layeralias = 'Todos - Distritos Navais';
update node_data set cqlfilter='tipo = ''COMAR''' where layername = 'view_limites_militares' and layeralias = 'Todos - Comandos Aéreos Regionais';
update node_data set cqlfilter='tipo = ''RM''' where layername = 'view_limites_militares' and layeralias = 'Todas - Regiões Militares';
update node_data set cqlfilter='tipo = ''ADA''' where layername = 'view_limites_militares' and layeralias = 'Todas - Zona de Defesa Aérea';
update node_data set cqlfilter='codigo = ''CMA''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar da Amazônia';
update node_data set cqlfilter='codigo = ''CMN''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Norte';
update node_data set cqlfilter='codigo = ''CMNE''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Nordeste';
update node_data set cqlfilter='codigo = ''CML''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Leste';
update node_data set cqlfilter='codigo = ''CMSE''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Sudeste';
update node_data set cqlfilter='codigo = ''CMS''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Sul';
update node_data set cqlfilter='codigo = ''CMO''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Oeste';
update node_data set cqlfilter='codigo = ''CMP''' where layername = 'view_limites_militares' and layeralias = 'Comando Militar do Planalto';
update node_data set cqlfilter='codigo IN (''DN01'', ''DN01_MAR'')' where layername = 'view_limites_militares' and layeralias = '1º Distrito Naval';
update node_data set cqlfilter='codigo IN (''DN02'', ''DN02_MAR'')' where layername = 'view_limites_militares' and layeralias = '2º Distrito Naval';
update node_data set cqlfilter='codigo IN (''DN03'', ''DN03_MAR'')' where layername = 'view_limites_militares' and layeralias = '3º Distrito Naval';
update node_data set cqlfilter='codigo IN (''DN04'', ''DN04_MAR'')' where layername = 'view_limites_militares' and layeralias = '4º Distrito Naval';
update node_data set cqlfilter='codigo IN (''DN05'', ''DN05_MAR'')' where layername = 'view_limites_militares' and layeralias = '5º Distrito Naval';
update node_data set cqlfilter='codigo  = ''DN06''' where layername = 'view_limites_militares' and layeralias = '6º Distrito Naval';
update node_data set cqlfilter='codigo  = ''DN07''' where layername = 'view_limites_militares' and layeralias = '7º Distrito Naval';


update node_data set cqlfilter=null where layername = 'view_estados_brasil' and layeralias = 'Unidades da Federação do Brasil';
update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_estados_brasil' and layeralias = 'UF - Acre - AC';
update node_data set cqlfilter='codigo = ''BRA-AM''' where layername = 'view_estados_brasil' and layeralias = 'UF - Amazonas - AM';
update node_data set cqlfilter='codigo = ''BRA-RR''' where layername = 'view_estados_brasil' and layeralias = 'UF - Roraima - RR';
update node_data set cqlfilter='codigo = ''BRA-AP''' where layername = 'view_estados_brasil' and layeralias = 'UF - Amapá - AP';
update node_data set cqlfilter='codigo = ''BRA-PA''' where layername = 'view_estados_brasil' and layeralias = 'UF - Pará - PA';
update node_data set cqlfilter='codigo = ''BRA-RO''' where layername = 'view_estados_brasil' and layeralias = 'UF - Rondônia - RO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_estados_brasil' and layeralias = 'UF - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-MA''' where layername = 'view_estados_brasil' and layeralias = 'UF - Maranhão - MA';
update node_data set cqlfilter='codigo = ''BRA-PI''' where layername = 'view_estados_brasil' and layeralias = 'UF - Piauí - PI';
update node_data set cqlfilter='codigo = ''BRA-CE''' where layername = 'view_estados_brasil' and layeralias = 'UF - Ceará - CE';
update node_data set cqlfilter='codigo = ''BRA-RN''' where layername = 'view_estados_brasil' and layeralias = '  Rio Grande do Norte - RN';
update node_data set cqlfilter='codigo = ''BRA-PB''' where layername = 'view_estados_brasil' and layeralias = 'UF - Paraíba - PB';
update node_data set cqlfilter='codigo = ''BRA-PE''' where layername = 'view_estados_brasil' and layeralias = 'UF - Pernambuco - PE';
update node_data set cqlfilter='codigo = ''BRA-AL''' where layername = 'view_estados_brasil' and layeralias = 'UF - Alagoas - AL';
update node_data set cqlfilter='codigo = ''BRA-SE''' where layername = 'view_estados_brasil' and layeralias = 'UF - Sergipe - SE';
update node_data set cqlfilter='codigo = ''BRA-BA''' where layername = 'view_estados_brasil' and layeralias = 'UF - Bahia - BA';
update node_data set cqlfilter='codigo = ''BRA-MG''' where layername = 'view_estados_brasil' and layeralias = 'UF - Minas Gerais - MG';
update node_data set cqlfilter='codigo = ''BRA-ES''' where layername = 'view_estados_brasil' and layeralias = 'UF - Espírito Santo - ES';
update node_data set cqlfilter='codigo = ''BRA-RJ''' where layername = 'view_estados_brasil' and layeralias = 'UF - Rio de Janeiro - RJ';
update node_data set cqlfilter='codigo = ''BRA-SP''' where layername = 'view_estados_brasil' and layeralias = 'UF - São Paulo - SP';
update node_data set cqlfilter='codigo = ''BRA-PR''' where layername = 'view_estados_brasil' and layeralias = 'UF - Paraná - PR';
update node_data set cqlfilter='codigo = ''BRA-SC''' where layername = 'view_estados_brasil' and layeralias = 'UF - Santa Catarina - SC';
update node_data set cqlfilter='codigo = ''BRA-RS''' where layername = 'view_estados_brasil' and layeralias = 'UF - Rio Grande do Sul - RS';
update node_data set cqlfilter='codigo = ''BRA-MS''' where layername = 'view_estados_brasil' and layeralias = 'UF - Mato Grosso do Sul - MS';
update node_data set cqlfilter='codigo = ''BRA-MT''' where layername = 'view_estados_brasil' and layeralias = '  Mato Grosso - MT';
update node_data set cqlfilter='codigo = ''BRA-GO''' where layername = 'view_estados_brasil' and layeralias = 'UF - Goiás - GO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_estados_brasil' and layeralias = 'UF - Tocantins TO';
update node_data set cqlfilter='codigo = ''BRA-DF''' where layername = 'view_estados_brasil' and layeralias = 'UF - Distrito Federal';


update node_data set cqlfilter='codigo IN (''DN08'', ''DN08_MAR'')' where layername = 'view_limites_militares' and layeralias = '8º Distrito Naval';
update node_data set cqlfilter='codigo  = ''DN09''' where layername = 'view_limites_militares' and layeralias = '9º Distrito Naval';
update node_data set cqlfilter='codigo = ''COMAR1''' where layername = 'view_limites_militares' and layeralias = '1º COMAR';
update node_data set cqlfilter='codigo = ''COMAR2''' where layername = 'view_limites_militares' and layeralias = '2º COMAR';
update node_data set cqlfilter='codigo = ''COMAR3''' where layername = 'view_limites_militares' and layeralias = '3º COMAR';
update node_data set cqlfilter='codigo = ''COMAR4''' where layername = 'view_limites_militares' and layeralias = '4º COMAR';
update node_data set cqlfilter='codigo = ''COMAR5''' where layername = 'view_limites_militares' and layeralias = '5º COMAR';
update node_data set cqlfilter='codigo = ''COMAR6''' where layername = 'view_limites_militares' and layeralias = '6º COMAR';
update node_data set cqlfilter='codigo = ''COMAR7''' where layername = 'view_limites_militares' and layeralias = '7º COMAR';


update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_uf_meso' and layeralias = 'Meso - Acre - AC';
update node_data set cqlfilter='codigo = ''BRA-AM''' where layername = 'view_uf_meso' and layeralias = 'Meso - Amazonas - AM';
update node_data set cqlfilter='codigo = ''BRA-RR''' where layername = 'view_uf_meso' and layeralias = 'Meso - Roraima - RR';
update node_data set cqlfilter='codigo = ''BRA-AP''' where layername = 'view_uf_meso' and layeralias = 'Meso - Amapá - AP';
update node_data set cqlfilter='codigo = ''BRA-PA''' where layername = 'view_uf_meso' and layeralias = 'Meso - Pará - PA';
update node_data set cqlfilter='codigo = ''BRA-RO''' where layername = 'view_uf_meso' and layeralias = 'Meso - Rondônia - RO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_meso' and layeralias = 'Meso - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-MA''' where layername = 'view_uf_meso' and layeralias = 'Meso - Maranhão - MA';
update node_data set cqlfilter='codigo = ''BRA-PI''' where layername = 'view_uf_meso' and layeralias = 'Meso - Piauí - PI';
update node_data set cqlfilter='codigo = ''BRA-CE''' where layername = 'view_uf_meso' and layeralias = 'Meso - Ceará - CE';
update node_data set cqlfilter='codigo = ''BRA-RN''' where layername = 'view_uf_meso' and layeralias = 'Meso - Rio Grande do Norte - RN';
update node_data set cqlfilter='codigo = ''BRA-PB''' where layername = 'view_uf_meso' and layeralias = 'Meso - Paraíba - PB';
update node_data set cqlfilter='codigo = ''BRA-PE''' where layername = 'view_uf_meso' and layeralias = 'Meso - Pernambuco - PE';
update node_data set cqlfilter='codigo = ''BRA-AL''' where layername = 'view_uf_meso' and layeralias = 'Meso - Alagoas - AL';
update node_data set cqlfilter='codigo = ''BRA-SE''' where layername = 'view_uf_meso' and layeralias = 'Meso - Sergipe - SE';
update node_data set cqlfilter='codigo = ''BRA-BA''' where layername = 'view_uf_meso' and layeralias = 'Meso - Bahia - BA';
update node_data set cqlfilter='codigo = ''BRA-MG''' where layername = 'view_uf_meso' and layeralias = 'Meso - Minas Gerais - MG';
update node_data set cqlfilter='codigo = ''BRA-ES''' where layername = 'view_uf_meso' and layeralias = 'Meso - Espírito Santo - ES';
update node_data set cqlfilter='codigo = ''BRA-RJ''' where layername = 'view_uf_meso' and layeralias = 'Meso - Rio de Janeiro - RJ';
update node_data set cqlfilter='codigo = ''BRA-SP''' where layername = 'view_uf_meso' and layeralias = 'Meso - São Paulo - SP';
update node_data set cqlfilter='codigo = ''BRA-PR''' where layername = 'view_uf_meso' and layeralias = 'Meso - Paraná - PR';
update node_data set cqlfilter='codigo = ''BRA-SC''' where layername = 'view_uf_meso' and layeralias = 'Meso - Santa Catarina - SC';
update node_data set cqlfilter='codigo = ''BRA-RS''' where layername = 'view_uf_meso' and layeralias = 'Meso - Rio Grande do Sul - RS';
update node_data set cqlfilter='codigo = ''BRA-MS''' where layername = 'view_uf_meso' and layeralias = 'Meso - Mato Grosso do Sul - MS';
update node_data set cqlfilter='codigo = ''BRA-MT''' where layername = 'view_uf_meso' and layeralias = 'Meso - Mato Grosso - MT';
update node_data set cqlfilter='codigo = ''BRA-GO''' where layername = 'view_uf_meso' and layeralias = 'Meso - Goiás - GO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_meso' and layeralias = 'Meso - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-DF''' where layername = 'view_uf_meso' and layeralias = 'Meso - Distrito Federal';



update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_uf_micro' and layeralias = 'Micro - Acre - AC';
update node_data set cqlfilter='codigo = ''BRA-AM''' where layername = 'view_uf_micro' and layeralias = 'Micro - Amazonas - AM';
update node_data set cqlfilter='codigo = ''BRA-RR''' where layername = 'view_uf_micro' and layeralias = 'Micro - Roraima - RR';
update node_data set cqlfilter='codigo = ''BRA-AP''' where layername = 'view_uf_micro' and layeralias = 'Micro - Amapá - AP';
update node_data set cqlfilter='codigo = ''BRA-PA''' where layername = 'view_uf_micro' and layeralias = 'Micro - Pará - PA';
update node_data set cqlfilter='codigo = ''BRA-RO''' where layername = 'view_uf_micro' and layeralias = 'Micro - Rondônia - RO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_micro' and layeralias = 'Micro - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-MA''' where layername = 'view_uf_micro' and layeralias = 'Micro - Maranhão - MA';
update node_data set cqlfilter='codigo = ''BRA-PI''' where layername = 'view_uf_micro' and layeralias = 'Micro - Piauí - PI';
update node_data set cqlfilter='codigo = ''BRA-CE''' where layername = 'view_uf_micro' and layeralias = 'Micro - Ceará - CE';
update node_data set cqlfilter='codigo = ''BRA-RN''' where layername = 'view_uf_micro' and layeralias = 'Micro - Rio Grande do Norte - RN';
update node_data set cqlfilter='codigo = ''BRA-PB''' where layername = 'view_uf_micro' and layeralias = 'Micro - Paraíba - PB';
update node_data set cqlfilter='codigo = ''BRA-PE''' where layername = 'view_uf_micro' and layeralias = 'Micro - Pernambuco - PE';
update node_data set cqlfilter='codigo = ''BRA-AL''' where layername = 'view_uf_micro' and layeralias = 'Micro - Alagoas - AL';
update node_data set cqlfilter='codigo = ''BRA-SE''' where layername = 'view_uf_micro' and layeralias = 'Micro - Sergipe - SE';
update node_data set cqlfilter='codigo = ''BRA-BA''' where layername = 'view_uf_micro' and layeralias = 'Micro - Bahia - BA';
update node_data set cqlfilter='codigo = ''BRA-MG''' where layername = 'view_uf_micro' and layeralias = 'Micro - Minas Gerais - MG';
update node_data set cqlfilter='codigo = ''BRA-ES''' where layername = 'view_uf_micro' and layeralias = 'Micro - Espírito Santo - ES';
update node_data set cqlfilter='codigo = ''BRA-RJ''' where layername = 'view_uf_micro' and layeralias = 'Micro - Rio de Janeiro - RJ';
update node_data set cqlfilter='codigo = ''BRA-SP''' where layername = 'view_uf_micro' and layeralias = 'Micro - São Paulo - SP';
update node_data set cqlfilter='codigo = ''BRA-PR''' where layername = 'view_uf_micro' and layeralias = 'Micro - Paraná - PR';
update node_data set cqlfilter='codigo = ''BRA-SC''' where layername = 'view_uf_micro' and layeralias = 'Micro - Santa Catarina - SC';
update node_data set cqlfilter='codigo = ''BRA-RS''' where layername = 'view_uf_micro' and layeralias = 'Micro - Rio Grande do Sul - RS';
update node_data set cqlfilter='codigo = ''BRA-MS''' where layername = 'view_uf_micro' and layeralias = 'Micro - Mato Grosso do Sul - MS';
update node_data set cqlfilter='codigo = ''BRA-MT''' where layername = 'view_uf_micro' and layeralias = 'Micro - Mato Grosso - MT';
update node_data set cqlfilter='codigo = ''BRA-GO''' where layername = 'view_uf_micro' and layeralias = 'Micro - Goiás - GO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_micro' and layeralias = 'Micro - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-DF''' where layername = 'view_uf_micro' and layeralias = 'Micro - Distrito Federal';



update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Acre - AC';
update node_data set cqlfilter='codigo = ''BRA-AM''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Amazonas - AM';
update node_data set cqlfilter='codigo = ''BRA-RR''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Roraima - RR';
update node_data set cqlfilter='codigo = ''BRA-AP''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Amapá - AP';
update node_data set cqlfilter='codigo = ''BRA-PA''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Pará - PA';
update node_data set cqlfilter='codigo = ''BRA-RO''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Rondônia - RO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-MA''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Maranhão - MA';
update node_data set cqlfilter='codigo = ''BRA-PI''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Piauí - PI';
update node_data set cqlfilter='codigo = ''BRA-CE''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Ceará - CE';
update node_data set cqlfilter='codigo = ''BRA-RN''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Rio Grande do Norte - RN';
update node_data set cqlfilter='codigo = ''BRA-PB''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Paraíba - PB';
update node_data set cqlfilter='codigo = ''BRA-PE''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Pernambuco - PE';
update node_data set cqlfilter='codigo = ''BRA-AL''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Alagoas - AL';
update node_data set cqlfilter='codigo = ''BRA-SE''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Sergipe - SE';
update node_data set cqlfilter='codigo = ''BRA-BA''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Bahia - BA';
update node_data set cqlfilter='codigo = ''BRA-MG''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Minas Gerais - MG';
update node_data set cqlfilter='codigo = ''BRA-ES''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Espírito Santo - ES';
update node_data set cqlfilter='codigo = ''BRA-RJ''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Rio de Janeiro - RJ';
update node_data set cqlfilter='codigo = ''BRA-SP''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - São Paulo - SP';
update node_data set cqlfilter='codigo = ''BRA-PR''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Paraná - PR';
update node_data set cqlfilter='codigo = ''BRA-SC''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Santa Catarina - SC';
update node_data set cqlfilter='codigo = ''BRA-RS''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Rio Grande do Sul - RS';
update node_data set cqlfilter='codigo = ''BRA-MS''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Mato Grosso do Sul - MS';
update node_data set cqlfilter='codigo = ''BRA-MT''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Mato Grosso - MT';
update node_data set cqlfilter='codigo = ''BRA-GO''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Goiás - GO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-DF''' where layername = 'view_uf_municipios' and layeralias = 'Municípios - Distrito Federal';



update node_data set cqlfilter=null where layername = 'view_cidades_brasil' and layeralias = 'Cidades / Localidades / Vilas';
update node_data set cqlfilter='tipo < 4' where layername = 'view_cidades_brasil' and layeralias = 'Capitais do Brasil';
update node_data set cqlfilter='cod_regiao = ''NO''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Região NORTE';
update node_data set cqlfilter='cod_regiao = ''NE''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Região NORDESTE';
update node_data set cqlfilter='cod_regiao = ''SE''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Região SUDESTE';
update node_data set cqlfilter='cod_regiao = ''SU''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Região SUL';
update node_data set cqlfilter='cod_regiao = ''CO''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Região CENTRO-OESTE';
update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Acre - AC';
update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Amazonas - AM';
update node_data set cqlfilter='codigo = ''BRA-RR''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Roraima - RR';
update node_data set cqlfilter='codigo = ''BRA-AP''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Amapá - AP';
update node_data set cqlfilter='codigo = ''BRA-PA''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Pará - PA';
update node_data set cqlfilter='codigo = ''BRA-RO''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Rondônia - RO';
update node_data set cqlfilter='codigo = ''BRA-AC''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-MA''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Maranhão - MA';
update node_data set cqlfilter='codigo = ''BRA-PI''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Piauí - PI';
update node_data set cqlfilter='codigo = ''BRA-CE''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Ceará - CE';
update node_data set cqlfilter='codigo = ''BRA-RN''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Rio Grande do Norte - RN';
update node_data set cqlfilter='codigo = ''BRA-PB''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Paraíba - PB';
update node_data set cqlfilter='codigo = ''BRA-PE''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Pernambuco - PE';
update node_data set cqlfilter='codigo = ''BRA-AL''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Alagoas - AL';
update node_data set cqlfilter='codigo = ''BRA-SE''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Sergipe - SE';
update node_data set cqlfilter='codigo = ''BRA-BA''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Bahia - BA';
update node_data set cqlfilter='codigo = ''BRA-MG''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Minas Gerais - MG';
update node_data set cqlfilter='codigo = ''BRA-ES''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Espírito Santo - ES';
update node_data set cqlfilter='codigo = ''BRA-RJ''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Rio de Janeiro - RJ';
update node_data set cqlfilter='codigo = ''BRA-SP''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - São Paulo - SP';
update node_data set cqlfilter='codigo = ''BRA-PR''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Paraná - PR';
update node_data set cqlfilter='codigo = ''BRA-SC''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Santa Catarina - SC';
update node_data set cqlfilter='codigo = ''BRA-RS''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Rio Grande do Sul - RS';
update node_data set cqlfilter='codigo = ''BRA-MS''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Mato Grosso do Sul - MS';
update node_data set cqlfilter='codigo = ''BRA-MT''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Mato Grosso - MT';
update node_data set cqlfilter='codigo = ''BRA-GO''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Goiás - GO';
update node_data set cqlfilter='codigo = ''BRA-TO''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Tocantins - TO';
update node_data set cqlfilter='codigo = ''BRA-DF''' where layername = 'view_cidades_brasil' and layeralias = 'Cidades - Distrito Federal';



update node_data set cqlfilter='codigo = ''RM01''' where layername = 'view_limites_militares' and layeralias = '1ª Região Militar';
update node_data set cqlfilter='codigo = ''RM02''' where layername = 'view_limites_militares' and layeralias = '2ª Região Militar';
update node_data set cqlfilter='codigo = ''RM03''' where layername = 'view_limites_militares' and layeralias = '3ª Região Militar';
update node_data set cqlfilter='codigo = ''RM04''' where layername = 'view_limites_militares' and layeralias = '4ª Região Militar';
update node_data set cqlfilter='codigo = ''RM05''' where layername = 'view_limites_militares' and layeralias = '5ª Região Militar';
update node_data set cqlfilter='codigo = ''RM06''' where layername = 'view_limites_militares' and layeralias = '6ª Região Militar';
update node_data set cqlfilter='codigo = ''RM07''' where layername = 'view_limites_militares' and layeralias = '7ª Região Militar';
update node_data set cqlfilter='codigo = ''RM08''' where layername = 'view_limites_militares' and layeralias = '8ª Região Militar';
update node_data set cqlfilter='codigo = ''RM09''' where layername = 'view_limites_militares' and layeralias = '9ª Região Militar';
update node_data set cqlfilter='codigo = ''RM10''' where layername = 'view_limites_militares' and layeralias = '10ª Região Militar';
update node_data set cqlfilter='codigo = ''RM11''' where layername = 'view_limites_militares' and layeralias = '11ª Região Militar';
update node_data set cqlfilter=null where layername = 'view_limites_militares' and layeralias = '12ª Região Militar';
update node_data set cqlfilter=null where layername = 'view_limites_militares' and layeralias = 'ADA Norte';
update node_data set cqlfilter=null where layername = 'view_limites_militares' and layeralias = 'ADA Nordeste';
update node_data set cqlfilter=null where layername = 'view_limites_militares' and layeralias = 'ADA Sul';
update node_data set cqlfilter=null where layername = 'view_limites_militares' and layeralias = 'ADA Centro-Sudeste';



update node_data set cqlfilter=null where layername = 'view_area_interesse' and layeralias = 'Areas de Interesse';
update node_data set cqlfilter=null where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Ativadas';
update node_data set cqlfilter=null where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Desativadas';
update node_data set cqlfilter='tipo_area = ''AOP''' where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Operações Ativadas';
update node_data set cqlfilter='tipo_area = ''AOP''' where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Operações Desativadas';
update node_data set cqlfilter='tipo_area = ''APL''' where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Apoio Logístico Ativadas';
update node_data set cqlfilter='tipo_area = ''APL''' where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Apoio Logístico Desativadas';
update node_data set cqlfilter='tipo_area = ''ARI''' where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Interesse Ativadas';
update node_data set cqlfilter='tipo_area = ''ARI''' where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Interesse Desativadas';
update node_data set cqlfilter='tipo_area = ''AZI''' where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Zona Interesse Ativadas';
update node_data set cqlfilter='tipo_area = ''AZI''' where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Zona Interesse Desativadas';
update node_data set cqlfilter='NOT (tipo_area IN (''AOP'', ''APL'',''ARI'',''AZI''))' where layername = 'view_area_interesse_ativadas' and layeralias = 'A Int - Outras Ativadas';
update node_data set cqlfilter='NOT (tipo_area IN (''AOP'', ''APL'',''ARI'',''AZI''))' where layername = 'view_area_interesse_desativadas' and layeralias = 'A Int - Outras Desativadas';



update node_data set cqlfilter=null where layername = 'view_area_agricola' and layeralias = 'Areas Produção Agrícola';
update node_data set cqlfilter='tipo_area = ''ALG''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Algodão';
update node_data set cqlfilter='tipo_area = ''CAN''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Cana de Açúcar';
update node_data set cqlfilter='tipo_area = ''SOJ''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Soja';
update node_data set cqlfilter='tipo_area = ''TRI''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Trigo';
update node_data set cqlfilter='tipo_area = ''CAF''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Café';
update node_data set cqlfilter='tipo_area = ''FEI''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Feijão';
update node_data set cqlfilter='tipo_area = ''MIL''' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Milho';
update node_data set cqlfilter=' (NOT (tipo_area IN (''ALG'',''FEI'',''SOJ'',''TRI'',''CAN'',''MIL'',''CAF''))' where layername = 'view_area_agricola' and layeralias = 'A PROD AGR - Outras';



update node_data set cqlfilter=null where layername = 'view_area_prod_pecuraria' and layeralias = 'Areas Produção Pecuária';
update node_data set cqlfilter='tipo_area = ''BOV''' where layername = 'view_area_prod_pecuraria' and layeralias = 'A PROD PEC - Bovinos';
update node_data set cqlfilter='tipo_area = ''EQU''' where layername = 'view_area_prod_pecuraria' and layeralias = 'A PROD PEC - Equinos';
update node_data set cqlfilter='tipo_area = ''OVI''' where layername = 'view_area_prod_pecuraria' and layeralias = 'A PROD PEC - Ovinos';
update node_data set cqlfilter='tipo_area = ''SUI''' where layername = 'view_area_prod_pecuraria' and layeralias = 'A PROD PEC - Suinos';
update node_data set cqlfilter='NOT (tipo_area IN (''BOV'',''EQU'',''OVI'',''SUI''))' where layername = 'view_area_prod_pecuraria' and layeralias = 'A PROD PEC - Outras';



update node_data set cqlfilter=null where layername = 'view_area_endemia' and layeralias = 'Areas de Endemias';
update node_data set cqlfilter='tipo_area = ''DEN''' where layername = 'view_area_endemia' and layeralias = 'A END - Dengue';
update node_data set cqlfilter='tipo_area = ''GAV''' where layername = 'view_area_endemia' and layeralias = 'A END - Gripe Aviária';
update node_data set cqlfilter='tipo_area = ''MEN''' where layername = 'view_area_endemia' and layeralias = 'A END - Meningite';
update node_data set cqlfilter='NOT (tipo_area IN (''DEN'',''GAV'',''MEN''))' where layername = 'view_area_endemia' and layeralias = 'A END - Outras';


update node_data set cqlfilter=null where layername = 'view_area_insumo_biocombustivel' and layeralias = 'Areas de Insumos';
update node_data set cqlfilter='tipo_area = ''DIE''' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - Biodiesel: éster metílico e/ou etílico';
update node_data set cqlfilter='tipo_area = ''ETA''' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - BioEtanol: Etanol';
update node_data set cqlfilter='tipo_area = ''GAS''' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - Biogás: Gás';
update node_data set cqlfilter='tipo_area = ''MAS''' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - Biomassa';
update node_data set cqlfilter='tipo_area = ''OLE''' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - Bio Óleo';
update node_data set cqlfilter='NOT (tipo_area IN (''DIE'',''ETA'',''GAS'',''MAS'',''OLE''))' where layername = 'view_area_insumo_biocombustivel' and layeralias = 'A INSUMO - Outras';



update node_data set cqlfilter=null where layername = 'view_rodovias' and layeralias = 'Rodovias do Brasil';
update node_data set cqlfilter='cod_regiao = ''NO''' where layername = 'view_rodovias' and layeralias = 'Rodovias - NORTE';
update node_data set cqlfilter='cod_regiao = ''NE''' where layername = 'view_rodovias' and layeralias = 'Rodovias - NORDESTE';
update node_data set cqlfilter='cod_regiao = ''SE''' where layername = 'view_rodovias' and layeralias = 'Rodovias - SUDESTE';
update node_data set cqlfilter='cod_regiao = ''SU''' where layername = 'view_rodovias' and layeralias = 'Rodovias - SUL';
update node_data set cqlfilter='cod_regiao = ''CO''' where layername = 'view_rodovias' and layeralias = 'Rodovias - CENTRO OESTE';


update node_data set cqlfilter=null where layername = 'view_rodovias_federais' and layeralias like  '%Rodovias FEDERAIS%';
update node_data set cqlfilter='classe_rodovia = 0' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - RADIAIS (BR-0XX%';
update node_data set cqlfilter='classe_rodovia = 1' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - LONGITUDINAIS BR-1XX%';
update node_data set cqlfilter='classe_rodovia = 2' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - TRANSVERSAIS - BR-2XX%';
update node_data set cqlfilter='classe_rodovia = 3' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - DIAGONAIS - BR-3XX%';
update node_data set cqlfilter='classe_rodovia = 4' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - LIGAÇÃO - BR-4XX%';
update node_data set cqlfilter='classe_rodovia > 4' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - OUTRAS Classes%';
update node_data set cqlfilter='cod_regiao = ''NO''' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - NORTE%';
update node_data set cqlfilter='cod_regiao = ''NE''' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - NORDESTE%';
update node_data set cqlfilter='cod_regiao = ''SE''' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - SUDESTE%';
update node_data set cqlfilter='cod_regiao = ''SU''' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - SUL%';
update node_data set cqlfilter='cod_regiao = ''CO''' where layername = 'view_rodovias_federais' and layeralias like  '%Rod Federais - CENTRO OESTE%';


update node_data set cqlfilter=null where layername = 'view_rodovias_estaduais' and layeralias like  '%Rodovias ESTADUAIS%';
update node_data set cqlfilter='cod_regiao = ''NO''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - NORTE%';
update node_data set cqlfilter='cod_regiao = ''NE''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - NORDESTE%';
update node_data set cqlfilter='cod_regiao = ''SE''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - SUDESTE%';
update node_data set cqlfilter='cod_regiao = ''SU''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - SUL%';
update node_data set cqlfilter='cod_regiao = ''CO''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - CENTRO OESTE%';
update node_data set cqlfilter='codigo_estado = ''BRA-AC''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Acre (AC%';
update node_data set cqlfilter='codigo_estado = ''BRA-AM''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Amazônia (AM%';
update node_data set cqlfilter='codigo_estado = ''BRA-RR''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Roraima (RR%';
update node_data set cqlfilter='codigo_estado = ''BRA-AP''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Amapá (AP%';
update node_data set cqlfilter='codigo_estado = ''BRA-PA''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Pará (PA%';
update node_data set cqlfilter='codigo_estado = ''BRA-RO''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Rondônia (RO%';
update node_data set cqlfilter='codigo_estado = ''BRA-MA''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Maranhão (MA%';
update node_data set cqlfilter='codigo_estado = ''BRA-PI''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Piauí (PI%';
update node_data set cqlfilter='codigo_estado = ''BRA-CE''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Ceará (CE%';
update node_data set cqlfilter='codigo_estado = ''BRA-RN''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Rio Grande do Norte (RN%';
update node_data set cqlfilter='codigo_estado = ''BRA-PB''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Paraiba (PB%';
update node_data set cqlfilter='codigo_estado = ''BRA-PE''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Pernambuco (PE%';
update node_data set cqlfilter='codigo_estado = ''BRA-AL''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Alagoas (AL%';
update node_data set cqlfilter='codigo_estado = ''BRA-SE''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Sergipe (SE%';
update node_data set cqlfilter='codigo_estado = ''BRA-BA''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Bahia (BA%';
update node_data set cqlfilter='codigo_estado = ''BRA-MG''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Minas Gerais (MG%';
update node_data set cqlfilter='codigo_estado = ''BRA-ES''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Espirito Santo (ES%';
update node_data set cqlfilter='codigo_estado = ''BRA-RJ''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Rio de Janeiro (RJ%';
update node_data set cqlfilter='codigo_estado = ''BRA-SP''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - São Paulo (SP%';
update node_data set cqlfilter='codigo_estado = ''BRA-PR''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Paraná (PR%';
update node_data set cqlfilter='codigo_estado = ''BRA-SC''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Santa Catarina (SC%';
update node_data set cqlfilter='codigo_estado = ''BRA-RS''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Rio Grande do Sul (RS%';
update node_data set cqlfilter='codigo_estado = ''BRA-MS''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Mato Grosso do Sul (MS%';
update node_data set cqlfilter='codigo_estado = ''BRA-MT''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Mato Grosso (MT%';
update node_data set cqlfilter='codigo_estado = ''BRA-GO''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Goiás (GO%';
update node_data set cqlfilter='codigo_estado = ''BRA-TO''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Tocantins (TO%';
update node_data set cqlfilter='codigo_estado = ''BRA-DF''' where layername = 'view_rodovias_estaduais' and layeralias like  '%Rod Estaduais - Distrito Federal (DF%';


update node_data set cqlfilter=null where layername = 'view_ferrovias' and layeralias = 'Ferrovias do Brasil';
update node_data set cqlfilter=null where layername = 'view_hidrovias' and layeralias = 'Hidrovias do Brasil';
update node_data set cqlfilter=null where layername = 'view_rotas_navegacao' and layeralias = 'Rotas de Navegação do Brasil';
update node_data set cqlfilter=null where layername = 'view_eixos_prioritarios' and layeralias = 'Eixos Prioritários';
update node_data set cqlfilter=null where layername = 'view_eixos_prioritarios_ativados' and layeralias = 'Eixos Prioritários Ativados';
update node_data set cqlfilter=null where layername = 'view_eixos_prioritarios_desativados' and layeralias = 'Eixos Prioritários Desativados';


update node_data set cqlfilter=null where layername = 'view_aerodromos_regiao' and layeralias = 'Aeroportos / Aeródromos do Mundo';
update node_data set cqlfilter='regiao_pais = 18' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da América do Sul';
update node_data set cqlfilter='regiao_pais IN (4,5)' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da América Central';
update node_data set cqlfilter='regiao_pais = 15' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da América do Norte';
update node_data set cqlfilter='cod_pais = ''BRA''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Brasil';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NO'')' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos - BR NORTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NE'')' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos - BR NORDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SE'')' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos - BR SUDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SU'')' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos - BR SUL';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''CO'')' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos - BR CENTRO-OESTE';
update node_data set cqlfilter='cod_pais = ''ARG''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da Argentina';
update node_data set cqlfilter='cod_pais = ''BOL''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da Bolívia';
update node_data set cqlfilter='cod_pais = ''CHL''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Chile';
update node_data set cqlfilter='cod_pais = ''COL''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da Colômbia';
update node_data set cqlfilter='cod_pais = ''ECU''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Equador';
update node_data set cqlfilter='cod_pais = ''PER''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Peru';
update node_data set cqlfilter='cod_pais = ''PRY''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Paraguai';
update node_data set cqlfilter='cod_pais = ''URY''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos do Uruguai';
update node_data set cqlfilter='cod_pais = ''VEN''' where layername = 'view_aerodromos_regiao' and layeralias = 'Aeródromos da Venezuela';


update node_data set cqlfilter=null where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Mundo';
update node_data set cqlfilter='regiao_pais = 18' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da América do Sul';
update node_data set cqlfilter='regiao_pais IN (4,5)' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da América Central';
update node_data set cqlfilter='regiao_pais = 15' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da América do Norte';
update node_data set cqlfilter='cod_pais = ''BRA''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Brasil';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NO'')' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos - BR NORTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NE'')' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos - BR NORDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SE'')' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos - BR SUDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SU'')' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos - BR SUL';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''CO'')' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos - BR CENTRO-OESTE';
update node_data set cqlfilter='cod_pais = ''ARG''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da Argentina';
update node_data set cqlfilter='cod_pais = ''CHL''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Chile';
update node_data set cqlfilter='cod_pais = ''COL''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da Colômbia';
update node_data set cqlfilter='cod_pais = ''ECU''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Equador';
update node_data set cqlfilter='cod_pais = ''PER''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Peru';
update node_data set cqlfilter='cod_pais = ''PRY''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Paraguai';
update node_data set cqlfilter='cod_pais = ''URY''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos do Uruguai';
update node_data set cqlfilter='cod_pais = ''VEN''' where layername = 'view_estacoes_portuarias' and layeralias = 'Portos da Venezuela';



update node_data set cqlfilter=null where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias do Mundo';
update node_data set cqlfilter='regiao_pais = 18' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias da América do Sul';
update node_data set cqlfilter='cod_pais = ''BRA''' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias do Brasil';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NO'')' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias - BR NORTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NE'')' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias - BR NORDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SE'')' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias - BR SUDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SU'')' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias - BR SUL';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''CO'')' where layername = 'view_estacoes_rodoviarias' and layeralias = 'Estações Rodoviárias - BR CENTRO-OESTE';




update node_data set cqlfilter=null where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias do Mundo';
update node_data set cqlfilter='regiao_pais = 18' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias da América do Sul';
update node_data set cqlfilter='cod_pais = ''BRA'') ' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias do Brasil';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NO'')' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias - BR NORTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NE'')' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias - BR NORDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SE'')' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias - BR SUDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SU'')' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias - BR SUL';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''CO'')' where layername = 'view_estacoes_ferroviarias' and layeralias = 'Estações Ferroviárias - BR CENTRO-OESTE';



update node_data set cqlfilter=null where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacias Hidrográficas';
update node_data set cqlfilter='gid = 1' where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacia Rio Amazonas';
update node_data set cqlfilter='gid = 2' where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacia Rio Tocantins';
update node_data set cqlfilter='gid = 3' where layername = 'view_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Norte/Nordeste';
update node_data set cqlfilter='gid = 4' where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacia Rio São Francisco';
update node_data set cqlfilter='gid = 5' where layername = 'view_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Leste';
update node_data set cqlfilter='gid = 6' where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacia Rio Paraná';
update node_data set cqlfilter='gid = 7' where layername = 'view_bacias_hidrograficas' and layeralias = 'Bacia Rio Uruguai';
update node_data set cqlfilter='gid = 8' where layername = 'view_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Sudeste';



update node_data set cqlfilter=null where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Sub-Bacias Hidrográficas';
update node_data set cqlfilter='bacia = ''1''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Bacia Rio Amazonas (sub-bacia)';
update node_data set cqlfilter='bacia = ''2''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Bacia Rio Tocantins (sub-bacia)';
update node_data set cqlfilter='bacia = ''3''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Norte/Nordeste (sub-bacia)';
update node_data set cqlfilter='bacia = ''4''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Bacia Rio São Francisco (sub-bacia)';
update node_data set cqlfilter='bacia = ''5''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Leste (sub-bacia)';
update node_data set cqlfilter='bacia = ''6''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Bacia Rio Paraná (sub-bacia)';
update node_data set cqlfilter='bacia = ''7''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Bacia Rio Uruguai (sub-bacia)';
update node_data set cqlfilter='bacia = ''8''' where layername = 'view_sub_bacias_hidrograficas' and layeralias = 'Atlântico-Trecho Sudeste (sub-bacia)';



update node_data set cqlfilter=null where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Instalações de Telecomunicações';
update node_data set cqlfilter='cod_pais = ''BRA''' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Brasil';
update node_data set cqlfilter='cod_pais <> ''BRA''' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Outros Países';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NO'')' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Região NORTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''NE'')' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Região NORDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SE'')' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Região SUDESTE';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''SU'')' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Região SUL';
update node_data set cqlfilter='(cod_pais = ''BRA'') AND (regiao_brasil = ''CO'')' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Região CENTRO-OESTE';
update node_data set cqlfilter='tipoid IN (1,2)' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Rede de Telefonia Celular';
update node_data set cqlfilter='tipoid IN (3,4)' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Rede de TV';
update node_data set cqlfilter='tipoid = 8' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Rede de SISCOMIS';
update node_data set cqlfilter='tipoid = 7' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Rede de Telemedicina SIVAN / SIPAM';
update node_data set cqlfilter='tipoid = 5' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Telecomunicações via Satélite';
update node_data set cqlfilter='tipoid = 9' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Rede de Radio-Goniometria';
update node_data set cqlfilter='(tipoid = 6) OR (tipoid > 9)' where layername = 'view_instalacoes_telecomunicacoes' and layeralias = 'Outros tipos';



update node_data set cqlfilter=null where layername = 'view_fontes_energeticas' and layeralias = 'Fontes Energéticas';
update node_data set cqlfilter='tipoid = 1' where layername = 'view_fontes_energeticas' and layeralias = 'Hidráulica';
update node_data set cqlfilter='tipoid = 2' where layername = 'view_fontes_energeticas' and layeralias = 'Fóssil';
update node_data set cqlfilter='tipoid = 3' where layername = 'view_fontes_energeticas' and layeralias = 'Solar';
update node_data set cqlfilter='tipoid = 4' where layername = 'view_fontes_energeticas' and layeralias = 'Biomassa';
update node_data set cqlfilter='tipoid = 5' where layername = 'view_fontes_energeticas' and layeralias = 'Eólica';
update node_data set cqlfilter='tipoid = 6' where layername = 'view_fontes_energeticas' and layeralias = 'Nuclear';
update node_data set cqlfilter='tipoid = 7' where layername = 'view_fontes_energeticas' and layeralias = 'Geotérmica';
update node_data set cqlfilter='tipoid = 8' where layername = 'view_fontes_energeticas' and layeralias = 'Gravitacional';
update node_data set cqlfilter='tipoid > 8' where layername = 'view_fontes_energeticas' and layeralias = 'Outra Fonte';



update node_data set cqlfilter=null where layername = 'view_reservas_minerais' and layeralias = 'Reservas Minerais';
update node_data set cqlfilter='categoria = ''M''' where layername = 'view_reservas_minerais' and layeralias = 'Minerais';
update node_data set cqlfilter='categoria = ''P''' where layername = 'view_reservas_minerais' and layeralias = 'Petrolíferas';
update node_data set cqlfilter='tipoid = 11' where layername = 'view_reservas_minerais' and layeralias = 'Petróleo';
update node_data set cqlfilter='tipoid = 7' where layername = 'view_reservas_minerais' and layeralias = 'Gás Natural';
update node_data set cqlfilter='tipoid = 1' where layername = 'view_reservas_minerais' and layeralias = 'Bauxita';
update node_data set cqlfilter='tipoid = 2' where layername = 'view_reservas_minerais' and layeralias = 'Carvão';
update node_data set cqlfilter='tipoid = 3' where layername = 'view_reservas_minerais' and layeralias = 'Cobre';
update node_data set cqlfilter='tipoid = 4' where layername = 'view_reservas_minerais' and layeralias = 'Cromo';
update node_data set cqlfilter='tipoid = 5' where layername = 'view_reservas_minerais' and layeralias = 'Estranho';
update node_data set cqlfilter='tipoid = 6' where layername = 'view_reservas_minerais' and layeralias = 'Ferro';
update node_data set cqlfilter='tipoid = 8' where layername = 'view_reservas_minerais' and layeralias = 'Manganês';
update node_data set cqlfilter='tipoid = 9' where layername = 'view_reservas_minerais' and layeralias = 'Níquel';
update node_data set cqlfilter='tipoid = 10' where layername = 'view_reservas_minerais' and layeralias = 'Ouro';
update node_data set cqlfilter='tipoid = 12' where layername = 'view_reservas_minerais' and layeralias = 'Potássio';
update node_data set cqlfilter='tipoid = 13' where layername = 'view_reservas_minerais' and layeralias = 'Prata';
update node_data set cqlfilter='tipoid = 14' where layername = 'view_reservas_minerais' and layeralias = 'Tungstênio';
update node_data set cqlfilter='tipoid = 15' where layername = 'view_reservas_minerais' and layeralias = 'Zinco';
update node_data set cqlfilter='tipoid > 15' where layername = 'view_reservas_minerais' and layeralias = 'Outras Reservas';




update node_data set cqlfilter=null where layername = 'view_usinas' and layeralias = 'Usinas';
update node_data set cqlfilter='regiao_brasil = ''NO''' where layername = 'view_usinas' and layeralias = 'Usinas Região - NORTE';
update node_data set cqlfilter='regiao_brasil = ''NE''' where layername = 'view_usinas' and layeralias = 'Usinas Região - NORDESTE';
update node_data set cqlfilter='regiao_brasil = ''SE''' where layername = 'view_usinas' and layeralias = 'Usinas Região - SUDESTE';
update node_data set cqlfilter='regiao_brasil = ''SU''' where layername = 'view_usinas' and layeralias = 'Usinas Região - SUL';
update node_data set cqlfilter='regiao_brasil = ''CO''' where layername = 'view_usinas' and layeralias = 'Usinas Região - CENTRO-OESTE';


update node_data set cqlfilter=null where layername = 'view_refinarias' and layeralias = 'Refinarias';
update node_data set cqlfilter='regiao_brasil = ''NO''' where layername = 'view_refinarias' and layeralias = 'Refinarias Região - NORTE';
update node_data set cqlfilter='regiao_brasil = ''NE''' where layername = 'view_refinarias' and layeralias = 'Refinarias Região - NORDESTE';
update node_data set cqlfilter='regiao_brasil = ''SE''' where layername = 'view_refinarias' and layeralias = 'Refinarias Região - SUDESTE';
update node_data set cqlfilter='regiao_brasil = ''SU''' where layername = 'view_refinarias' and layeralias = 'Refinarias Região - SUL';
update node_data set cqlfilter='regiao_brasil = ''CO''' where layername = 'view_refinarias' and layeralias = 'Refinarias Região - CENTRO-OESTE';



update node_data set cqlfilter=null where layername = 'view_plataformas_prospeccao' and layeralias = 'Plataformas de Prospecção';


update node_data set cqlfilter=null where layername = 'view_dutos' and layeralias = 'Dutos';
update node_data set cqlfilter='tipoid = 1' where layername = 'view_dutos' and layeralias = 'Gasodutos';
update node_data set cqlfilter='tipoid = 2' where layername = 'view_dutos' and layeralias = 'Oleodutos';
update node_data set cqlfilter='tipoid = 3' where layername = 'view_dutos' and layeralias = 'Aquedutos';
update node_data set cqlfilter='tipoid = 4' where layername = 'view_dutos' and layeralias = 'Minerodutos';
update node_data set cqlfilter='tipoid = 5' where layername = 'view_dutos' and layeralias = 'Polidutos';
update node_data set cqlfilter='tipoid > 5' where layername = 'view_dutos' and layeralias = 'Outros dutos';



update node_data set cqlfilter=null where layername = 'view_parques_nacionais' and layeralias = 'Parques Nacionais';
update node_data set cqlfilter='tipo = 1' where layername = 'view_parques_nacionais' and layeralias = 'Áreas de Proteção Ambiental';
update node_data set cqlfilter='tipo = 2' where layername = 'view_parques_nacionais' and layeralias = 'Área de Relevante Interesse Ecológico';
update node_data set cqlfilter='tipo = 3' where layername = 'view_parques_nacionais' and layeralias = 'Estação Ecológica';
update node_data set cqlfilter='tipo = 4' where layername = 'view_parques_nacionais' and layeralias = 'Floresta Nacional';
update node_data set cqlfilter='tipo = 5' where layername = 'view_parques_nacionais' and layeralias = 'Monumento Natural';
update node_data set cqlfilter='tipo = 6' where layername = 'view_parques_nacionais' and layeralias = 'Parque Nacional';
update node_data set cqlfilter='tipo = 7' where layername = 'view_parques_nacionais' and layeralias = 'Refúgio de Vida Silvestre';
update node_data set cqlfilter='tipo = 8' where layername = 'view_parques_nacionais' and layeralias = 'Reserva Biológica';
update node_data set cqlfilter='tipo = 9' where layername = 'view_parques_nacionais' and layeralias = 'Reserva de Desenvolvimento Sustentável';
update node_data set cqlfilter='tipo = 10' where layername = 'view_parques_nacionais' and layeralias = 'Reserva de Desenvolvimento Sustentável';
update node_data set cqlfilter='(uf LIKE ''%AC%'') OR (uf LIKE ''%AM%'') OR (uf LIKE ''%AP%'') OR (uf LIKE ''%PA%'') OR (uf LIKE ''%RO%'') OR (uf LIKE ''%RR%'')' where layername = 'view_parques_nacionais' and layeralias = 'Parques NORTE';
update node_data set cqlfilter='(uf LIKE ''%MA%'') OR (uf LIKE ''%PI%'') OR (uf LIKE ''%CE%'') OR (uf LIKE ''%RN%'') OR (uf LIKE ''%PB%'') OR (uf LIKE ''%PE%'') OR (uf LIKE ''%AL%'') OR (uf LIKE ''%SE%'') OR (uf LIKE ''%BA%'')' where layername = 'view_parques_nacionais' and layeralias = 'Parques NORDESTE';
update node_data set cqlfilter='(uf LIKE ''%MG%'') OR (uf LIKE ''%RJ%'') OR (uf LIKE ''%ES%'')' where layername = 'view_parques_nacionais' and layeralias = 'Parques SUDESTE';
update node_data set cqlfilter='(uf LIKE ''%SP%'') OR (uf LIKE ''%PR%'') OR (uf LIKE ''%SC%'') OR (uf LIKE ''%RS%'')' where layername = 'view_parques_nacionais' and layeralias = 'Parques SUL';
update node_data set cqlfilter='(uf LIKE ''%MT%'') OR (uf LIKE ''%MS%'') OR (uf LIKE ''%DF%'') OR (uf LIKE ''%GO%'') OR (uf LIKE ''%TO%'')) ' where layername = 'view_parques_nacionais' and layeralias = 'Parques CENTRO-OESTE';



update node_data set cqlfilter=null where layername = 'view_biomas' and layeralias = 'Biomas do Brasil';
update node_data set cqlfilter='gid = 1' where layername = 'view_biomas' and layeralias = 'Amazônia Legal';
update node_data set cqlfilter='gid = 2' where layername = 'view_biomas' and layeralias = 'Caatinga';
update node_data set cqlfilter='gid = 3' where layername = 'view_biomas' and layeralias = 'Cerrado';
update node_data set cqlfilter='gid = 4' where layername = 'view_biomas' and layeralias = 'Pampa';
update node_data set cqlfilter='gid = 5' where layername = 'view_biomas' and layeralias = 'Pantanal';
update node_data set cqlfilter='gid = 6' where layername = 'view_biomas' and layeralias = 'Mata Atlântica';



update node_data set cqlfilter=null where layername = 'view_cobertura_vegetal' and layeralias = 'Biomas do Brasil';


update node_data set cqlfilter=null where layername = 'view_org_mil' and layeralias = 'Organizações Militares';
update node_data set cqlfilter=null where layername = 'view_org_mil_operativa' and layeralias = 'OM Operativas';
update node_data set cqlfilter='om_pronto_emprego = TRUE' where layername = 'view_org_mil_operativa' and layeralias = 'OM Pronto Emprego';
update node_data set cqlfilter='cat_cod_om = ''MIL''' where layername = 'view_org_mil' and layeralias = 'OM Não Operativas';
update node_data set cqlfilter='cat_cod_om = ''OPE''' where layername = 'view_org_mil' and layeralias = 'OM Tipo Fronteira';


update node_data set cqlfilter='codigo = ''CMA''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M A';
update node_data set cqlfilter='codigo = ''CMN''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M N';
update node_data set cqlfilter='codigo = ''CMNE''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M Ne';
update node_data set cqlfilter='codigo = ''CML''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M L';
update node_data set cqlfilter='codigo = ''CMO''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M O';
update node_data set cqlfilter='codigo = ''CMP''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M P';
update node_data set cqlfilter='codigo = ''CMS''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M S';
update node_data set cqlfilter='codigo = ''CMSE''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área C M Se';
update node_data set cqlfilter='codigo LIKE ''DN01%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 1º D N';
update node_data set cqlfilter='codigo LIKE ''DN02%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 2º D N';
update node_data set cqlfilter='codigo LIKE ''DN03%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 3º D N';
update node_data set cqlfilter='codigo LIKE ''DN04%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 4º D N';
update node_data set cqlfilter='codigo LIKE ''DN05%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 5º D N';
update node_data set cqlfilter='codigo LIKE ''DN06%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 6º D N';
update node_data set cqlfilter='codigo LIKE ''DN07%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 7º D N';
update node_data set cqlfilter='codigo LIKE ''DN08%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 8º D N';
update node_data set cqlfilter='codigo LIKE ''DN09%''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 9º D N';
update node_data set cqlfilter='codigo = ''COMAR1''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área I COMAR';
update node_data set cqlfilter='codigo = ''COMAR2''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área II COMAR';
update node_data set cqlfilter='codigo = ''COMAR3''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área III COMAR';
update node_data set cqlfilter='codigo = ''COMAR4''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área IV COMAR';
update node_data set cqlfilter='codigo = ''COMAR5''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área V COMAR';
update node_data set cqlfilter='codigo = ''COMAR6''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área VI COMAR';
update node_data set cqlfilter='codigo = ''COMAR7''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área VII COMAR';
update node_data set cqlfilter='codigo = ''RM01''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 1ª R M';
update node_data set cqlfilter='codigo = ''RM02''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 2ª R M';
update node_data set cqlfilter='codigo = ''RM03''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 3ª R M';
update node_data set cqlfilter='codigo = ''RM04''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 4ª R M';
update node_data set cqlfilter='codigo = ''RM05''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 5ª R M';
update node_data set cqlfilter='codigo = ''RM06''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 6ª R M';
update node_data set cqlfilter='codigo = ''RM07''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 7ª R M';
update node_data set cqlfilter='codigo = ''RM08''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 8ª R M';
update node_data set cqlfilter='codigo = ''RM09''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 9ª R M';
update node_data set cqlfilter='codigo = ''RM10''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 10ª R M';
update node_data set cqlfilter='codigo = ''RM11''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 11ª R M';
update node_data set cqlfilter='codigo = ''RM12''' where layername = 'view_org_mil_dentro_area' and layeralias = 'OM - Área 12ª R M';



update node_data set cqlfilter='codigo = ''FRON050''' where layername = 'view_org_mil_dentro_fronteira' and layeralias = 'OM - Fronteira de 50 Km';
update node_data set cqlfilter='codigo = ''FRON100''' where layername = 'view_org_mil_dentro_fronteira' and layeralias = 'OM - Fronteira de 100 Km';
update node_data set cqlfilter='codigo = ''FRON150''' where layername = 'view_org_mil_dentro_fronteira' and layeralias = 'OM - Fronteira de 150 Km';



update node_data set cqlfilter='forcaid = 2' where layername = 'view_org_mil' and layeralias = 'Todas OM - EB';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - EB';
update node_data set cqlfilter='(forcaid = 2) AND (om_pronto_emprego = TRUE)' where layername = 'view_org_mil_operativa' and layeralias = 'OM Pronto Emprego - EB';
update node_data set cqlfilter='forcaid = 2) AND (status = ''OPE''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - EB - Operacionais';
update node_data set cqlfilter='forcaid = 2) AND (status = ''RES''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - EB - com Restrições';
update node_data set cqlfilter='forcaid = 2) and (cat_cod_om = ''MIL''' where layername = 'view_org_mil' and layeralias = 'OM Não Operativas - EB';
update node_data set cqlfilter='forcaid = 1' where layername = 'view_org_mil' and layeralias = 'OM - MB';
update node_data set cqlfilter='forcaid = 1' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - MB';
update node_data set cqlfilter='(forcaid = 1) AND (om_pronto_emprego = TRUE)' where layername = 'view_org_mil_operativa' and layeralias = 'OM Pronto Emprego - MB';
update node_data set cqlfilter='forcaid = 1) AND (status = ''OPE''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - MB - Operacionais';
update node_data set cqlfilter='forcaid = 1) AND (status = ''RES''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - MB - com Restrições';
update node_data set cqlfilter='forcaid = 1) and (cat_cod_om = ''MIL''' where layername = 'view_org_mil' and layeralias = 'OM Não Operativas - MB';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_org_mil' and layeralias = 'OM - FAB';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - FAB';
update node_data set cqlfilter='(forcaid = 3) AND (om_pronto_emprego = TRUE)' where layername = 'view_org_mil_operativa' and layeralias = 'OM Pronto Emprego - FAB';
update node_data set cqlfilter='forcaid = 3) AND (status = ''OPE''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - FAB - Operacionais';
update node_data set cqlfilter='forcaid = 3) AND (status = ''RES''' where layername = 'view_org_mil_operativa' and layeralias = 'Operativas - FAB - com Restrições';
update node_data set cqlfilter='forcaid = 3) and (cat_cod_om = ''MIL''' where layername = 'view_org_mil' and layeralias = 'OM Não Operativas - FAB';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_org_mil' and layeralias = 'OM - Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_org_mil' and layeralias = 'OM - Comando Combinado';




update node_data set cqlfilter=null where layername = 'view_org_civ_publica' and layeralias = 'Organizações Civis Públicas';
update node_data set cqlfilter='esfera_administrativa = ''FED''' where layername = 'view_org_civ_publica' and layeralias = 'Org. Federais';
update node_data set cqlfilter='esfera_administrativa = ''EST''' where layername = 'view_org_civ_publica' and layeralias = 'Org. Estaduais';
update node_data set cqlfilter='esfera_administrativa = ''MUN''' where layername = 'view_org_civ_publica' and layeralias = 'Org. Municipais';
update node_data set cqlfilter='tipo_civ = ''SEG''' where layername = 'view_org_civ_publica' and layeralias = 'Orgãos de Segurança Pública';
update node_data set cqlfilter='tipo_civ = ''DEC''' where layername = 'view_org_civ_publica' and layeralias = 'Orgãos Públicos de Defesa Civil';



update node_data set cqlfilter=null where layername = 'view_org_civ_privada' and layeralias = 'Organizações Civis Privadas';
update node_data set cqlfilter='tipo_capital = ''PRI''' where layername = 'view_org_civ_privada' and layeralias = 'Org. Capital Privado';
update node_data set cqlfilter='tipo_capital = ''ECM''' where layername = 'view_org_civ_privada' and layeralias = 'Org. Capital Misto';


update node_data set cqlfilter='aprovada_validacao = TRUE' where layername = 'view_org_civ_mobilizavel_portaria' and layeralias = 'Aprovadas Portaria';
update node_data set cqlfilter='aprovada_validacao = FALSE' where layername = 'view_org_civ_mobilizavel_portaria' and layeralias = 'Reprovadas Portaria';


update node_data set cqlfilter=null where layername = 'view_org_civ_mobilizavel' and layeralias = 'Interesse da Mobilização';
update node_data set cqlfilter='credenciada_eidn = TRUE' where layername = 'view_org_civ_mobilizavel' and layeralias = 'Credenciadas';
update node_data set cqlfilter='credenciada_eidn = FALSE' where layername = 'view_org_civ_mobilizavel' and layeralias = 'NÃO Credenciadas';


update node_data set cqlfilter=null where layername = 'view_org_civ_estrategica_defesa' and layeralias = 'Empresas Estratégicas de Defesa';
update node_data set cqlfilter=null where layername = 'view_org_civ_tipo' and layeralias = 'Org Civis Públicas / Privadas';
update node_data set cqlfilter='tipo = ''LOG''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Logística';
update node_data set cqlfilter='tipo = ''SEG''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Segurança';
update node_data set cqlfilter='tipo = ''DEC''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Defesa Civil';
update node_data set cqlfilter='tipo = ''AER''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Emp. Aérea';
update node_data set cqlfilter='tipo = ''TRP''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Transporte';
update node_data set cqlfilter='tipo = ''DEP''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Depósito';
update node_data set cqlfilter='tipo = ''AMZ''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Armazem';
update node_data set cqlfilter='tipo = ''PTG''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Parque de Tancagem';
update node_data set cqlfilter='tipo = ''MES''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Manutenção de Equipto de Saúde';
update node_data set cqlfilter='tipo = ''MED''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Medicina Legal';
update node_data set cqlfilter='tipo = ''SIN''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Sindicatos';
update node_data set cqlfilter='tipo = ''IHG''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Instalação de Hospedagem';
update node_data set cqlfilter='tipo = ''IAL''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Instalação de Alimentação';
update node_data set cqlfilter='tipo = ''ENS''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Instituição de Ensino';
update node_data set cqlfilter='tipo = ''CDE''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Centro Desportivo';
update node_data set cqlfilter='tipo = ''ADM''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Administrativa';
update node_data set cqlfilter='tipo = ''EST''' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Estaleiro';
update node_data set cqlfilter='tipo NOT IN (''LOG'',''SEG'',''DEC'',''AER'',''TRP'',''DEP'',''AMZ'',''PTG'',''MES'',''MED'',''SIN'',''IHG'',''IAL'',''ENS'',''CDE'',''ADM'',''EST'')' where layername = 'view_org_civ_tipo' and layeralias = 'Civil - Nenhum Tipo Acima';



update node_data set cqlfilter=null where layername = 'view_estabelecimentos_saude' and layeralias = 'Estabelecimentos de Saúde';
update node_data set cqlfilter='cat_org = ''M''' where layername = 'view_estabelecimentos_saude' and layeralias = 'OM de Saúde';
update node_data set cqlfilter='cat_org = ''C''' where layername = 'view_estabelecimentos_saude' and layeralias = 'Civis de Saúde';
update node_data set cqlfilter='(cat_org = ''C'') AND (cat_org_civ = ''PUB'')' where layername = 'view_estabelecimentos_saude' and layeralias = 'Públicas de Saúde';
update node_data set cqlfilter='(cat_org = ''C'') AND (cat_org_civ = ''PRI'')' where layername = 'view_estabelecimentos_saude' and layeralias = 'Privadas de Saúde';
update node_data set cqlfilter='(cat_org = ''C'') AND (cat_org_civ = ''PUB'') AND (esfera_administrativa = ''FED'')' where layername = 'view_estabelecimentos_saude' and layeralias = 'Públicas de Saúde - Federais';
update node_data set cqlfilter='(cat_org = ''C'') AND (cat_org_civ = ''PUB'') AND (esfera_administrativa = ''EST'')' where layername = 'view_estabelecimentos_saude' and layeralias = 'Públicas de Saúde - Estaduais';
update node_data set cqlfilter='(cat_org = ''C'') AND (cat_org_civ = ''PUB'') AND (esfera_administrativa = ''MUN'')' where layername = 'view_estabelecimentos_saude' and layeralias = 'Públicas de Saúde - Municipais';




update node_data set cqlfilter=null where layername = 'view_missoes_interesse_exterior_combo' and layeralias = 'Todas as Missões de Interesse no Exterior, oriundas do Apolo';
update node_data set cqlfilter='em_vigor = TRUE' where layername = 'view_missoes_interesse_exterior_combo' and layeralias = 'Missões de Interesse no Exterior em Andamento, oriundas do Apolo';
update node_data set cqlfilter='em_vigor = FALSE' where layername = 'view_missoes_interesse_exterior_combo' and layeralias = 'Missões de Interesse no Exterior Encerradas, oriundas do Apolo';



update node_data set cqlfilter=null where layername = 'view_operacoes_conjuntas_combo' and layeralias = 'Todas as Operações Conjuntas, oriundas do Apolo';
update node_data set cqlfilter='em_vigor = TRUE' where layername = 'view_operacoes_conjuntas_combo' and layeralias = 'Operações Conjuntas em Andamento, oriundas do Apolo';
update node_data set cqlfilter='em_vigor = FALSE' where layername = 'view_operacoes_conjuntas_combo' and layeralias = 'Operações Conjuntas Encerradas, oriundas do Apolo';


update node_data set cqlfilter='tipo_ope = ''OPCJ''' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Todas as Operações Conjuntas, oriundas do INTERC2 - SIPLOM';
update node_data set cqlfilter='tipo_ope = ''OPCJ'') AND (em_vigor = TRUE' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Operações Conjuntas em Andamento, oriundas do INTERC2 - SIPLOM';
update node_data set cqlfilter='tipo_ope = ''OPCJ'') AND (em_vigor = FALSE' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Operações Conjuntas Encerradas, oriundas do INTERC2 - SIPLOM';
update node_data set cqlfilter='tipo_ope = ''OPSG''' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Todas as Operações Singulares, oriundas do INTERC2 - SIPLOM';
update node_data set cqlfilter='tipo_ope = ''OPSG'') AND (em_vigor = TRUE' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Operações Singulares em Andamento, oriundas do INTERC2 - SIPLOM';
update node_data set cqlfilter='tipo_ope = ''OPSG'') AND (em_vigor = FALSE' where layername = 'view_interc2_operacoes_combo' and layeralias = 'Operações Singulares Encerradas, oriundas do INTERC2 - SIPLOM';




update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_demanda_transporte' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_demanda_transporte' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_demanda_transporte' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_demanda_transporte' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_demanda_transporte' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_oferta_transporte' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_oferta_transporte' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_oferta_transporte' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_oferta_transporte' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_oferta_transporte' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_demanda_suprimento' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_demanda_suprimento' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_demanda_suprimento' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_demanda_suprimento' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_demanda_suprimento' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_oferta_suprimento' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_oferta_suprimento' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_oferta_suprimento' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_oferta_suprimento' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_oferta_suprimento' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_demanda_sup_fundos' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_demanda_sup_fundos' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_demanda_sup_fundos' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_demanda_sup_fundos' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_demanda_sup_fundos' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter='forcaid = 1' where layername = 'view_serv_log_oferta_sup_fundos' and layeralias = 'Marinha';
update node_data set cqlfilter='forcaid = 2' where layername = 'view_serv_log_oferta_sup_fundos' and layeralias = 'Exército';
update node_data set cqlfilter='forcaid = 3' where layername = 'view_serv_log_oferta_sup_fundos' and layeralias = 'Força Aérea';
update node_data set cqlfilter='forcaid = 4' where layername = 'view_serv_log_oferta_sup_fundos' and layeralias = 'Min. Defesa';
update node_data set cqlfilter='forcaid = 5' where layername = 'view_serv_log_oferta_sup_fundos' and layeralias = 'Comando Conjunto';


update node_data set cqlfilter=null where layername = 'view_func_log_om_transporte' and layeralias = 'Transporte';
update node_data set cqlfilter=null where layername = 'view_func_log_om_suprimento' and layeralias = 'Suprimento';
update node_data set cqlfilter=null where layername = 'view_func_log_om_engenharia' and layeralias = 'Engenharia';
update node_data set cqlfilter=null where layername = 'view_func_log_om_manutencao' and layeralias = 'Manutenção';
update node_data set cqlfilter=null where layername = 'view_func_log_om_rec_humano' and layeralias = 'Recursos Humanos';
update node_data set cqlfilter=null where layername = 'view_func_log_om_salvamento' and layeralias = 'Salvamento';
update node_data set cqlfilter=null where layername = 'view_func_log_om_saude' and layeralias = 'Saúde';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_transporte' and layeralias = 'Transporte';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_suprimento' and layeralias = 'Suprimento';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_engenharia' and layeralias = 'Engenharia';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_manutencao' and layeralias = 'Manutenção';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_rec_humano' and layeralias = 'Recursos Humanos';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_salvamento' and layeralias = 'Salvamento';
update node_data set cqlfilter=null where layername = 'view_func_log_civ_saude' and layeralias = 'Saúde';
update node_data set cqlfilter=null where layername = 'Aeroportos_Brasil' and layeralias = 'Aeroportos do Brasil';
update node_data set cqlfilter=null where layername = 'view_dnit_obras_de_arte' and layeralias = 'DNIT - Obras de Arte';
update node_data set cqlfilter=null where layername = 'view_dnit_intersecoes' and layeralias = 'DNIT - Interseções';
update node_data set cqlfilter=null where layername = 'view_aerodromos_anac' and layeralias = 'Aeroportos / Aeródromos Brasil';


update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região Norte';
update node_data set cqlfilter='(regiao_br = ''NE'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região Nordeste';
update node_data set cqlfilter='(regiao_br = ''CO'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região Centro-Oeste';
update node_data set cqlfilter='(regiao_br = ''SE'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região Sudeste';
update node_data set cqlfilter='(regiao_br = ''SU'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região Sul';
update node_data set cqlfilter='(regiao_br = ''DESCONHECIDA'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Região ou UF Desconhecida';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Acre - AC';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Amazonas - AM';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Amapá - AP';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Pará - PA';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Rondônia - RO';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Roraima - RR';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Tocantins - TO';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Maranhão - MA';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Piauí - PI';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Ceará - CE';
update node_data set cqlfilter=null where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Rio Grande do Norte - RN';
update node_data set cqlfilter='(uf = ''PB'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Paraíba - PB';
update node_data set cqlfilter='(uf = ''PE'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Pernambuco - PE';
update node_data set cqlfilter='(uf = ''AL'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Alagoas - AL';
update node_data set cqlfilter='(uf = ''SE'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Sergipe - SE';
update node_data set cqlfilter='(uf = ''BA'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Bahia - BA';
update node_data set cqlfilter='(uf = ''MT'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Mato Grosso - MT';
update node_data set cqlfilter='(uf = ''MS'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Mato Grosso do Sul - MS';
update node_data set cqlfilter='(uf = ''DF'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Distrito Federal - DF';
update node_data set cqlfilter='(uf = ''GO'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Goiás - GO';
update node_data set cqlfilter='(uf = ''SP'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'São Paulo - SP';
update node_data set cqlfilter='(uf = ''MG'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Minas Gerais - MG';
update node_data set cqlfilter='(uf = ''RJ'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Rio de Janeiro - RJ';
update node_data set cqlfilter='(uf = ''ES'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Espírito Santo - ES';
update node_data set cqlfilter='(uf = ''PR'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Paraná - PR';
update node_data set cqlfilter='(uf = ''SC'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Santa Catarina - SC';
update node_data set cqlfilter='(uf = ''RS'')' where layername = 'view_dnpm_reservas_minerais' and layeralias = 'Rio Grande do Sul - RS';




update node_data set cqlfilter='capital = true' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Capitais';
update node_data set cqlfilter='populacao > 300000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Maior que 300 mil Habitantes';
update node_data set cqlfilter='populacao BETWEEN 100000 AND 300000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Entre 100 mil e 300 mil Habitantes';
update node_data set cqlfilter='populacao BETWEEN 50000 AND 100000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Entre 50 mil e 100 mil Habitantes';
update node_data set cqlfilter='populacao BETWEEN 25000 AND 50000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Entre 25 mil e 50 mil Habitantes';
update node_data set cqlfilter='populacao BETWEEN 10000 AND 25000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Entre 10 mil e 25 mil Habitantes';
update node_data set cqlfilter='populacao < 10000) AND (capital = false' where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Menor que 10 mil Habitantes';
update node_data set cqlfilter=null where layername = 'view_datasus_estabelecimentos_saude' and layeralias = 'DATASUS - Estab. Saúde - Todos';



update node_data set cqlfilter=null where layername = 'view_aneel_eol_aerogeradores' and layeralias = 'Aerogeradores';
update node_data set cqlfilter=null where layername = 'view_aneel_eol_parques_eolicos' and layeralias = 'Parques Eólicos';
update node_data set cqlfilter=null where layername = 'view_aneel_eol_regioes_interferencia' and layeralias = 'Regiões de Interferência';
update node_data set cqlfilter=null where layername = 'view_aneel_sgh_cgh' and layeralias = 'Centrais Geradoras Hidrelétricas';
update node_data set cqlfilter=null where layername = 'view_aneel_sgh_pch' and layeralias = 'Pequenas Centrais Hidrelétricas';
update node_data set cqlfilter=null where layername = 'view_aneel_sgh_usinas_hidreletricas' and layeralias = 'Usinas Hidrelétricas';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_cgu' and layeralias = 'Centrais Geradoras Undi-Elétricas';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_reservatorios_uhe' and layeralias = 'Reservatórios (UHE';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_usinas_fotovoltaicas' and layeralias = 'Usinas Fotovoltaicas';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_usinas_termeletricas' and layeralias = 'Usinas Termelétricas';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_usinas_termonucleares' and layeralias = 'Usinas Termonucleares';
update node_data set cqlfilter=null where layername = 'view_aneel_ons_linhas_transmissao' and layeralias = 'Linhas de Transmissão (ONS';
update node_data set cqlfilter=null where layername = 'view_aneel_distribuicao_areas_concessao' and layeralias = 'Áreas de Concessão de Distribuição de Energia';
update node_data set cqlfilter=null where layername = 'view_aneel_sigel_linhas_transmissao' and layeralias = 'Linhas de Transmissão (SIGEL';
update node_data set cqlfilter=null where layername = 'focos_2dias' and layeralias = 'Focos de Queimadas - 2 dias';
update node_data set cqlfilter=null where layername = 'WMS_DSA_INPE' and layeralias = 'Consolidação das imagens em uma só';
update node_data set cqlfilter=null where layername = '' and layeralias = 'Hospitais';
update node_data set cqlfilter=null where layername = 'rodovia_pavimentada' and layeralias = 'Rodovias Pavimentadas';
update node_data set cqlfilter=null where layername = 'government' and layeralias = 'Órgãos Governamentais';
update node_data set cqlfilter=null where layername = 'embassy' and layeralias = 'Embaixadas e afins';
update node_data set cqlfilter=null where layername = 'hospitals' and layeralias = 'Hospitais e Clínicas';
update node_data set cqlfilter=null where layername = 'ports' and layeralias = 'Portos';
update node_data set cqlfilter=null where layername = 'railroads' and layeralias = 'Ferrovias';
update node_data set cqlfilter=null where layername = 'militares' and layeralias = 'Áreas Militares';
update node_data set cqlfilter=null where layername = 'aerodromos' and layeralias = 'Aeródromos';
update node_data set cqlfilter=null where layername = 'railroads_stations' and layeralias = 'Estacoes Ferroviarias';
update node_data set cqlfilter=null where layername = 'rivers_water' and layeralias = 'Rios, Lagos e Afins';
update node_data set cqlfilter=null where layername = 'rios_esp_line' and layeralias = 'Rios Congo e Ubangi';
update node_data set cqlfilter=null where layername = 'GMB_adm0' and layeralias = 'Gambia - País';
update node_data set cqlfilter=null where layername = 'GMB_adm1' and layeralias = 'Gambia - Estados';
update node_data set cqlfilter=null where layername = 'GMB_adm2' and layeralias = 'Gambia - Localidades';
update node_data set cqlfilter=null where layername = 'GMB_roads' and layeralias = 'Gambia - Rodovias';
update node_data set cqlfilter=null where layername = 'GMB_water_lines_dcw' and layeralias = 'Gambia - Rios';
update node_data set cqlfilter=null where layername = 'GMB_water_areas_dcw' and layeralias = 'Gambia - Rios (áreas';
update node_data set cqlfilter=null where layername = 'GIN_adm0' and layeralias = 'Guine - País';
update node_data set cqlfilter=null where layername = 'GIN_adm1' and layeralias = 'Guine - Estados';
update node_data set cqlfilter=null where layername = 'GIN_adm2' and layeralias = 'Guine - Municípios';
update node_data set cqlfilter=null where layername = 'GIN_adm3' and layeralias = 'Guine - Localidades';
update node_data set cqlfilter=null where layername = 'GIN_roads' and layeralias = 'Guine - Rodovias';
update node_data set cqlfilter=null where layername = 'GIN_rails' and layeralias = 'Guine - Ferrovias';
update node_data set cqlfilter=null where layername = 'GIN_water_lines_dcw' and layeralias = 'Guine - Rios';
update node_data set cqlfilter=null where layername = 'GIN_water_areas_dcw' and layeralias = 'Guine - Rios (áreas';
update node_data set cqlfilter=null where layername = 'GNB_adm0' and layeralias = 'Guine Bissau -  País';
update node_data set cqlfilter=null where layername = 'GNB_adm1' and layeralias = 'Guine Bissau -  Estados';
update node_data set cqlfilter=null where layername = 'GNB_adm2' and layeralias = 'Guine Bissau -  Municípios';
update node_data set cqlfilter=null where layername = 'GNB_roads' and layeralias = 'Guine Bissau -  Rodovias';
update node_data set cqlfilter=null where layername = 'GNB_water_lines_dcw' and layeralias = 'Guine Bissau -  Rios';
update node_data set cqlfilter=null where layername = 'GNB_water_areas_dcw' and layeralias = 'Guine Bissau -  Rios (áreas';
update node_data set cqlfilter=null where layername = 'SEN_adm0' and layeralias = 'Senegal -  País';
update node_data set cqlfilter=null where layername = 'SEN_adm1' and layeralias = 'Senegal -  Estados';
update node_data set cqlfilter=null where layername = 'SEN_adm2' and layeralias = 'Senegal -  Municípios';
update node_data set cqlfilter=null where layername = 'SEN_adm3' and layeralias = 'Senegal -  Localidades';
update node_data set cqlfilter=null where layername = 'SEN_adm4' and layeralias = 'Senegal -  Distritos';
update node_data set cqlfilter=null where layername = 'SEN_roads' and layeralias = 'Senegal -  Rodovias';
update node_data set cqlfilter=null where layername = 'SEN_rails' and layeralias = 'Senegal -  Ferrovias';
update node_data set cqlfilter=null where layername = 'SEN_water_lines_dcw' and layeralias = 'Senegal -  Rios';
update node_data set cqlfilter=null where layername = 'SEN_water_areas_dcw' and layeralias = 'Senegal -  Rios (áreas';
update node_data set cqlfilter=null where layername = 'Aeroportos' and layeralias = 'Aeroportos';
update node_data set cqlfilter=null where layername = 'portos' and layeralias = 'Portos';
