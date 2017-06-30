
package sistram4.web;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the sistram4.web package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetShipListData_QNAME = new QName("http://web.sistram4/", "GetShipListData");
    private final static QName _GetShipList_QNAME = new QName("http://web.sistram4/", "GetShipList");
    private final static QName _GetShipListDataResponse_QNAME = new QName("http://web.sistram4/", "GetShipListDataResponse");
    private final static QName _GetShipListResponse_QNAME = new QName("http://web.sistram4/", "GetShipListResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: sistram4.web
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetShipListData }
     * 
     */
    public GetShipListData createGetShipListData() {
        return new GetShipListData();
    }

    /**
     * Create an instance of {@link GetShipListResponse }
     * 
     */
    public GetShipListResponse createGetShipListResponse() {
        return new GetShipListResponse();
    }

    /**
     * Create an instance of {@link GetShipList }
     * 
     */
    public GetShipList createGetShipList() {
        return new GetShipList();
    }

    /**
     * Create an instance of {@link GetShipListDataResponse }
     * 
     */
    public GetShipListDataResponse createGetShipListDataResponse() {
        return new GetShipListDataResponse();
    }

    /**
     * Create an instance of {@link Navio }
     * 
     */
    public Navio createNavio() {
        return new Navio();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetShipListData }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://web.sistram4/", name = "GetShipListData")
    public JAXBElement<GetShipListData> createGetShipListData(GetShipListData value) {
        return new JAXBElement<GetShipListData>(_GetShipListData_QNAME, GetShipListData.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetShipList }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://web.sistram4/", name = "GetShipList")
    public JAXBElement<GetShipList> createGetShipList(GetShipList value) {
        return new JAXBElement<GetShipList>(_GetShipList_QNAME, GetShipList.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetShipListDataResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://web.sistram4/", name = "GetShipListDataResponse")
    public JAXBElement<GetShipListDataResponse> createGetShipListDataResponse(GetShipListDataResponse value) {
        return new JAXBElement<GetShipListDataResponse>(_GetShipListDataResponse_QNAME, GetShipListDataResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetShipListResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://web.sistram4/", name = "GetShipListResponse")
    public JAXBElement<GetShipListResponse> createGetShipListResponse(GetShipListResponse value) {
        return new JAXBElement<GetShipListResponse>(_GetShipListResponse_QNAME, GetShipListResponse.class, null, value);
    }

}
