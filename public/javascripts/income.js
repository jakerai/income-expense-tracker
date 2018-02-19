


$(document).ready(function() {
	var _working = false;
    $('#btnAddIncome').on('click',function() {
	if(_working)return;
	_working =true;
	console.log('add income clicked...');
    var incomeAmt = $('#income_incomeAmount').val();
	var incomeNote = $('#income_incomeNote').val();
	var userId = $('#userId').text().trim();
	
     //validation
	if(incomeAmt == "" && incomeNote == "") {
		$('#error_incomeAmount').removeClass("error").addClass("error_show");
		$('#error_incomeNote').removeClass("error").addClass("error_show");
		 _working = false;
		 return
	}
	
	if(incomeAmt == "") {
		$('#error_incomeAmount').removeClass("error").addClass("error_show");
		 _working = false;
		if(incomeNote != ""){
			$('#error_incomeNote').removeClass("error_show").addClass("error")	
		}
	  return;
	} else {
		//check if amount is numeric
		var re = new RegExp("[0-9]");
		var valid=re.test(incomeAmt); 
		console.log("is valid="+valid);
		if(!valid) {
			$('#error_incomeAmount').removeClass("error").addClass("error_show");
			$('#error_incomeAmount').text("Can only be Numeric");
			_working = false;
			return
		} else {
		$('#error_incomeAmount').removeClass("error_show").addClass("error");
		}
	} 
	if (incomeNote == "") {
		$('#error_incomeNote').removeClass("error").addClass("error_show")
		_working = false;
      return;
	} else {
		$('#error_incomeNote').removeClass("error_show").addClass("error")
	}  
   
    var data = {
        incomeAmount:incomeAmt,
		incomeNote:incomeNote,
		userId:userId
    }
    var rs = $.ajax({
		url:'http://localhost:3001/money/income',
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(res) {
		var data =	JSON.stringify(res);
		console.log('Return = '+data);
		//get table body by id
		var tableBody = $('#tableIncomeBody');
		loadTableBody(tableBody,data); 
		//clear fields
		$('#income_incomeAmount').val("");
	    $('#income_incomeNote').val("");				
		_working=false;
		},
		error:function(err) {
		console.log('Error:'+JSON.stringify(err));
		_working =false;
	}
	});
	})
});





function loadTableBody(tableBodyId, data) {
	var jsonData = JSON.parse(data);
	var tBody = '';
    var totalIncomeAmount = 0;
	$.each(jsonData, function (index,income) {
		totalIncomeAmount += income.amount;
		tBody +=  "<tr> <td class='col-sm-3'>" +income.entryDate +" </td> \
					<td class='col-sm-3'>"+income.amount+"</td> \
					<td>"+income.note+"</td> </tr>";
					console.log("Total amount = "+totalIncomeAmount);
	});
	
	$(tableBodyId).html(tBody);
	$('#label_total_income').html("Total income "+totalIncomeAmount);
}

$('#btnSubmit').dblclick(function(e){
	e.preventDefault();
  });
