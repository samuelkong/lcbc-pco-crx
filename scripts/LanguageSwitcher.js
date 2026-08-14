class LanguageSwitcher {

	static updateChildHeader() {
		this.#updateTextNode("div.my-2.action-drawer h3", "child");
	}

	static updateDescription(forAttrPrefix, languageKey) {
		const selector = 'div:has(label[for^="' + forAttrPrefix + '"]) + p > div';

		jQuery(selector).text(LanguageUtil.get(languageKey));
	}


	static updateLabel(forAttrPrefix, languageKey) {
		const selector  = 'label[for^="' + forAttrPrefix + '"]';

		this.#updateTextNode(selector, languageKey);
	}

	static updatePlaceholderById(idPrefix, languageKey) {
		const selector = 'input[id^="' + idPrefix + '"]';

		jQuery(selector).attr("placeholder", LanguageUtil.get(languageKey));
	}

	static updatePlaceholderByLabel(forAttr, languageKey) {
		const selector = 'label[for^="' + forAttr + '"]';

		jQuery(selector)
			.next('div')
			.find('input')
			.attr("placeholder", LanguageUtil.get(languageKey));
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