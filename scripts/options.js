//TODO use JQuery to extract forums and links from homepage

var forums = [ "C and C++", "VB6", "Java", "VB.NET", "C#", "ASP.NET",
		".NET Framework", "PHP", "Ruby", "Python", "ColdFusion", "Databases",
		"Other Languages", "Game Development", "Mobile Development" ];

function generateSelectHTML() {
	return "<select class=\"span3\" onchange=\"addDropdown()\"><option></option><option value=\"Java\">Java</option><option value=\"C++\">C++</option></select>";
}

function addDropdown() {
	var selectHTML = generateSelectHTML();
	$('#forum-select-table tr:last').after(
			"<tr><td>" + selectHTML + "</td></tr>");
}
function initialize() {
	var forumSelect = $('#forum-select-table').find('select');
	forumSelect.live('change', addDropdown);
}

initialize();