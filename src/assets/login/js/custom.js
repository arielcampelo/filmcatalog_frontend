var url_base = "https://ilexis.net.br/dmhe/";


/*
*
* login 
*
*/

var tries = 0;

my_keyEnter();

function my_keyEnter()
{
	var input = document.getElementById("loginPassword");
	input.addEventListener("keyup", function(event) {
	  if (event.keyCode === 13) {
	   event.preventDefault();
	   js_login();
	  }
	});
}

function js_login()
{
	var email = js_get_form_email();
	var pass = js_get_form_password();
	
	js_message("");
	
	if (js_get_remember() == true)
	{
		js_message("Hora de lembrar.");
		window.location.href = "?frm=lembrar";
		return false;
	}
	
	if (email.trim().length == 0)
	{
		js_message("Digite o endereço de e-mail.");
		return false;
	}
	
	if (js_validate_email(email) == true)
	{
		
	}else{
		js_message("O endereço de e-mail não é válido.");
		return false;
	}
	
	if (pass.trim().length == 0)
	{
		js_message("Digite a senha para continuar.");
		return false;
	}
	
	
	js_checklogin(email, pass);
	
	
}

function js_get_form_email()
{
	var email = document.getElementById("loginEmail").value;
	return email; 
}

function js_get_form_password()
{
	var loginpassword = document.getElementById("loginPassword").value;
	return loginpassword; 
}

function js_get_remember()
{
	return document.getElementById('customCheck').checked;
}

function js_message(message)
{
	document.getElementById("loginMessage").innerHTML = message;
}

function js_validate_email(email) 
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function js_checklogin(email, pass)
{
	var flag = false;
	$.ajax({
		url: "autenticar.php",
		type: "POST",
		data: "username=" + email + "&password=" + pass,
		dataType: "html"
	
	}).done(function(response) {
		switch(response)
		{
			case 'user not found':
			js_message("O e-mail não está cadastrado. Crie uma conta.");
			break;
			case 'wrong password':
			js_message("A senha está incorreta.");
			tries++;
			if (tries > 4 && tries < 10){
				js_message("Se você continuar, sua conta será bloqueada. Marque a opção <b>'Lembrar'</b> para recuperar a senha.");
			}
			if (tries > 10){
				var email = js_get_form_email();
				js_block_account(email);
				js_message("Sua conta foi <b>bloqueada</b> por excesso de tentativas. Contate o administrador.");
				tries = 0;
			}
			break;
			case 'account disabled':
			js_message("Conta não validada. Contate o administrador.");
			break;
			case 'right password':
			document.getElementById("loginMessage").style.color="blue";
			js_message("Parabéns! Senha correta.");
			window.location.href =  url_base + "painel";
			break;
			default:
			js_message("Não foi possível encontrar uma conta válida.");
		}
		
	}).fail(function(jqXHR, textStatus ) {
		alert("Request failed: " + textStatus);
	
	}).always(function() {
		return flag;
	});
}


function js_block_account(email)
{
	var flag = false;
	$.ajax({
		url: "bloquear.php",
		type: "POST",
		data: "email=" + email,
		dataType: "html"
	
	}).done(function(response) {
		js_message("Sua conta foi <b>bloqueada</b> por excesso de tentativas. Acesse seu e-mail para desbloquear.");
	}).fail(function(jqXHR, textStatus ) {
		alert("Request failed: " + textStatus);
	}).always(function() {
		return flag;
	});
}


/*
*
* lembrar 
*
*/

function js_reset()
{
	var email = js_reset_get_form_email();
	js_reset_message("");
	
	if (email.trim().length == 0)
	{
		js_reset_message("Digite o endereço de e-mail.");
		return false;
	}
	
	
	if (js_validate_email(email) == false)
	{
		js_reset_message("O endereço de e-mail não é válido.");
		return false;
	}
	
	js_check_account(email);

}

function js_reset_message(message)
{
	document.getElementById("resetMessage").innerHTML = message;
}

function js_reset_get_form_email()
{
	var email = document.getElementById("resetEmail").value;
	return email; 
}

function js_check_account(email)
{
	var flag = false;
	$.ajax({
		url: "redefinirlink.php",
		type: "POST",
		data: "email=" + email,
		dataType: "html"
	
	}).done(function(response) {
		switch(response)
		{
			case '0':
			document.getElementById("resetMessage").style.color="blue";
			js_reset_message("Pronto! Acesse seu e-mail para redefinir a senha.");
			break;
			document.getElementById("resetMessage").style.color="blue";
			case '1':
			js_reset_message("Sua conta não foi validada. Acesse seu e-mail para validar.");
			break;
			case '2':
			document.getElementById("resetMessage").style.color="red";
			js_reset_message("O envido do link falhou. Tente novamente.");
			break;
			case '3':
			document.getElementById("resetMessage").style.color="blue";
			js_reset_message("O link já foi enviado. Acesse seu e-mail.");
			break;
			default:
			document.getElementById("resetMessage").style.color="red";
			js_reset_message("Não foi possível enviar o link para o e-mail informado.");
		}
		
	}).fail(function(jqXHR, textStatus ) {
		alert("Request failed: " + textStatus);
	
	}).always(function() {
		return flag;
	});
}

/*
*
* recuperar 
*
*/

