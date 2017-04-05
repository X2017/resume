//Base
(function () {
	window.system={};
	var version=navigator.userAgent.toLowerCase();
	var browse;
	(browse = version.match(/firefox\/([\d\.]+)/)) ? system.firefox=browse[1] : 0;
	(browse = version.match(/chrome\/([\d\.]+)/)) ? system.chrome=browse[1] : 0;
	(browse = version.match(/version\/([\d\.]+).*safari/)) ? system.safari=browse[1] : 0;
	(browse = version.match(/net([\d\.]+)c\;.*rv\:([\d\.]+)/)) ? system.ie=+browse[2] : 0;
	(browse = version.match(/msie\s([\d\.]+)/)) ? system.msie=browse[1] : 0;
	if (/webkit/.test(version)) {
		system.webkit = version.match(/webkit\/([\d.]+)/)[1];
	}
})();
function $(argument) {
	return new Base(argument);
}
function Base(argument) {
	this.elements=[];
	if (typeof argument == 'string') {
		if (argument.indexOf(' ') != -1) {
			var elements=argument.split(' ');
			var childElement=[];
			var tempNode=[];
			for (var i = 0; i < elements.length; i++) {
				if (tempNode.length == 0) {
					tempNode.push(document);
				}
				switch(elements[i].charAt(0)){
					case '#':
						childElement=[];
						childElement.push(getId(elements[i].substring(1)));
						tempNode=childElement;
						break;
					case '.':
						childElement=[];
						for (var j = 0; j < tempNode.length; j++) {
							var allClass=getClass(elements[i].substring(1),tempNode[j]);
							for (var k = 0; k < allClass.length; k++) {
								childElement.push(allClass[k]);
							}
						}
						tempNode=childElement;
						break;
					default:
						childElement=[];
						for (var j = 0; j < tempNode.length; j++) {
							var allNode=getTagName(elements[i],tempNode[j]);
							for (var k = 0; k < allNode.length; k++) {
								childElement.push(allNode[k]);
							}
						}
						tempNode=childElement;
				}	
			}
			this.elements=childElement;
		}else {
			switch (argument.charAt(0)) {
				case '#':
					this.elements.push(getId(argument.substring(1)));
					break;
				case '.':
					this.elements=getClass(argument.substring(1));
					break;
				default:
					this.elements=getTagName(argument);
			}
		}
	}else if (typeof argument == 'object') {
		if (argument != 'undefined') {
			this.elements[0]=argument;
		}
	}else if (typeof argument == 'function') {
		addDomLoaded(argument);
	}
}
Base.prototype.value=function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 0) {
			return this.elements[i].value;
		}else {
			this.elements[i].value=str;
		}
	}
	return this;
}
Base.prototype.hide=function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='none';
	}
	return this;
}
Base.prototype.show=function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display='block';
	}
	return this;
}
Base.prototype.center=function (width,height) {
	var left=(getInner().width-width) / 2 + getScroll().left;
	var top=(getInner().height-height) /2 + getScroll().top;
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
		this.elements[i].style.zIndex=99999;
	}
	return this;
}
Base.prototype.bind=function (event,fn) {
	for (var i = 0; i < this.elements.length; i++) {
		addEvent(this.elements[i],event,fn);
	}
	return this;
}
Base.prototype.css=function (attr,value) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
}
Base.prototype.html=function (str) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			this.elements[i].innerHTML=str;
		}else{
			return this.elements[i].innerHTML;
		}
	}
	return this;
}
Base.prototype.eq=function (num) {
	var thisElement=this.elements[num];
	this.elements=[];
	this.elements[0]=thisElement;
	return this;
}
//添加Class
Base.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
}
//移除Class
Base.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (hasClass(this.elements[i], className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
	return this;
}
function getId(id) {
	return document.getElementById(id);	
}
function getClass(className,parentNode) {
	var node=null;
	var temp=[];
	if (parentNode != undefined) {
		node=parentNode;
	}else {
		node=document;
	}
	var allName=node.getElementsByTagName('*');
	for (var i = 0; i < allName.length; i++) {
		if ( ( new RegExp('(\\s|^)'+className+'(\\s|$)')).test(allName[i].className) ){
			temp.push(allName[i]);
		}
	}
	return temp;
}
function getTagName(name,parentNode) {
	var node=null;
	var temp=[];
	if (parentNode != undefined) {
		node=parentNode;
	}else {
		node=document;
	}
	var allName=node.getElementsByTagName(name);
	for (var i = 0; i < allName.length; i++) {
		temp.push(allName[i]);
	}
	return temp;
}
function getInner() {
	if (typeof window.innerWidth != 'undefined') {
		return {
			width : window.innerWidth,
			height : window.innerHeight
		}
	} else {
		return {
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}
function addEvent(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		if (!obj.events) obj.events = {};
		if (!obj.events[type]) {
			obj.events[type] = [];
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		obj.events[type][addEvent.ID++] = fn;
		obj['on' + type] = addEvent.exec;
	}
}
addEvent.ID = 1;
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
};
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};
Base.prototype.serialize = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		var form = this.elements[i];
		var parts = {};
		for (var i = 0; i < form.elements.length; i ++) {
			var filed = form.elements[i];
			switch (filed.type) {
				case undefined : 
				case 'submit' : 
				case 'reset' : 
				case 'file' : 
				case 'button' : 
					break;
				case 'radio' : 
				case 'checkbox' : 
					if (!filed.selected) break;
				case 'select-one' : 
				case 'select-multiple' :
					for (var j = 0; j < filed.options.length; j ++) {
						var option = filed.options[j];
						if (option.selected) {
							var optValue = '';
							if (option.hasAttribute) {
								optValue = (option.hasAttribute('value') ? option.value : option.text);
							} else {
								optValue = (option.attributes('value').specified ? option.value : option.text);
							}
							parts[filed.name] = optValue; 
						}
					}
					break;
				default :
					parts[filed.name] = filed.value;
			}
		}
		return parts;
	}
	return this;
};
Base.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	}
	return this;
};
Base.prototype.text = function (str) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 0) {
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i], text);
	}
	return this;
};
Base.prototype.length = function () {
	return this.elements.length;
};
Base.prototype.addClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (!hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};
Base.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onclick = fn;
	}
	return this;
};
Base.prototype.removeClass = function (className) {
	for (var i = 0; i < this.elements.length; i ++) {
		if (hasClass(this.elements[i], className)) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
		}
	}
	return this;
}
function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
}
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
function removeEvent(obj,type,fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type,fn,false);
	}else {
		for (var i in obj.events[type]) {
			if (obj.events[type][i] == fn) {
				delete obj.events[type][i];
			}
		}
	}
}
function addDomLoaded(fn) {
	var isReady=false;
	var timer=null;
	function doReady() {
		if (timer) {
			clearInterval(timer);
		}
		if (isReady) {
			return;
		}
		isReady=true;
		fn();
	}
	if (system.firefox < 3 || system.webkit < 525) {
		timer=setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		},1);
	}else if (document.addEventListener) {
		addEvent(document,'DOMContentLoaded',function () {
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if (system.msie < 9) {
		var timer=null;
		timer=setInterval(function () {
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){}
		},1);
	}
}
function trim(str) {
	if (arguments.length == 2) {
		return str.replace(/\s/g,'');
	}else {
		return str.replace(/(^\s*)|(\s*$)/g,'');
	}
}
function getStyle(elements,attr) {
	var value;
	if (typeof window.getComputedStyle != 'undefined') {
		value=window.getComputedStyle(elements,null)[attr];
	}else if (typeof elements.currentStyle != 'undefined') {
		value=elements.currentStyle[attr];
	}
	return value;
}
function getScroll() {
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}
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
function offsetTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while(parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
function ajax(obj) {
	var xhr=(function () {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();	
		}else if (typeof ActiveXObject != 'undefined') {
			var version=[
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp'
			];
			for (var i = 0; i < version.length; i++) {
				try{
					return new ActiveXObject(version[i]);
				}catch(e){}
			}
		}else {
			throw new Error('浏览器不支持XHR对象');
		}
	})();
	obj.url=obj.url+'?rand='+Math.random();
	obj.data=(function (data) {
		var arr=[];
		for (var i in data) {
			arr.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
		}
		return arr.join('&');
	})(obj.data);
	if (obj.method == 'get') {
		obj.url+=obj.url.indexOf('?') == -1 ? '?'+obj.data : '&'+obj.data;
	}
	if (obj.async === true) {
		xhr.onreadystatechange=function () {
			if (xhr.readyState == 4) {
				callBack();
			}
		}
	}
	xhr.open(obj.method, obj.url, obj.async);
	if (obj.method == 'post') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else {
		xhr.send(null);
	}
	if (obj.async === false) {
		callBack();
	}
	function callBack() {
		if (xhr.status == 200) {
			obj.success(xhr.responseText);
		}else {
			alert(xhr.status+' '+xhr.statusText);
		}
	}
}
//index
$(function () {
	$('#name').bind('blur',function () {
		if (!checkUser()) {
			$('.error').html('请输入公司名称，不能少于两位');
		}
	});
	$('#content').bind('blur',function () {
		if (!checkContent()) {
			$('.error').html('请输入留言内容');
		}
	});
	$('#button').bind('click',function () {
		var flag = true;
		if (!checkUser()) {
			$('.error').html('请输入公司名称，不能少于两位');
			flag = false;
		}
		if (!checkContent()) {
			$('.error').html('请输入留言内容');
			flag = false;
		}
		if (flag) {
			var _this = this;
			$('#load').center(100,20).html('正在留言...').show();
			_this.disabled = true;
			$(_this).css('cursor','wait');
			ajax({
				method:'post',
				url:'php/addMessage.php',
				data:$('#form').serialize(),
				success:function (text) {
					if (text == 1) {
						$('#load').html('留言成功').css('background'," #F2FFF9 url('img/succ.png') 2px 18px no-repeat");
					}else {
						$('#load').html('留言失败').css('background'," #F2FFF9 url('img/error.png') 2px 18px no-repeat");
					}
					setTimeout(function () {
						$('#load').hide();
						_this.disabled = false;
						$(_this).css('cursor','pointer');
					},1500);
				},
				async:true
			});
			setCookie({
				name:'name',
				value:$('#name').value(),
				expires:9999
			});
		}
	});
	if (getCookie('name')) {
		$('#cookie').html(getCookie('name')+'，你好！');
	}else{
		$('#cookie').html('游客，你好');
	}
	$('#email').bind('keyup',function (event) {
		var event = event || window.event;
		if ($(this).value().indexOf('@') == -1 && $(this).value().length >=2) {
			$('.allEmail').show();
			$('.allEmail li span').html($(this).value());
		} else {
			$('.allEmail').hide();
		}
		$('.allEmail li').css('background', 'none');
		$('.allEmail li').css('color', '#666');
		if (event.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#reg .all_email li').length() - 1) {
				this.index = 0;
			} else {
				this.index++;
			}
			$('.allEmail li').eq(this.index).css('background', '#e5edf2');
			$('.allEmail li').eq(this.index).css('color', '#369');
		}

		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('.allEmail li').length() - 1;
			} else {
				this.index--;
			}
			$('.allEmail li').eq(this.index).css('background', '#e5edf2');
			$('.allEmail li').eq(this.index).css('color', '#369');
		}
		if (event.keyCode == 13) {
			$(this).value($('.allEmail li').eq(this.index).text());
			$('.allEmail').hide();
			this.index = undefined;
		}
	});
	$('#email').bind('blur',function () {
		$('.allEmail').hide();
	});
	$('.allEmail li').bind('mousedown', function () {
		$('#email').value($(this).text());
		$('.allEmail').hide();
	});
	$('.allEmail li').hover(function () {
		$(this).css('background', '#e5edf2');
		$(this).css('color', '#369');
	}, function () {
		$(this).css('background', 'none');
		$(this).css('color', '#666');
	});
	$('#nav li').click(function () {
		$('#nav li').removeClass('active');
		$(this).addClass('active');
	});
});
function checkUser() {
	var flag = true;
	var value = trim($('#name').value());
	if (!/\S{2}/.test(value)) {
		flag = false;
	}
	return flag;
}
function checkContent() {
	var flag = true;
	var value = trim($('#content').value());
	if (!/\S{2}/.test(value)) {
		flag = false;
	}
	return flag;
}
console.log("%c 电话: 170 9723 6232 \n 邮箱: nowcom@163.com \n 朱渊 - web前端开发", "font-size:26px;color:#4C9ED9");