function setCookie(obj) {
	var cookieName=encodeURIComponent(obj.name) +'='+ encodeURIComponent(obj.value);
	if (typeof obj.expires == 'number') {
		var d = new Date();
		d.setDate(d.getDate()+obj.expires);
		if (d instanceof Date) {
			cookieName += ';expires=' + new Date(d);
		}
	}
	if (obj.path) {
		cookieName += ';path=' + obj.path;
	}
	if (obj.domain) {
		cookieName += ';domain=' + obj.domain;
	}
	if (obj.secure) {
		cookieName += ';secure=' + obj.secure;
	}
	document.cookie = cookieName;
}
function getCookie(name) {
	var cookieName = encodeURIComponent(name) +'=';
	var cookieStart = document.cookie.indexOf(cookieName);
	var cookieValue = null;
	if (cookieStart > -1) {
		cookieEnd = document.cookie.indexOf(';',cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length,cookieEnd));
	}
	return cookieValue;
}
function removeCookie(name) {
	document.cookie = name + '=;expires=' + new Date(0); 
}