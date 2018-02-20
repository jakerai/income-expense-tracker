

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
		var re = new RegExp("^\\d+$");
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

	var token = localStorage.getItem("token");
    var data = {
        expenseAmount:expenseAmt,
		expenseNote:expenseNote,
		userId:userId,
		token:token
    }
    var rs = $.ajax({
		url:url.expenses,
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(data),
		success:function(res) {
		console.log('type of Success object:'+JSON.stringify(res));
		
		var tableBody = $('#tableExpenseBody');
		var data = JSON.stringify(res);
		loadExpenseTableBody(tableBody,data);
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



function loadExpenseTableBody(tableBodyId, data) {
	var jsonData = JSON.parse(data);
	console.log('length of data='+jsonData.entryDate);
	var tBody = '';
	var totalExpenseAmount = 0;
	$.each(jsonData, function (index,expense) {
		totalExpenseAmount += expense.amount;
		var date = new Date(expense.entryDate),
		dformat = [date.getMonth()+1,
				   date.getDate(),
				   date.getFullYear()].join('/')+' '+
				  [date.getHours(),
				   date.getMinutes(),
				   date.getSeconds()].join(':');

		tBody +=  "<tr> <td class='col-sm-3'>" +dformat +" </td> \
					<td class='col-sm-3'>"+expense.amount+"</td> \
					<td>"+expense.note+"</td> </tr>";
	});
	$('#label_total_expense').html("Total income "+totalExpenseAmount);
	$(tableBodyId).html(tBody);
}
$('#btnSubmit').dblclick(function(e){
		e.preventDefault();
	  });

