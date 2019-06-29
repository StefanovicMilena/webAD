/*
 Software License Agreement (BSD License)
 http://wwwlab.cs.univie.ac.at/~a1100570/webAD/
 Copyright (c), Volodimir Begy
 All rights reserved.


 Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTcontinuRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
function Node( value ) {
    this.value = value;
    this.next  = null;
    this.marked = {
        position  :   ""     ,
        arrowColor:   "black",
        searched  :   false,
        found     :   false,
        arrow     :   false,
        nodeColor :   "white",
        nullLabel :   false,
        blank     :   false,
        pointerArrow: false,
        pointerAct:   false,
        pointerPre:   false,
        pointerNArrow:false,
        pointerNew:   false
    };
}

function SingleLinkedList() {
    
    this.head        = new Node();
    this.view        = new SingleLinkedListView( this );
  
    this.working      = false; 
        
    this.input        = '';
    this.queue        = [];
    this.db           = [];
    this.pointer      = false,
    
    this.firstLabel   = false;
    this.member       = false;
    this.access       = false;
    this.lengthFlag   = false;
    this.addNew       = false;
    
    this.arrowNull    = false;
    this.addQueue     = false;
    this.length       = 0;
    this.drawToScreen = true;
    this.lastDrawnID  = undefined;
    this.actStateID   = -1;
    this.speed        = 3;
}

SingleLinkedList.prototype.addFirst         = function( value ){
   
    var instance     = this;
    var value        = value;
    instance.working = true;
    console.log("List working: "+instance.working);
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
    
    if( value === undefined ){  // If no parameters were passed 
        var input = instance.getUserInput("Add: \nPlease enter the element(s) to be added (separated by space),\nvalues > 99999999 are ignored.");
        
        if( input === null || input === "" || input == false || input === " " || input === undefined ){
            instance.working = false;
            return;
        }
        // Return when array is empty
            if( input.length == 0 ){
                prompt("No values were added");
                instance.working = false;
                return;
            }
     
          instance.saveInDB();
          instance.queue = input.slice();
          
          if( input.length >1 ) {
             
              instance.addQueue = true;
              instance.saveInDB();
              instance.disableDrawOnPause();
              instance.draw();
              
          }
          console.log("Am I working: "+instance.working);
          
          instance.saveInDB();
          instance.disableDrawOnPause();
          instance.draw();
          for(l=0; l<input.length; l++) {
               (function(l, instance) {
                
                        setTimeout(function() {
                            instance.working      = true;
                            instance.pointer      = true;
                            instance.addNew       = true;
                            instance.input        = input[l];
                            instance.queue[l]     = null;
                
                            instance.saveInDB();
                            instance.disableDrawOnPause();
                            instance.draw();
                   
                    setTimeout(function(){
                        
                        if(instance.head.next === null){
                            instance.arrowNull = true;
                            instance.saveInDB();
                            instance.disableDrawOnPause();
                            instance.draw();
                        } 
                        else {
                        
                        instance.head.next.marked.pointerArrow = true;
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        instance.head.next.marked.pointerArrow = false;
                    }
                        setTimeout(function(){
                   
                          var help = new Node ( input[l] );
                          help.next = instance.head.next;
                          instance.head.next = help;
                          instance.length++;
                          instance.addNew = false;
                          instance.head.next.marked.pointerArrow = true;
                          instance.saveInDB();
                          instance.disableDrawOnPause();
                          instance.draw();
                          
                          setTimeout(function(){
                              
                              instance.head.next.marked.pointerArrow = false;
                              instance.addNew                        = false;
                              instance.saveInDB();
                              instance.disableDrawOnPause();
                              instance.draw();
                              
                               setTimeout(function(){
                              
                                 
                                 
                                 if( l == input.length-1 ){ 
                                       instance.pointer    = false;
                                       instance.working    = false;
                                       instance.addQueue   = false;
                                       instance.saveInDB();
                                       instance.disableDrawOnPause();
                                       instance.draw();
                                       instance.setActStateIDlastDrawn();
                                       instance.working    = false;
                                       console.log("I changed");
                                       return;
                                 }
                                 instance.saveInDB();
                                 instance.disableDrawOnPause();
                                 instance.draw();
                                 
                                
                            },timer()*2); 
                           },timer()*2); 
                        },timer()*2); 
                     },timer()*2); 
                   
             }, timer()*6*l*2+timer()*4); 
       
             })(l, instance);
            }
       
       
}         
else {
    // When the value to be added is passed as an argument,draw function will be called from that function in order for everything to be drawn at the same time ( example() and random())
    
    var help = new Node ( value );
    help.next = instance.head.next;
    instance.head.next = help;
    
    instance.length++;
    
    }
    instance.working = false;  
    
};
SingleLinkedList.prototype.example       = function(){
    
    var array = [ 11,8,2,33,12 ];
   
    for (i = 0; i<array.length; i++ )
    {
        
        var temp = array[i];
        
        this.addFirst(temp);
        
    }
    
     this.draw();
     
};

SingleLinkedList.prototype.draw       = function(){
    
    if( this.drawToScreen){
       this.view.drawExample();
    } 
    
};

SingleLinkedList.prototype.prev       = function(){
    var instance = this;
    instance.working = true;
    
		if(instance.actStateID>0){
			var prev_id=instance.actStateID-1;
			instance.actStateID=prev_id;
			var listInstance=instance.db[prev_id];
			instance.replaceThis(listInstance);
                       
	      	
		}
                
	instance.working = false;
	instance.draw();
   
     
};
SingleLinkedList.prototype.next       = function(){
    var instance = this;
    this.working = true;
		if(instance.actStateID<instance.db.length-1){
			var nextID         = instance.actStateID+1;
			var listInstance    = instance.db[nextID];
                        instance.replaceThis(listInstance);
                        instance.actStateID = nextID;
		}
	instance.working = false;
	instance.draw();
     
};

SingleLinkedList.prototype.first       = function(){
    
    var instance        = this;
    instance.working    = true;
   
    var listInstance    = instance.db[0];
    instance.actStateID = 0;
    
    instance.replaceThis(listInstance);
    
    instance.working = false;
    instance.draw();
};

SingleLinkedList.prototype.last       = function(){
    
    var instance        = this;
    instance.working    = true;
    
    var lastID          = instance.db.length-1;
    
    var listInstance    = instance.db[lastID];
    
    instance.replaceThis(listInstance);
    
    instance.actStateID = lastID;
    instance.draw();
    instance.working    = false;
     
};

SingleLinkedList.prototype.continueTask       = function( speed ){
    
    var instance     = this;
    instance.working = true;
    
	// Stop here if the current State is already the last in the db or the first one.
	if( instance.actStateID === instance.db.length-1 || (instance.actStateID === 0 && !instance.db.length === 0)){
            
		alert("There are no other states to play,list ready for manipulation");
		instance.working = false;
		return false;
	}
    
    instance.speed  = speed;
    var timer = function (){ return 400* instance.speed }    
    
    var nextStateID = instance.actStateID;
    instance.draw();
    function setNextState(){
		if( nextStateID < instance.db.length-1){

			// Set next state
                        
			nextStateID         = nextStateID +1; 
			instance.actStateID = nextStateID;
			var listInstance    = instance.db[nextStateID];
			instance.replaceThis( listInstance );
			instance.draw();

			// In case user paused 
			if(instance.speed <= 0)
			{
				console.log("I tried to stop it");
				instance.draw();
                                instance.working = false;
				return;
			}

			// Get next State
			setTimeout(function(){
				setNextState();
			}, timer() );
	
		}
		else{ 
			
			instance.working = false;
			instance.draw();
			return;
		}
	}

	setNextState();
    
};

SingleLinkedList.prototype.disableDrawOnPause       = function(){
    
    var instance        = this;
    if(instance.speed === 0 && instance.drawToScreen === true){ 
		instance.drawToScreen = false;				
		///instance.lastDrawnID = instance.actStateID; 
                
               
	}
    
    
     
};

SingleLinkedList.prototype.setActStateIDlastDrawn       = function(){
    
    var instance        = this;
    
	
    if( instance.drawToScreen === false ) {
		instance.actStateID  = instance.lastDrawnID;
		var listInstance     = instance.db[this.actStateID];
		instance.replaceThis( listInstance );
              
	}
	
    instance.lastDrawnID          = undefined;
    instance.drawToScreen         = true; 
    
};

SingleLinkedList.prototype.saveInDB                     = function(){
    
    var instance   = this;
  
    
    var nextID     = instance.db.length; 
    var new_state  = instance.copy(instance);
    
    instance.db.push(new_state);
    instance.actStateID = nextID;
   
     
};

SingleLinkedList.prototype.replaceThis       = function(listInstance){
    
    var instance        = this;
    var stateCopy       = listInstance;
   
    
    
    instance.input      = stateCopy.input;
    instance.queue      = stateCopy.queue;
    
    instance.pointer    = stateCopy.pointer;
    
    instance.firstLabel = stateCopy.firstLabel;
    instance.member     = stateCopy.member;
    instance.access     = stateCopy.access;
    instance.lengthFlag = stateCopy.lengthFlag;
    instance.addNew     = stateCopy.addNew;
    
    instance.arrowNull  = stateCopy.arrowNulll;
    instance.addQueue   = stateCopy.addQueue;
    instance.length     = stateCopy.length;
    
    instance.head       = new Node();
    instance.head.marked.arrow      = stateCopy.head.marked.arrow;
    instance.head.marked.arrowColor = stateCopy.head.marked.arrowColor;
    instance.head.marked.nodeColor  = stateCopy.head.marked.nodeColor;
    
    var copyStateTemp   = stateCopy.head;
    var instanceTemp    = instance.head;
    while(copyStateTemp.next != null){
       instanceTemp.next = new Node(copyStateTemp.next.value);
       instanceTemp.next.marked = copyStateTemp.next.marked;
       copyStateTemp = copyStateTemp.next;
       
       instanceTemp  = instanceTemp.next;
      
   }
     
};

SingleLinkedList.prototype.copy       = function(copyInstance){ // TO DO: copy the instance list into the new instance through iteration
     var instance = this;   
    var newInstance = new SingleLinkedList();
    
    newInstance.db         = [];
    newInstance.queue      = copyInstance.queue.slice(); 
    newInstance.working    = copyInstance.working; 
        
    newInstance.input      = copyInstance.input;      
    newInstance.pointer    = copyInstance.pointer;
  
    newInstance.firstLabel = copyInstance.firstLabel;
    newInstance.member     = copyInstance.member;
    newInstance.access     = copyInstance.access;
    newInstance.lengthFlag = copyInstance.lengthFlag;
    newInstance.addNew     = copyInstance.addNew;
    
    newInstance.arrowNull  = copyInstance.arrowNull;
    newInstance.addQueue   = copyInstance.addQueue;
    newInstance.length     = copyInstance.length;
    
    //newInstance.actStateId = copyInstance.actStateID;
    newInstance.speed      = copyInstance.speed;
    
    newInstance.head                   = new Node();
    newInstance.head.marked.arrow      = copyInstance.head.marked.arrow;
    newInstance.head.marked.arrowColor = copyInstance.head.marked.arrowColor;
    newInstance.head.marked.nodeColor  = copyInstance.head.marked.nodeColor;
    
    var copyInstanceTemp               = copyInstance.head;
    var newInstanceTemp                = newInstance.head;
    while(copyInstanceTemp.next != null){
      
        newInstanceTemp.next = new Node(copyInstanceTemp.next.value);
        
        newInstanceTemp.next.marked.position      = copyInstanceTemp.next.marked.position;
        newInstanceTemp.next.marked.arrowColor    = copyInstanceTemp.next.marked.arrowColor;
        newInstanceTemp.next.marked.searched      = copyInstanceTemp.next.marked.searched;
        newInstanceTemp.next.marked.found         = copyInstanceTemp.next.marked.found ;
        newInstanceTemp.next.marked.arrow         = copyInstanceTemp.next.marked.arrow;
        newInstanceTemp.next.marked.nodeColor     = copyInstanceTemp.next.marked.nodeColor;
        newInstanceTemp.next.marked.nullLabel     = copyInstanceTemp.next.marked.nullLabel;
        newInstanceTemp.next.marked.blank         = copyInstanceTemp.next.marked.blank;
        newInstanceTemp.next.marked.pointerArrow  = copyInstanceTemp.next.marked.pointerArrow;
        newInstanceTemp.next.marked.pointerAct    = copyInstanceTemp.next.marked.pointerAct;
        newInstanceTemp.next.marked.pointerPre    = copyInstanceTemp.next.marked.pointerPre;
        newInstanceTemp.next.marked.pointerNArrow = copyInstanceTemp.next.marked.pointerNArrow;
        newInstanceTemp.next.marked.pointerNew    = copyInstanceTemp.next.marked.pointerNew;
      
       copyInstanceTemp = copyInstanceTemp.next;
 
       newInstanceTemp  = newInstanceTemp.next;
      
   }
   return newInstance;  
};
SingleLinkedList.prototype.getUserInput  = function(promptMessage){
    
    var tempValues  = prompt(promptMessage);
    var inputValues = [];
    var tempVal;
        
    // Return [] on invalid input 
   // if(tempValues == null || tempValues == ""){ return []; }
   //if a user presses OK or Cancel without an values, ignore
    if( tempValues === null || tempValues === "" || tempValues === false || tempValues == 0 ){
            
            return;
        }
    tempValues = tempValues.split(" ");
		
    for (var i = 0; i < tempValues.length; i++) {
	tempVal = Number(tempValues[i]);
        
       
        if ( !isNaN(tempVal) && tempVal < 100000000 && Number.isInteger(tempVal) ){
           
            inputValues.push(tempVal);
            }
	
        else { 
            
            alert("Invalid input,only integer numbers < 100000000 please/n Unsuitable values will be ignored");
            instance.working = false;
            return;
        }
   }
   
    if(inputValues == ""){
     
        return[];
   
    }
    
    return inputValues;

};

SingleLinkedList.prototype.createList         = function(){
   
    var instance = this;
    instance.saveInDB();
    instance.draw();    
    
};

SingleLinkedList.prototype.addElement         = function(){
   
    var instance    = this;
    instance.working    = true; 
    console.log("Instance working: "+instance.working);
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
    
    if(instance.length == 0) { 
        alert("This list is empty, can only add element as first");
        instance.addFirst();
        return;
    }
    
    var input = instance.getUserInput("Please enter the position at which you would like to add an elemen, starting at 1: ");
    var value = instance.getUserInput("Please enter the value of the element: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined || input.length > 1 ){
            
            alert("Invalid position  input,please try again");
            instance.working = false;          
           
            return;
        }
    if( value === null || value === "" || value == false || value === " " || value == undefined ){
           
            alert("Invalid value input,please try again");
            instance.working    = false;
           
            return;
        }
    
    if( input == 1){ 
        instance.addFirst(value);
                  
        return;
    }

    instance.saveInDB();
    var node = instance.getElementByPosition(input);
    var prev = instance.getElementByPosition(input-1);
   
        if( node.next === null ){ 
            node.marked.nullLabel = true; 
        }
        prev.marked.pointerPre    = true;
        prev.marked.pointerArrow  = true;
        instance.saveInDB();
        instance.disableDrawOnPause();
        instance.draw();
        node.marked.pointerAct    = true;
        node.marked.pointerArrow  = true;
    
    function addValue(){
        setTimeout(function(){
            node.marked.nodeColor = "#009900";
            instance.saveInDB();
             instance.disableDrawOnPause();
            instance.draw();
          
            setTimeout(function(){
    
                prev.marked.pointerNew          = true;
                instance.input                  = value;
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw();
                
                setTimeout(function(){
                    
                   prev.marked.pointerNArrow    = true;
                   instance.saveInDB();
                   instance.disableDrawOnPause();
                   instance.draw();
    
                    setTimeout(function(){
            
                        prev.next                 = new Node(value);
                        prev.next.next            = node;
                        instance.length++;
                        
                        node.marked.nodeColor     = "white";
                        
                        prev.marked.pointerPre    = false;
                        prev.marked.pointerArrow  = false;
                        node.marked.pointerAct    = false;
                        node.marked.pointerArrow  = false;
                        node.marked.nullLabel     = false;
                        prev.marked.pointerNew    = false;
                        prev.marked.pointerNArrow = false;
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw(); 
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw();
                        
                        
                    },timer());
                  },timer());
                },timer());
             },timer());
            }
     
 addValue();
 
}; 


SingleLinkedList.prototype.removeFirst = function(){
    
    var instance        = this;
    instance.working    = true;
    
   
    if(instance.length == 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
    }
    
    var prev = instance.head;
    var node = prev.next;
    
    if( node == null || node == undefined ){ alert("This list is empty!"); return;}
    
    if( node.next == null ){ node.marked.nullLabel =true; }
    var one = 1;
    instance.removeElement(1);
    return;
    
};

SingleLinkedList.prototype.removeElement         = function(one){
    
    var instance      = this;
    instance.working  = true; 
    var input         = one;
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
    
   
        if(instance.length == 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
        }
        
        if( input === undefined ){ 
            var input = instance.getUserInput("Please enter the position of the element you would like to remove, starting at 1: ");
           } 
        
         
        if( input === null || input === "" || input == false || input === " " || input == undefined ){
            instance.working = false;          
            return;
        }
        
        if(input.length >1){ 
            var uinput = input[0]; 
            input = uinput;
        }
        
        if( input < 0){ 
            
            alert("Positive integers only,please!");
            instance.working = false;          
            return;
        }
        
        if( input == "0"){ 
            
           input = 1;
        }
    // TO DO test for positive integer,if not return plus error message
    
    
    if(instance.length === 0) { 
        alert("This list is empty");
        instance.working = false;          
        return;
    }
    
    instance.saveInDB();
    var prev;
    var node = instance.getElementByPosition(input);
    
    if( node === null ){
        instance.working = false;
        return;
    }
    if( input == 1){ 
        prev                     = instance.head;
        instance.pointer         = true;
        instance.saveInDB();
        instance.disableDrawOnPause();
        instance.draw();
        node.marked.pointerArrow = true;
   }
    
    else {
        prev = instance.getElementByPosition(input-1);
        if( node.next === null ){ 
            node.marked.nullLabel = true; 
        }
        prev.marked.pointerPre    = true;
        prev.marked.pointerArrow  = true;
        instance.saveInDB();
        instance.disableDrawOnPause();
        instance.draw();
        node.marked.pointerAct    = true;
        node.marked.pointerArrow  = true;
        
        
    }
    
    
   
    
    
    setTimeout(function(){
        instance.saveInDB();
        instance.disableDrawOnPause(); 
        instance.draw();
         
        
        setTimeout(function(){
           node.marked.nodeColor = "red";
           
           instance.saveInDB();
           instance.disableDrawOnPause();
           instance.draw();
           
           setTimeout(function(){
             prev.marked.arrow = true;
             
               instance.saveInDB();
               instance.disableDrawOnPause();
               instance.draw();
             
             setTimeout(function(){
                 
                 node.marked.blank        = true;
                 node.marked.pointerArrow = false;
                 instance.pointer         = false;
                
                 instance.saveInDB();
                 instance.disableDrawOnPause();
                 instance.draw();
                
                  
                 setTimeout(function(){
                 
                    prev.next                  = node.next;
                    instance.length --;
                   
                    prev.marked.arrow          = false;
                    node.marked.nodeColor      = "white";
                    prev.marked.pointerArrow   = false;
                    prev.marked.pointerPre     = false;
                    
                    instance.saveInDB();
                    instance.disableDrawOnPause();
                    instance.draw();
                    
                    instance.setActStateIDlastDrawn();
                    instance.working    = false;
                    instance.draw();
                   
                    return;
                  },timer()*2); 
            },timer()*2); 
           },timer()*2); 
        },timer()*2); 
       },timer()*2); 
   
    

return;
};

SingleLinkedList.prototype.accessFirst         = function(){
   
    var instance     = this;
    instance.working = true;
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
   
    if(instance.length == 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
    }
    
    instance.saveInDB();
    
    function animateFirst(){
       setTimeout(function(){ 
           
           instance.head.marked.nodeColor       = "green";
           
           instance.saveInDB();
           instance.disableDrawOnPause();
           instance.draw();
            
           setTimeout(function(){ 
                
                instance.head.marked.arrowColor = "blue";
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw();
                    
                setTimeout(function(){ 
                        
                        instance.head.marked.arrowColor     = "black";
                        instance.head.next.marked.nodeColor = "green";
                        instance.firstLabel                 = true;
                        instance.head.marked.nodeColor      = "white";
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();

                        
                    setTimeout(function(){ 
                        
                        if( instance.drawToScreen ){
                        alert("The value of the first node in the list is: "+instance.head.next.value);
                        }
                        instance.firstLabel                 = false;
                        instance.head.next.marked.nodeColor = "white";
                        instance.working                    = false;
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw();
                    },timer());  
                },timer()); 
            },timer());
         },timer());
    }
    
    animateFirst(); 
    
};
SingleLinkedList.prototype.accessElement         = function(){
    
    var instance        = this;
    instance.working    = true; 
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
    
    if(instance.length == 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
    }
    instance.saveInDB();
    function animateAccess(i){
            setTimeout(function(){
                
                var node = instance.getElementByPosition(i);
                node.marked.nodeColor    = "green";  
                node.marked.position     = i;
                //instance.input           = i;
                node.marked.pointerArrow = true;
                instance.pointer         = true;
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw(); 
                   
                node.marked.nodeColor    = "white";
                node.marked.pointerArrow = false;
                
                if(i==input){
                    
                    setTimeout(function(){
                    var node                 = instance.getElementByPosition(input);
                    node.marked.pointerArrow = true;
                    node.marked.nodeColor    = "gold";  
                    instance.saveInDB();
                    instance.disableDrawOnPause();
                    instance.draw();   
                    
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor    = "white";
                        node.marked.pointerArrow = false;
                        instance.access          = false;
                        instance.pointer         = false;
                        if( instance.drawToScreen ){
                           alert("Value of the node on the position "+input+" is: "+node.value);
                        }
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw();
                        
                        
                  },timer());
         },timer());  
        
                    
                    
                }
              
                
            },i*timer());
        }
            
    
    var input = instance.getUserInput("Please enter the position of the element you would like to access, starting at 1: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined ){
            
            instance.working = false;
            return;
            
        }           
    //todo test for 0,non integer and multiple values
   if ( input > instance.length){ alert( "You cannot access element at the position "+input+" because the list is not long enough.Please choose a position between 1 and "+instance.length); instance.working = false; return; }
   instance.access = true;
   instance.input  = input;
   function accessAnimation(){
    
        for(i=1;i<=input;i++){
          
             animateAccess(i);
             
        }
           
    }
    
    
    accessAnimation();
    
};
SingleLinkedList.prototype.getElementByPosition      = function( position ){
   
    if( position > this.length ) {
        alert("The position is greater than the length of this list,please choose a position less than or equal to "+this.length);
        return null;
    } 
    if(position == 0){ position = 1;}
    var help = this.head.next;
    for(j=1; j<position;j++){
        help = help.next;
    }
    return help;
   
};

SingleLinkedList.prototype.removeList  = function(){
    
   var instance        = this;
   instance.working    = true; 
   var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
   
    if(instance.length == 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
    }
   
   var lengthRun       = instance.length;

    for(var i=0; i < lengthRun; i++) {
        (function(i, instance) {
            setTimeout(function() {
               
                instance.pointer = true;
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw();
                    //instance.removeFirst();
                    if(instance.length == 0) {
                        alert("This list is empty");
                        instance.working = false;
                        return;
                    }

                    var prev = instance.head;
                    
                    var node = prev.next;
                    
            
                    setTimeout(function(){
                      
                        node.marked.pointerArrow = true;
                        node.marked.nodeColor    = "red";
                        
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        
                        setTimeout(function(){
                          prev.marked.arrow      = true;
                          
                          instance.saveInDB();
                          instance.disableDrawOnPause();
                          instance.draw();
                          
                          setTimeout(function(){
                              
                              node.marked.blank  = true;
                              
                              instance.saveInDB();
                              instance.disableDrawOnPause();
                              instance.draw();
                              
                               setTimeout(function(){
                              
                                 prev.next       = node.next;
                                 instance.length --;
                                 
                                 prev.marked.arrow     = false;
                                 node.marked.nodeColor = "white";
                                 
                                 instance.saveInDB();
                                 instance.disableDrawOnPause();
                                 instance.draw();
                                 if( i == lengthRun-1 ){
                                     
                                     instance.pointer  = false;
                                     
                                     instance.saveInDB();
                                     instance.disableDrawOnPause();
                                     instance.draw();
                                     instance.setActStateIDlastDrawn();
                                     instance.working    = false;
                                     instance.draw();
                                 } 
                                 
                                 return;
                                },timer()); 
                            },timer()); 
                           },timer()); 
                        },timer()); 
            
                   
            }, timer()*7*i+5*timer()); 
        })(i, instance);
    }

};
SingleLinkedList.prototype.getLength   = function(){
    
    var instance      = this;
    instance.working  = true; 
    var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }
    
    instance.saveInDB();
    
    function animateLength(i){
        
        setTimeout(function(){
                
                var node              = instance.getElementByPosition(i);
                instance.input        = i;
                node.marked.nodeColor = "green"; 
                
                if(i>0){ 
                    node.marked.pointerArrow = true; 
                }
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw(); 
               
                node.marked.nodeColor    = "white";
                node.marked.pointerArrow = false; 
                 if( i==instance.length) {
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        instance.lengthFlag   = false;
                        instance.pointer      = false;
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw();
                        
                    ;},timer());    
                }    
            ;},i*timer());
        
    }
    if(instance.length === 0) { 
        alert("This list is empty, its length is 0");
        instance.working = false;
        return;
    }
    instance.lengthFlag = true;
    instance.pointer = true;
    for(i=0; i<this.length+1;i++){
       
        animateLength(i);
             
    }
};
SingleLinkedList.prototype.isMember    = function(){

var instance        = this;
instance.working    = true; 
var timer = function (){ return instance.drawToScreen ? 400* instance.speed : 0; }

if(instance.length === 0) { 
        alert("This list is empty");
        instance.working = false;
        return;
    }

function animateMember(i){
            
                
                setTimeout(function(){
                instance.working         = true;
                var node                 = instance.getElementByPosition(i);
                node.marked.nodeColor    = "green";  
                node.marked.pointerArrow = true;
                instance.saveInDB();
                instance.disableDrawOnPause();
                instance.draw(); 
                
                
                node.marked.nodeColor    = "white";
                node.marked.pointerArrow = false;
                
                if(node.value==input){
                    
                    setTimeout(function(){
                    node.marked.nodeColor    = "gold";  
                    node.marked.pointerArrow = true;
                    instance.saveInDB();
                    instance.disableDrawOnPause();
                    instance.draw();   
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor    = "white";
                        instance.member          = false;
                        instance.pointer         = false;
                        node.marked.pointerArrow = false;
                        
                        if( instance.drawToScreen ){
                            alert(input+" is a member!");
                        }
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw();
                        
                        return true;
                        
                     },timer());
                      
        
                     },timer());}
           
                if( node.value!=input && i==instance.length) {
                    
                 setTimeout(function(){
                    node.marked.pointerArrow = true;
                    
                    instance.saveInDB();
                    instance.disableDrawOnPause();
                    instance.draw();
                    
                    setTimeout(function(){
                        instance.member          = false;
                        instance.pointer         = false;
                        node.marked.pointerArrow = false;
                        if( instance.drawToScreen ){
                        alert(input+" is not a member!"); 
                        }
                        instance.saveInDB();
                        instance.disableDrawOnPause();
                        instance.draw();
                        
                        instance.setActStateIDlastDrawn();
                        instance.working    = false;
                        instance.draw(); 
                        return;
                     },timer());
              
                   },timer())
          
          
                }  
           
                
     },i*2*timer());
    }


    var input   = instance.getUserInput("Enter the value to test: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined ){
            instance.working = false;
            return;
        }
    instance.input   = input;
    
    instance.saveInDB();
    
    instance.member  = true;
    instance.pointer = true; 
    
    for(i=0; i<this.length+1;i++){
       
        var node = instance.getElementByPosition(i);
        
        animateMember(i);
        
        if( node.value == instance.input ){ 
                    instance.working = false;          
                    return;
                }
      
    }
   
    instance.working    = false;   
   
};
SingleLinkedList.prototype.random      = function(){
    var instance       = this;
    var randomLength   = Math.floor(Math.random() * 5) + 3;

    for (i = 0; i<randomLength; i++ )
    {
        
        var temp = Math.floor(Math.random()*100)+1;
        
        instance.addFirst(temp);
        
    }
   
    instance.draw();
    
};

