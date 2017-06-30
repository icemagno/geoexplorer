
package sistram4.web;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java de navio complex type.
 * 
 * <p>O seguinte fragmento do esquema especifica o conteúdo esperado contido dentro desta classe.
 * 
 * <pre>
 * &lt;complexType name="navio">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="id" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="irin" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="imo" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="mmsi" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="type" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="latitude" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="longitude" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="dt" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="startingport" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="portarrival" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="arrivaldatetime" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="course" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="speed" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="station" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "navio", propOrder = {
    "id",
    "irin",
    "name",
    "imo",
    "mmsi",
    "type",
    "latitude",
    "longitude",
    "dt",
    "startingport",
    "portarrival",
    "arrivaldatetime",
    "course",
    "speed",
    "station"
})
public class Navio {

    protected int id;
    protected String irin;
    protected String name;
    protected String imo;
    protected String mmsi;
    protected String type;
    protected String latitude;
    protected String longitude;
    protected String dt;
    protected String startingport;
    protected String portarrival;
    protected String arrivaldatetime;
    protected String course;
    protected String speed;
    protected String station;

    /**
     * Obtém o valor da propriedade id.
     * 
     */
    public int getId() {
        return id;
    }

    /**
     * Define o valor da propriedade id.
     * 
     */
    public void setId(int value) {
        this.id = value;
    }

    /**
     * Obtém o valor da propriedade irin.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIrin() {
        return irin;
    }

    /**
     * Define o valor da propriedade irin.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIrin(String value) {
        this.irin = value;
    }

    /**
     * Obtém o valor da propriedade name.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Define o valor da propriedade name.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Obtém o valor da propriedade imo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getImo() {
        return imo;
    }

    /**
     * Define o valor da propriedade imo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setImo(String value) {
        this.imo = value;
    }

    /**
     * Obtém o valor da propriedade mmsi.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMmsi() {
        return mmsi;
    }

    /**
     * Define o valor da propriedade mmsi.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMmsi(String value) {
        this.mmsi = value;
    }

    /**
     * Obtém o valor da propriedade type.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Define o valor da propriedade type.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Obtém o valor da propriedade latitude.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLatitude() {
        return latitude;
    }

    /**
     * Define o valor da propriedade latitude.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLatitude(String value) {
        this.latitude = value;
    }

    /**
     * Obtém o valor da propriedade longitude.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLongitude() {
        return longitude;
    }

    /**
     * Define o valor da propriedade longitude.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLongitude(String value) {
        this.longitude = value;
    }

    /**
     * Obtém o valor da propriedade dt.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDt() {
        return dt;
    }

    /**
     * Define o valor da propriedade dt.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDt(String value) {
        this.dt = value;
    }

    /**
     * Obtém o valor da propriedade startingport.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStartingport() {
        return startingport;
    }

    /**
     * Define o valor da propriedade startingport.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStartingport(String value) {
        this.startingport = value;
    }

    /**
     * Obtém o valor da propriedade portarrival.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPortarrival() {
        return portarrival;
    }

    /**
     * Define o valor da propriedade portarrival.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPortarrival(String value) {
        this.portarrival = value;
    }

    /**
     * Obtém o valor da propriedade arrivaldatetime.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getArrivaldatetime() {
        return arrivaldatetime;
    }

    /**
     * Define o valor da propriedade arrivaldatetime.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setArrivaldatetime(String value) {
        this.arrivaldatetime = value;
    }

    /**
     * Obtém o valor da propriedade course.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCourse() {
        return course;
    }

    /**
     * Define o valor da propriedade course.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCourse(String value) {
        this.course = value;
    }

    /**
     * Obtém o valor da propriedade speed.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpeed() {
        return speed;
    }

    /**
     * Define o valor da propriedade speed.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpeed(String value) {
        this.speed = value;
    }

    /**
     * Obtém o valor da propriedade station.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStation() {
        return station;
    }

    /**
     * Define o valor da propriedade station.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStation(String value) {
        this.station = value;
    }

}
