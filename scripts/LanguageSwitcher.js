class LanguageSwitcher {
	static dictionary = false;

	static updateLabel(forAttrPrefix, languageKey) {
		const selector  = 'label[for^="' + forAttrPrefix + '"]';

		jQuery(selector).contents().filter(function() {
			return this.nodeType === Node.TEXT_NODE;
		}).each(function() {
			this.nodeValue = LanguageUtil.get(languageKey);
		});
	}

}