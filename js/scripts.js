	/* This controls jQuery's accordion widget that displays the gift options */
		$(function() {
			$( "#accordion" ).accordion();
		});
		
	/* Initialize the running total of the amount spent */
		var total_spent = 0.00;

	/* Initialize the amount left in the budget */
		var amount_left = 0.00;
	
	/* Initialize the running count of the number of images */
		var image_count = 0;
	
	/* Handle Gift selected or de-selected - checkbox being clicked */
   		$('input[type=checkbox]').click(function() {
   			
   		/* Determine Budget */
			var budget = ($('input[name=budget]').val());

		/* Price of item clicked */
			var price = parseFloat($(this).siblings('.price').html());

		/* Create a random number between 0 and 5 to reference images */
   			var num = Math.floor(Math.random()*6);

		/* Randomize which gift image appears */
			var gift_image ="<img src='/images/gifts/smaller/gift"+ num +".png' alt='gift" +image_count +"' id='a" +image_count +"' class='drag_gift'>";
		
		/* If checkbox is checked */
			if($(this).is(':checked')) {
					
				/* Play jingle sound when gift is added */
					$('#sleigh_bells').trigger('play');

				/* Add a new gift image under the tree */
					$('#canvas').prepend(gift_image);

				/* Increase the running count of images under tree */
					image_count +=1;

				/* Make gift draggable */
					$('.drag_gift').draggable({containment: '#canvas', opacity:.35});

				/* Add price of selected item to get total_spent */
					total_spent += price;
			
		/* If checkbox was deselected then there is one less gift */					
			} else {
				
				/* Decrease the running count of images under tree */
					image_count -=1;
				
				/* Remove an gift image from under the tress */
					$("#a" + image_count).remove();

				/* Subtract price of selected item to get total_spent */
					total_spent -= price;
			}

		/* Calculate the amount left to spend */
			amount_left = budget - total_spent;

		/* Display running totals of Amounts spent and left */
			$('#spent').html('You have spent: $' + total_spent.toFixed(2));
	
		/* Display Amount Left if a budget is entered */
			if(!isNaN(budget) && budget !='') {
				
				/* If under budget, the text displays black */
					if(amount_left > 0){
						$('#left').removeClass('in_the_red');
						$('#left').html('You have left: $' + amount_left.toFixed(2));
								
				/* If over budget, display text as red */
					} else {
						$('#left').addClass('in_the_red');
						$('#left').html('You have left: $' + amount_left.toFixed(2));
					}

		/* Else don't display Amount Left*/			
			} else {
				$('#left').html('');
			}
		}); 
	/* End of code handling of gift checkbox being clicked */
	
	/* Click of Start Over Button */
		$('#startOver').click(function(){

			/* Remove all gifts from under tree */
				$('#canvas').html('');

			/* Clear messages */
				$('#spent').html('');
				$('#left').html('');
			
			/* Clear budget textbox */
				$('input[name=budget]').val('');

			/* Reset global variables to zero */
				total_spent = 0;
				amount_left =0;
				image_count = 0;

			/* Uncheck all checkboxes */
				$('input:checkbox').removeAttr('checked');

		});
	/* End of Click of Start Over Button */

	/* After change in budget field */
		$('input[name=budget]').blur(function() {
	
		/* Determine Budget */
			var new_budget = ($('input[name=budget]').val());
		
		/* Calculate new amount */
			amount_left = new_budget - total_spent;

		/* Display Amount Left if a budget is entered */
			if(!isNaN(new_budget) && new_budget !='') {
				
				/* If over budget, the text displays black */
					if(amount_left > 0){
						$('#left').removeClass('in_the_red');
						$('#left').html('You have left: $' + amount_left.toFixed(2));
								
				/* If under budget, display text as red */
					} else {
						$('#left').addClass('in_the_red');
						$('#left').html('You have left: $' + amount_left.toFixed(2));
					}

		/* Else don't display Amount Left*/	
			} else {
				$('#left').html('');
			}
		});
	/* End of change handling of budget field */
