var StatisticsController = {
	
	// the color distribution
	colorTotals : {
	    White : { color : 'White', total : 0 }
	    , Blue : { color : 'Blue', total : 0 }
	    , Black : { color : 'Black', total : 0 }
	    , Red : { color : 'Red', total : 0 }
	    , Green : { color : 'Green', total : 0 }
	}
	
	// the type distribution
	, typeTotals : {
		Land : { type : 'Land', total : 0 }
	    , Creature : { type : 'Creature', total : 0 }
	    , Instant : { type : 'Instant', total : 0 }
	    , Sorcery : { type : 'Sorcery', total : 0 }
	    , Artifact : { type : 'Artifact', total : 0 }
	    , Enchantment : { type : 'Enchantment', total : 0 }
	    , Planeswalker : { type : 'Planeswalker', total : 0 }
	}
	
	, cmcBreakdown : {
		'0' : 0
		, '1' : 0
		, '2' : 0
		, '3' : 0
		, '4' : 0
		, '5' : 0
		, '6' : 0
		, '7' : 0
		, '8' : 0
		, '9' : 0
		, '10' : 0
		, '11' : 0
		, '12' : 0
		, '13' : 0
		, '14' : 0
		, '15' : 0
		, '16' : 0
	}
	
	// TODO use the official magic colors
	, colors : {
		White : '#FAF0E6'
		, Blue : '#1f77b4'
		, Black : '#636363'
		, Red : '#d62728'
		, Green : '#31a354'
	}
	
	// graph attributes
	, width : 760
	, height : 300
	, outerRadius : Math.min(this.width,this.height) / 2
	, innerRadius : 0
	
	, initCmcBarGraph : function() {
		
		var xmax = 0;
		for( var i = 16; i >= 0; --i ){
		    var total = cmcBreakdown[i];
		    if( total > 0 ){
		        xmax = i;
		        break;
		    }
		}

		var ymax = d3.max(d3.values(cmcBreakdown));
		var yTicks = range(1, ymax);

		var margin = {top: 10, right: 10, bottom: 30, left: 30},
		    width = 400 - margin.left - margin.right,
		    height = 300 - margin.top - margin.bottom;

		var x = d3.scale.linear()
				  .domain([-1, xmax])
				  .range([0, width]);

		var y = d3.scale.linear()
				  .domain([0, d3.max(d3.values(cmcBreakdown), function(d) { return d; })])
				  .range([height,0]);

		var xAxis = d3.svg.axis()
					  .scale(x)
					  .tickValues(range(0,xmax))
					  .orient("bottom");

		var yAxis = d3.svg.axis()
					  .scale(y)
					  .tickValues(yTicks)
					  .orient("left");

		var svg = d3.select("#chart").append("svg")
		 			.attr("width", width + margin.left + margin.right)
		 			.attr("height", height + margin.top + margin.bottom)
		 			.append("g")
		 			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g")
		   .attr("class", "x axis")
		   .attr("transform", "translate(0," + height + ")")
		   .call(xAxis);

		svg.append("g")
		   .attr("class", "y axis")
		   .call(yAxis);

		var bars = svg.selectAll("rect")
		 			  .data( d3.values(cmcBreakdown) )
		 			  .enter().append("rect")
		 			  .attr("x", function(d,i) {return x(i) - 5;})
		 			  .attr("y", function(d) {return height - (height - y(d));})
		 			  .attr("width", 10)
		 			  .attr("height", function(d) {return height - y(d);})
		 			  .style("fill","blue");
		
	}
	
	, initColorPieGraph : function() {
		
		var self = this;
		
		var data = [];
		for( var key in self.colorTotals ){
		    data.push( self.colorTotals[key] );
		}
		
		var arc = d3.svg.arc()
					.innerRadius( self.innerRadius )
					.outerRadius( self.outerRadius );

		var svg = d3.select("body").append("svg")
		            .data( [data] )
		            .attr("width", self.width)
		            .attr("height", self.height)
		            .append("g")
		            .attr("transform", "translate(" + self.width/2 + "," + self.height/2 + ")");

		var pie = d3.layout.pie()
		            .value( function(d){ return d.total } )
		            .sort(null);

		var g = svg.selectAll(".arc")
		      	   .data(pie)
		           .enter().append("g")
		           .attr("class", "arc");

		g.append("path")
			.attr("d", arc)
			.style("fill", function(d){ return self.colors[d.data.color] });

		g.append("text")
		    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		    .attr("dy", ".35em")
		    .style("text-anchor", "middle")
		    .text( function(d){
		        if( d.data.total > 0 ) {
		            return d.data.total;
			} );
		
	}
	
	, initTypePieGraph : function() {
		
	}
	
	, addCardToStats : function( card ) {
		this.updateColorTotalsWithCard( card, 1 );
		this.updateTypeTotalsWithCard( card, 1 );
		this.updateCmcBreakdownWithCard( card, 1 );
	}
	
	, removeCardFromStats : function( card ) {
		this.updateColorTotalsWithCard( card, -1 );
		this.updateTypeTotalsWithCard( card, -1 );
		this.updateCmcBreakdownWithCard( card, -1 );
	}
	
	, updateCmcBreakdownWithCard : function( card, magnitude ) {
		var cmc = card.cmc;
		if( cmc >= 0 && cmc <= 16 ){
			this.cmcBreakdown[ card.cmc ] += magnitude;
		}
	}
	
	, updateColorTotalsWithCard : function( card, magnitude ) {
		
		// update the color totals based on the card's cost
		for( var i = 0; i < card.cost.length; ++i ) {
			var mana = card.cost.charAt(i);
			if( mana == 'W' ){
				this.colorTotals.White.total += magnitude;
			} else if( mana == 'U' ) {
				this.colorTotals.Blue.total += magnitude;
			} else if( mana == 'B' ) {
				this.colorTotals.Black.total += magnitude;
			} else if( mana == 'R' ) {
				this.colorTotals.Red.total += magnitude;
			} else if( mana == 'G' ) {
				this.colorTotals.Green.total += magnitude;
			}
		}
		
	}
	
	, updateTypeTotalsWithCard : function( card, magnitude ) {
		
		// determine the card type
		var type;
        if( (/Creature/g).test(type) ) {
            type = 'Creature';
        } else if( (/Land/g).test(type) ) {
            type = 'Land';
        } else if( (/Instant/g).test(type) ) {
            type = 'Instant';
        } else if( (/Sorcery/g).test(type) ) {
            type = 'Sorcery';
        } else if( (/Artifact/g).test(type) ) {
            type = 'Artifact';
        } else if( (/Enchantment/g).test(type) ) {
            type = 'Enchantment';
        } else if( (/Planeswalker/g).test(type) ) {
            type = 'Planeswalker';
        } else {
        	return;
        }
		
		// update the type total based on the card's type
		this.typeTotals[type].total += magnitude;
		
	}
	
};