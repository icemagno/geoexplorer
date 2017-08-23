package br.mil.mar.casnav.mclm;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.commons.io.FileUtils;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.misc.PathFinder;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;
import br.mil.mar.casnav.mclm.persistence.services.DictionaryService;
import br.mil.mar.casnav.mclm.persistence.services.NodeService;


@WebListener
public class Startup implements ServletContextListener {
	//private ScheduledExecutorService scheduler;
	
	@Override
    public void contextInitialized(ServletContextEvent event) {
    	ServletContext context = event.getServletContext();
    	String path = context.getRealPath("/");
    	System.setProperty("rootPath", path );

    	try {
       
    		String imagesPath = PathFinder.getInstance().getPath() + "/tempmaps/";
    		FileUtils.deleteDirectory( new File(imagesPath) );
    		
    		//ScheduledExecutorService  scheduler = Executors.newSingleThreadScheduledExecutor();
    		//Cron cron = new Cron();
    		//scheduler.scheduleAtFixedRate( cron , 0, 1, TimeUnit.MINUTES);
    		
    		
    		String configFile = path + "WEB-INF/classes/config.xml";
			Configurator config = Configurator.getInstance( configFile );
			config.loadMainConfig();
			
			String user = config.getUserName();
			String passwd = config.getPassword();
			String database = config.getDatabaseName();
			String port = config.getDatabasePort();
			String databaseAddr = config.getDatabaseAddr();
			
    		ConnFactory.setCredentials(user, passwd, database, port, databaseAddr );
    		
    		try {
	    		ConfigService cs = new ConfigService();
				Config cfg = cs.getConfig();  
				Configurator.getInstance().updateConfiguration( cfg );
    		} catch ( NotFoundException e ) {
    			System.out.println("Nenhum registro encontrado na tabela de configuração.");
    		}
    		
    		
    		NodeService ns = new NodeService();
    		NodeData node = ns.getFeicaoRootNode();
			Configurator.getInstance().setFeicaoRootNode( node );
    		
    		// Verifica novamente se todas as camadas estao com o dicionario carregado.
    		// Pode acontecer de no momento do cadastro da camada o link WMS esteja 
    		// fora do ar e não seja possivel buscar os atributos, entao tentamos novamente agora
    		// O ideal seria deixar para o usuario atualizar isso quando necessario.
    		
    		if ( config.getConfig().getScanDictAtStartup() ) {
    			System.out.println("Atualização de dicionario solicitada...");
    			DictionaryService ds = new DictionaryService();
    			ds.scanDictionary();
    			System.out.println("Fim da atualização de dicionario.");
			
    		}
			
			// TEMP!
    		/*
			for( NodeData node : nodes ) {
				if ( node.getLayerType() == LayerType.FEI ) {
					String layerName = node.getLayerName();
					
					System.out.println("Processando Layer: " + layerName );
					
					//ns.newTransaction();
					//ns.updateNode(node);
					
					
				}
			}
			*/
    		
		} catch (Exception e) { 
			e.printStackTrace(); 
		}
        
        
	}
	
	@Override
    public void contextDestroyed(ServletContextEvent event) {
		
		System.out.println("Desligando MCLM.");
		/*
		try {
			scheduler.shutdownNow();
		} catch ( Exception e ) {
			
		}
		*/
    }
}
