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
        arrowColor: false,
        nodeColor : "white",
        
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
		element: '',	
                animate: false
	};
    
    this.length = 0;
    this.empty  = false;
    this.speed  = 3;
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
    }
    
    console.log("Head is: "+instance.head.next.value);
    
};
SingleLinkedList.prototype.example       = function(){
    
    var array = [ 11,8,2,33,12 ];
    
    for (i = 0; i<array.length; i++ )
    {
        
        var temp = array[i];
        
        this.addFirst(temp);
        console.log("I added: "+temp);
    }
    
     this.view.drawExample();
     
};

SingleLinkedList.prototype.getUserInput  = function(promptMessage){
    
    var tempValues = prompt(promptMessage);
    console.log("Temporary values were accepted: "+tempValues);
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
    var node = instance.getElementByPosition(input);
    var prev = instance.getElementByPosition(input-1);
    
    node.marked.nodeColor = "green";
    instance.view.drawExample();
    alert("Node will be added");
    prev.next = new Node(value);
    prev.next.next = node;
    this.length ++;
    node.marked.nodeColor = "white";
    instance.view.drawExample();
};    

SingleLinkedList.prototype.removeFirst = function(){
    
    var instance   = this;
    if( instance.head.next !== undefined && instance.head.next != null){
    if( instance.head.next.next != undefined){
        instance.head.next = instance.head.next.next;
    var current = instance.head.next;
    instance.length--;
    console.log("First element: "+instance.head.next.value);
    for(i=0; i<this.length; i++){
       console.log(current.value);
       current = current.next;
    }
    }
    else {    
        instance.head.next = null;
        this.length = 0;
        }
     instance.view.drawExample();   
    }
else 
    alert("The list is empty");
    return;
};

SingleLinkedList.prototype.removeElement         = function(){
    
    var instance = this;
    
    if(instance.length == 0) { 
        alert("This list is empty");
        return;
    }
    
    var input = prompt("Please enter the position of the element you would like to remove, starting at 1: ");
    var node = instance.getElementByPosition(input);
    var prev = instance.getElementByPosition(input-1);
    
    node.marked.nodeColor = "red";
    instance.view.drawExample();
    alert("Node will be removed");
    prev.next = node.next;
    this.length --;
    instance.view.drawExample();

};

SingleLinkedList.prototype.accessElement         = function(){
    
    var instance = this;
    
    if(instance.length = 0) { 
        alert("This list is empty");
        return;
    }
    
    var input = prompt("Please enter the position of the element you would like to access, starting at 1: ");
    console.log("Position entered is: "+input);
    //todo test for 0,non integer and multiple values
    var node = instance.getElementByPosition(input);
    console.log("Value of the node on the position entered is: "+node.value);
    node.marked.nodeColor = "green";
    instance.view.drawExample();
    
    alert("Value of the node on the position "+input+" is: "+node.value);
    
    node.marked.nodeColor = "white";
    instance.view.drawExample();

    
    
};
SingleLinkedList.prototype.getElementByPosition      = function( position ){
   
    if( position > this.length ) {
        alert("The position is greater than the length of this list,please choose a position less or greater than "+this.length);
        return;
    } 
    //if(position == 0){ position = 1;}
    var help = this.head.next;
    for(i=1; i<position;i++){
        help = help.next;
    }
    return help;
   
};

SingleLinkedList.prototype.removeList  = function(){};
SingleLinkedList.prototype.getLength   = function(){
    
    alert("The length of this list is: "+this.length);
    
};
SingleLinkedList.prototype.isMember    = function(){
    
    var input   = prompt("Enter the value to test: ");
    var current = this.head.next; 
    for(i=0; i<this.length;i++){
        if(input == current.value){ 
            alert("It is a member");
            return 
        }
        current = current.next;
    }
    
    alert("It is not a member");
    
};
SingleLinkedList.prototype.random      = function(){};

