var TypeaheadController = {
    
    chosenMultiverse : ''
    , typeaheadMap : {}


	, updater : function (item) {
		
		// set the multiverse as the chosen card
		// NOTE: item = '[name] - [set]'
		var multiverse = this.typeaheadMap[item];
		
		ViewModel.updatePreviewImage(multiverse);
		ViewModel.updateThumbImage(multiverse);
		
		TypeaheadController.chosenMultiverse = multiverse;
		
		$('.typeahead').css('display','none');
		$('#builder-add-card-prompt').css('display','block');

		return item;

	}
	
    , select: function () {
		var val = this.$menu.find('.active').attr('data-value')
		// Updates text in html input
        this.$element.val(this.updater(val)).change();
        return this
      }

	, show: function () {
	
		$('#builder-add-card-prompt').hide();
		this.$menu.insertAfter($('#builder-card-list-marker')).show();
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);

		this.shown = true;
		return this;
	
	}
	
    , hide: function () {
  	    $('.typeahead').css('display','none');
        this.shown = false
        return this
      }
	
	, render: function (items) {
	
		var self = this;

		items = $(items).map(function (i, item) {
			var multiverse = self.typeaheadMap[item];
			i = $(self.options.item).attr( {
				'data-value': item
				, 'data-multiverse': multiverse
			} )
			i.find('a').html(self.highlighter(item))
			return i[0]
		} );

		items.first().addClass('active')
		
		this.$menu.html(items);
		
		return this;

	}
	
	, next: function (event) {
	
		var active = this.$menu.find('.active').removeClass('active')
		var next = active.next()

		if (!next.length) {
			next = $(this.$menu.find('div')[0])
		}

		next.addClass('active')
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);
		
	}

	, prev: function (event) { //event
	
		var active = this.$menu.find('.active').removeClass('active');
		var prev = active.prev();

		if (!prev.length) {
			prev = this.$menu.find('div').last()
		}

		prev.addClass('active')
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);
	
	}

	, listen: function () {
	
		this.$element
			.on('focus',    $.proxy(this.focus, this))
			.on('blur',     $.proxy(this.blur, this))
			.on('keypress', $.proxy(this.keypress, this))
			.on('keyup',    $.proxy(this.keyup, this))

		if (this.eventSupported('keydown')) {
			this.$element.on('keydown', $.proxy(this.keydown, this))
		}

		this.$menu
			.on('click', $.proxy(this.click, this))
			.on('mouseenter', 'div', $.proxy(this.mouseenter, this))
			.on('mouseleave', 'div', $.proxy(this.mouseleave, this))
	
	}
	
    , mouseenter: function (e) {
		this.mousedover = true
        this.$menu.find('.active').removeClass('active')
        $(e.currentTarget).addClass('active')
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);
    }

	, source : function (query, process) {
		
		var cards = [];
		var map = {};
		
		// put the card data into the process array
		$.each( MultiverseToNameSetMapOld, function(multiverse, meta) {
			var processKey = meta.name + " - " + meta.set;
			map[processKey] = multiverse;
			cards.push( processKey );
		} );
		$.each( MultiverseToNameSetMapNew, function(multiverse, meta) {
			var processKey = meta.name + " - " + meta.set;
			map[processKey] = multiverse;
			cards.push( processKey );
		} );
		
		this.typeaheadMap = map;

		process(cards);

	}
    
    , initTypeahead : function() {
		
        $('#builder-input').typeahead( {
    		updater: this.updater
			, select: this.select
			, show: this.show
			, hide: this.hide
			, render: this.render
			, next: this.next
			, prev: this.prev
			, listen: this.listen
			, source: this.source
			, mouseenter: this.mouseenter
			, items : 449
		    , menu: '<div class="typeahead"></div>'
		    , item: '<div class="typeahead-embedded-item"><a href="#"></a></div>'
    	} );
		
		$('#profile-settings-image-input').typeahead({

			
				source: function (query, process) {
					/*
					cards = [];
				    map = {};
					
						var setList = ["GTC", "RTR", "M13", "ISD", "AVR", "DKA"];
					
						var setData;
						var cardData;
				    var data = [ ];
					
						$.each( setList, function ( i, setID ) {
						
							setData = SetController.getSet(setID);
							cardData = setData.card_data;
					
							$.each( cardData, function( index, value ) {
									var cardObj = { cardName : value.name, multiverse : value.multiverse };
									data.push( cardObj );
							} );
						
						} );
					
 
				    $.each( data, function (key, cardObj) {
				        map[ cardObj.cardName ] = cardObj;
				        cards.push( cardObj.cardName );
				    } );
 
				    process(cards);
					*/
					
					var cards = [];
					var map = {};
		
					// put the card data into the process array
					$.each( MultiverseToNameSetMapNew, function(multiverse, meta) {
						var processKey = meta.name + " - " + meta.set;
						map[processKey] = multiverse;
						cards.push( processKey );
					} );
		
					this.typeaheadMap = map;

					process(cards);
					
				}
			
				, updater: function (item) {
				
					//console.log('Typeahead updater');
					$('#profile-settings-image-input').tooltip('hide');
				
					var multiverse = map[item].multiverse;
					$('.typeahead').attr('data-multiverse', multiverse);
					var multiverseURL = "url('http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + multiverse + "&type=card')";
					//console.log(multiverseURL);
			
					var target = $('#profile-settings-thumbnail-wrapper');
			
					var targetH = target.height();
			
					if (targetH > 0) {
						console.log('#profile-settings-thumbnail open');
						target.animate({
							'opacity' : 0 
						}
						,200
						,function(){
							$('#profile-settings-thumbnail').css('background-image', multiverseURL);
							target.animate({
								'opacity' : 1
							});
						});
					} else {
						$('#profile-settings-thumbnail').css('background-image', multiverseURL);
						target.animate( {
							height : '201px'
						}
						, 600
						, function() {
				
							console.log('animate callback');
							target.animate( {
								'opacity' : '1'
							}
							, 400
							, function() {
					
								console.log('animate callback 2');
					
							} );
				
						} );
					}
				
					return item;
		    }
		
		});
		
    
    }
    
};