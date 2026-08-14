jQuery.noConflict();

let locale = "en-US";
let onloadChangeNeeded = 4;

const changeLanguage = function() {

	// Logo

	const enLogoUrl = chrome.runtime.getURL("images/logo-en.png");
	const zhLogoUrl = chrome.runtime.getURL("images/logo-zh.png");

	if (locale == "en-US") {
		jQuery("#lcbcLogoWrapper img").attr("src", enLogoUrl);
	}
	else {
		jQuery("#lcbcLogoWrapper img").attr("src", zhLogoUrl);
	}

	// Form title

	LanguageSwitcher.updateFormTitle();

	// Form description/instruction

	LanguageSwitcher.updateFormDescription();

	// Name

	LanguageSwitcher.updateLabel("your_name_", "your-name");

	LanguageSwitcher.updatePlaceholderById("your_name_1", "first-name");
	LanguageSwitcher.updatePlaceholderByLabel("last_name", "last-name");

	// Email

	LanguageSwitcher.updateLabel("email_address_", "email-address");

	// Phone

	LanguageSwitcher.updateLabel("phone_number_", "phone-number");

	LanguageSwitcher.updateDescription("phone_number_", "mobile-number-that-we-can-call");

	LanguageSwitcher.updateSelect("phone_type_", ["mobile", "home", "work", "other"]);

	// Gender

	LanguageSwitcher.updateLabel("gender_", "gender");

	LanguageSwitcher.updateSelect("gender_", ["select", "male", "female"]);

	// Household: Description

	LanguageSwitcher.updateHouseholdLabel();

	// Household: Buttons

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

	// Household: Adult

	jQuery("div.mb-2.action-drawer h3 span").first().text(LanguageUtil.get("adult"));

	LanguageSwitcher.updateLabel("adult_name_", "name");
	LanguageSwitcher.updatePlaceholderById("adult_name_", "first-name");
	//LanguageSwitcher.updatePlaceholderByLabel("last_name", "last-name");

	LanguageSwitcher.updateLabel("adult_email_address_", "email-address");

	LanguageSwitcher.updateLabel("household_adult_phone_number_", "email-address");

	LanguageSwitcher.updateLabel("household_adult_gender_", "gender");
	LanguageSwitcher.updateSelect("household_adult_gender_", ["select", "male", "female"]);

	// Household: Child

	LanguageSwitcher.updateChildHeader()

	LanguageSwitcher.updateLabel("child_name_", "name");
	LanguageSwitcher.updatePlaceholderById("child_name_", "first-name");
	//LanguageSwitcher.updatePlaceholderByLabel("last_name", "last-name");

	LanguageSwitcher.updateLabel("household_child_gender_", "gender");
	LanguageSwitcher.updateSelect("household_child_gender_", ["select", "male", "female"]);

	LanguageSwitcher.updateLabel("household_child_birthday_", "birthdate");
	LanguageSwitcher.updateSelect("household_child_birthday_month", [
		"month", "january", "february", "march", "april", "may", "june",
		"july", "august", "september", "october", "november", "december"
	]);
	LanguageSwitcher.updateSelect("household_child_birthday_day", ["day"]);
	LanguageSwitcher.updateSelect("household_child_birthday_year", ["year"]);

	LanguageSwitcher.updateLabel("household_child_grade_", "grade");
	LanguageSwitcher.updateSelect("household_child_grade_", ["select"]);

	LanguageSwitcher.updateLabel("household_child_medical_", "medical-notes");

	// Parent?

	LanguageSwitcher.updateLabel("dropdown_", "are-you-the-parent-guardian-of-the-children-listed-above");

	LanguageSwitcher.updateSelect("dropdown_", ["select", "yes", "no"]);

	// Check-in instructions

	jQuery('h2.h2').last().next().children().first().text(
		LanguageUtil.get("after-submitting-this-form"));

	// Submit button

	LanguageSwitcher.updateButtonSubmit();
}

const changeLanguageInputPlaceholder = function(fieldId, languageKey) {
	const selector = "#" + fieldId;

	jQuery(selector).attr("placeholder", LanguageUtil.get(languageKey));
}

const languageButton = function(label, locale) {
	return jQuery("<button>", {
		type: "button",
		text: label,
		class: "btn secondary-btn minor-btn",
		click: function() {
			setLocale(locale);
			changeLanguage();
		}
	});
}

const onloadAddLanguageChanger = function() {
	if (!jQuery("#lcbcLogoWrapper").length) {
		return;
	}

	if (jQuery("#lcbcLanguageChanger").length) {
		return;
	}

	const $languageWrapper = jQuery("<div>", {
		id: "lcbcLanguageChanger"
	});

	const $languageIcon = jQuery("<img>", {
		src: chrome.runtime.getURL("images/language.png"),
		alt: "Language Selector"
	});

	$languageWrapper.append($languageIcon);

	$languageWrapper.append(languageButton("ENGLISH", "en-US"));
	$languageWrapper.append(languageButton("繁體中文", "zh-HK"));
	$languageWrapper.append(languageButton("简体中文", "zh-CN"));

	jQuery("#lcbcLogoWrapper").before($languageWrapper);

	onloadChangeNeeded--;
}

const onloadAddLogo = function() {
	if (!jQuery(".turnstile-form").length) {
		return;
	}

	if (jQuery("#lcbcLogoWrapper").length) {
		return;
	}

	const $logoWrapper = jQuery("<div>", {
		id: "lcbcLogoWrapper"
	});

	const $logo = jQuery("<img>", {
		src: chrome.runtime.getURL("images/logo-en.png"),
		alt: "Laguna Chinese Baptist Church"
	})

	$logoWrapper.append($logo);

	jQuery(".turnstile-form").before($logoWrapper);

	onloadChangeNeeded--;
}

const onloadDisableNonMobilePhones = function() {
	const selectSelector = 'select[id^="phone_type_"]';
	const optionSelector = selectSelector + " option";

	if (!jQuery(selectSelector).length) {
		return;
	}

	if (jQuery(optionSelector).eq(3).is(":disabled")) {
		return;
	}

	jQuery(optionSelector).eq(1).prop("disabled", true);
	jQuery(optionSelector).eq(2).prop("disabled", true);
	jQuery(optionSelector).eq(3).prop("disabled", true);

	onloadChangeNeeded--;
}

const onloadObserver = new MutationObserver((mutations, observer) => {
	if (!chrome.runtime?.id) {
		observer.disconnect();
		return;
	}

	if (onloadChangeNeeded == 0) {
		observer.disconnect();
		return;
	}

	onloadAddLogo();
	onloadAddLanguageChanger();
	onloadDisableNonMobilePhones();
	onloadUpdateHouseholdDescription();
});

const onloadUpdateHouseholdDescription = function() {
	const $householdLabel = jQuery('label[for^="household_"]');

	if (!$householdLabel.length) {
		return;
	}

	const $householdDescription = $householdLabel.parent().next();

	if ($householdDescription.is(":hidden")) {
		return;
	}

	$householdLabel.html(LanguageUtil.get("household-instructions"));

	$householdDescription.hide();

	onloadChangeNeeded--;
}

const setLocale = function(newLocale) {
	locale = newLocale;
}

onloadObserver.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);