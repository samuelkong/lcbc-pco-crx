class LanguageSwitcher {

	static updateChildHeader() {
		this.#updateTextNode("div.my-2.action-drawer h3", "child");
	}

	static updateLabel(forAttrPrefix, languageKey) {
		const selector  = 'label[for^="' + forAttrPrefix + '"]';

		this.#updateTextNode(selector, languageKey);
	}

	static updateSelect = function(idPrefix, languageKeys) {
		const selector = 'select[id^="' + idPrefix + '"]';

		jQuery(selector).each(function() {
			jQuery(this).find("option").each(function(index){
				if (languageKeys[index]) {
					jQuery(this).text(LanguageUtil.get(languageKeys[index]));
				}
			});
		});
	}

	static #updateTextNode(selector, languageKey) {
		jQuery(selector).contents().filter(function() {
			return this.nodeType === Node.TEXT_NODE;
		}).each(function() {
			this.nodeValue = LanguageUtil.get(languageKey);
		});
	}

}