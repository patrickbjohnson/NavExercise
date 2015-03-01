function jsonp(url, callback) {
   var script = document.createElement("script");
   script.setAttribute('type', 'text/javascript');
   script.setAttribute('src', url);
   // script.src = url;
   document.body.appendChild(script);
}

jsonp('/api/nav.json', function(data){
	for(i=0; i < data.length; i++){
		console.log(data[items]);
	}
	
});
