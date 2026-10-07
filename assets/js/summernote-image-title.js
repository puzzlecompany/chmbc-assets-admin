(function (factory) {
	/* global define */
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(window.jQuery);
	}
}(function ($) {
	$.extend(true, $.summernote.lang, {
		'en-US': {
			imageTitle: {
				edit: 'Edit title',
				titleLabel: 'Title',
				altLabel: 'Alternative Text'
			}
		},
		'fr-FR': {
			imageTitle: {
				edit: 'Modifier le titre',
				titleLabel: 'Titre',
				altLabel: 'Texte alternatif'
			}
		},
		'ja-JP': {
			imageTitle: {
				edit: 'タイトルを編集',
				titleLabel: 'タイトル',
				altLabel: '代替テキスト'
			}
		},
		'ko-KR': {
			imageTitle: {
				edit: '이미지 캡션 및 제목, 대체 텍스트 처리',
				titleLabel: '제목',
				altLabel: '대체 텍스트 == 이미지 캡션'
			}
		},
		'nl-NL': {
			imageTitle: {
				edit: 'Titel wijzigen',
				titleLabel: 'Titel',
				altLabel: 'Alternatieve tekst'
			}
		},
		'pt-BR': {
			imageTitle: {
				edit: 'Editar Título',
				titleLabel: 'Título',
				altLabel: 'Texto Alternativo'
			}
		},
		'es-ES': {
			imageTitle: {
				edit: 'Editar título',
				titleLabel: 'Título',
				altLabel: 'Texto alternativo'
			}
		},
		'ca-ES': {
			imageTitle: {
				edit: 'Editar títol',
				titleLabel: 'Títol',
				altLabel: 'Text alternatiu'
			}
		},
		'de-DE': {
			imageTitle: {
				edit: 'Titel bearbeiten',
				titleLabel: 'Titel',
				altLabel: 'ALT-Text'
			}
		},
		'ru-RU': {
			imageTitle: {
				edit: 'Заголовок изображения',
				titleLabel: 'Заголовок',
				altLabel: 'ALT текст'
			}
		},
		'th-TH': {
			imageTitle: {
				edit: 'เปลี่ยนชื่อรูปภาพ',
				titleLabel: 'ชื่อรูปภาพ',
				altLabel: 'รายละเอียดของรูปภาพ'
			}
		},
		'zh-TW': {
			imageTitle: {
				edit: '編輯',
				titleLabel: '圖片標題',
				altLabel: '圖片替代文字'
			}
		},
		'ar-Ar': {
			imageTitle: {
				edit: 'عدل العنوان',
				titleLabel: 'العنوان',
				altLabel: 'النص البديل'
			}
		},
		'fa-IR': {
			imageTitle: {
				edit: 'ویرایش عنوان',
				titleLabel: 'عنوان',
				altLabel: 'متن جایگزین'
			}
		},
		'ro-RO': {
			imageTitle: {
				edit: 'Editează titlu',
				titleLabel: 'Titlu',
				altLabel: 'ALT-Text'
			}
		},
		'tr-TR': {
			imageTitle: {
				edit: 'Başlığı düzenleyin',
				titleLabel: 'Başlık',
				altLabel: 'Alt Etiketi'
			}
		},
	});

	$.extend($.summernote.plugins, {
		'imageTitle': function (context) {
			var self = this;

			var ui = $.summernote.ui;
			var $note = context.layoutInfo.note;
			var $editor = context.layoutInfo.editor;
			var $editable = context.layoutInfo.editable;

			if (typeof context.options.imageTitle === 'undefined') {
				context.options.imageTitle = {};
			}

			if (typeof context.options.imageTitle.specificAltField === 'undefined') {
				context.options.imageTitle.specificAltField = false;
			}

			var options = context.options;
			var lang = options.langInfo;

			context.memo('button.imageTitle', function () {
				var button = ui.button({
					contents: ui.icon(options.icons.pencil),
					tooltip: lang.imageTitle.edit,
					container: false,
					click: function (e) {
						context.invoke('imageTitle.show');
					}
				});

				return button.render();
			});

			this.initialize = function () {
				var $container = options.dialogsInBody ? $(document.body) : $editor;

				var body = '<div class="form-group">' +
					'<label>이미지 타이틀 <code class="code2 mt-2"><small>마우스 커서가 위치했을 때 보여지는 말풍선</small></code></label>' +
					'<input class="note-image-title-text form-control" onkeyup="chkChar(this)" type="text" />' +
					'</div>';

				if (options.imageTitle.specificAltField) {
					body += '<div class="form-group">' +
						'<label>대체 텍스트 및 이미지캡션 <code class="code2 mt-2"><small>대체 텍스트 : 이미지를 표시할 수 없을 때 출력하는 이미지 설명</small></code></label>' +
						'<input class="note-image-alt-text form-control" onkeyup="chkChar(this)" type="text" />' +
						'<code>사용 불가능 키 \' " < > </code><br />'+
						'<code class="mt-1">이미지 삭제시 태그 내 figure 부분도 수동 삭제 해야합니다.</code><br />'+ 
						'<code class="code2 mt-1 font-weight-bold">예시태그) &lt;img src=&quot;이미지 경로&quot; alt=&quot;이미지를 표시할 수 없을 때 출력하는 이미지 설명&quot; title=&quot;마우스 커서가 위치했을 때 보여지는 말풍선&quot;&gt;</code><br />'+
						'<p><code class="code2 font-weight-bold">참고 : <a href="https://www.w3schools.com/tags/att_img_alt.asp" target="_blank">링크1</a> <a href="https://www.w3schools.com/tags/ref_standardattributes.asp" target="_blank">링크2</a></code></p>'+
						'</div>';
				}

				var footer = '<span id="img_caption_wrap_delete" class="badge bg-danger pointer mr-1">삭제</span><button href="#" class="btn btn-primary note-image-title-btn">' + lang.imageTitle.edit + '</button>';
				// var footer = '<button href="#" class="btn btn-primary note-image-title-btn">' + lang.imageTitle.edit + '</button>';

				this.$dialog = ui.dialog({
					title: lang.imageTitle.edit,
					body: body,
					footer: footer
				}).render().appendTo($container);
			};

			this.destroy = function () {
				ui.hideDialog(this.$dialog);
				this.$dialog.remove();
			};

			this.bindEnterKey = function ($input, $btn) {
				$input.on('keypress', function (event) {
					if (event.keyCode === 13) {
						$btn.trigger('click');
					}
				});
			};

			this.show = function () {
				var $img = $($editable.data('target'));
				var imgInfo = {
					imgDom: $img,
					title: $img.attr('title'),
					alt: $img.attr('alt'),
				};
				this.showLinkDialog(imgInfo).then(function (imgInfo) {
					ui.hideDialog(self.$dialog);
					var $img = imgInfo.imgDom;
				
					var entityMap = {
						'&': '&amp;',
						'<': '&lt;',
						'>': '&gt;',
						'"': '&quot;',
						"'": '&#39;',
						'/': '&#x2F;',
						'`': '&#x60;',
						'=': '&#x3D;'
					};
					function escapeHtml (string) {
						return String(string).replace(/[&<>"'`=\/]/g, function (s) {
						return entityMap[s];
						});
					}
				
					if (imgInfo.alt) {
						$img.attr('alt', escapeHtml(imgInfo.alt)); 
						
						if (!$img.parents('figure').last().length) {
							$img.wrap('<figure class="journal-image-wrap"></figure>').parent();
							$img.after('<figcaption class="journal-caption-wrap" contenteditable="false">'+escapeHtml(imgInfo.alt)+'</figcaption>'); 
						} else {
							$img.nextAll('figcaption').text(escapeHtml(imgInfo.alt)); 
						} 
						
					}
					else {
						$img.removeAttr('alt');
					}
				
					if (imgInfo.title) {
						$img.attr('title', escapeHtml(imgInfo.title));
					}
					else {
						$img.removeAttr('title');
					}
				
					$note.val(context.invoke('code'));
					$note.change();
				});
				this.deleteLinkDialog(imgInfo).then(function (imgInfo) {
					ui.hideDialog(self.$dialog);
					var $img = imgInfo.imgDom;
				
					var entityMap = {
						'&': '&amp;',
						'<': '&lt;',
						'>': '&gt;',
						'"': '&quot;',
						"'": '&#39;',
						'/': '&#x2F;',
						'`': '&#x60;',
						'=': '&#x3D;'
					};
					function escapeHtml (string) {
						return String(string).replace(/[&<>"'`=\/]/g, function (s) {
						return entityMap[s];
						});
					}
				
					if (imgInfo.alt) {
						$img.attr('alt', escapeHtml(imgInfo.alt)); 
						
						if (!$img.parents('figure').last().length) {
							$img.wrap('<figure class="journal-image-wrap"></figure>').parent();
							$img.after('<figcaption class="journal-caption-wrap" contenteditable="false">'+escapeHtml(imgInfo.alt)+'</figcaption>');
						} else {
							$img.nextAll('figcaption').text(escapeHtml(imgInfo.alt));
						} 
						
					}
					else {
						$img.removeAttr('alt');
					}
				
					if (imgInfo.title) {
						$img.attr('title', escapeHtml(imgInfo.title));
					}
					else {
						$img.removeAttr('title');
					}
				
					$note.val(context.invoke('code'));
					$note.change();
				});
			};

			this.showLinkDialog = function (imgInfo) {
				return $.Deferred(function (deferred) {
					var $imageTitle = self.$dialog.find('.note-image-title-text'),
						$imageAlt = (options.imageTitle.specificAltField) ? self.$dialog.find('.note-image-alt-text') : null,
						$editBtn = self.$dialog.find('.note-image-title-btn'),
						$deleteBtn = self.$dialog.find('#img_caption_wrap_delete');

					ui.onDialogShown(self.$dialog, function () {
						context.triggerEvent('dialog.shown');
						var $img = imgInfo.imgDom;
						if ($img.parents('figure').last().length) {
							$("#img_caption_wrap_delete").show();
						} else {
							$("#img_caption_wrap_delete").hide();
						}

						$editBtn.click(function (event) {
							event.preventDefault();
							deferred.resolve({
								imgDom: imgInfo.imgDom,
								title: $imageTitle.val(),
								alt: (options.imageTitle.specificAltField) ? $imageAlt.val() : $imageTitle.val(),
							});
						});
						
						$deleteBtn.click(function (event) {
							event.preventDefault(); 
							
							if ($img.parents('figure').last().length) {
								$img.parents('figure').last().remove();
								ui.hideDialog(self.$dialog);
							}
						});

						$imageTitle.val(imgInfo.title).trigger('focus');
						self.bindEnterKey($imageTitle, $editBtn);

						if (options.imageTitle.specificAltField) {
							$imageAlt.val(imgInfo.alt);
							self.bindEnterKey($imageAlt, $editBtn);
						}
					});

					ui.onDialogHidden(self.$dialog, function () {
						$editBtn.off('click');

						if (deferred.state() === 'pending') {
							deferred.reject();
						}
					});

					ui.showDialog(self.$dialog);
				});
			}; 
			
			
			
		}
	});
}));