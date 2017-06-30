package br.mil.mar.casnav.mclm.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="filter_item") 
public class FilterItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id_filter_item")
	private int idFilterItem;
	
	@Column(length=250)
	private String name;
	
	@Column(length=250)
	private String description;
	
	@Column(length=250)
	private String filter;
	
	@Column(length=250, name="human_filter")
	private String humanFilter;

	@Column(length=250, name="filter_def")
	private String filterDef;

	public FilterItem() {
		// TODO Auto-generated constructor stub
	}

	public int getIdFilterItem() {
		return idFilterItem;
	}

	public void setIdFilterItem(int idFilterItem) {
		this.idFilterItem = idFilterItem;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getFilter() {
		return filter;
	}

	public void setFilter(String filter) {
		this.filter = filter;
	}

	public String getHumanFilter() {
		return humanFilter;
	}

	public void setHumanFilter(String humanFilter) {
		this.humanFilter = humanFilter;
	}

	public String getFilterDef() {
		return filterDef;
	}

	public void setFilterDef(String filterDef) {
		this.filterDef = filterDef;
	}


}
