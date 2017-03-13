package br.mil.mar.casnav.mclm.misc;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.conn.routing.HttpRoutePlanner;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.DefaultProxyRoutePlanner;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;


public class WebClient {
	private final String USER_AGENT = "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.13) Gecko/20101206 Ubuntu/10.10 (maverick) Firefox/3.6.13";

	public int doPutFile( File file, String contentType, String url, String content, String geoUser, String geoPassword ) throws Exception {
		int code = 0;
		
		String geoCreds = geoUser + ":" + geoPassword;
		String encodedAuth = new String( Base64.encodeBase64( geoCreds.getBytes() ) );
		HttpURLConnection con = (HttpURLConnection) new URL( url ).openConnection();
		con.setRequestMethod( "PUT" );
		con.setRequestProperty("Authorization", "Basic " + encodedAuth );
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Content-type", contentType);
		con.setConnectTimeout( 120000 );
		
		con.setDoOutput(true);
		OutputStream outputStream = con.getOutputStream();
		FileInputStream streamFileInputStream = new FileInputStream( file );
		BufferedInputStream streamFileBufferedInputStream = new BufferedInputStream(streamFileInputStream);		
		
		byte[] streamFileBytes = new byte[ 512 ];
		int bytesRead = 0;

		while ((bytesRead = streamFileBufferedInputStream.read(streamFileBytes)) > 0) {
			outputStream.write(streamFileBytes, 0, bytesRead);
		}		
		outputStream.flush();
		
		code = con.getResponseCode();
		
		try {
			InputStream inputStream = con.getInputStream();
			StringWriter writer = new StringWriter();
			IOUtils.copy(inputStream, writer, "UTF-8");
			String theString = writer.toString();
			inputStream.close();
			
			System.out.println( theString );
			
		} catch ( Exception e ) {
			e.printStackTrace();
		} 		
		
		con.disconnect();
		streamFileBufferedInputStream.close();
		return code;		
	}
	

