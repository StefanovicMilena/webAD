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
function Node( value ) {
    this.value = value;
    this.next  = null;
    this.marked = {
      
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
    
    this.head  = new Node();
    this.view  = new SingleLinkedListView( this );
    this.task  = {				// View-Specific and Algorithm-Specific information
		queue : [], 			// Can hold multiple values to be visualized 
		status : '', 			// {Insert, Remove, Search}	   		    
		operation: '',
                //element: '',	
                animate: false
	};
    this.input      = '';
    this.queue      = [];
    this.pointer    = false,
    
    this.member     = false;
    this.access     = false;
    this.lengthFlag = false;
    this.addNew     = false;
    
    this.arrowNull  = false;
    this.addQueue   = false;
    this.lengthCounter;
    this.length     = 0;
    
    
    this.empty      = false;
    this.speed      = 3;
}

SingleLinkedList.prototype.addFirst         = function( value ){
   
    var instance = this;
    var value    = value;
    
   
    if( value === undefined ){  // If no parameters were passed 
        var input = instance.getUserInput("Add: \nPlease enter the element(s) to be added (separated by space),\nvalues > 99999999 are ignored.");
        // Return when array is empty
            if( input.length == 0 ){
                prompt("No values were added");
                return;
            }
     if( input === null || input === "" || input == false || input === " " || input == undefined ){
            console.log("input is: "+input);
            return;
        }
    
          instance.queue = input.slice();
          instance.addQueue = true;
          
          for(l=0; l<input.length; l++) {
               (function(l, instance) {
                setTimeout(function() {
                instance.view.drawExample();
                setTimeout(function() {
                instance.pointer      = true;
                instance.addNew       = true;
                instance.input        = input[l];
                instance.queue[l]      = null;
                
                if(input.length>1){ 
                //fill task queue
                }
                instance.view.drawExample();
                   
                    setTimeout(function(){
                        
                        if(instance.head.next === null){
                            instance.arrowNull = true;
                            instance.view.drawExample();
                        } 
                        else {
                        
                        instance.head.next.marked.pointerArrow = true;
                        instance.view.drawExample();
                        instance.head.next.marked.pointerArrow = false;
                    }
                        setTimeout(function(){
                   
                          var help = new Node ( input[l] );
                          help.next = instance.head.next;
                          instance.head.next = help;
                          instance.length++;
                          instance.addNew = false;
                          instance.head.next.marked.pointerArrow = true;
                          console.log("first element value: "+instance.head.next.value);
                          
                          instance.view.drawExample();
                          
                          setTimeout(function(){
                              
                              instance.head.next.marked.pointerArrow = false;
                              instance.addNew                        = false;
                              instance.view.drawExample();
                              
                               setTimeout(function(){
                              
                                 instance.pointer = false;
                                 console.log("queue length: "+instance.queue.length);
                                 if( l == input.length-1 ){ instance.addQueue = false;}
                                 instance.view.drawExample();
                                 
                                 return;
                                },500*2); 
                            },500*3); 
                           },500*2); 
                        },500*2); 
                     },500*2); 
                   
             }, 3500*l*2+2500); 
       
             })(l, instance);
            }
       
       
}         
else {
    // When the value to be added is passed as an argument,draw function will be called from that function in order for everything to be drawn at the same time ( example() and random())
    
    var help = new Node ( value );
    help.next = instance.head.next;
    instance.head.next = help;
    
    instance.length++;
    //this.view.drawExample();
    }
  
};
SingleLinkedList.prototype.example       = function(){
    
    var array = [ 11,8,2,33,12 ];
   
    for (i = 0; i<array.length; i++ )
    {
        
        var temp = array[i];
        
        this.addFirst(temp);
        
    }
    
     this.view.drawExample();
     
};

SingleLinkedList.prototype.getUserInput  = function(promptMessage){
    
    var tempValues = prompt(promptMessage);
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
    this.empty   = true;
    instance.view.drawExample();    
    this.empty  = false;
};

SingleLinkedList.prototype.addElement         = function(){
   
    var instance = this;
    
    if(instance.length == 0) { 
        alert("This list is empty, can only add element as first");
        instance.addFirst();
        return;
    }
    
    var input = instance.getUserInput("Please enter the position at which you would like to add an elemen, starting at 1: ");
    var value = instance.getUserInput("Please enter the value of the element: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined ){
            
            alert("Invalid input,please try again");
            return;
        }
    if( value === null || value === "" || value == false || value === " " || value == undefined ){
           
            alert("Invalid input,please try again");
            return;
        }
    
    if( input == 1){ 
        instance.addFirst(value);
         
        return;
    }
    
  
    var node = instance.getElementByPosition(input);
    var prev = instance.getElementByPosition(input-1);
   
        if( node.next === null ){ 
            node.marked.nullLabel = true; 
        }
        prev.marked.pointerPre    = true;
        prev.marked.pointerArrow  = true;
        
        instance.view.drawExample();
        node.marked.pointerAct    = true;
        node.marked.pointerArrow  = true;
    
    function addValue(){
        setTimeout(function(){
            node.marked.nodeColor = "#009900";
            instance.view.drawExample();
            
            setTimeout(function(){
    
                prev.marked.pointerNew = true;
                instance.input         = value;
                instance.view.drawExample();
                
                setTimeout(function(){
                    
                   prev.marked.pointerNArrow = true;
                   instance.view.drawExample();
    
                    setTimeout(function(){
            
                        prev.next = new Node(value);
                        prev.next.next = node;
                        instance.length++;
                        
                        node.marked.nodeColor = "white";
                        
                        prev.marked.pointerPre    = false;
                        prev.marked.pointerArrow  = false;
                        node.marked.pointerAct    = false;
                        node.marked.pointerArrow  = false;
                        node.marked.nullLabel     = false;
                        prev.marked.pointerNew    = false;
                        prev.marked.pointerNArrow = false;
                        
                        instance.view.drawExample();    
                    },500);
                  },1000);
                },1000);
             },1000);
            }
     
 addValue();
 
}; 


SingleLinkedList.prototype.removeFirst = function(){
    
    var instance   = this;
    
   
   
    if(instance.length == 0) { 
        alert("This list is empty");
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
    
    var instance   = this;
    var input = one;
    
    
   
        if(instance.length == 0) { 
        alert("This list is empty");
        return;
        }
        
        if( input === undefined ){ 
            var input = instance.getUserInput("Please enter the position of the element you would like to remove, starting at 1: ");
           } 
          console.log("input is: "+input);
         
        if( input === null || input === "" || input == false || input === " " || input == undefined ){
            
            return;
        }
        
        if(input.length >1){ 
            var uinput = input[0]; 
            input = uinput;
        }
        
        if( input < 0){ 
            
            alert("Positive integers only,please!");
            return;
        }
        
        if( input == "0"){ 
            
           input = 1;
        }
    // TO DO test for positive integer,if not return plus error message
    
    
    if(instance.length === 0) { 
        alert("This list is empty");
        return;
    }
    
    
    var prev;
    var node = instance.getElementByPosition(input);
    
    if( node === null ){return;}
    if( input == 1){ 
        prev             = instance.head;
        instance.pointer = true;
        instance.view.drawExample();
        node.marked.pointerArrow = true;
   }
    
    else {
        prev = instance.getElementByPosition(input-1);
        if( node.next === null ){ 
            node.marked.nullLabel = true; 
        }
        prev.marked.pointerPre    = true;
        prev.marked.pointerArrow  = true;
        
        instance.view.drawExample();
        node.marked.pointerAct    = true;
        node.marked.pointerArrow  = true;
        
        
    }
    
    
   
    
    
    setTimeout(function(){
         
        instance.view.drawExample();
        
            
        setTimeout(function(){
           node.marked.nodeColor = "red";
           
          
           instance.view.drawExample();
           
           setTimeout(function(){
             prev.marked.arrow = true;
             
             console.log("I marked the arrow and will draw "+node.value);
             
               instance.view.drawExample();
             
             setTimeout(function(){
                 
                 node.marked.blank        = true;
                 node.marked.pointerArrow = false;
                 instance.pointer         = false;
                
                 
                 instance.view.drawExample();
                
                  
                 setTimeout(function(){
                 
                    prev.next = node.next;
                    instance.length --;
                   
                    prev.marked.arrow = false;
                    node.marked.nodeColor = "white";
                    
                    prev.marked.pointerArrow= false;
                    prev.marked.pointerPre   = false;
                    
                     instance.view.drawExample();
                    return;
                  },500*2); 
            },500*2); 
           },500*2); 
        },500*2); 
       },500*2); 
   
    
    
    
return;
};

SingleLinkedList.prototype.accessElement         = function(){
    
    var instance = this;
    
    if(instance.length == 0) { 
        alert("This list is empty");
        return;
    }
    function animateAccess(i){
            setTimeout(function(){
                var node = instance.getElementByPosition(i);
                node.marked.nodeColor    = "green";  
                node.marked.position     = i;
                node.marked.pointerArrow = true;
                instance.pointer         = true;
                instance.view.drawExample(); 
                   
                node.marked.nodeColor = "white";
                node.marked.pointerArrow = false;
                
                if(i==input){
                    
                    setTimeout(function(){
                    var node = instance.getElementByPosition(input);
                    node.marked.pointerArrow = true;
                    node.marked.nodeColor = "gold";   
                    instance.view.drawExample();   
                    
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        node.marked.pointerArrow = false;
                        instance.access          = false;
                        instance.pointer         = false;
                        alert("Value of the node on the position "+input+" is: "+node.value);
                        instance.view.drawExample();
    
                  },2000);
         },2000);  
        
                    
                    
                }
              
                
            },i*3000);
        }
            
    
    var input = instance.getUserInput("Please enter the position of the element you would like to access, starting at 1: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined ){
            
            return;
        }           
    //todo test for 0,non integer and multiple values
   if ( input > instance.length){ alert( "You cannot access element at the position "+input+" because the list is not long enough.Please choose a position between 1 and "+instance.length); return; }
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
    
   var instance = this;
   
   if(instance.length == 0) { 
        alert("This list is empty");
        return;
    }
   
   var lengthRun = instance.length;

    for(var i=0; i < lengthRun; i++) {
        (function(i, instance) {
            setTimeout(function() {
                instance.pointer = true;
                instance.view.drawExample();
                    //instance.removeFirst();
                    if(instance.length == 0) {
                        alert("This list is empty");
                        return;
                    }

                    var prev = instance.head;
                    
                    var node = prev.next;
                    
            
                    setTimeout(function(){
                        node.marked.pointerArrow = true;
                        node.marked.nodeColor = "red";
                        console.log("Current node value: "+node.value);
                       
                        instance.view.drawExample();
                        
                        setTimeout(function(){
                          prev.marked.arrow = true;
                          console.log(instance);
                          console.log("I marked the arrow and will draw "+node.value);
                          
                           instance.view.drawExample();
                          
                          setTimeout(function(){
                              
                              node.marked.blank = true;
                              console.log("I blanked the node and will draw "+node.value);
                              
                              instance.view.drawExample();
                              
                               setTimeout(function(){
                              
                                 prev.next = node.next;
                                 instance.length --;
                                 console.log("New length: "+instance.length);
                                 prev.marked.arrow     = false;
                                 node.marked.nodeColor = "white";
                              
                                 instance.view.drawExample();
                                 if( i == lengthRun-1 ){
                                     
                                     instance.pointer = false;
                                     instance.view.drawExample();
                                     
                                 }
                                 return;
                                },500*2); 
                            },500*2); 
                           },500*2); 
                        },500*2); 
            
                   
            }, 3500*i*2+2500); 
        })(i, instance);
    }

    
};
SingleLinkedList.prototype.getLength   = function(){
    
    var instance = this;
    
    function animateLength(i){
        
        setTimeout(function(){
            
                var node = instance.getElementByPosition(i);
                instance.lengthCounter = i;
                node.marked.nodeColor = "green"; 
                console.log("i: "+i);
                if(i>0){ 
                    node.marked.pointerArrow = true; 
                }
                instance.view.drawExample(); 
                console.log("I drew it when i: "+i);
                node.marked.nodeColor = "white";
                node.marked.pointerArrow = false; 
                 if( i==instance.length) {
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        instance.lengthFlag = false;
                        instance.pointer    = false;
                       
                        instance.view.drawExample();
                     
                    ;},500);    
                }    
            ;},i*1000);
        
    }
    if(instance.length === 0) { 
        alert("This list is empty, its length is 0");
        return;
    }
    instance.lengthFlag = true;
    instance.pointer = true;
    for(i=0; i<this.length+1;i++){
       
        animateLength(i);
             
    }
    
};
SingleLinkedList.prototype.isMember    = function(){

var instance = this;
if(instance.length === 0) { 
        alert("This list is empty");
        return;
    }

function animateMember(i){
            
                
                setTimeout(function(){
                
                var node = instance.getElementByPosition(i);
                node.marked.nodeColor =    "green";  
                node.marked.pointerArrow = true;
                
                instance.view.drawExample(); 
                
                
                node.marked.nodeColor = "white";
                node.marked.pointerArrow = false;
                
                if(node.value==input){
                    
                    setTimeout(function(){
                    node.marked.nodeColor = "gold";  
                    node.marked.pointerArrow = true;
                    instance.view.drawExample();   
                    
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        instance.member = false;
                        instance.pointer = false;
                        node.marked.pointerArrow = false;
                        alert(input+" is a member!");
                        instance.view.drawExample();
                        return true;
                        
                     },5000);
                      
        
                     },1000);}
           
                if( node.value!=input && i==instance.length) {
                    
                    setTimeout(function(){
                    node.marked.pointerArrow = true;
                    instance.view.drawExample();
                    setTimeout(function(){
                        instance.member = false;
                        instance.pointer = false;
                        node.marked.pointerArrow = false;
                        alert(input+" is not a member!"); 
                        instance.view.drawExample();
                        return false;
                     },500);
              
                   },1000)
          
          
                }  
           
                
     },i*1000);
    }


    var input   = instance.getUserInput("Enter the value to test: ");
    if( input === null || input === "" || input == false || input === " " || input == undefined ){
          
            return;
        }
    instance.input = input;
    
   
    instance.member =  true;
    instance.pointer = true; 
    console.log( "Is pointer going to be drawn:"+ instance.pointer);
    for(i=0; i<this.length+1;i++){
       
        var node = instance.getElementByPosition(i);
        

        animateMember(i);
        
        if( node.value == instance.input ){ 
            
                    return;}
      
    }
     
};
SingleLinkedList.prototype.random      = function(){
    
    var randomLength = Math.floor(Math.random() * 5) + 3;
    console.log("Random length: "+randomLength);
    for (i = 0; i<randomLength; i++ )
    {
        
        var temp = Math.floor(Math.random()*100)+1;
        
        this.addFirst(temp);
        
    }
    
     this.view.drawExample();
    
};

