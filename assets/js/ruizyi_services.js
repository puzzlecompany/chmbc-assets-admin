var spinArray = [
    'round', 
    'pinwheel', 
    'balls', 
    'bubble', 
    'flip', 
    'hue', 
    'skeleton', 
    'eclipse', 
    'boxes', 
    'morph', 
    'heart', 
    'meter' 
];
			
function stripHTML(dirtyString) {
	var container = document.createElement('div');
	var text = document.createTextNode(dirtyString);
	container.appendChild(text);
	return container.innerHTML;
} 

function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!dateString.match(regEx)) return false;
	var d = new Date(dateString);
	if(!d.getTime() && d.getTime() !== 0) return false;
	return d.toISOString().slice(0,10) === dateString;
}

function isValidDateTime(datetimeString) {
	var regEx = /^\d{4}-\d{2}-\d{2} \d{2}\d{2}\d{2}$/;
	if(!datetimeString.match(regEx)) return false;
	var d = new Date(datetimeString);
	if(!d.getTime() && d.getTime() !== 0) return false;
	return d.toISOString().slice(0,10) === datetimeString;
}


				
$(document).on("click", 'span#image_reset', function() {
	var dataId = $(this).data("id");
	$("img."+dataId).attr("src", "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D");
});	
				
function replaceNewLineChars(value) {
/*
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    } else {
        return value;
    }
*/
    return value;
}  

				
function replaceNewLineChars2(value) {
/*
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    } else {
        return value;
    }
*/
    return value;
}  

				
function replaceNewLineChars3(value) {
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    } else {
        return value;
    }
    return value;
}
        
function generateRandomString(length = 15) {
    var result = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    
    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return result;
}
        
function generateRandomString2(length = 15) {
    var result = "";
    var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for (var i = 0; i < length; i++) result += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return result;
}


function strip_tags (input, allowed) {
	if($.isNumeric(input)) {
		return input;
	} else {
	    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
	    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
	        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
	    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
		    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
	    });
	}
}


function viewKorean(num) {	
    var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
    var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
    var result = "";
	for(i=0; i<num.length; i++) {		
		str = "";
		han = hanA[num.charAt(num.length-(i+1))];
		if(han != "")
			str += han+danA[i];
		if(i == 4) str += "만";
		if(i == 8) str += "억";
		if(i == 12) str += "조";
		if(i == 16) return;
		result = str + result;
	}
	if(num != 0)
		result = result + "원";
    return result ;
}


function iconFormat(icon) {
    var originalOption = icon.element;
    if (!icon.id) { return icon.text; }
    var $icon = '<i class="' + $(icon.element).data('icon') + '"></i>' + icon.text;

    return $icon;
}	


function iconFormat_after(icon) {
    var originalOption = icon.element;
    if (!icon.id) { return icon.text; }
    var $icon = icon.text+' <i class="' + $(icon.element).data('icon') + ' ml-2"></i>';

    return $icon;
}		


function imgFormat_after_small(icon) {
    var originalOption = icon.element;
    if (!icon.id) { return icon.text; }
    var $icon = '<b>'+icon.text+'</b> <img src="' + $(icon.element).data('img') + '" style="height: auto; width: 280px; width: 70px; margin-left: 20px; -webkit-filter: grayscale(100%); filter: grayscale(100%); border: 1px solid #dadada;">';

    return $icon;
}

function imgFormat_after(icon) {
    var originalOption = icon.element;
    if (!icon.id) { return icon.text; }
    var $icon = icon.text+' <img src="' + $(icon.element).data('img') + '" style="height: auto; width: 280px; -webkit-filter: grayscale(100%); filter: grayscale(100%); border: 1px solid #dadada;">';

    return $icon;
}	


function pagecontainerFormat(template) {
    var originalOption = template.element;
    if (!template.id) { return template.text; }
    var $template = '<span class="badge bg-dark mr-2">템플릿 : ' + $(template.element).data('template') + '번</span>' + template.text;

    return $template;
}	


function main_setting_themeFormat(template) {
    var originalOption = template.element;
    if (!template.id) { return template.text; }
    var $template = '<span class="badge '+$(template.element).data('class')+' mr-2">THEME - ' + $(template.element).data('theme') + '</span>' + template.text;
    

    return $template;
}	


function tagFormat(template) {
    var originalOption = template.element;
    if (!template.id) { return template.text; }
    var $template = $(template.element).data('html');

    return $template;
}	 