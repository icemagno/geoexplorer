package br.mil.mar.casnav.mclm.misc;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.Authenticator;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;



public class Configurator {
	private Document doc;
	private static Configurator instance;
	private String userName;
	private String password;
	private String databaseName;
	private String databaseAddr;
	private String databasePort;

	private String apoloRESTAddress;
	private String apoloUserName;
	private String apoloPassword;
	private String apoloDatabaseName;
	private String apoloDatabaseAddr;
	private String apoloDatabasePort;
	
	private String aisApiKey;	
	private String aisApiPass;	
	
	public String getAisApiKey() {
		return aisApiKey;
	}

	public String getAisApiPass() {
		return aisApiPass;
	}

	public String getApoloRESTAddress() {
		return apoloRESTAddress;
	}

	public String getApoloUserName() {
		return apoloUserName;
	}

	public String getApoloPassword() {
		return apoloPassword;
	}

	public String getApoloDatabaseName() {
		return apoloDatabaseName;
	}

	public String getApoloDatabaseAddr() {
		return apoloDatabaseAddr;
	}

	public String getApoloDatabasePort() {
		return apoloDatabasePort;
	}


	private Config config;
	private NodeData feicaoRootNode;
	
	public NodeData getFeicaoRootNode() {
		return feicaoRootNode;
	}

	public void setFeicaoRootNode(NodeData feicaoRootNode) {
		this.feicaoRootNode = feicaoRootNode;
	}

	public void setJavaProxy() throws Exception {
		if ( !useProxy() ) return;		
		String proxyHost = getProxyHost();
		String proxyUser = getProxyUser();
		String proxyPassword = getProxyPassword();
		String nonProxyHosts = getNonProxyHosts();
		String proxyPort = String.valueOf( getProxyPort() );
		Authenticator.setDefault( new SimpleAuthenticator( proxyUser, proxyPassword ) );		
		Properties systemProperties = System.getProperties();
		systemProperties.setProperty("http.proxyHost", proxyHost);
		systemProperties.setProperty("http.proxyPort", proxyPort);
		systemProperties.setProperty("https.proxyHost", proxyHost);
		systemProperties.setProperty("https.proxyPort", proxyPort);
		systemProperties.setProperty("http.nonProxyHosts", nonProxyHosts);
	}	

	public void updateConfiguration( Config config ) throws Exception {
		this.config = config;
		setJavaProxy();
	}
	
	public String getExternalWorkspaceName() {
		return config.getExternalWorkspaceName();
	}
	
	public String getShapeFileTargetPath() {
		return config.getShapeFileTargetPath();
	}	

	public String getGeoserverUser() {
		return config.getGeoserverUser();
	}
	
	public String getNonProxyHosts() {
		return config.getNonProxyHosts();
	}

	public String getGeoserverPassword() {
		return config.getGeoserverPassword();
	}
	
	public int getProxyPort() {
		return config.getProxyPort();
	}
	
	public String getProxyHost() {
		return config.getProxyHost();
	}
	
	public String getProxyUser() {
		return config.getProxyUser();
	}
	
	public String getProxyPassword() {
		return config.getProxyPassword();
	}
	
	public boolean useProxy() {
		return config.isUseProxy();
	}

	public String getBaseLayer() {
		return config.getBaseLayer();
	}
	
	public String getGeoserverUrl() {
		return config.getGeoserverUrl();
	}
	
	public String getUserName() {
		return userName;
	}
	
	public String getDatabaseName() {
		return databaseName;
	}
	
	public String getDatabasePort() {
		return databasePort;
	}	
	
	public String getDatabaseAddr() {
		return databaseAddr;
	}	

	public String getPassword() {
		return password;
	}
	
	private String getTagValue(String sTag, Element eElement) throws Exception{
		try {
			NodeList nlList = eElement.getElementsByTagName(sTag).item(0).getChildNodes();
	        Node nValue = (Node) nlList.item(0);
			return nValue.getNodeValue();
		} catch ( Exception e ) {
			System.out.println("Error: Element " + sTag + " not found in configuration file.");
			throw e;
		}
	}
	
	public String getValue(String container, String tagName) {
		String tagValue = "";
		try {
			NodeList postgis = doc.getElementsByTagName(container);
			Node pgconfig = postgis.item(0);
			Element pgElement = (Element) pgconfig;
			tagValue = getTagValue(tagName, pgElement) ; 
		} catch ( Exception e ) {
		}
		return tagValue;
	}

	public static Configurator getInstance() throws Exception {
		if ( instance == null ) {
			throw new Exception("Configurator not initialized");
		}
		return instance;
	}
	
	public Config getConfig() {
		return config;
	}
	
	public String getRootFolder() throws Exception {
		File f = new File( this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI().getPath() );
		String rootFolder =  f.getAbsolutePath();
		rootFolder = rootFolder.substring(0, rootFolder.lastIndexOf( File.separator ) + 1).replace(File.separator, "/");
		return rootFolder;
	}	
	
	public boolean isExternalLayersToLocalServer() {
		return config.isExternalLayersToLocalServer();
	}
	
	public static Configurator getInstance( String file ) throws Exception {
		if ( instance == null ) {
			instance = new Configurator(file);
		}
		return instance;
	}
	
	private Configurator(String file) throws Exception {
		System.out.println("loading XML data from " + file );
		
		File fil = new File( file );
		if ( !fil.exists() ) {
			System.out.println("xml config file not found at folder");
			System.out.println( file );
			System.exit(0);
		}
		
		try {
			InputStream is = new FileInputStream( file ); 
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			doc = dBuilder.parse(is);
			doc.getDocumentElement().normalize();
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("XML file " + file + " not found.");
		}		
	}
	
	
	public void loadMainConfig()  {
		NodeList mapconfig = doc.getElementsByTagName("mclm");
		Node mpconfig = mapconfig.item(0);
		Element mpElement = (Element) mpconfig;
		try {
			userName = getTagValue("userName", mpElement);
			password = getTagValue("password", mpElement);
			databaseName = getTagValue("databaseName", mpElement);
			databaseAddr = getTagValue("databaseAddr", mpElement);
			databasePort = getTagValue("databasePort", mpElement);
			
			apoloRESTAddress = getTagValue("apoloRESTAddress", mpElement);
			apoloUserName = getTagValue("apoloUserName", mpElement);
			apoloPassword = getTagValue("apoloPassword", mpElement);
			apoloDatabaseName = getTagValue("apoloDatabaseName", mpElement);
			apoloDatabaseAddr = getTagValue("apoloDatabaseAddr", mpElement);
			apoloDatabasePort = getTagValue("apoloDatabasePort", mpElement);
			
			aisApiKey = getTagValue("aisApiKey", mpElement);
			aisApiPass = getTagValue("aisApiPass", mpElement);
			
		} catch ( Exception e ) {
			System.out.println( e.getMessage() );
		}
	}



}
