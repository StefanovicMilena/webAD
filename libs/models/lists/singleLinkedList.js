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
      
        searched  : false,
        found     : false,
        arrow     : false,
        nodeColor : "white",
        nullLabel : false,
        blank     : false,
        pointer   : false,
        pointerAct: false,
        pointerPre: false
    
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
    this.member     = false;
    this.lengthFlag = false;
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
        
            
            for(i=0; i<input.length; i++) {
               
                var help = new Node ( input[i] );
                help.next = instance.head.next;
                instance.head.next = help;
                
                
              
                instance.length++;
            
                instance.view.drawExample();
                
               
   
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
    //this.view.drawExample();
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
    if(tempValues == null || tempValues == ""){ return []; }

    tempValues = tempValues.split(" ");
		
    for (var i = 0; i < tempValues.length; i++) {
	tempVal = parseInt(tempValues[i]);
       
        if ( !isNaN(tempVal) && tempVal < 100000000 ){
           
            inputValues.push(tempVal);
            }
	
        else { 
            
            prompt("Invalid input,only numbers < 100000000 please/n Unsuitable values will be ignored");
           
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
    
    var input = prompt("Please enter the position at which you would like to add an elemen, starting at 1: ");
    var value = prompt("Please enter the value of the element: ");
    if( input == 1){ 
        instance.addFirst(value);
        this.view.drawExample(); 
        return;
    }
    
    var node = instance.getElementByPosition(input);
    var prev = instance.getElementByPosition(input-1);
   
    
    function addValue(){
        setTimeout(function(){
            node.marked.nodeColor = "#009900";
            instance.view.drawExample();
            
    
                setTimeout(function(){
            
                    prev.next = new Node(value);
                    prev.next.next = node;
                    instance.length++;
                    node.marked.nodeColor = "white";
                    
                    instance.view.drawExample();
                    },500);
                },1000);
            }
    
 addValue();
 
}; 


SingleLinkedList.prototype.removeFirst = function(){
    
    var instance   = this;
    
    console.log("The List Length: "+instance.length);
   
    if(instance.length == 0) { 
        alert("This list is empty");
        return;
    }
    
    var prev = instance.head;
    var node = prev.next;
    
    if( node == null || node == undefined ){ alert("This list is empty!"); return;}
    
    if( node.next == null ){ node.marked.nullLabel =true; }
    instance.removeElement(1,node,prev);
    console.log("Finished Remove First")
    return;
    
};

SingleLinkedList.prototype.removeElement         = function(input,node,prev){
    
    var instance   = this;
    
    
   function animateRemove(){
       
       setTimeout(function(){
           node.marked.nodeColor = "red";
           console.log("Current node value: "+node.value);
          
           instance.view.drawExample();
           
           setTimeout(function(){
             prev.marked.arrow = true;
             
             console.log("I marked the arrow and will draw "+node.value);
             
               instance.view.drawExample();
             
             setTimeout(function(){
                 
                 node.marked.blank = true;
                 console.log("I blanked the node and will draw "+node.value);
                 
                 //console.log("Blanked node input is: "+node.value);
                 instance.view.drawExample();
                 
                  setTimeout(function(){
                 
                    prev.next = node.next;
                    instance.length --;
                    console.log("New length: "+instance.length);
                    prev.marked.arrow = false;
                    node.marked.nodeColor = "white";
                    instance.view.drawExample();
                    return;
                  },2500); 
            },2000); 
           },1500); 
        },1000); 
   } 
    
    console.log("Started Remove Element");
    if(instance.length == 0) { 
        alert("This list is empty");
        return;
    }
    
    var input = input;
    var node  = node;
    var prev  = prev;
    
    if( input == undefined ){
    var input = instance.getUserInput("Please enter the position of the element you would like to remove, starting at 1: ");
    
    // TO DO test for positive integer,if not return plus error message
    }
    node = instance.getElementByPosition(input);
    
    if( node === null ){return;}
    if( input == 1){ 
        prev = instance.head;
       
   }
    
    else {
        var prev = instance.getElementByPosition(input-1);
    }
    
    
    if( node.next == null ){ node.marked.nullLabel =true; }
    animateRemove();
    
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
                node.marked.nodeColor = "green";  
                instance.view.drawExample(); 
                   
                node.marked.nodeColor = "white";
                if(i==input){
                    
                    setTimeout(function(){
                    var node = instance.getElementByPosition(input);
                    node.marked.nodeColor = "gold";   
                    instance.view.drawExample();   
                    
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        alert("Value of the node on the position "+input+" is: "+node.value);
                        instance.view.drawExample();
    
                  },1000);
         },2000);  
        
                    
                    
                }
              
                
            },i*1000);
        }
            
    
    var input = prompt("Please enter the position of the element you would like to access, starting at 1: ");
    
    //todo test for 0,non integer and multiple values
   
    
    function accessAnimation(){
    
    setTimeout(function(){
        for(i=1;i<=input;i++){
          
             animateAccess(i);
             
        }
        
        
        },2000);   
        
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
   
    function invokeRemove(){
       setTimeout(function(){
       instance.removeFirst();
       console.log("This is the Remove First call number: "+p);
       },1000);
    }
    
    var lengthRun = instance.length;
    
    for(p=lengthRun;p>0;p--)
    {
     console.log("Removing First");
     invokeRemove(p);

     lengthRun--;
 }
 return;
   
    
};
SingleLinkedList.prototype.getLength   = function(){
    
    var instance = this;
    
    function animateLength(i){
        
        setTimeout(function(){
            
                var node = instance.getElementByPosition(i);
                instance.lengthCounter = i;
                node.marked.nodeColor = "green";  
                instance.lengthFlag = true;
                instance.view.drawExample(); 
                console.log("I drew it when i: "+i);
                node.marked.nodeColor = "white";
            
                 if( i==instance.length) {
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        instance.lengthFlag = false;
                        instance.view.drawExample();
                     
                    ;},500);    
                }    
            ;},i*1000);
        
    }
     
 
    for(i=0; i<this.length+1;i++){
       
        animateLength(i);
             
    }
    
};
SingleLinkedList.prototype.isMember    = function(){

var instance = this;

function animateMember(i){
            
                
                setTimeout(function(){
                
                var node = instance.getElementByPosition(i);
                node.marked.nodeColor = "green";  
                instance.view.drawExample(); 
                
                node.marked.nodeColor = "white";
                
                if(node.value==input){
                    
                    setTimeout(function(){
                    node.marked.nodeColor = "gold";   
                    instance.view.drawExample();   
                    
    
                    setTimeout(function(){
                        
                        node.marked.nodeColor = "white";
                        instance.member = false;
                        alert(input+" is a member!");
                        instance.view.drawExample();
                        return true;
                        
                     },5000);
                      
        
                     },1000);}
           
                if( node.value!=input && i==instance.length) {
                    
                    setTimeout(function(){
                    instance.view.drawExample();
                    setTimeout(function(){
                        
                        alert(input+" is not a member!");
                        instance.member = false;
                        instance.view.drawExample();
                        return false;
                     },500);
              
                   },1000)
          
          
                }  
           
                
     },i*1000);
    }


    var input   = prompt("Enter the value to test: ");
    instance.input = input;
    
   
    instance.member = true;
     
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

