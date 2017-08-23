package br.mil.mar.casnav.mclm.action;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.StrutsStatics;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;

import com.opensymphony.xwork2.ActionContext;

import br.mil.mar.casnav.mclm.persistence.services.RouteService;

@Action(value="getAddressFromPoint", results= {  
	    @Result(name="ok", type="httpheader", params={"status", "200"}) }
)   

@ParentPackage("default")
public class GetAddressFromPointAction {
	private String coordinate;
	private String rua;
	private String bairro;
	private String pais;
	private String estado;
	private String cidade;
	
	
	public String execute(){

		try { 
			String result = "";
			
			RouteService rs = new RouteService();
			if ( coordinate != null ) { result = rs.getAddress( coordinate ); } else {
				result = rs.getAddress(rua, bairro, cidade, estado, pais);
			}
				
			
			HttpServletResponse response = (HttpServletResponse)ActionContext.getContext().get(StrutsStatics.HTTP_RESPONSE);
			response.setCharacterEncoding("UTF-8"); 
			response.getWriter().write( result );  
		} catch (Exception ex) {
			ex.printStackTrace();
			
		}
		return "ok";
	}

	public void setCoordinate(String coordinate) {
		this.coordinate = coordinate;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}


	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
	
}
