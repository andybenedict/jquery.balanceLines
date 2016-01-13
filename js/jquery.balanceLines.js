/**
 * jQuery plugin that uses padding to balance the ragged lines of text in a text box.
 * 
 * @author   Andy Benedict <dev@andybenedict.com>
 */
 
(function( $ ) {
    $.fn.balanceLines = function(){
        /**
         * Binary search for the best fit
         * 
         * @param {jQuery Object} Text containing object to fit
         * @return {int} Percentage based padding value
         */
        var balanceLinesGetPadding = function(block){
            // Get the initial height of the block to use for comparison
            var balanceHeight = block.height();
            // Get the content of the block to use for comparison
            var balanceContent = block.html();
            
            // Define the bounds of the search (percentage based)
            var minPad = 0;
            var maxPad = 100;
            var testPad = null;
            
            
            //Create a dummy object to manipulate for testing
            block.append('<div id="balanceTemporaryContainer" style="position:absolute; display:block; visibility:hidden;"></div>');

            //Assign dummy object to variable and match its size and content to the original
            balanceTemp = $("#balanceTemporaryContainer");
            balanceTemp.html(balanceContent);
            balanceTemp.width(block.width());

            //Perform the binary search for the best possible fit
            while (minPad < maxPad){
                testPad = minPad + Math.ceil((maxPad - minPad)/2);
                balanceTemp.css('padding-right', testPad + "%");
                
                if (balanceTemp.height() > balanceHeight){
                    maxPad = maxPad==testPad ? testPad-1 : testPad;
                }else{
                    minPad = testPad;
                }
            }
            
            //Destroy the temporary object
            balanceTemp.remove()
            
            //Return the calculated padding value, with a little bit of wiggle room
            return maxPad - 1;
        }
        
        /*
         * Balance all blocks in the collection
         */
        this.each(function(){
            //Isolate the block
            var block = $( this );
            //Reset the padding and ensure relative positioning
            block.css('padding-left', '');
            block.css('padding-right', '');
            block.css('position', 'relative');

            //Calculate the padding
            var balancePadding = balanceLinesGetPadding(block);
            
            //Apply the padding on the left, right or both depending on text alignment
            if (block.css('text-align') == 'right'){
                block.css('padding-left', balancePadding + "%");
            }else if (block.css('text-align') == 'center'){
                block.css('padding-left', (balancePadding/2) + "%");
                block.css('padding-right', (balancePadding/2) + "%");
            }else{
                block.css('padding-right', balancePadding + "%");
            }
        });
        
        //Make available for chaining
        return this;
    }
}( jQuery ));

/**
 * @license
 * Copyright (c) 2016 Andy Benedict <dev@andybenedict.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */