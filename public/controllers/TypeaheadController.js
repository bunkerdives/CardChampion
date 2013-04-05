var TypeaheadController = {
    
    chosenCard : ''
    , typeaheadMap : {}


	, updater : function (item) {
		
		console.log('Typeahead updater.')

		var setAbbr = this.typeaheadMap[item].setAbbr;
		var cardId = this.typeaheadMap[item].cardId;
		var setData = SetController.getSet( setAbbr );
		var cardData = setData.card_data[ cardId ];
		
		ViewModel.updatePreviewImage(cardData.multiverse);
		ViewModel.updateThumbImage(cardData.multiverse);

		//TypeaheadController.chosenCard = new CardViewModel( cardData );
        TypeaheadController.chosenCard = cardData;
		
		$('.typeahead').css('display','none');
		$('#builder-add-card-prompt').css('display','block');

		return item;

	}
	
    , select: function () {
		console.log('Typeahead select.')
	  
        var val = this.$menu.find('.active').attr('data-value')
        this.$element
          .val(this.updater(val))//Updates text in html input
          .change()
		
        return this
      }

	, show: function () {
	
		console.log('Typeahead show.');
		//console.log(this.$element.position());
		// var pos = $.extend({}, this.$element.position(), {
// 			height: this.$element[0].offsetHeight
// 		})

		$('#builder-add-card-prompt').hide()

		this.$menu
			.insertAfter($('#builder-card-list-marker')).show()
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);

		this.shown = true
		return this
	
	}
	
    , hide: function () {
  	  console.log('Typeahead hide')
	  
        $('.typeahead').css('display','none');
        this.shown = false
        return this
      }
	
	, render: function (items) {
	
		console.log('Typeahead render.');

		var that = this

		items = $(items).map(function (i, item) {
			var multiverse = that.typeaheadMap[item].multiverse;
			i = $(that.options.item).attr( {
				'data-value': item
				, 'data-multiverse': multiverse
			} )
			// i = $(that.options.item);
// 			i.data( 'value', item );
// 			i.data( 'multiverse', multiverse );
			i.find('a').html(that.highlighter(item))
			return i[0]
		})

		items.first().addClass('active')

		
		this.$menu.html(items)
		//console.log('render typeahead: ' + $('.active').data('value'))
		return this


	}
	
	, next: function (event) {
	
		console.log('Typeahead next.');

		var active = this.$menu.find('.active').removeClass('active')
		var next = active.next()

		if (!next.length) {
			next = $(this.$menu.find('div')[0])
		}

		next.addClass('active')
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);

		//console.log($('.active').data('value'));
		
	
	}

	, prev: function (event) { //event
	
		console.log('Typeahead prev.');

		var active = this.$menu.find('.active').removeClass('active')
			, prev = active.prev()

		// if (!prev.length) {
		//         prev = this.$menu.find('li').last()
		//       }
		if (!prev.length) {
			prev = this.$menu.find('div').last()
		}

		prev.addClass('active')
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);

		
	
	}

	, listen: function () {
	
		console.log('Typeahead listen.');

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
		console.log('Typeahead mouseenter');
        this.mousedover = true
        this.$menu.find('.active').removeClass('active')
        $(e.currentTarget).addClass('active')
		
		var active = $('div.active').data('multiverse');
		ViewModel.updatePreviewImage(active);
    }

	, source : function (query, process) {
		
		console.log('Typeahead source.')

		cards = [];
		map = {};

		var cardData;
		var data = [ ];

		$.each( SetController.setList, function(key, setObj) {

		var cardData = setObj.card_data;
		var set = setObj.set;
		var setAbbr = setObj.abbr;

		$.each( cardData, function( index, value ) {
			var cardObj = { cardData : value, set : set, setAbbr : setAbbr, cardId : index };
			data.push( cardObj );
		} );

		} );

		$.each( data, function (key, cardObj) {
			var processKey = cardObj.cardData.name + " - " + cardObj.set;
			//console.log(cardObj.cardData.multiverse)
			map[processKey] = { setAbbr : cardObj.setAbbr, cardId : cardObj.cardId, multiverse : cardObj.cardData.multiverse  };
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
		
    
    }
    
};