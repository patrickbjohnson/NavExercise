var data = "api/nav.json";
var xml  = new XMLHttpRequest();
xml.open('GET', data , true);
xml.onreadystatechange = function(){
	if (xml.readyState === 4){
		if (xml.status === 200){
			var navlist = JSON.parse(xml.responseText);
			var listitem;
			// console.log(navlist.items);
			// iterate over item for entire list
			for(i = 0; i < navlist.items.length; i++){
				// quick access to object & arrays
				var navitem = navlist.items[i];
				var label = navlist.items[i].label;
				var url = navlist.items[i].url;
				// if items array is empty
				// then no sub navs and create top level elements
				if (navitem.items == 0) {
					console.log('zerip');
					listitem += '<li><a href="' + navitem.url + '">' + navitem.label + '</a></li>'; 
				} 
				// else, if items array has values
				// then create the sub navs
				else if (navitem.items.length > 0) {
					listitem += '<li class="nav-main--sub-parent">';
					listitem += '<a class="nav-main--sub-trigger" href="' + navitem.url + '">' + navitem.label + '</a>'; 
					listitem += '<ul class="nav-main--sub">';
					for (j = 0; j < navitem.items.length; j++){
						listitem +=		'<li>';
						listitem += '<a href="' + navitem.items[j].url + '">' + navitem.items[j].label + '</a></li>'; 
						listitem +=		'</li>';
					}
					listitem += '</ul>';
					listitem += '</li>';
				} 
				document.getElementById('nav-main').innerHTML = listitem;
			}
		}
	}
}
xml.send();










// var xmlhttp = new XMLHttpRequest(); 
// xmlhttp.open("GET", url,true);

// xmlhttp.onreadystatechange=function() {
// 	if (xmlhttp.readyState==4) {
// 	 	var navitem = JSON.parse(xmlhttp.responseText);
// 	  var i, items, j;
// 	  var row = ''

// 		for (i = 0; i < navitem.items.length; i++) {
// 			items = navitem.items[i];

// 			if (navitem.items[i].items.length == 0){
// 				row += '<li><a href="' + items.url + '">' + '<p>' + items.label + '</p></a></li>'; 
// 				var navlist = document.getElementById('nav-inner');         
// 			}

// 			else if (navitem.items[i].items.length > 0) {
// 				row += '<li><div class="secondary"><input type="radio" name="toggled" id="toggle-' + i + '" class="toggle"><label for="toggle-' + i + '">' + '<a for="toggle-' + i + '">' + items.label + '</a>' + '<div class="arrow" for="toggle-' + i + '"></div></label><div class="dropdown"><ul>'

// 				for (j = 0; j < navitem.items[i].items.length; j++) {
// 						secondary = navitem.items[i].items[j];
// 						row += '<li><a href="' + secondary.url + '">'  + secondary.label + '</a></li>';
// 						var navlist = document.getElementById('nav-inner');        
// 						navlist.innerHTML = row; 
// 					}

// 				row += '</ul></div></div></li>';
// 			}
// 		}
// 	}
// }
// xmlhttp.send(null)