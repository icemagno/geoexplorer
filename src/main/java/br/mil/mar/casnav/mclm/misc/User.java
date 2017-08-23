package br.mil.mar.casnav.mclm.misc;

public class User {
	private String userName;
	private String name;
	private String userAlias;
	private String userMail;
	private String cpfUser;
	private String orgId;
	private String siglaOm;
	private String idUser;
	private String hashKey;
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserAlias() {
		return userAlias;
	}

	public void setUserAlias(String userAlias) {
		this.userAlias = userAlias;
	}

	public String getUserMail() {
		return userMail;
	}

	public void setUserMail(String userMail) {
		this.userMail = userMail;
	}

	public String getCpfUser() {
		return cpfUser;
	}

	public void setCpfUser(String cpfUser) {
		this.cpfUser = cpfUser;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	public String getSiglaOm() {
		return siglaOm;
	}

	public void setSiglaOm(String siglaOm) {
		this.siglaOm = siglaOm;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
		
	}

	public void setHashKey(String key) {
		this.hashKey = key;
		
	}
	
	public String getHashKey() {
		return hashKey;
	}
	
	public String getIdUser() {
		return idUser;
	}


}
