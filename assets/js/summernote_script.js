
$(document).ready(function() {
	$("[name=content]").summernote({
		imageTitle: {
		  specificAltField: true,
		},
		lang: 'ko-KR',
		fontNames: ['Nanum Gothic', 'Nanum Myeongjo', 'Do Hyeon', 'Sunflower', 'Nanum Brush Script', 'Gothic A1', 'Black Han Sans', 'Song Myung', 'Jua', 'Poor Story', 'Stylish', 'Cute Font', 'Yeon Sung', 'Dokdo'],
		fontNamesIgnoreCheck: ['Arial'],
		dialogsFade: true,
		disableDragAndDrop: true,
		height: 500,
		fontSize: 20,
		tabsize: 2,
		fontSizes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41'],
		toolbar: [
	        ['style', ['style']],        
	        ['font', ['trsp2_button', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
	        ['fontsize', ['fontsize']],
// 	        ['fontname', ['fontname']],
	        ['color', ['color']],
	        ['para', ['ul', 'ol', 'paragraph']],
	        ['height', ['height']],
	        ['table', ['table']],
	        ['insert', ['link', 'picture', 'video', 'videoAttributes', 'instagram_button', 'gallery_ruizyi_button']],
	        ['view', ['fullscreen', 'codeview']],
	    ],
        popover: {
            image: [ 
                // ['imagesize', ['imageTitle', 'imageSize100', 'imageSize50', 'imageSize25']],
				['imagesize', ['imageTitle']],
                // ['float', ['floatLeft', 'floatRight', 'floatNone']],
                // ['remove', ['removeMedia']]
            ],
        }, 
        112:{
            icon:'<i class="note-icon-pencil"/>',
            removeEmpty:false, // true = remove attributes | false = leave empty if present
            disableUpload: false // true = don't display Upload Options | Display Upload Options
        },
	    callbacks: {
	        onImageUpload: function(files) {
	            var maxSize = 10 * 1024 * 1024;
	            var isMaxSize = false;
	            var maxFile = null;
	            for (var i = 0; i < files.length; i++) {
	                if (files[i].size > maxSize) {
	                    isMaxSize = true;
	                    maxFile = files[i].name;
	                    break;
	                }
	            }
	
	            if (isMaxSize) {
	                alert('[' + maxFile + '] 파일이 업로드 용량을(최대 10MB) 초과하였습니다.');
	            } else {
	                for (var i = 0; i < files.length; i++) {
	                    sendFile(files[i], this);
	                }
	            }
	        },
	        onPaste: function (e) {
		        
	            var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
	
	            e.preventDefault();
	
	            // Firefox fix
	            setTimeout(function () {
	                document.execCommand('insertText', false, bufferText);
	            }, 10);
	        } 
	    }
	});
});		
				
function sendFile(file, editor) { 
    data = new FormData();
    data.append("editorFile", file); 
    data.append(csrf_key, csrf_value);  
	$(".image_loader").show();
    $.ajax({
		data: data,
		type: "POST",
		url: "/editor_upload",
		cache: false,
		contentType: false,
		processData: false,
		success: function(data) {
			console.log(data);
			var obj =  JSON.parse(data);
			if (obj.status) {
				$(editor).summernote("insertImage", obj.save_url);
				$(".image_loader").hide();
			} else {
				$(".image_loader").hide();
				switch(parseInt(obj.error)) {
				case 1: alert('업로드 용량 제한에 걸렸습니다.'); break; 
				case 2: alert('MAX_FILE_SIZE 보다 큰 파일은 업로드할 수 없습니다.'); break;
				case 3: alert('파일이 일부분만 전송되었습니다.'); break;
				case 4: alert('파일이 전송되지 않았습니다.'); break;
				case 6: alert('임시 폴더가 없습니다.'); break;
				case 7: alert('파일 쓰기 실패'); break;
				case 8: alert('알수 없는 오류입니다. 용량을 확인해 주시기 바랍니다. 2메가 이상은 올릴 수 없습니다.'); break;
				case 100: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
				case 101: alert('이미지 파일이 아닙니다.(jpeg, jpg, gif, png 만 올리실 수 있습니다.)'); break; 
				case 102: alert('0 byte 파일은 업로드 할 수 없습니다.'); break; 
				}
			
			}
		}
	});
}