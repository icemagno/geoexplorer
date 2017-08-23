<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html manifest="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
	<link href="img/favicon.png" type="image/png" rel="shortcut icon" />

    <title>Módulo de Cenários Logísticos e de Mobilização - MCLM</title>

	<script type="text/javascript" src="extjs/ext-all.js"></script>
	
	<script type="text/javascript" src="extjs/classic/theme-gray/theme-gray.js"></script>
	<link rel="stylesheet" type="text/css" href="extjs/classic/theme-gray/resources/theme-gray-all.css">

	<!-- 
	<link rel="stylesheet" type="text/css" href="extjs/classic/theme-green/resources/Sisclaten-all.css">
	 -->
	
	<script type="text/javascript" src="app.js"></script>
	
<!-- OPENLAYERS -->
	<script type="text/javascript" src="js/ol.js"></script>
	<link rel="stylesheet" href="css/ol.css" type="text/css">
	
<!-- JQUERY -->
	<script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>

<!-- COLOR PICKER -->
	<link rel="stylesheet" media="screen" type="text/css" href="css/colorpicker.css" />
	<script type="text/javascript" src="js/colorpicker.js"></script>


<!-- INTERNO -->
	<link rel="stylesheet" type="text/css" href="css/style.css">
		
<script type="text/javascript" charset="utf-8">
	// http://phrogz.net/tmp/canvas_dashed_line.html
	if (window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype.lineTo){
		CanvasRenderingContext2D.prototype.dashedLine = function(x,y,x2,y2,dashArray){
			if (!dashArray) dashArray=[10,5];
			var dashCount = dashArray.length;
			this.moveTo(x, y);

			var dx = (x2-x), dy = (y2-y);
			var slope = dx ? dy/dx : 1e15;
			var distRemaining = Math.sqrt( dx*dx + dy*dy );
			var dashIndex=0, draw=true;
			while (distRemaining>=0.1 && dashIndex<10000){
				var dashLength = dashArray[dashIndex++%dashCount];
				if (dashLength==0) dashLength = 0.001; // Hack for Safari
				if (dashLength > distRemaining) dashLength = distRemaining;
				var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
				x += xStep
				y += slope*xStep;
				this[draw ? 'lineTo' : 'moveTo'](x,y);
				distRemaining -= dashLength;
				draw = !draw;
			}
			this.moveTo(0,0);
		}
	}
</script>
	
</head>
<body></body>
</html>
