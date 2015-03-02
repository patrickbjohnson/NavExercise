function navActive(selector, func){
	// get parent element for nav links
	var parent = document.querySelector(selector);
	// add event listener to parent since
	// events bubble up
	// this means that any event on children
	// will be captured in this parent event listener
	parent.addEventListener('click', func, false);
}


// toggles menu dropdowns
function navToggle(e) {
    if (e.target !== e.currentTarget) {
    	 el = document.querySelectorAll('.nav-main--sub-trigger');
    	 e.target.classList.add('active');
		 for (var i = 0; i < el.length; i++){
		 	if (el[i].classList.contains('active')){
		 		el[i].classList.remove('active');
		 		e.target.classList.add('active');
		 	}
		 }
    } 
}


// toggles menu slide out
// and displays overlay
var menu = document.getElementById('menu');
menu.addEventListener('click', function(){
	document.getElementById('menu').classList.toggle('active');
	document.getElementById('nav-main').classList.toggle('active');
	document.getElementById('overlay').classList.toggle('active');
	document.getElementById('main').classList.toggle('active');
}, false);

// document.getElementById('Overlay').addEventListener('click', function(){
// 	this.classList.remove('active');
// },false);

var data = "api/nav.json";
var xml  = new XMLHttpRequest();
xml.open('GET', data , true);
xml.onreadystatechange = function(){
	if (xml.readyState === 4){
		if (xml.status === 200){
			var navlist = JSON.parse(xml.responseText);
			var listitem = '';

			// iterate over item for entire list
			for(i = 0; i < navlist.items.length; i++){
				// quick access to object & arrays
				var navitem = navlist.items[i];
				var label = navlist.items[i].label;
				var url = navlist.items[i].url;
				// if items array is empty
				// then no sub navs and create top level elements
				if (navitem.items.length == 0) {
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
			navActive("#nav-main", navToggle);
		}
	}
}
xml.send();



function addOverlay(){
	var overlay = document.getElementById('overlay');
	overlay.classList.toggle('active');
}

function toggle(selector){
	var el = document.getElementById(selector);
	el.classList.toggle('active');
}