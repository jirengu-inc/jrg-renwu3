<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sponsor Flip Wall With jQuery &amp; CSS | Tutorialzine demo</title>

<link rel="stylesheet" type="text/css" href="styles.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="jquery.flip.min.js"></script>

<script type="text/javascript" src="script.js"></script>

</head>

<body>

<h1>Sponsor Flip Wall With jQuery &amp; CSS</h1>
<h2><a href="http://tutorialzine.com/2010/03/sponsor-wall-flip-jquery-css/">Go Back to the Tutorial &raquo;</a></h2>

<?php

// Each sponsor is an element of the $sponsors array:

$sponsors = array(
	array('facebook','The biggest social network in the world.','http://www.facebook.com/'),
	array('adobe','The leading software developer targeted at web designers and developers.','http://www.adobe.com/'),
	array('microsoft','One of the top software companies of the world.','http://www.microsoft.com/'),
	array('sony','A global multibillion electronics and entertainment company ','http://www.sony.com/'),
	array('dell','One of the biggest computer developers and assemblers.','http://www.dell.com/'),
	array('ebay','The biggest online auction and shopping websites.','http://www.ebay.com/'),
	array('digg','One of the most popular web 2.0 social networks.','http://www.digg.com/'),
	array('google','The company that redefined web search.','http://www.google.com/'),
	array('ea','The biggest computer game manufacturer.','http://www.ea.com/'),
	array('mysql','The most popular open source database engine.','http://www.mysql.com/'),
	array('hp','One of the biggest computer manufacturers.','http://www.hp.com/'),
	array('yahoo','The most popular network of social media portals and services.','http://www.yahoo.com/'),
	array('cisco','The biggest networking and communications technology manufacturer.','http://www.cisco.com/'),
	array('vimeo','A popular video-centric social networking site.','http://www.vimeo.com/'),
	array('canon','Imaging and optical technology manufacturer.','http://www.canon.com/')
);


// Randomizing the order of sponsors:

shuffle($sponsors);

?>



<div id="main">

	<div class="sponsorListHolder">

		
        <?php
			
			// Looping through the array:
			
			foreach($sponsors as $company)
			{
				echo'
				<div class="sponsor" title="Click to flip">
					<div class="sponsorFlip">
						<img src="img/sponsors/'.$company[0].'.png" alt="More about '.$company[0].'" />
					</div>
					
					<div class="sponsorData">
						<div class="sponsorDescription">
							'.$company[1].'
						</div>
						<div class="sponsorURL">
							<a href="'.$company[2].'">'.$company[2].'</a>
						</div>
					</div>
				</div>
				
				';
			}
		
		?>

        
        
    	<div class="clear"></div>
    </div>

</div>

<p class="note">None of these companies are actually sponsors of Tutorialzine.</p>

</body>
</html>
