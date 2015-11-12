$(document).ready(function() {
	var currentUser = JSON.parse(localStorage.getItem("user"));
	var signInHtml = '';
	var signInHtmlEnd =
	'<div class="credentialsTable"w>\
	<div id="registerFormDiv">\
	<h4 class="signInHeader">Register</h4>\
		<form id="form_1037235" class="appnitro"  method="post" action="">\
				<ul >\
			<li id="li_2" >\
			<span>\
			<div>\
				<input type="text" id="element_2_1" name= "fname" class="element text required" maxlength="255" size="21" value=""/ placeholder="First Name">\
			</div>\
			</span>\
			<span>\
			<div>\
				<input type="text" id="element_2_2" name= "lname" class="element text required" maxlength="255" size="21" value=""/ placeholder="Last Name">\
			</div>\
			</span>\
			</li>\
			<li id="li_7" >\
			<div>\
			<input id="element_7sc" name="element_7" class="element text large required" type="text" maxlength="255" value=""/ placeholder="School">\
			</div>\
			</li>\
			<li id="li_6" >\
				<label class="description required" id="element_6_label" for="element_6">Are you a High School student or an Undergrad? </label>\
				<span>\
				<div id="highCol">\
					<input id="element_6_1" name="highCol" class="element radio highColRadio" type="radio" value="1" />\
					<label class="choice" for="element_6_1">High School</label>\
					<input id="element_6_2" name="highCol" class="element radio highColRadio" type="radio" value="2" />\
					<label class="choice" for="element_6_2">Undergrad</label>\
				</div>\
				</span>\
			</li>\
			<li id="li_1">\
			<label class="description required" for="element_1">What grade are you in? </label>\
			<div>\
			<select class="element select small" id="element_1" name="grade"> \
				<option value="9" >9</option>\
				<option value="10" >10</option>\
				<option value="11" >11</option>\
				<option value="12" selected>12</option>\
			</select>\
			</div> \
			</li>\
			<li id="li_3" >\
			<div>\
				<input id="element_3" name="element_3" class="element text medium required email" type="text" maxlength="255" value=""/ placeholder="Email">\
			</div> \
			</li>		<li id="li_4" >\
			<div>\
				<input id="element_4" name="element_4" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Password"> \
			</div><p class="guidelines" id="guide_4"><small>Your password must have at least 6 characters and contain at least one number</small></p> <!-- should passwords be able to contain spaces?-->\
			</li>		<li id="li_5" >\
			<div>\
				<input id="element_5" name="element_5" class="element text medium required" type="password" maxlength="255" value=""/ placeholder="Confirm Password"> \
			</div> \
			</li>\
			<li id="termsAgree" style="width:100%;">\
				<div style="display:inline-block;margin-left:1px;">\
					<input type="checkbox" name="agree" value="agree" id="agree">\
					<div id="agreeText" style="margin-left:23px;margin-top:-17px;"><p>I agree to the <a href="TermsandConditions.html" target="_blank" style="color:blue;">Terms and Conditions</a></p></div>\
				</div>\
			</li>\
			<li class="buttons">\
					<input type="hidden" name="form_id" value="1037235" />\
					<input id="saveForm" class="button_text signRegisterBut btn btn-primary btn-xs" type="submit" name="submit" value="Register"/>\
			</li>\
				</ul>\
			</form>\
			</div>\
			<div class="verticalSeparator" id="separateSignIn"></div>\
			<div id="signInFormDiv">\
			<h4 class="signInHeader">Sign In</h4>\
			<form id="signInForm" method="post" action="">\
			<!-- <span><label class="description" for="email">Email</label></span> -->\
			<div>\
			<input type="text" id="email" name= "email" maxlength="255" size="16" value="" class="element text medium required email" placeholder="Email">\
			</div>\
			<!-- <span><label class="description" for="name">Password</label></span> -->\
			<div>\
			<input type="password" id="password" name="password" maxlength="255" size="16" value="" class="element text medium required email" placeholder="Password">\
			</div>\
			<div>\
				<input type="submit" id="signInButton" name="signInButton" class="signRegisterBut btn btn-primary btn-xs" value="Sign In">\
			</div>\
		</form>\
		</div>\
		</div>';
	var currentLink = window.location.href;
	var shakeSign = false;
	if (currentUser == null && (currentLink.indexOf('submit.html') != -1 || currentLink.indexOf('poster.html') != -1)){
		signInHtml +='<center><div id="alertDiv"><p id="alerttext" class="alertP">You must have an account to submit a paper.&nbsp;&nbsp;</p><a href="index.html" style="z-index: 99999">Return to home page</a></div></center>' +signInHtmlEnd;
		shakeSign=true;
	}
	else{
		signInHtml += signInHtmlEnd;
	}
	$('#signInBox').html(signInHtml);
	if(shakeSign){
		$('#alertDiv').effect( "bounce", {times:3}, 1200 );
	}
	if (currentUser != null && !($("#navlist #nameli").length)) {
		document.getElementById('siso').innerHTML = "Sign Out";
		$('#aboutli').closest('li').after('<li><a href="user.html?id='+currentUser._id+'" id="nameli">'+currentUser.firstname+'</a></li>');
	}

	$('#siso').click(function(event) {
		event.preventDefault();
		if(currentUser == null) {
			$('#signInBox').dialog('open');
			$('#element_2_1').focus();
		}
		else { //sign out
			localStorage.clear();
			location.reload();
		}
	});

	$('.sm').smartmenus( {
		showFunction: function($ul, complete) {
			$ul.slideDown(250,complete);
		},
		hideFunction: function($ul, complete) {
			$ul.slideUp(250, complete);
		}
	});

	if(!localStorage["papers"]) {
		$.ajax({
			url: '/getPaper',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({"searchType": "every"}),
			dataType: 'json',
			success: function(curs) {
				var papers = []
				for (var i = 0; i < curs.length; i++) {
					papers.push(curs[i].title);
				}
				console.log(papers)
				localStorage["papers"] = JSON.stringify(papers);
				var fromStorage = "["+localStorage["papers"]+"]";
				var papers = JSON.parse(fromStorage);
				$('#searchBox').autocomplete({source:papers[0]});
			}
		});
	}
	else {
		var fromStorage = "["+localStorage["papers"]+"]";
		var papers = JSON.parse(fromStorage);
		$('#searchBox').autocomplete({source:papers[0]});
	}

	$('#signInBox').dialog({
		modal: true,
		resizable:false,
		minWidth: 800,
		minHeight: 'auto',
		autoOpen: false,
		show: 'fade',
		hide: 'drop'
	}); //end dialog

	function unique_ify(list) {
    var seen = {};
    var out = [];
    var len = list.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = list[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
	}

	if(!localStorage["schools"]) {
		$.ajax({
			url: '/getSchools',
			type: 'POST',
			data: {},
			dataType: 'json',
			contentType: 'application/json',
			success: function(curs) {
				var schools = []
				for (var i = 0; i < curs.length; i++) {
					schools.push(curs[i].school);
				}
				schools = unique_ify(schools);
				localStorage.setItem("schools", JSON.stringify(schools));
				var fromStorage = "["+localStorage["schools"]+"]";
				var schools = JSON.parse(fromStorage);
				$('#element_7sc').autocomplete({source:schools[0]});
			}
		});
	}
	else {
		var fromStorage = "["+localStorage["schools"]+"]";
		var schools = JSON.parse(fromStorage);
		$('#element_7sc').autocomplete({source:schools[0]});
	}

	$('#registerClick').click(function(event){
		event.preventDefault();
		$('#signInBox').dialog('open');
		$('#email').focus();
	});

	$(document).on("click", ".searchBoxSubmit", function(event){
		event.preventDefault();
		query=$('#searchBox').val();
		var searchType = $("input[name=searchTypeOptions]:checked").val();
		console.log(searchType);
		switch(searchType) {
			case "All":
				var type = 1;
				break;
			case "Title":
				var type = 2;
				break;
			case "Keyword":
				var type = 3;
				break;
			case "Author":
				var type = 4;
			  break;
			default:
				var type = 1;
		}
		console.log(type + "TYPE!")
		window.location.href = "results.html?type="+type+"query="+query;
	});

	$('#signInForm').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		readSignInForm($('#signInForm'));
		$('#signinBox').dialog('close');
	});

	$('#form_1039889').submit(function(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		console.log("hello there!")
		readSubmitPaperForm($('#form_1039889'));
	});
	var submitted=false;
	$('#form_1037235').submit(function(event) {
		// console.log('changed');
		// submitted=true;
		event.preventDefault();
		event.stopImmediatePropagation();
		readRegisterForm($('#form_1037235'));
		window.location.href = "index.html";
		console.log('working');
	});
	//start html injection prevention
	$('#form_1037235 :text').change(function(){
		var inputText = $(this).val();
		$(this).val($( $.parseHTML(inputText)).text());
	});
	//end html detection prevention

	// if (submitted){
		// $('#registerComplete').dialog('open');
	// }

	// $('.signRegisterBut').button();

	//add in missing files for sign in
	var headText= $('head').html();
	if (headText.indexOf('href="css/searchBox.css"')<0){
		$('head').append('<link rel="stylesheet" href="css/searchBox.css" type="text/css" />');
	}

	if (headText.indexOf('jquery.validate.min.js')<0){
		$('head').append('<script src="libs/jquery.validate.min.js" type="text/javascript"></script>');
	}

	if (headText.indexOf('javascript/view.js')<0){
		$('head').append('<script src="javascript/view.js" type="text/javascript"></script>');
	}

	if (headText.indexOf('view.css')<0){
		$('head').append('<link href="css/view.css" rel="stylesheet">');
	}
	if (headText.indexOf('fancybox.css')<0){
		$('head').append('<link href="css/jquery.fancybox.css" rel="stylesheet">');
	}
	if (headText.indexOf('jquery.fancybox.pack.js')<0){
		$('head').append('<link href="javascript/jquery.fancybox.pack.js" rel="stylesheet">');
	}

	//start register javascript
	$('#li_1').hide();
			jQuery.validator.addMethod("isValidEmail", function(value, element) {
			var emailRegex= /(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*:(?:(?:\r\n)?[ \t])*(?:(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*)(?:,\s*(?:(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*|(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)*\<(?:(?:\r\n)?[ \t])*(?:@(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*(?:,@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*)*:(?:(?:\r\n)?[ \t])*)?(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|"(?:[^\"\r\\]|\\.|(?:(?:\r\n)?[ \t]))*"(?:(?:\r\n)?[ \t])*))*@(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*)(?:\.(?:(?:\r\n)?[ \t])*(?:[^()<>@,;:\\".\[\] \000-\031]+(?:(?:(?:\r\n)?[ \t])+|\Z|(?=[\["()<>@,;:\\".\[\]]))|\[([^\[\]\r\\]|\\.)*\](?:(?:\r\n)?[ \t])*))*\>(?:(?:\r\n)?[ \t])*))*)?;\s*)/
			var email=value.match(emailRegex);
			return this.optional(element) || email;
			}, "");

			jQuery.validator.addMethod("hasNumber", function(value, element) {
			var noNums= value.search(/\d/) == -1;  //if true, then no numbers
			return !noNums;
			}, "");

			jQuery.validator.addMethod("notJustNums", function(value, element) {
			var isNum = /^\d+$/;
			var number=isNum.test(value); //check to see if it's only numbers
			return !number;
			}, "");

			$('#element_1').selectmenu({
				width: 62,
				icons: {
					button: "ui-icon-circle-triangle-s"
				}//end icons
			}); //end selectmenu
			// $('#saveForm').button();
			$('#form_1037235').validate({
				rules: {
					element_3: { //email
						isValidEmail : true
					},

					element_4: { //password
						minlength: 6,
						hasNumber : true,
						notJustNums: true
					},
					element_5: { //confirm password
						equalTo: '#element_4'
					},
					element_6: { //radio button for highschool or college
						required:true
					},
					agree:{
						required:true
					}
				},//end rules
				messages: {
					element_3:{ //email
						required: "This field is required",
						isValidEmail: "Please enter a valid email address"
					},
					element_4: {
						hasNumber: "Make sure that your password contains at least one number",
						notJustNums: "Your password cannot contain only numbers",
						minlength: "Your password must contain at least six characters"
					},
					element_5: {
						equalTo: "The passwords do not match"
					},
					element_6: { //radio button for highschool or college
						required: "Please choose either High School or Undergrad"
					}
				},//end messages
				errorPlacement: function(error, element) {
					if (element.is(":radio") || element.is(":checkbox")){
						error.appendTo(element.parent());
					}
					else{
						error.insertAfter(element);
					}
				} //end error placement
			}); //end validate
			function getvalues(f)
			{
				var form=$("#"+f);
				var str='';
				$("input:not('input:submit')", form).each(function(i){
					str+='\n'+$(this).prop('name')+': '+$(this).val();
				});
				return str;
			}
			var isvalidate=false;
			var submitClicked=false;
			$('#saveForm').click(function(e){
				console.log("I ran");
				submitClicked=true;
				$('#form_1037235').validate();
				var isvalidate=$("#form_1037235").valid();
				if(isvalidate == false)
				{
					e.preventDefault();
					$('.buttons').append('<p id="incompleteRegister">One or more fields are still invalid</p>');
				}
			});
			$('#form_1037235').change(function() {
				if (isvalidate == false && submitClicked == true){
					isvalidate=$("#form_1037235").valid();
					if(isvalidate == true){
						$('#incompleteRegister').remove();
					}
				}
			});

			$('.sm').smartmenus({
				showFunction: function($ul, complete){
					$ul.slideDown(250,complete);
				},
				hideFunction: function($ul, complete){
					$ul.slideUp(250, complete);
				}
			}); //end smartmenus

			$(':radio').click(function() {
				if ($('input[name="highCol"]:checked').val()=="1"){
					$('#li_1').slideDown();
				}
				else{
					$('#li_1').slideUp();
				}

			}) //end high school or undergrad click

	//end register JavaScript
});

function readSignInForm(form) {
	console.log('read from sign in');
	var signinEmail = $('#email').val();
	console.log('read from sign in!');
	var signinEmail = $("#email").val();
	var signinPassword = $("#password").val();
	requestUser(signinEmail, signinPassword);
}

function readRegisterForm(form) {
	console.log('read from register');
	var firstname = $('#element_2_1').val(),
	    lastname = $('#element_2_2').val(),
	    is_highschool = $('#element_6_1').val(),
	    is_undergrad = $('#element_6_2').val(),
	    school = $('#element_7').val();
	if(is_highschool) {
		var grade = $('#element_1').val();
	}
	else {
		var grade = "undergrad"
	}
	var email = $('#element_3').val(),
	password = $('#element_5').val();

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//jan -> 0 (+1)
	var yyyy = today.getFullYear();

	if(dd<10) {
    	dd='0'+dd
	}

	if(mm<10) {
    	mm='0'+mm
	}

	today = mm+'/'+dd+'/'+yyyy;

	var newuser = {"fnm": firstname, "lnm": lastname, "grd": grade,
				   "shl": school, "eml": email, "pwd": password, "pub": [],
				   "dte": today};
	addUser(newuser);
}

function readSubmitPaperForm(form) {
	var title = $('#title').val(),
		abstract = $('#element_2').val(),
		keywords = $('#element_9').val().split("\n"),
		authorsid = [$('#element_4_1').val()];

		for(var i = 0; i < $('.spawnUserID').length; i++) {
			authorsid.push($('.spawnUserID')[i].value);
		}

		var today = new Date(),
		    dd = today.getDate(),
				mm = today.getMonth()+1,
				yyyy = today.getFullYear();

		if(dd<10) {
    		dd='0'+dd;
		}

		if(mm<10) {
    		mm='0'+mm;
		}

		today = mm+'/'+dd+'/'+yyyy;
		var formData = new FormData();
		formData.append('pdf', $(element_3)[0].files[0]);
		$.ajax({
			url: '/addPdf',
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
			success: function(response) {
				console.log("response " + response)
				var paperdata = {
					"title": title,
					"authors": authorsid,
					"abstract": abstract,
					"keywords": keywords,
					"pdf": response,
					"date": today
				}
				addPaper(paperdata);
			}
		});
}


function addUser(newuser) {
	console.log("submitting new user to node server");

	$.ajax({
				url: '/addUser',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newuser),
				dataType: 'json',
				success: returntoIndex
			});

	function returntoIndex(response) {
		document.location.href = "/index.html";
	}
}

function addPaper(newpaper) {
	console.log("submitting paper to node server");
	$.ajax({
				url: '/addPaper',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(newpaper),
				dataType: 'json',
				success: newsearchpaper
			});

	function newsearchpaper(response) {
		document.location.href = "/results.html?type=2query="+newpaper.title;
	}
}

function requestUser(email, password) {
	var requser = {
		"email": email,
		"password": password
	}
	console.log('requesting user');
	$.ajax({
		url: '/getUser',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(requser),
		dataType: 'json',
		success: loginuser,
		error: giveloginerror
	});

	function giveloginerror(jqXHR, textStatus) {
		if (textStatus == 'parsererror'){
			if ($('.userPass').length == 0){
			$('#signInFormDiv').append('<p class="failedSignIn userPass" style="float:left;color:#f00;font-weight: bold;font-size: 12px;line-height: 9px;text-align:center;">No known user with above login credentials.</p>');
				if($('.unknownE').length > 0){
					$('.unknownE').remove();
				}
			}
			else{
				$('.userPass').effect('shake');
			}
			console.log('combo error');
		}
		else{
			if ($('.unknownE').length == 0){
			$('#signInFormDiv').append('<p class="failedSignIn unknownE" style="float:left;color:#f00;font-weight: bold;font-size: 12px;line-height: 9px;text-align:center;">Unknown error. Please try logging in later</p>');
				if($('.userPass').length > 0){
					$('.userPass').remove();
				}
			}
			else{
				$('.unknownE').effect('shake');
			}
			console.log('other error');
		}
	}

	function loginuser(response) {
		console.log(response);
		user = JSON.stringify(response);
		localStorage.setItem("user", user);
		document.location.href = "/index.html";
	}
}
