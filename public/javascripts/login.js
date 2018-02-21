

//validation for login or signin
$('#signin_id').on('input', function() {
	var input=$(this);
	var id=input.val();
	if(id){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});
// validation for login or signin password
$('#signin_password').on('input', function() {
	var input=$(this);
	var id=input.val();
	if(id){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

// After Form Submitted Validation
$("#btnLogin").click(function(event) {
	console.log("sign in");
	var form_data=$("#formLogin").serializeArray();
	console.log("Array serialized = "+JSON.stringify(form_data));
	var error_free=true;
	for (var input in form_data){
		var element=$("#signin_"+form_data[input]['name']);
		console.log('Element = '+JSON.stringify(element));
		var valid=element.hasClass("valid");
		var error_element=$("span", element.parent());
		if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;}
		else{error_element.removeClass("error_show").addClass("error");}
	}
	if (!error_free){
		event.preventDefault(); 
	}
	else{
		console.log('No errors: Form will be submitted');
	}
});