function js_recover()
{
	var pass = js_recover_get_form_password();
	var cod = js_recover_get_form_cod();
	var user = js_recover_get_form_user();
	
	js_recover_message("");
	
	if (js_recover_check_size() == false)
	{
		js_recover_message("A senha deve possuir mais de 5 caracteres.");
		return false;
	}
	
	js_recover_password(pass, cod, user);
	
}

function js_recover_check_size()
{
	var pass = js_recover_get_form_password();
	if (pass.length < 6)
	{
		return false;
	}else{
		return true;
	}
}

function js_recover_message(message)
{
	document.getElementById("recoverMessage").innerHTML = message;
}

function js_recover_get_form_password()
{
	var email = document.getElementById("recoverPassword").value;
	return email; 
}

function js_recover_get_form_cod()
{
	var cod = document.getElementById("recoverCod").value;
	return cod; 
}

function js_recover_get_form_user()
{
	var user = document.getElementById("recoverUser").value;
	return user; 
}

function js_recover_password(pass, cod, user)
{
	var flag = false;
	$.ajax({
		url: "recuperar.php",
		type: "POST",
		data: "password=" + pass + "&cod=" + cod + "&user=" + user,
		dataType: "html"
	
	}).done(function(response) {
		switch(response)
		{
			case '0':
			document.getElementById("recoverMessage").style.color="blue";
			js_recover_message("Pronto! Sua senha foi redefinida.");
			window.location.href = url_base + "entrar/?frm=login";
			break;
			
			case '1':
			document.getElementById("recoverMessage").style.color="red";
			js_recover_message("As informações não são válidas.");
			break;
			
			case '2':
			document.getElementById("recoverMessage").style.color="red";
			js_recover_message("A conta não está ativada. Acesse o link no seu e-mail.");
			break;
			
			case '3':
			document.getElementById("recoverMessage").style.color="red";
			js_recover_message("As informações do usuário e o código não conferem.<br><br>Talvez, você já tenha realizado o processo.");
			break;
			
			default:
			document.getElementById("recoverMessage").style.color="red";
			js_recover_message("Não foi possível alterar a senha.");
		}
		
	}).fail(function(jqXHR, textStatus ) {
		alert("Request failed: " + textStatus);
	
	}).always(function() {
		return flag;
	});
}

/*
*
* registrar 
*
*/


function js_register()
{
	var country = js_register_get_form_country();
	var firstname = js_register_get_form_firstname().trim();
	var lastname = js_register_get_form_lastname().trim();
	var email = js_register_get_form_email().trim();
	var pass = js_register_get_form_password().trim() ;
	var repeatpass = js_register_get_form_repeatpassword().trim(); 
	
	js_register_message("");
	
	if (firstname.trim().length < 2){
		js_register_message("Digite um primeiro nome válido.");
		return false;
	}
	
	if (lastname.trim().length < 2){
		js_register_message("Digite um sobrenome válido.");
		return false;
	}
	
	if (js_validate_email(email)==false){
		js_register_message("Digite um endereço de e-mail válido.");
		return false;
	}
	
	if (pass.trim().length < 6){
		js_register_message("A senha deve ter mais de 5 caracteres.");
		return false;
	}
	
	if (repeatpass.trim().length < 6){
		js_register_message("Repita a senha.");
		return false;
	}
	
	if (pass != repeatpass){
		js_register_message("Você digitou duas senhas diferentes.");
		return false;
	}
	
	js_register_account(country, firstname, lastname, email, pass);
	

	
	
}

function js_register_message(message)
{
	document.getElementById("registerMessage").innerHTML = message;
}

function js_register_get_form_country()
{
	var email = document.getElementById("registerCountry").value;
	return email; 
}

function js_register_get_form_firstname()
{
	var email = document.getElementById("registerFirstName").value;
	return email; 
}

function js_register_get_form_lastname()
{
	var email = document.getElementById("registerLastName").value;
	return email; 
}

function js_register_get_form_email()
{
	var email = document.getElementById("registerEmail").value;
	return email; 
}

function js_register_get_form_password()
{
	var email = document.getElementById("registerPassword").value;
	return email; 
}

function js_register_get_form_password()
{
	var email = document.getElementById("registerPassword").value;
	return email; 
}

function js_register_get_form_repeatpassword()
{
	var email = document.getElementById("registerRepeatPassword").value;
	return email; 
}

function js_register_account(country, firstname, lastname, email, pass)
{
var flag = false;
	$.ajax({
		url: "registrar.php",
		type: "POST",
		data: "country=" + country + "&firstname=" + firstname + "&lastname=" + lastname + "&email=" + email + "&password=" + pass,
		dataType: "html"
	
	}).done(function(response) {
		switch(response)
		{
			case '0':
			document.getElementById("registerMessage").style.color="blue";
			js_register_message("Parabéns! Sua conta foi criada.<br><br>Acesse seu e-mail para validar o registro.");
			break;

			case '1':
			document.getElementById("registerMessage").style.color="red";
			js_register_message("Já há uma conta com o e-mail informado.");
			break;
			
			
			default:
			document.getElementById("registerMessage").style.color="red";
			js_register_message("Não foi possível realizar o cadastro. Verifique as informações.");
		}
		
	}).fail(function(jqXHR, textStatus ) {
		alert("Request failed: " + textStatus);
	
	}).always(function() {
		return flag;
	});	
}





