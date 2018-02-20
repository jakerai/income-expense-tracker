
//validation for firstname
$('#signup_firstName').on('input', function() {
	var input=$(this);
	var firstName=input.val();
	if(firstName){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});
//validation for lastname
$('#signup_lastName').on('input', function() {
	var input=$(this);
	var lastName=input.val();
	if(lastName){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

//validation for email
$('#signup_email').on('input', function() {
	var input=$(this);
	var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var email=re.test(input.val());
	if(email){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

//validation for username
$('#signup_username').change('input', function() {
	var input=$(this);
	var username=input.val();
	if(username){
		
		var data = {
			username:username,
			}

		var rs = $.ajax({
			url:url.check_usernames,
			type:'POST',
			contentType:'application/json',
			dataType:'json',
			data:JSON.stringify(data),
			success:function(res) {
			//var response =	JSON.stringify(res);
			console.log('type of Success object:'+res.isAvailable);
            if(Boolean(res.isAvailable) == true) {
			 input.removeClass("invalid").addClass("valid");
			 $("#error_username").removeClass("error").addClass("error_show").text("Username available");
			} else {
				input.removeClass("valid").addClass("invalid")
			$("#error_username").removeClass("error").addClass("error_show").text("Username Not available");
			}
			},
			error:function(err) {
			console.log('Error:'+JSON.stringify(err));
			
		}
		});
	}
	else{
		input.removeClass("valid").addClass("invalid");
		$("#error_username").text("This field is required");
	}
	
});

//validation for password
$('#signup_password').on('input', function() {
	var input=$(this);
	var password=input.val();
	if(password){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

//validation for Password confirm
$('#signup_passwordConfirm').on('input', function() {
	var input=$(this);
	var passwordConfirm=input.val();
	if(passwordConfirm){
		var password = $('#signup_password').val()
		if(password==passwordConfirm){
			input.removeClass("invalid").addClass("valid");
			
		} else {
			input.removeClass("valid").addClass("invalid");
			$('#error_passwordconfirm').removeClass("error").addClass("error_show").text("Password does not match");
		}
			    
	}
	else{input.removeClass("valid").addClass("invalid");}
});



// After Form Submitted Validation
$("#btnSignup").click(function(event){
	console.log("sign up");
	var form_data=$("#formSignup").serializeArray();
	console.log("Array serialized = "+JSON.stringify(form_data));
	var error_free=true;
	for (var input in form_data){
		var element=$("#signup_"+form_data[input]['name']);
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


