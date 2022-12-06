// render map and markers
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGFrYXI3NSIsImEiOiJjbDFqZzV2NWUxZ3FhM2NwM2RhaWZvMXl0In0.eWrZ-dc86Uoo2NJcVYHztA';
	
	
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-71.091542, 42.358862],
			zoom: 12
		});

		async function firstMarker() {
		// get bus data    
		const locations = await getBusLocations();
		var marker = []
		for (let i=0; i<locations.length; i++){
			const a = locations[i].attributes;
			console.log(a);  //to see what other attributes we can use
			label = a.label;
			marker[i] = new mapboxgl.Marker()
				.setLngLat([a.longitude, a.latitude])
				.setPopup(new mapboxgl.Popup().setHTML("<h1>${a.label}</h1>")) 
				.addTo(map)
				console.log(marker[i])
		}
		return marker;
	}

	var marker = firstMarker()
	
	function removeMarker() {
		var markerDivs = document.getElementsByClassName("mapboxgl-marker mapboxgl-marker-anchor-center");
		var len = markerDivs.length;

		for (let i = 0; i < len; i++) {
			while (markerDivs.length>0) {
				markerDivs[i].parentNode.removeChild(markerDivs[i]);
			}
		}
	}
	

	function move() {
		setTimeout(()=> {
			removeMarker();
			firstMarker();
			move();
		},15000);
	};

	// Request bus data from MBTA
	async function getBusLocations() {
		const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
		const response = await fetch(url);
		const json = await response.json();
		return json.data;
	};
	
	move(); 

	