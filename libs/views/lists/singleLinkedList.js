/*
 Software License Agreement (BSD License)
 http://wwwlab.cs.univie.ac.at/~a1100570/webAD/
 Copyright (c), Volodimir Begy
 All rights reserved.


 Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
function SingleLinkedListView( model ){
        this.scale = 1;
        this.model = model;
}
SingleLinkedListView.prototype.initStage = function ( containerMain ){
  
    this.stage = new Kinetic.Stage({
            container : containerMain,
            draggable : true,
            height    : 800,
            width     : 900
        });
};

SingleLinkedListView.prototype.zoomIn=function(){
	if(this.scale<3)this.scale=this.scale+0.1;
	this.draw();
}

SingleLinkedListView.prototype.zoomOut=function(){
	if(this.scale>0.5)this.scale=this.scale-0.1;
	this.draw();
};


SingleLinkedListView.prototype.drawExample =  function(){
    
    var instance = this;
    
    instance.stage.removeChildren();
    
    var layer = new Kinetic.Layer();
    
    
    var positionX = 90;
    var positionY = 150;
    
    var db_height  = 30;
    var db_width   = 50;
    
    var sdb_height = 30;
    var sdb_width  = 30;
    
    var posArrowX = positionX + db_width + sdb_width/2 ;
    var posArrowY = positionY + sdb_height/2;
    
    var posArrowToX = posArrowX+db_width+sdb_width/2;
    var posArrowToY = posArrowToY;
    
    var arrowhead_length = 8;
    
    var angle = Math.atan2(0,posArrowToX-posArrowX);
    
    var currentValue   = null;
    var currentFill    = null;
    if( instance.model.head.next !== null){
        currentValue = instance.model.head.next;
        currentFill = currentValue.marked.nodeColor;
        ;
    }
    
    
         
            
             var head = new Kinetic.Rect({
        
                x:      positionX,
                y:      positionY,						
                width:  30,
                height: 30,
                fill:   0,
                stroke: 3,
                strokeWidth: 2
        });
             var arrow1 = new Kinetic.Line({
                 
              points: [positionX+15,posArrowY, positionX+60,posArrowY,positionX+60-arrowhead_length*Math.cos(angle-Math.PI/6),posArrowY-arrowhead_length*Math.sin(angle-Math.PI/6),positionX+60, posArrowY, positionX+60-arrowhead_length*Math.cos(angle+Math.PI/6),posArrowY-arrowhead_length*Math.sin(angle+Math.PI/6)],    
              strokeWidth: 2,
              lineCap: 'round',
              lineJoin: 'round',
              stroke: 'red'
        });   
        
         var headLabel = new Kinetic.Text({
				x: positionX,
				y: positionY+1.5*db_height,
				text: "head",
				fontSize: 12,
                                fontStyle: 'bold',
				fontFamily: 'Tahoma',
				fill: "black",
				align: 'center',
                                width: "30"
			});
            
            
          
            layer.add(head);
            layer.add(arrow1);
            layer.add(headLabel);
            positionX = positionX+60;
            posArrowX = posArrowX+45+sdb_width/2;
            posArrowToX = posArrowX+db_width+sdb_width/2;
            if(instance.model.head.next === null)
            {  
            
            var nullLabel = new Kinetic.Text({
				x: positionX,
				y: positionY+db_height/3,
				text: "NULL",
				fontSize: 16,
                                fontStyle: 'bold',
				fontFamily: 'Tahoma',
				fill: "black",
				align: 'center',
                                width: "60"
			});
            layer.add( nullLabel );
            this.stage.add( layer );
                       
            return;
            }
            
            //this.stage.add(layer);
            
        
       
    
    
    for( i=0; i<instance.model.length; i++ ){

        
       
        var db = new Kinetic.Rect({
        
        x:      positionX,
	y:      positionY,						
        width:  db_width,
	height: db_height,
	fill:   currentFill,
	stroke: 3,
	strokeWidth: 2
    });
        var sdb =  new Kinetic.Rect({
        
        x:      positionX+db_width,
	y:      positionY,						
        width:  sdb_width,
	height: sdb_height,
	fill:   currentFill,
	stroke: 3,
	strokeWidth: 2
        
    }); 
      console.log("Drawing");
        var value = new Kinetic.Text({
				x: positionX,
				y: positionY+db_height/2-5,
				text: currentValue.value,
				fontSize: 12,
                                fontStyle: 'bold',
				fontFamily: 'Tahoma',
				fill: "black",
				align: 'center',
                                width: db_width
			});
        
        if( currentValue.next !== null){//
        //if(i!== instance.model.length-1 ){
              var arrow = new Kinetic.Line({
              points: [posArrowX,posArrowY,posArrowToX,posArrowY,posArrowToX-arrowhead_length*Math.cos(angle-Math.PI/6),posArrowY-arrowhead_length*Math.sin(angle-Math.PI/6),posArrowToX, posArrowY, posArrowToX-arrowhead_length*Math.cos(angle+Math.PI/6),posArrowY-arrowhead_length*Math.sin(angle+Math.PI/6)],
              strokeWidth: 2,
              lineCap: 'round',
              lineJoin: 'round',
              stroke: 'black'
        });   
            layer.add(arrow);
            posArrowX = posArrowToX+50+sdb_width/2;
            posArrowToX = posArrowX+50+sdb_width/2;
            currentValue = currentValue.next;
            currentFill  = currentValue.marked.nodeColor;
                }
        else {
            
            var zeroPointer = new Kinetic.Text({
				x: positionX+db_width,
				y: positionY+db_height/2-5,
				text: "0",
				fontSize: 12,
                                fontStyle: 'bold',
				fontFamily: 'Tahoma',
				fill: "black",
				align: 'center',
                                width: sdb_width
			});
            layer.add( zeroPointer );
        }
        layer.add(db);
        layer.add(sdb);
        layer.add(value);
        this.stage.add(layer);
        positionX      = positionX + db_width + sdb_width + 50;
        positionArrowX = positionX + db_width + sdb_width/2 ;
       
        
    }
   
    // TO DO set margin, dynamically set height and width of stage
    // Play and pause buttons 
    
    
};