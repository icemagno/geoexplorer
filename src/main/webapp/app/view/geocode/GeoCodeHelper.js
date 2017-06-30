Ext.define("MCLM.view.geocode.GeoCodeHelper", {
    xtype: 'geoCodeHelper',
    id: 'geoCodeHelper',

    mapLayerGeoCode: null,
    vectorSourceMarker: null,
    vectorLayerMarker: null,

    requires: ['MCLM.view.geocode.GeoCodeWindow'],

    rua: null,
    bairro: null,
    cidade: null,
    estado: null,
    pais: null,
    coordenadas: null,
    geocodeView: null,
    geoIcon: null,
    clickedCoordinate: null,
    countryFlag: null,
    stateFlag: null,
    estadoSigla: null,
    moeda: null,
    nomeOficial: null,
    paisSigla: null,
    panToZoom: 12,

    getRoadsUrl: 'getAddressFromPoint',

    init: function (geoserverUrl, baseLayerName, rua, bairro, cidade, estado, pais, coordenadas) {


        var geocodeWindow = Ext.getCmp('geocodeWindow');
        if (!geocodeWindow) {
            geocodeWindow = Ext.create('MCLM.view.geocode.GeoCodeWindow');
        }
        geocodeWindow.show();
        geocodeWindow.helper = this;


        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.coordenadas = coordenadas;

        this.geocodeView = new ol.View({
            center: ol.proj.transform([-55.37109375, -17.39257927105777], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3
        })

        var geocodeLandLayer = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: geoserverUrl,
                params: {
                    'LAYERS': baseLayerName,
                    'FORMAT': 'image/png8'
                }
            })
        });

        this.mapLayerGeoCode = new ol.Map({
            target: 'geocodeMap',
            layers: [geocodeLandLayer],
            view: this.geocodeView

        });

        this.createMarkerLayer();

        if (coordenadas) {
            this.processCoordinates(coordenadas);

        } else {
            this.getAddressFromAddress(rua, bairro, estado, cidade, pais);
        }

        var me = this;
        this.mapLayerGeoCode.onClickBindKey = this.mapLayerGeoCode.on('click', function (event) {
            me.putIcon(event.coordinate);
            /**
             * Transformando a coordenada do Evento para a projeção correta para exibição.
             */
            var clickedCoordinate = ol.proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
            me.clickedCoordinate = clickedCoordinate;
            me.getAddressFromPoint(event.coordinate);
        });


    },

    processCoordinates: function (coordenadas) {
        var coord = coordenadas.split(",");
        var lat = Number(coord[0].trim());
        var lon = Number(coord[1].trim());
        this.clickedCoordinate = [lat, lon];
        var coordinate = ol.proj.transform(this.clickedCoordinate, 'EPSG:4326', 'EPSG:3857');
        this.getAddressFromPoint(coordenadas);
        this.panTo(coordenadas, this.panToZoom);
        this.putIcon(coordinate);
    },

    panTo: function (center, zoom) {
        var coord = center.split(",");
        var lat = Number(coord[0].trim());
        var lon = Number(coord[1].trim());
        var coordinate = ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');

        this.geocodeView.animate({
            zoom: zoom,
            center: coordinate,
            duration: 2000
        });

    },

    createMarkerLayer: function () {

        this.vectorSourceMarker = new ol.source.Vector();
        this.vectorLayerMarker = new ol.layer.Vector({
            source: this.vectorSourceMarker
        });
        this.vectorLayerMarker.set('name', 'geoMarker');
        this.vectorLayerMarker.set('alias', 'geoMarker');
        this.vectorLayerMarker.set('serialId', 'geoMarker');
        this.vectorLayerMarker.set('baseLayer', false);
        this.mapLayerGeoCode.addLayer(this.vectorLayerMarker);

    },

    putIcon: function (coordinate) {

        if (this.geoIcon)
            this.vectorSourceMarker.removeFeature(this.geoIcon);

        this.geoIcon = new ol.Feature({
            geometry: new ol.geom.Point(coordinate)
        });

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0.5, 30],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'resources/images/placeholder.png'
            }))
        });

        this.geoIcon.setStyle(iconStyle);
        this.vectorSourceMarker.addFeature(this.geoIcon);

    },

    showAddress: function () {
        var coord = ol.coordinate.toStringHDMS(this.clickedCoordinate);
        var geoCodePanel = Ext.getCmp('geoCodePanel');
        var bandeiraPais = "";
        var bandeiraEstado = "";

        if (this.countryFlag) {
            bandeiraPais = "<img title='" + this.nomeOficial + " (" + this.paisSigla + ")' style='cursor:pointer;border:1px solid #cacaca;width:35px;height:25px;' src='" + this.countryFlag + "'>";
        }
        if (this.stateFlag) {
            bandeiraEstado = "<img title='" + this.estado + " (" + this.estadoSigla + ")' style='cursor:pointer;border:1px solid #cacaca;width:35px;height:25px;' src='" + this.stateFlag + "'>";
        }

        var mainDiv = "<div style='position:relative;width:100%;height:100%'>" +
                "<div style='height:29px;width:100%'>" + coord + "</div>" +
                "<div style='height:35px;width:350px'>" + this.rua + ", " + this.cidade + ", " + this.estado + " (" + this.estadoSigla + "), " + this.pais + "</div>" +
                "<div style='top:0px;right:0px;position:absolute;'>" + bandeiraEstado + "</div>" +
                "<div style='top:0px;right:40px;position:absolute;'>" + bandeiraPais + "</div>" +
                "</div>";
        geoCodePanel.update(mainDiv);
    },

    getAddressFromAddress: function (rua, bairro, estado, cidade, pais) {

        var me = this;
        $("#alert_geocode").css("display", "block");
        var geoCodePanel = Ext.getCmp('geoCodePanel');
        geoCodePanel.update("Procurando por ruas contendo '" + rua + "' ...");

        Ext.Ajax.request({
            url: me.getRoadsUrl,
            params: {
                'rua': rua,
                'bairro': bairro,
                'estado': estado,
                'cidade': cidade,
                'pais': pais
            },
            success: function (response, opts) {

                geoCodePanel.update("Concluído.");

                var respObj = Ext.decode(response.responseText);

                var geoCodeRightPanel = Ext.getCmp('geoCodeRightPanel');
                geoCodeRightPanel.getStore().loadData(respObj);
                geoCodeRightPanel.show();

                me.mapLayerGeoCode.updateSize();
                $("#alert_geocode").css("display", "none");
            },
            failure: function (response, opts) {
                $("#alert_geocode").css("display", "none");
                Ext.Msg.alert('Erro', 'Erro ao receber os dados da coordenada selecionada.');
            }
        });
    },

    getAddressFromPoint: function (center) {
        var coordinate = ol.proj.transform(center, 'EPSG:3857', 'EPSG:4326');
        var me = this;
        $("#alert_geocode").css("display", "block");

        Ext.Ajax.request({
            url: me.getRoadsUrl,
            params: {
                'coordinate': coordinate
            },
            success: function (response, opts) {
                var respObj = Ext.decode(response.responseText);

                for (x = 0; x < respObj.length; x++) {
                    var res = respObj[x];

                    if (res.admin_level == '99999') {
                        var osmName = "(Rua Sem Nome)";
                        if (res.name != null)
                            osmName = res.name;
                        me.rua = osmName;
                    }
                    if (res.admin_level == '2') {
                        me.pais = res.name;
                        me.countryFlag = res.tags.flag;
                        me.moeda = res.tags.currency;
                        me.nomeOficial = res.tags.official_name;
                        me.paisSigla = res.tags["ISO3166-1"];
                    }
                    if (res.admin_level == '4') {
                        me.estado = res.name;
                        me.stateFlag = res.tags.flag;
                        me.estadoSigla = "";
                        if (res.tags.short_name) {
                            me.estadoSigla = res.tags.short_name;
                        }
                    }
                    if (res.admin_level == '8') {
                        me.cidade = res.name;
                    }
                }

                me.showAddress();
                $("#alert_geocode").css("display", "none");
            },
            failure: function (response, opts) {
                Ext.Msg.alert('Erro', 'Erro ao receber os dados da coordenada selecionada.');
                $("#alert_geocode").css("display", "none");
            }
        });
    }

});