(function(gtris) {
	'use strict';
	if (!gtris) {
		gtris = window.gtris = {};
	}
	if (!gtris.ui) {
		gtris.ui = window.gtris.ui = {};
	}
	var tab = {
		init: function(obj) {
			var _obj = obj;
			var $target = $(_obj.target);

			if(!_obj.event) {
				_obj.event = 'click';
			}
			else if(_obj.event == 'mouseover') {
				_obj.event += ' focus';
			}

			$target.each(function() {
				var $tab_head = $(this);
				var target_id = [];

				$tab_head.find('[data-id]').each(function() {
					var $tab_nav = $(this);
					var this_id = "#" + $(this).attr('data-id');
					target_id.push(this_id);
					$tab_nav.on(_obj.event, function(event) {
						tab.attatchTabEvent.call(this, event, $tab_head, target_id, this_id);
					});
				});
			});
		},
		ajaxCall: function(this_id) {
			$.ajax({
				url: this.href,
				beforeSend : function() {
					$(this_id).empty().append('<img src="https://static.gabia.com/gtris/assets/images/gt-loader.gif">');
				}
			}).done(function(response) {
				$(this_id).empty().append(response);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				window.alert('데이터를 가져오는 데 실패했습니다.');
				$(this_id).empty().append('jqXHR: ' + jqXHR + ', textStatus: ' + textStatus + ', errorThrown: ' + errorThrown);
			});
		},
		attatchTabEvent: function(event, $tab_head, target_id, this_id) {
			if(event.preventDefault) {
				event.preventDefault();
			}else {
				event.returnValue = false;
			}
			
			if((/(http(s)?:\/)?(\/\w+)+(\.[\w.]+)?/g).test(this.href)) {
				tab.ajaxCall.call(this, this_id);
			}
			
			$tab_head.find("li.gt-active").removeClass("gt-active");
			$(this).parents("li").addClass("gt-active");
			$(target_id.join(", ")).hide();
			$(this_id).show();
		}
	};
	gtris.ui.tab = tab;

})(window.gtris);