	public int doRESTRequest( String requestMethod, String url, String content, String geoUser, String geoPassword ) throws Exception {
		int code = 0;
		
		String geoCreds = geoUser + ":" + geoPassword;
		String encodedAuth = new String( Base64.encodeBase64( geoCreds.getBytes() ) );
		HttpURLConnection con = (HttpURLConnection) new URL( url ).openConnection();
		con.setRequestMethod( requestMethod );
		con.setRequestProperty("Authorization", "Basic " + encodedAuth );
		con.setRequestProperty("User-Agent", USER_AGENT);
		con.setRequestProperty("Content-type", "text/xml");
		
		con.setDoOutput(true);
		con.getOutputStream().write( content.getBytes("UTF-8") );
		code = con.getResponseCode();
	
		// To use with GET method
		try {
			InputStream inputStream = con.getInputStream();
			StringWriter writer = new StringWriter();
			IOUtils.copy(inputStream, writer, "UTF-8");
			String theString = writer.toString();
			inputStream.close();
			
			System.out.println( "WebClient:doPostStream >>> " + theString );
		} catch ( Exception e ) {
			e.printStackTrace();
		}
		
		con.disconnect();
		return code;
		
	}
	
	
	@SuppressWarnings("unused")
	public void doPost( String url, String parameter, String content) throws Exception {
		CloseableHttpClient httpClient = HttpClientBuilder.create().build();
		HttpPost httppost;

		Configurator cfg = Configurator.getInstance();
		boolean useProxy = cfg.useProxy();
		String proxyHost = cfg.getProxyHost();
		String proxyUser = cfg.getProxyUser();
		String proxyPassword = cfg.getProxyPassword();
		int proxyPort = cfg.getProxyPort();
		
		if ( !useProxy ) {
			httpClient = HttpClientBuilder.create().build();
			httppost = new HttpPost( url );
		} else {
			CredentialsProvider credsProvider = new BasicCredentialsProvider();
			credsProvider.setCredentials( new AuthScope(proxyHost, proxyPort),  new UsernamePasswordCredentials(proxyUser, proxyPassword));		
			HttpHost proxy = new HttpHost(proxyHost, proxyPort);
			RequestConfig config = RequestConfig.custom().setProxy(proxy).build();			 
			httpClient = HttpClients.custom().setDefaultCredentialsProvider(credsProvider).build();	
			httppost = new HttpPost( url );
			httppost.setConfig(config);			 

		}
		
		
		String geoServerPassword = cfg.getGeoserverPassword();
		String geoServerUser = cfg.getGeoserverUser();
		String credString = geoServerUser + ":" + geoServerPassword;
		String encoding = new String( Base64.encodeBase64( credString.getBytes() ) );
		
		httppost.setHeader("User-Agent", USER_AGENT);
		httppost.setHeader("Authorization", "Basic " + encoding);
		httppost.setHeader("Content-type", "text/xml");
		
		
		// ---------------------------------------------------------------------------------
		
		// Request parameters and other properties.
		List<NameValuePair> params = new ArrayList<NameValuePair>(2);
		params.add(new BasicNameValuePair( parameter, content) );
		httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));

		/*
		HttpResponse httpResponse = httpClient.execute(httppost);
		InputStream inputStream = httpResponse.getEntity().getContent();		
		StringWriter writer = new StringWriter();
		IOUtils.copy(inputStream, writer, "UTF-8");
		String theString = writer.toString();
		httpClient.close();
		*/
	}

	public boolean testInternetConnection() {
		boolean testResult = false;
		String testUrl = "http://www.google.com/";
		try {
			doGet( testUrl );
			testResult = true;
		} catch ( Exception e ) {
			//
		}
		return testResult;
	}

	public String doGet(String url) throws Exception {
		
		System.out.println("DOGET: " + url );
		
		String result = "NO_ANSWER";
		CloseableHttpClient httpClient;
		HttpGet getRequest;
		
		Configurator cfg = Configurator.getInstance();
		boolean useProxy = cfg.useProxy();
		String proxyHost = cfg.getProxyHost();
		String proxyUser = cfg.getProxyUser();
		String proxyPassword = cfg.getProxyPassword();
		int proxyPort = cfg.getProxyPort();

		if ( !useProxy ) {
			httpClient = HttpClientBuilder.create().build();
			getRequest = new HttpGet(url);
		} else {
			CredentialsProvider credsProvider = new BasicCredentialsProvider();
			credsProvider.setCredentials( new AuthScope(proxyHost, proxyPort),  new UsernamePasswordCredentials(proxyUser, proxyPassword));		
			HttpHost proxy = new HttpHost(proxyHost, proxyPort);

			HttpRoutePlanner routePlanner = getHttpRoutePlanner( proxy, cfg );			
			
			RequestConfig config = RequestConfig.custom().setProxy(proxy).build();			 
			httpClient = HttpClients.custom().setRoutePlanner(routePlanner).setDefaultCredentialsProvider(credsProvider).build();	
			getRequest = new HttpGet(url);
			getRequest.setConfig(config);			 
		}
		
		getRequest.addHeader("accept", "application/json");
		getRequest.addHeader("Content-Type", "plain/text; charset=utf-8");
		getRequest.setHeader("User-Agent", USER_AGENT);

		HttpResponse response = httpClient.execute(getRequest);
		response.setHeader("Content-Type", "plain/text; charset=UTF-8");

		int stCode = response.getStatusLine().getStatusCode();

		if ( stCode != 200) {
			result = "Error " + stCode + " when accessing URL " + url;
		} else {
			HttpEntity entity = response.getEntity();
			InputStreamReader isr = new InputStreamReader(entity.getContent(), "UTF-8");
			result = convertStreamToString(isr);
			Charset.forName("UTF-8").encode(result);
			isr.close();
		}

		httpClient.close();
		return result;
	}	

	private String convertStreamToString(java.io.InputStreamReader is) {
		java.util.Scanner s = new java.util.Scanner(is);
		s.useDelimiter("\\A");
		String retorno = s.hasNext() ? s.next() : "";
		s.close();
		return retorno;
	}
	
	// Ignora enderecos locais no proxy
	private HttpRoutePlanner getHttpRoutePlanner ( HttpHost proxy, Configurator cfg ) {
		HttpRoutePlanner routePlanner = new DefaultProxyRoutePlanner( proxy ) {
		    @Override
		    public HttpRoute determineRoute( final HttpHost host, final HttpRequest request, final HttpContext context) throws HttpException {
		        String hostname = host.getHostName();
		        if ( cfg.getNonProxyHosts().contains( hostname ) ) {
		            return new HttpRoute(host);
		        }
		        return super.determineRoute(host, request, context);
		    }
		};
		return routePlanner;
	}
	
}
