function makeLinksOpenInTabs() {
	$('a').on('click', function() {
		if ($(this).attr('href') == '#')
			return;
		Tools.clearBadge();
		Tools.createTab($(this).attr('href'));
	});
}

function setOpenAllLink(links) {
	$('#open-all').on('click', function() {
		Tools.clearBadge();
		for ( var i = 0; i < links.length; i++) {
			Tools.createTab(links[i].attr('href'));
		}
	});
}

function setLoginHandler() {
	$('#login-btn').click(function() {
		$('#login-form').hide();
		Tools.setLoadingBadge();
		$('#login-loader').show();
		var remember;
		if ($('#remember').is(':checked'))
			remember = 1;
		else
			remember = 0;
		DIC.LogIn($('#username').val(), $('#password').val(), remember);
		return false;
	});
}

function subscriptionHandler(unread) {
	$('#login-loader').hide();
	$('#loader').hide();
	Tools.clearBadge();
	if (!unread) {
		$('#alert-error').show();
		Tools.setErrorBadge();
		$('#login-form').show();
		setLoginHandler();
	} else if (unread.length < 1) {
		$('#alert-info').show();
	} else {
		$('#entries').show();
		var list = $('#entries').find('ul');
		var links = new Array();
		unread.find(Config.Settings.linkSelector).each(function() {
			list.append($('<li></li>').append($(this)));
			links.push($(this));
		});
		list.append($('<li class="divider"></li>'));
		list.append($('<li><a href="#" id="open-all">Open All</a></li>'));
		setOpenAllLink(links);
	}
	makeLinksOpenInTabs();
}

$(document).on('ready', function() {
	$('#loader').show();
	Tools.setLoadingBadge();
	DIC.GetUnreadSubscriptions(subscriptionHandler);
});