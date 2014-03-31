
	// variables 
	var ro;
	var browser;
	var http;
	var response;
	var listings;
	
	var geocoder;
	var map;
	var marker;
	var myOptions;
	var myaddress;
	var latlng;
	
	var name;
	var address;
	var phone;
	var found;
	
	var recent1 = initCookie('recent1');
	var recent2 = initCookie('recent2');
	var recent3 = initCookie('recent3');


/*
* @ initialize the cookie
*/
function initCookie(cookieName) {
	
	if (document.cookie.indexOf(cookieName + "=") == -1) {
		return "";
	}
	else {
		return getCookie(cookieName);
	}
}

/*
* @ get the requested cookie name from the cookie
*/
function getCookie(cookieName) {
	
	start = document.cookie.indexOf(cookieName + "=") + cookieName.length + 1;
	end = document.cookie.indexOf(';', start);  // the start number will come before the ';', so we are just testing weather the ';' exsists after the start number.
	
	if (end == -1) {
		end = document.cookie.length;
	}
	
	cookieLength = end - start;
	return(document.cookie.substr(start,cookieLength));
}

/*
* @	set the recent1 cookie to the most recent 'first' form entered name.
* @	if recent1 is already present than set recent2 to the value of the original recent1 value
*/
function setRecent(mostRecentName) {
	
	recent2 = recent1;
	recent1 = mostRecentName;
	document.cookie = 'recent1='+recent1;
	
	if (recent2.length >= 1) {
		document.cookie='recent2='+recent2;
	}
}

/*
* @	get the 'recent1' cookie and if it is present the 'recent2' cookie value and set
*	the respectivef R1 and R2 div innerHTML values to their cookie values.
*/
function getRecent() {
	
		if (recent2) {
			document.getElementById('R2').innerHTML = "<a href=\"#\" onClick=\"enterFieldName('"+getCookie('recent2')+"')\">"+getCookie('recent2')+"</a>";
			document.getElementById('R1').innerHTML = "<a href=\"#\" onClick=\"enterFieldName('"+getCookie('recent1')+"')\">"+getCookie('recent1')+"</a>";
		}
		else {
			document.getElementById('R1').innerHTML = "<a href=\"#\" onClick=\"enterFieldName('"+getCookie('recent1')+"')\">"+getCookie('recent1')+"</a>";
		}
}

/*
* @ enter the name of the entered value in the 'first' form field.
*/
function enterFieldName(enterTheName) {
	
	document.getElementById('first').value = enterTheName;
}

/*
* @ set the titleWelcome cookie value
* @ set recent3 to correct value.
*/
function titleWelcome(number) {
		
	numberRecent3 = document.cookie.indexOf('recent3');
	numberRecent1 = document.cookie.indexOf('recent1');
	
	if ((numberRecent3 == -1) && (numberRecent1 >= 0)) {
		
		// the very first value
		document.cookie = 'recent3='+getCookie('recent1');
		document.getElementById('title_Position').innerHTML = '<li class="Top_Bold_Title" >Welcome . . . . </li><li  class="Small_top_title" >'+getCookie('recent3')+'</li><li class="Rigth_TopButtonWropper"><input id="TheRightButton" class="Edit_Name_Button" src="bottomImage.png" type="button" onClick="titleWelcome(3)" value="Edit Name"></li>';

		Edit_Update_Button('TheRightButton', 'TheRightButton2');

	}
	else if ((numberRecent3 >= 0) && (!(number))) { 		
		
		// the straight name
		document.getElementById('title_Position').innerHTML = '<li class="Top_Bold_Title" >Welcome . . . . </li><li  class="Small_top_title" >'+getCookie('recent3')+'</li><li class="Rigth_TopButtonWropper"><input id="TheRightButton" class="Edit_Name_Button" src="bottomImage.png" type="button" onClick="titleWelcome(3)" value="Edit Name"></li>';

		Edit_Update_Button('TheRightButton', 'TheRightButton2');

	}
	else if (number == 3) {		
	
		// set the update form
		document.getElementById('title_Position').innerHTML = '<li class="Top_Bold_Title_Update" ><input type="text" id="UpdateId" class="update_name" value="'+getCookie('recent3')+'" ></li><li  class="Small_top_title" ><input id="TheRightButton" class="Edit_Name_Button" src="bottomImage.png" type="button" onClick="titleWelcome(4)" value="Udpate"></li>';

		Edit_Update_Button('TheRightButton', 'TheRightButton2');
		
	}
	else if (number == 4) {
		
		// set the new 'recent3' cookie and reset the form back with the new name.
		document.cookie = 'recent3='+document.getElementById('UpdateId').value;
		document.getElementById('title_Position').innerHTML = '<li class="Top_Bold_Title" >Welcome . . . . </li><li  class="Small_top_title" >'+getCookie('recent3')+'</li><li class="Rigth_TopButtonWropper"><input id="TheRightButton" class="Edit_Name_Button" src="bottomImage.png" type="button" onClick="titleWelcome(3)" value="Edit Name"></li>';

		Edit_Update_Button('TheRightButton', 'TheRightButton2');

	}
}
	
