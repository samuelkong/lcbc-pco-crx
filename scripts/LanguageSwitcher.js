class LanguageSwitcher {

	static locale = "en-US";

	static update() {

		// Logo

		this.updateLogo();

		// Form title and description

		this.updateFormTitle();

		this.updateFormDescription();

		// Name

		this.updateLabel("your_name_", "your-name");

		this.updatePlaceholderById("your_name_1", "first-name");
		this.updatePlaceholderByLabel("last_name", "last-name");

		// Email

		this.updateLabel("email_address_", "email-address");

		// Phone

		this.updateLabel("phone_number_", "phone-number");

		this.updateDescription("phone_number_", "mobile-number-that-we-can-call");

		this.updateSelect("phone_type_", ["mobile", "home", "work", "other"]);

		// Gender

		this.updateLabel("gender_", "gender");

		this.updateSelect("gender_", ["select", "male", "female"]);

		// Household

		this.updateHouseholdLabel();

		this.updateAddButtons();

		// Household: Add Adult

		this.updateAdultHeader();

		this.updateLabel("adult_name_", "name");
		this.updatePlaceholderById("adult_name_", "first-name");
		//this.updatePlaceholderByLabel("last_name", "last-name");

		this.updateLabel("adult_email_address_", "email-address");

		this.updateLabel("household_adult_phone_number_", "email-address");

		this.updateLabel("household_adult_gender_", "gender");
		this.updateSelect("household_adult_gender_", ["select", "male", "female"]);

		// Household: Add Child

		this.updateChildHeader()

		this.updateLabel("child_name_", "name");
		this.updatePlaceholderById("child_name_", "first-name");
		//this.updatePlaceholderByLabel("last_name", "last-name");

		this.updateLabel("household_child_gender_", "gender");
		this.updateSelect("household_child_gender_", ["select", "male", "female"]);

		this.updateLabel("household_child_birthday_", "birthdate");
		this.updateSelect("household_child_birthday_month", [
			"month", "january", "february", "march", "april", "may", "june",
			"july", "august", "september", "october", "november", "december"
		]);
		this.updateSelect("household_child_birthday_day", ["day"]);
		this.updateSelect("household_child_birthday_year", ["year"]);

		this.updateLabel("household_child_grade_", "grade");
		this.updateSelect("household_child_grade_", ["select"]);

		this.updateLabel("household_child_medical_", "medical-notes");

		// Parent?

		this.updateLabel("dropdown_", "are-you-the-parent-guardian-of-the-children-listed-above");

		this.updateSelect("dropdown_", ["select", "yes", "no"]);

		// Check-in instructions

		this.updateSectionHeading("after-submitting-this-form", "");

		// Submit button

		this.updateButtonSubmit();
	}

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

		if (this.locale == "en-US") {
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