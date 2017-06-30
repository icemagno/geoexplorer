package br.mil.mar.casnav.mclm.persistence.infra;

import java.util.ArrayList;
import java.util.List;

import br.mil.mar.casnav.mclm.persistence.repository.BasicRepository;

public class RepositoryMonitor {
	private List<BasicRepository> repos;
	private static RepositoryMonitor instance;
	
	public void addRepo( BasicRepository repo ) {
		repos.add( repo );
	}
	
	public static RepositoryMonitor getInstance() {
		if ( instance == null ) {
			instance = new RepositoryMonitor(); 
		}
		return instance;
	}
	
	private RepositoryMonitor() {
		System.out.println("Connection leak monitor activated.");
		repos = new ArrayList<BasicRepository>();
	}
	
	public void listRepos() {
		List<BasicRepository> found = new ArrayList<BasicRepository>();
		if ( repos.size() > 0 ) {
			for ( BasicRepository repo : repos ) {
				if ( !repo.isOpen() ) found.add( repo );
				System.out.println(" > " + repo.getSessionId() + " " + repo.getClass().getName() + " " + repo.isOpen() );
			}
		} else {
			//
		}
		repos.removeAll( found );
	}

}
