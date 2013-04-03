var MouseController = function() {
    
    this.init = function() {
        // attach the mousemove event handler to the document element
        $(document).mousemove( ViewModel.mouseController.mouseMoveCardDrag );
        $(document).mouseup( ViewModel.mouseController.mouseUp );
    }
    
    this.mouseMoveCardDrag = function( event ) {
        
        if( ViewModel.mousedown == true ){
            
            var pool = ViewModel.dragDropOrigPool;
            pool.removeCardFromPool( ViewModel.cardDragCardView, ViewModel.dragDropOrigColIdx );
            
            var ele = $("#drag-drop-card");
            ele.css( 'background-image', 'url(' + ViewModel.cardDragSrc + ')' );
            ele.css( 'display', 'block' );
            ele.css( 'background-size', ViewModel.cardW + "px " + ViewModel.cardH + "px" );
            ele.css( 'height', ViewModel.cardH );
            ele.css( 'width', ViewModel.cardW );
            
            ele.css( {
                'top' : event.pageY
                , 'left' : event.pageX
            } );
        
        }
    };
    
    this.mouseUp = function( event ) {
      
        if( ViewModel.mousedown == true ) {
            
            // hide the drag drop card
            $("#drag-drop-card").css( 'display', 'none' );
            
            ViewModel.mousedown = false;
            
            if( ViewModel.dragDropNewCol != '' ){
                ViewModel.dragDropNewCol.cards.push( ViewModel.cardDragCardView );
                ViewModel.dragDropNewCol = '';
            }
            else{
                // add the card back to the column it belongs in
                var col = ViewModel.dragDropOrigColIdx;
                ViewModel.dragDropOrigPool.columns()[col].cards.push( ViewModel.cardDragCardView );
            }
            
        }
        
    };  
    
};