/*
 *	@ load the geo map objects and set the initial map parameters
 *
 *	@ on page load, every second check to make sure that that browser hash
 *	 name matches the hash name in the 'first' form value, or the first name.
 */
 function load(number) {
	 
	getRecent();
	geocoder = new google.maps.Geocoder();
	latlng = new google.maps.LatLng(37.4419, -122.1419);
	myOptions = {
		
		zoom: 13,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('mymap'), myOptions);
	
	searchButton();
	
	titleWelcome();

	Edit_Update_Button('TheRightButton', 'TheRightButton2');
	
	checkHash();
	window.setInterval('checkHash()', 1000);
	
 }
 
 /*
 * @ if the hash name does not match the 'first' form entered value then
 * 	 update the form values of both the 'first' and 'histHelper' values to match the hash name.
 */
 function checkHash() {
	 
	if (window.location.hash) {
		var theHash = window.location.hash.substring(1);
		if (theHash != document.getElementById('histHelper').value) {
			
			document.getElementById('histHelper').value = theHash;
			document.getElementById('first').value = theHash;
			sndReq();
		}
	}
 }

 /*
 * @ update the hash mark name to match the new name entered in the 'first' form value
 */
 function updateHistory(newName) {
	 
	window.location.hash = newName;
	document.getElementById('histHelper').value = newName;
 }

