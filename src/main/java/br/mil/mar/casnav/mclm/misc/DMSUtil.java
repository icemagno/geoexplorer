package br.mil.mar.casnav.mclm.misc;

import org.json.JSONArray;
import org.json.JSONObject;

public class DMSUtil 
{
    
    //Recebe uma string no formato "DDMMSSO/DDDMMSSO,DDMMSSO/DDDMMSSO, ...
    public static String toLatLonGeoJSON(String DMScoords)
    {   
        double[][] geometricCoordinates = DMSUtil.generateLatLonCoords(DMScoords);
        return DMSUtil.generateLatLonGeoJSON(geometricCoordinates);
    }
    
    private static double[][] generateLatLonCoords(String coordsPair)
    {       
        String[] normalizedCoords = DMSUtil.normalizeCoords(coordsPair);
        
        double[][] geometricCoordinates = new double[normalizedCoords.length][2];
        
        for (int i = 0; i < normalizedCoords.length; i++)   
        {    
            String[] coordPair = normalizedCoords[i].split(",");
            
            //Orientação das coordenadas
            char NSOrientation = coordPair[0].charAt(6);
            char WEOrientation = coordPair[1].charAt(7);
            
            String[][] splitCoord = DMSUtil.splitCoord(coordPair);
            
            double[] convertedNSCoord = DMSUtil.toNumericRepresentation(splitCoord[0]);
            double[] convertedWECoord = DMSUtil.toNumericRepresentation(splitCoord[1]);
            
            double lat = 0;
            double lon = 0;

            if (NSOrientation == 'S')
                lat = -(DMStoLatLonCoords(convertedNSCoord));
            else
                lat = DMStoLatLonCoords(convertedNSCoord);

            if (WEOrientation == 'W')
                lon = -(DMStoLatLonCoords(convertedWECoord));
            else
                lon = DMStoLatLonCoords(convertedWECoord);
            
            geometricCoordinates[i] = new double[] {lat, lon};
        }
        
        geometricCoordinates = assertFirstAndLast(geometricCoordinates);
            
        return geometricCoordinates;
    }
    
    private static double DMStoLatLonCoords(double[] dmsCoord)
    {
        return dmsCoord[0] + (dmsCoord[1] / 60) + (dmsCoord[2] / 3600);
    }
    
    //Padroniza a quantidade de caracteres de uma coordenada DMS recebida.
    //Se NS - 7 caracteres (DDMMSSO). Se WE - 8 caracteres (DDDMMSSO)
    private static String[] normalizeCoords(String coordsPair)
    {
        String filteredCoords[] = coordsPair.replaceAll(" ", "").split(",");
        
        for (int i = 0; i < filteredCoords.length; i++)
        {
            String[] coord = filteredCoords[i].split("/");
            
            if (coord[0].length() < 7)
                    coord[0] = "0" + coord[0];

            if (coord[1].length() < 8)
            {
                int currentLength = 8 - coord[1].length();
                for (int j = 0; j < currentLength; j++)
                    coord[1] = "0" + coord[1];
            }
            
            filteredCoords[i] = coord[0] + "," + coord[1];
        }
        
        return filteredCoords;
    }
    
    //Recebe um array normalizado vindo da função normalizeCoord
    private static String[][] splitCoord(String[] coordPair)
    {
        String NSCoord = coordPair[0].substring(0, 6);
        String WECoord = coordPair[1].substring(0, 7);
        
        //Coordenadas em array com graus, minutos e segundos
        String[] splittedNSCoord = NSCoord.split("(?<=\\G.{2})");
        String[] splittedWECoord = {WECoord.substring(0, 3), WECoord.substring(3, 5), WECoord.substring(5, 7)};
        
        return new String[][] { splittedNSCoord, splittedWECoord };
    }
    
    //Recebe um array String de 3 posições, onde: 0 = grau, 1 = minuto e 2 = segundo
    private static double[] toNumericRepresentation(String[] splittedDMS)
    {
        double[] convertedNSCoord = new double[splittedDMS.length];
        
        for (int i = 0; i < convertedNSCoord.length; i++)
            convertedNSCoord[i] = Double.parseDouble(splittedDMS[i]);
        
        return convertedNSCoord;
    }
    
    private static double[][] assertFirstAndLast(double[][] geometricCoordinates) 
    {
        double[][] replacingGeoCoordinates;
        
        if ( !(geometricCoordinates[0][0] == geometricCoordinates[geometricCoordinates.length - 1][0] &&
            geometricCoordinates[0][1] == geometricCoordinates[geometricCoordinates.length - 1][1]) )
        {
            replacingGeoCoordinates = new double[geometricCoordinates.length + 1][2];
            
            for (int i = 0; i < geometricCoordinates.length; i++)
                for (int j = 0; j < 2; j++)
                    replacingGeoCoordinates[i][j] = geometricCoordinates[i][j];
            
            replacingGeoCoordinates[replacingGeoCoordinates.length - 1] = replacingGeoCoordinates[0];
        }
        else
            return geometricCoordinates;
        
        return replacingGeoCoordinates;
    }
    
    //Recebe um array de coordenadas de um polígono e forma um GeoJSON
    private static String generateLatLonGeoJSON(double[][] coordinates) 
    {
        JSONObject baseObj = new JSONObject();
        JSONObject geomObj = new JSONObject();
        JSONArray geomArray = new JSONArray();
        
        
        baseObj.put("type", "Feature");
        baseObj.put("geometry", geomObj);
        geomObj.put("type", "Polygon");
        geomObj.put("coordinates", geomArray);

        for (int i = 0; i < coordinates.length; i++)
            for (int j = 0; j < coordinates[i].length; j++)
                geomArray.put(new double[] {coordinates[i][j], coordinates[i][j]});
        
        return baseObj.toString();
    }
}


