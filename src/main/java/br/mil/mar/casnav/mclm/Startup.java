package br.mil.mar.casnav.mclm;

import java.util.Set;
import java.util.concurrent.ScheduledExecutorService;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.mil.mar.casnav.mclm.misc.Configurator;
import br.mil.mar.casnav.mclm.persistence.entity.Config;
import br.mil.mar.casnav.mclm.persistence.entity.NodeData;
import br.mil.mar.casnav.mclm.persistence.exceptions.NotFoundException;
import br.mil.mar.casnav.mclm.persistence.infra.ConnFactory;
import br.mil.mar.casnav.mclm.persistence.services.ConfigService;
import br.mil.mar.casnav.mclm.persistence.services.DictionaryService;
import br.mil.mar.casnav.mclm.persistence.services.NodeService;


@WebListener
public class Startup implements ServletContextListener {
	private ScheduledExecutorService scheduler;
	
    private void loggerDebug( String log ) {
    	System.out.println( log );
    }
    
	@Override
    public void contextInitialized(ServletContextEvent event) {
    	ServletContext context = event.getServletContext();
    	String path = context.getRealPath("/");
    	System.setProperty("rootPath", path );

    	try {
       
    		// Isso inicia o monitor de conexoes. Serve para verificar connection leaks
    		/*
    		ScheduledExecutorService  scheduler = Executors.newSingleThreadScheduledExecutor();
    		Cron cron = new Cron();
    		scheduler.scheduleAtFixedRate( cron , 0, 1, TimeUnit.MINUTES);
    		*/
    		
    		
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
    		

    		 
    		
    		// Verifica novamente se todas as camadas estão com o dicionário carregado.
    		// Pode acontecer de no momento do cadastro da camada o link WMS esteja 
    		// fora do ar e não seja possivel buscar os atributos, entao tentamos novamente agora
    		// O ideal seria deixar para o usuario atualizar isso quando necessario.
    		
    		NodeService ns = new NodeService();
    		Set<NodeData> nodes = ns.getList();
    		DictionaryService ds = new DictionaryService();
			for( NodeData node : nodes ) {
				ds.newTransaction();
				try {
					ds.getDictionary( node.getIdNodeData() );
				} catch ( NotFoundException nfe ) {
					System.out.println("Atualizando dicionário para [" + node.getLayerType() + "] " + node.getLayerAlias() + "..." );
					int quant = ds.updateDictionary( node );
					System.out.println("Concluido com " + quant + " itens.");
				}
				
			}
			
    		
		} catch (Exception e) { 
			e.printStackTrace(); 
		}
        
        
	}
	
	@Override
    public void contextDestroyed(ServletContextEvent event) {
		loggerDebug("shutdown");
		try {
			scheduler.shutdownNow();
		} catch ( Exception e ) {}
    }
}
