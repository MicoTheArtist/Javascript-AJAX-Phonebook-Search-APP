<!doctype html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/ExternalStyle.css">
    <link href='http://fonts.googleapis.com/css?family=Anton|Josefin+Sans|Michroma' rel='stylesheet' type='text/css'>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="mySearch.js"></script>
</head>
<body class="entire_body_wrapper" onLoad="load()">

	<div class="body_wrapper">
        
        <ul id="title_Position">	<!-- title welocme for the first time -->
            <li class="Top_Bold_Title" >Welcome . . . . </li>
            <li  class="Small_top_title" >This is your first time Here ! ! !</li>
        </ul>
            
    <!--  End of the header  -->
    <!------------------------->
        
        <div class="Grey_Top_Gradiant_Wrapper">
            <form id="searchPhonebook">
                <input class="Search_Field" type="text" onKeyUp="sndReqKeyUp()" id="first" value="JoJo">
                <input id="btnSearch" class="Search_Button" type="button" onClick="sndReq()" value="Search Phonebook">
                <input type="hidden" id="histHelper" value="">
            </form>
        </div>
        

		<ul id="setYellowBack" class="Yellow_Suggestions1">
			<li class="name_suggestions" id="theNamePre"></li>
		</ul>
        
        
        <div class="Middle_Grey_Back_Wrapper">
            <div id="mymap" ></div>
            <ul class="address_text_wrapper">
            	<li><img id="image" src="JoJo.png"></li>
                <li id="theName">JoJo Jakob</li>
                <li id="address">25 Tennessee</li>
                <li id="phone">949-278-0625</li>
                <li ><a href="mailto:john@doe.com" id="email">JoJo@doe.com</a></li>
            </ul>
        </div>
                    

        
        <ul class="Bottom_Gray_Back_Wrapper">
            <li id="Bottom_Bold_Title">PREVIOUS SEARCHES</li>
            <li id="R1"></li>
            <li id="R2"></li>
        </ul>
        
        
            
        
    <!------------------------->
    <!-- start of the footer -->
        
	</div>
        
</body>
</html>

