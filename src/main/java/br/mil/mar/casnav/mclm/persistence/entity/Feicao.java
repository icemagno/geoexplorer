package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="feicao") 
public class Feicao {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_feicao")
	private int idFeicao;
	
	@Column(length=250)
	private String nome;
	
	@Column(length=250)
	private String descricao;
	
	@Column(length=50)
	private String geomType;
	
	@Column( columnDefinition="TEXT" )
	private String metadados;
	
	@ManyToOne()
	@JoinColumn(name="id_feature_style", foreignKey = @ForeignKey(name = "fk_datalayer_feature_style"))
	private FeatureStyle style;	
	
	public Feicao() {
		// TODO Auto-generated constructor stub
	}
	
	public Feicao( String geomType, String nome, String descricao, String metadados, FeatureStyle style ) {
		this.nome = nome;
		this.descricao = descricao;
		this.metadados = metadados;
		this.geomType = geomType;
		this.style = style;
	}

	public int getIdFeicao() {
		return idFeicao;
	}

	public void setIdFeicao(int idFeicao) {
		this.idFeicao = idFeicao;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getMetadados() {
		return metadados;
	}

	public void setMetadados(String metadados) {
		this.metadados = metadados;
	}

	public String getGeomType() {
		return geomType;
	}

	public void setGeomType(String geomType) {
		this.geomType = geomType;
	}

	public FeatureStyle getStyle() {
		return style;
	}

	public void setStyle(FeatureStyle style) {
		this.style = style;
	}
	
	
	
}
