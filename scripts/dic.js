var DIC = {
	GetUnreadSubscriptions : function(callback) {
		$.ajax({
			url : Config.Settings.subsUrl,
			dataType : 'html',
			cache : false
		}).done(function(res) {
			var $res = $(res);
			if (($res).find('input#username').length > 0 && callback) {
				callback(null);
				return;
			}
			var unread = $res.find(Config.Settings.unreadSelector);
			var rows = unread.parent().parent();
			if (callback)
				callback(rows);
		}).fail(function(xhr, status) {
			console.log(status);
			Tools.setErrorBadge();
		});
	},

	LogIn : function(user, pass, remember) {
		$('#alert-error').hide();
		$.ajax({
			type : 'POST',
			url : Config.Settings.loginUrl,
			data : {
				'referer' : Config.Settings.referer,
				'username' : user,
				'password' : pass,
				'rememberMe' : remember,
			},
			dataType : 'html',
			error : function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.statusText);
				Tools.setErrorBadge();
			},
			complete : function(jqXHR, textStatus) {
				DIC.GetUnreadSubscriptions(subscriptionHandler);
			}
		});
	}
};