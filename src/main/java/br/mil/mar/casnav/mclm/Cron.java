package br.mil.mar.casnav.mclm;

import br.mil.mar.casnav.mclm.persistence.infra.RepositoryMonitor;

public class Cron implements Runnable {

	@Override
	public void run() {
		// Verificar conectividade com o APOLO. Keep Alive na session.
		RepositoryMonitor.getInstance().listRepos();
		
	}

}
