'use strict';

const calculator = {

    sumBtn: document.getElementById('sum'),
    multBtn: document.getElementById('mult'),
    input1: document.getElementById('a'),
    input2: document.getElementById('b'),
    resultInput: document.getElementById('res'),

    sum: function(){
      return Number(this.input1.value) + Number(this.input2.value); 

    },
    mult: function(){
      return Number(this.input1.value) * Number(this.input2.value);
    },
    show: function(){

        this.sumBtn.addEventListener('click',() => {
            this.resultInput.value = this.sum();
          });

          this.multBtn.addEventListener('click',() => {
            this.resultInput.value = this.mult();
          });
        }
    
    
}
          

  calculator.show();
  
  
  