/*
*	This method is used to display both the new center position of the map
*	on the document object and the marker flag icon that plots the exact 
*	center of the map position.
*/
function showAddress(theAddress, name, address, phone) {
	myaddress = theAddress;															// theAddres is returned from the handleResponse method
	
	if (geocoder) {	
		geocoder.geocode({'address': myaddress}, function(results, status) {		// the value 'myaddress' is sent to the server and the result is retrieved and passed into a method
			
			if (status = google.maps.GeocoderStatus.OK) {							// if the result was returned successfuly
				map.setCenter(results[0].geometry.location);						// set net center location of the map using the returned result xml
				
				marker = new google.maps.Marker({									// set a marker on the newly centered map
				
					map: map,
					position: results[0].geometry.location							// set the marker icon at the newly created map center point.
				});
				
				showInfoWindow(map, marker, name, address, phone, 'testing');
			}
			else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	}
}
	 
/*
*	This method is responsible for the info window that appears when the marker
*	icon is clicked.
*/
function showInfoWindow(map, marker, name, address, phone) {

	var contentString = 'name: ' + name + '<br>address: ' + address + '<br>Phone Number: ' + phone;
	
	var infowindow = new google.maps.InfoWindow({					// this gives parameters and text for the pop-up window
												
		content: contentString,
		maxWidth: 200
		
	});
	
	google.maps.event.addListener(marker, 'click', function(){		// the event listenrer listens for when the marker icon is clicked, than calls into action the function.
															
		infowindow.open(map, marker, name, address, phone);
															
	});
}
 
/*
 *	create the request object
 */
 function createRequestObject() {
	 
	browser = navigator.appName;
	if (browser == "Microsoft Internet Explorer") {
		ro = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else {
		ro 	= new XMLHttpRequest();
	}
	return ro;
 }
 
 http = createRequestObject();
 
/*
 *	send the request object
 */
 function sndReq() {
	
	http.open('get', 'ajaxphone.xml', true);
	http.onreadystatechange = handleResponse;
	http.send(null);
 }

/*
 *	handle the response returned as the the xml object.
 */
 function handleResponse() {
	 
	found = 0;
	
	if (http.readyState == 4) { 
	
		document.getElementById('setYellowBack').className = '';
		document.getElementById('theNamePre').innerHTML = '';
		document.getElementById('theName').innerHTML = '';
		document.getElementById('address').innerHTML = '';
		document.getElementById('phone').innerHTML = '';
		document.getElementById('email').innerHTML = '';
		document.getElementById('image').src = '';
		
		searchLength = document.getElementById('first').value.length;
		response = http.responseXML.documentElement;
		listings = response.getElementsByTagName('LISTING');
		
		for (i=0; i<listings.length; i++) {
			
			
			
			firstobj = listings[i].getElementsByTagName('FIRST');
			lastobj = listings[i].getElementsByTagName('LAST');
			
			if (firstobj[0].firstChild.data.toLowerCase() == document.getElementById('first').value.toLowerCase()) {
				
				firstobj = listings[i].getElementsByTagName('FIRST');
				lastobj = listings[i].getElementsByTagName('LAST');
				addressobj = listings[i].getElementsByTagName('ADDRESS');
				phoneobj = listings[i].getElementsByTagName('PHONE');
				emailobj = listings[i].getElementsByTagName('EMAIL');
				imageobj = listings[i].getElementsByTagName('IMAGE');
				
				document.getElementById('theName').innerHTML = firstobj[0].firstChild.data + " " + lastobj[0].firstChild.data;
				document.getElementById('address').innerHTML = addressobj[0].firstChild.data;
				document.getElementById('phone').innerHTML = phoneobj[0].firstChild.data;
				document.getElementById('email').innerHTML = emailobj[0].firstChild.data;
				document.getElementById('image').src = imageobj[0].firstChild.data;
				
				theAddress = addressobj[0].firstChild.data;
				name = firstobj[0].firstChild.data + " " + lastobj[0].firstChild.data;
				address = addressobj[0].firstChild.data;
				phone = phoneobj[0].firstChild.data;

				showAddress(theAddress, name, address, phone);
				
				mostRecentName = firstobj[0].firstChild.data;
				setRecent(mostRecentName);
				
				getRecent(); // print out the most recent recent1 and recent2 cookie values
				
				updateHistory(firstobj[0].firstChild.data); // update the hash name
				
				found = 1;

			}
			
			else if (lastobj[0].firstChild.data.toLowerCase() == document.getElementById('first').value.toLowerCase()) {
								
				firstobj = listings[i].getElementsByTagName('FIRST');
				lastobj = listings[i].getElementsByTagName('LAST');
				addressobj = listings[i].getElementsByTagName('ADDRESS');
				phoneobj = listings[i].getElementsByTagName('PHONE');
				emailobj = listings[i].getElementsByTagName('EMAIL');
				imageobj = listings[i].getElementsByTagName('IMAGE');
				
				
				document.getElementById('theName').innerHTML = firstobj[0].firstChild.data + " " + lastobj[0].firstChild.data;
				document.getElementById('address').innerHTML = addressobj[0].firstChild.data;
				document.getElementById('phone').innerHTML = phoneobj[0].firstChild.data;
				document.getElementById('email').innerHTML = emailobj[0].firstChild.data;
				document.getElementById('image').src = imageobj[0].firstChild.data;
				
				theAddress = addressobj[0].firstChild.data;
				name = firstobj[0].firstChild.data + " " + lastobj[0].firstChild.data;
				address = addressobj[0].firstChild.data;
				phone = phoneobj[0].firstChild.data;

				showAddress(theAddress, name, address, phone);
				
				theMostRecentName = firstobj[0].firstChild.data;
				setRecent(theMostRecentName);
				
				getRecent(); // print out the most recent recent1 and recent2 cookie values
				
				updateHistory(firstobj[0].firstChild.data); // update the hash name
				
				found = 1;

			}
		}
		if (!found) {
			alert("There were no matches found....");
		}
	}
 }
 
/*
 *	send the request object when the key is up in the 'first' text box
 */
 function sndReqKeyUp() {
	
	http.open('get', 'ajaxphone.xml', true);
	http.onreadystatechange = handleResponseKeyUp;
	http.send(null);
 }
 
/*
 *	handle the response returned as the the xml object.
 *	Check and see if their are fragment matches for the name.
 */
 function handleResponseKeyUp() {
	 
	 if (http.readyState == 4) { 
			 

		document.getElementById('theNamePre').innerHTML = '';
		document.getElementById('theName').innerHTML = '';
		document.getElementById('address').innerHTML = '';
		document.getElementById('phone').innerHTML = '';
		document.getElementById('email').innerHTML = '';
		document.getElementById('image').src = '';
		document.getElementById('setYellowBack').className = "Yellow_Suggestions";
		
		searchLength = document.getElementById('first').value.length;
		response = http.responseXML.documentElement;
		listings = response.getElementsByTagName('LISTING');
		
		for (i=0; i<=listings.length; i++) {
			
			firstobj = listings[i].getElementsByTagName('FIRST');
			lastobj = listings[i].getElementsByTagName('LAST');
						
			if (firstobj[0].firstChild.data.substring(0, searchLength).toLowerCase() == document.getElementById('first').value.toLowerCase()) {
				
				document.getElementById('theNamePre').innerHTML = document.getElementById('theNamePre').innerHTML + "<a id=\"darkBrown\" href=\"#\" onClick=\"enterFieldName('"+firstobj[0].firstChild.data+"')\">" + firstobj[0].firstChild.data + " " + lastobj[0].firstChild.data +  '</a><br>';
				
				found = 1;
			}
			else if (lastobj[0].firstChild.data.substring(0, searchLength).toLowerCase() == document.getElementById('first').value.toLowerCase()) {
				
				document.getElementById('theNamePre').innerHTML = document.getElementById('theNamePre').innerHTML + "<a id=\"darkBrown\" href=\"#\" onClick=\"enterFieldName('"+firstobj[0].firstChild.data+"')\">" + lastobj[0].firstChild.data + '</a><br>';
				
				found = 1;
			}
		}
	 }
 }
	
/*
 *	This is the rollover for the 'Search Phonebook' button	
 */
 function searchButton() {
	
	TheNodeIs = document.getElementById('btnSearch');
	TheNodeIs.onmouseover = function() {
		this.className = 'Search_Button2';
	}
	TheNodeIs.onmouseout = function() {
		this.className = 'Search_Button';
	}
	
 }
	
/*
 *	This is the rollover for the 'Edit Name' button and 'Update Name' button
 */
 function Edit_Update_Button(originalId, newId) {
	
	TheNodeIs = document.getElementById(originalId);
	TheNodeIs.onmouseover = function() {
		this.id = newId;
	}
	TheNodeIs.onmouseout = function() {
		this.id = originalId;
	}
	
 }







