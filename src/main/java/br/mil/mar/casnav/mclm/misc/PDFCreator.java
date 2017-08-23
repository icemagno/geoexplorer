package br.mil.mar.casnav.mclm.misc;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Font.FontFamily;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;

import br.mil.mar.casnav.mclm.persistence.entity.Scenery;
import br.mil.mar.casnav.mclm.persistence.entity.SceneryNode;
import br.mil.mar.casnav.mclm.persistence.services.SceneryService;


public class PDFCreator {

	private Paragraph getParagraph( float left, String text, Font footerFont ) {
        Paragraph pp = new Paragraph( text, footerFont );
        pp.setIndentationLeft( left );
        return pp;
	}
	
	
	public String gerarPDF( String path, int idCenario, User user ) throws Exception {
		String outputFolder = PathFinder.getInstance().getPath() + "/tempmaps/" + path;
		String pdfName = UUID.randomUUID().toString().toUpperCase().substring(0,8) + ".pdf";
		String pdfFullPath = outputFolder + File.separator + pdfName;
		
		Document document = new Document( PageSize.A4 );
		PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream( pdfFullPath ) );
		document.open();
		document.addCreator("APOLO");
		document.addAuthor("Carlos Magno Abreu");
		document.addTitle("CASNAV");
		document.addCreationDate();
		
		writer.setPageEvent( new HeaderAndFooter() );

		String brasaoDefesaPath = PathFinder.getInstance().getPath() + "/img/defesa.png";
		Image brasaoDefesa = Image.getInstance( brasaoDefesaPath );
		brasaoDefesa.scaleAbsolute(60,60);	
		brasaoDefesa.setAbsolutePosition( 35, PageSize.A4.getHeight() - brasaoDefesa.getScaledHeight() - 15);
		document.add(brasaoDefesa);

		Font footerFont = new Font(FontFamily.COURIER, 8, 0, BaseColor.BLACK );
		
		
		List<Image> thumbs = new ArrayList<Image>();
		document.add( new Paragraph("\n\n\n\n") );
		if ( idCenario > -1 ) {
			SceneryService ss = new SceneryService();
			Scenery scenery = ss.getScenery( idCenario );
			
			String sceneryName = scenery.getSceneryName();
			String sceneryDescription = scenery.getDescription();
			
	        SimpleDateFormat sdfDate = new SimpleDateFormat("dd/MM/yyyy");
	        SimpleDateFormat sdfTime = new SimpleDateFormat("HH:mm:ss");
	        Date sceneryDate = scenery.getCreationDate();
	        String strDate = sdfDate.format(sceneryDate);
	        String strTime = sdfTime.format(sceneryDate);			
			String author = scenery.getUserName();
			String sceneryCenter = scenery.getMapCenterHDMS();
			
			String baseMap = scenery.getBaseMap();
			
			document.add( getParagraph(0, "Cenário      : " + sceneryName , footerFont) );
			document.add( getParagraph(0, "Descrição    : " + sceneryDescription , footerFont) );
			document.add( getParagraph(0, "Centro       : " + sceneryCenter , footerFont) );
			document.add( getParagraph(0, "Criado em    : " + strDate + " " + strTime , footerFont) );
			document.add( getParagraph(0, "Criado por   : " + author , footerFont) );
			document.add( getParagraph(0, "Impresso por : " + user.getName() , footerFont) );
			document.add( new Paragraph("\n") );
			document.add( getParagraph(0, "Camadas: " , footerFont) );
			for ( SceneryNode node : scenery.getNodes() ) {
				String thumbPath = outputFolder + "/" + node.getLayer().getSerialId() + ".png";
				String error = "";
				try {
					Image thumb = Image.getInstance( thumbPath );
					thumbs.add( thumb );
				} catch ( Exception e ) {
					error = " ( Não foi possível gerar miniatura )";
				}
				document.add( getParagraph(0, "    " + node.getLayerAlias() + error , footerFont) );
			}
			
			String thumbPathFei = outputFolder + "/feicoes.png";
			String thumbPathMain = outputFolder + "/mclm_landlayer_cmoa.png";
			if ( new File(thumbPathFei).exists() ) {
				Image thumbFei = Image.getInstance( thumbPathFei );
				document.add( getParagraph(0, "    Camada de Feições", footerFont) );
				thumbs.add( thumbFei );
			}
			
			if ( new File(thumbPathMain).exists() ) {
				Image thumbMain = Image.getInstance( thumbPathMain );
				document.add( getParagraph(0, "    " + baseMap + " ( Camada de fundo )", footerFont) );
				thumbs.add( thumbMain );
			}
			
		} else {
			document.add( getParagraph(0, "Nenhum cenário definido." , footerFont) );
		}
		
		document.add( new Paragraph("\n\n") );
		
		String imageFileName = outputFolder + "/result.png";
		Image image = Image.getInstance( imageFileName );
		float scaler = ((document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin() ) / image.getWidth()) * 100;
		image.scalePercent(scaler);			
		image.setAlignment(Image.MIDDLE);
		image.setBorder( Image.BOX );
		image.setBorderWidth(1);
		document.add(image);
		
		document.add( new Paragraph("\n\n\n\n") );
		

		float thumbScaler;
		float offsetX = 10;
		float offsetY = 60;
		int y = 0;
		int x = 0;
		int h = 0;
		Paragraph p = new Paragraph();
		for ( Image thumb : thumbs ) {
			thumbScaler = ((document.getPageSize().getWidth() - document.leftMargin() - document.rightMargin() ) / image.getWidth()) * 20;
			thumb.scalePercent(thumbScaler);
			thumb.setBorder( Image.BOX );
			thumb.setBorderWidth(1);
			p.add( new Chunk(thumb, (offsetX * x) + 35, offsetY * y) );
			x++;
			h++;
			if ( h == 4 ) {
				h = 0;
				x = 0;
				y--;
			}
		}
		document.add( p );
		

		document.close();
		writer.close();
		return pdfFullPath;
	}

}
