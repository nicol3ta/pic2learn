module.exports.getLanguage = function(lang) {
	switch(lang) {
		case "es":
			return "Spanish";
			break;
		case "de":
			return "German";
			break;
		default:
			return lang;
	}
}

