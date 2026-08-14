class LanguageSwitcher {

	static updateAddButtons() {
		const $addAdultBtn = jQuery('label[for^="household_"]')
			.parent()
			.nextAll("button.mr-1")
			.first();

		if ($addAdultBtn.length) {
			$addAdultBtn.text(LanguageUtil.get("add-adult"));
		}

		jQuery('label[for^="household_"]')
			.parent()
			.nextAll("button")
			.last()
			.text(LanguageUtil.get("add-child"));
	}

	static updateAdultHeader() {
		jQuery("div.mb-2.action-drawer h3 span").first().text(LanguageUtil.get("adult"));
	}

	static updateButtonSubmit() {
		jQuery('button[type="submit"]').text(LanguageUtil.get("submit"))
	}

	static updateChildHeader() {
		this.#updateTextNode("div.my-2.action-drawer h3", "child");
	}

	static updateDescription(forAttrPrefix, languageKey) {
		const selector = 'div:has(label[for^="' + forAttrPrefix + '"]) + p > div';

		jQuery(selector).text(LanguageUtil.get(languageKey));
	}

	static updateFormDescription() {
		jQuery('div[data-testid="header-description"] div')
			.html("<br>" + LanguageUtil.get("form-instruction"));
	}

	static updateFormTitle() {
		jQuery("h1.h1").text(LanguageUtil.get("new-children-registration"));
	}

	static updateHouseholdLabel() {
		jQuery('label[for^="household_"]').first().html(LanguageUtil.get("household-instructions"));
	}

	static updateLabel(forAttrPrefix, languageKey) {
		const selector  = 'label[for^="' + forAttrPrefix + '"]';

		this.#updateTextNode(selector, languageKey);
	}

	static updateLogo() {
		const enLogoUrl = chrome.runtime.getURL("images/logo-en.png");
		const zhLogoUrl = chrome.runtime.getURL("images/logo-zh.png");

		if (locale == "en-US") {
			jQuery("#lcbcLogoWrapper img").attr("src", enLogoUrl);
		}
		else {
			jQuery("#lcbcLogoWrapper img").attr("src", zhLogoUrl);
		}
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

	static updateSectionHeading(headingLanguageKey, descriptionLanguageKey) {
		jQuery('div.section-header')
			.find('h2')
			.html(LanguageUtil.get(headingLanguageKey));
		jQuery('div.section-header')
			.find('span div')
			.html(LanguageUtil.get(descriptionLanguageKey));
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