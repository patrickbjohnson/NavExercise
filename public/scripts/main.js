function navActive(selector, func){
	// any child event will be captured by parent event listener
	var parent = document.querySelector(selector);
	parent.addEventListener('click', func, false);
}

// toggles menu dropdowns
function navToggle(e) {
	if (!e.target.classList.contains('.no-sub', 'menu')){
		toggleSubNav(e.target, '.nav-main--sub-trigger');
		toggleOverlay(e.target);
	}
}

function toggleSubNav(element, css){
	if (element.classList.contains("nav-main--sub-trigger")){
		if (element.classList.contains('active')){
			  element.classList.remove('active');
		} else {
			var j = document.querySelectorAll(css);
			for (i=0;i<j.length; i++){
				j[i].classList.remove('active');
			}
			element.classList.add('active');
		}
	} else {
		var j = document.querySelectorAll(css);
		for (i=0;i<j.length; i++){
			j[i].classList.remove('active');
		}
	}
}

function toggleOverlay(element) {
	var o = document.getElementById('overlay');
	if (element.classList.contains('toggle-overlay')){
		if (element.classList.contains('active')){
			o.classList.add('active');
		} else {
			o.classList.remove('active');
		}		
	} else {
		o.classList.remove('active');
	}	
}

document.getElementById('menu').addEventListener('click', toggleMenu, false);
function toggleMenu(e){
	if (this.classList.contains('active')){
		this.classList.remove('active');
		document.getElementById('nav-main').classList.remove('active');
		document.getElementById('logo').classList.remove('active');
		document.getElementById('overlay').classList.remove('active');
	} else {
		this.classList.add('active');
		document.getElementById('nav-main').classList.add('active');
		document.getElementById('logo').classList.add('active');
		document.getElementById('overlay').classList.add('active');
	}
}

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
					listitem += '<li ><a class="no-sub" href="' + navitem.url + '">' + navitem.label + '</a></li>'; 
				} 
				else {
					listitem += '<li class="nav-main--sub-parent">';
					listitem += '<a class="nav-main--sub-trigger toggle-overlay" href="' + navitem.url + '">' + navitem.label + '</a>'; 
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
