

$(document).ready(function() {
	var _working = false;
    $('#btnAddExpense').on('click',function() {
		if(_working) return;
		_working = true;
    console.log('add expense clicked...');
    var expenseAmt = $('#expense_expenseAmount').val();
	var expenseNote = $('#expense_expenseNote').val();
	var userId = $('#userId').text().trim();

	if(expenseAmt == "" && expenseNote == "") {
		$('#error_expenseAmount').removeClass("error").addClass("error_show");
		$('#error_expenseNote').removeClass("error").addClass("error_show");
		_working = false;
	}
	
	if(expenseAmt == "") {
		$('#error_expenseAmount').removeClass("error").addClass("error_show");
		_working = false;
		if(expenseNote != ""){
			$('#error_expenseNote').removeClass("error_show").addClass("error");
		}
	  return;
	} else {
		//check if amount is numeric
		var re = new RegExp("[0-9]");
		var valid=re.test(expenseAmt); 
		console.log("is valid="+valid);
		if(!valid) {
			$('#error_expenseAmount').removeClass("error").addClass("error_show");
			$('#error_expenseAmount').text("Can only be Numeric");
			_working = false;
			return
		} else {
		$('#error_expenseAmount').removeClass("error_show").addClass("error");
		}
		
	} 
	if (expenseNote == "") {
		$('#error_expenseNote').removeClass("error").addClass("error_show");
		_working = false;
      return;
	} else {
		$('#error_expenseNote').removeClass("error_show").addClass("error");
	}  


    var data = {
        expenseAmount:expenseAmt,
		expenseNote:expenseNote,
		userId:userId
    }
    var rs = $.ajax({
		url:config.url_expenses,
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(res) {
		console.log('type of Success object:'+JSON.stringify(res));
		
		var tableBody = $('#tableExpenseBody');
		var data = JSON.stringify(res);
		loadTableBody(tableBody,data);
		$('#expense_expenseAmount').val("");
	    $('#expense_expenseNote').val("");
		_working = false;
		},
		error:function(err) {
		console.log('Error:'+JSON.stringify(err));
		_working = false;
	}
	});
	})
});



function loadTableBody(tableBodyId, data) {
	var jsonData = JSON.parse(data);
	console.log('length of data='+jsonData.entryDate);
	var tBody = '';
	$.each(jsonData, function (index,income) {
		
		tBody +=  "<tr> <td class='col-sm-3'>" +income.entryDate +" </td> \
					<td class='col-sm-3'>"+income.amount+"</td> \
					<td>"+income.note+"</td> </tr>";
	});
	$(tableBodyId).html(tBody);
}
$('#btnSubmit').dblclick(function(e){
		e.preventDefault();
	  });

