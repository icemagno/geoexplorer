package br.com.cmabreu.geoexplorer;

import br.com.cmabreu.geoexplorer.persistence.infra.RepositoryMonitor;

public class Cron implements Runnable {

	@Override
	public void run() {
		// Verificar conectividade com o APOLO. Keep Alive na session.
		RepositoryMonitor.getInstance().listRepos();
		
	}

}
