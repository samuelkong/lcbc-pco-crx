jQuery.noConflict();

let locale = "en-US";
let onloadChangeNeeded = 3;

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

	jQuery("h1.h1").text(LanguageUtil.get("new-children-registration"));

	// Form description/instruction

	jQuery("h1.h1").next().children().first().html(
		"<br>" + LanguageUtil.get("form-instruction"));

	// Name

	changeLanguageLabel("your_name", "your-name");

	changeLanguageInputPlaceholder("your_name_1", "first-name");
	changeLanguageInputPlaceholder("last_name", "last-name");

	// Email

	changeLanguageLabel("email_address", "email-address");

	// Phone

	changeLanguageLabel("phone_number", "phone-number");

	changeLanguageFieldDescription("phone_number", "mobile-number-that-we-can-call");

	changeLanguageSelect("phone_type", ["mobile", "home", "work", "other"]);

	// Gender

	changeLanguageLabel("gender", "gender");

	changeLanguageSelect("gender", ["select", "male", "female"]);

	// Household: Description

	jQuery('label[for^="household_"]').html(LanguageUtil.get("household-instructions"));

	// Household: Buttons

	jQuery('label[for^="household_"]').parent().next().next().text(
		LanguageUtil.get("add-adult"));
	jQuery('label[for^="household_"]').parent().next().next().next().text(
		LanguageUtil.get("add-child"));

	// Parent?

	changeLanguageLabel("dropdown", "are-you-the-parent-guardian-of-the-children-listed-above");

	changeLanguageSelect("dropdown", ["select", "yes", "no"]);

	// Check-in instructions

	jQuery('h2.h2').last().next().children().first().text(
		LanguageUtil.get("after-submitting-this-form"));

	// Submit button

	jQuery('button[type="submit"]').text(LanguageUtil.get("submit"))
}

const changeLanguageFieldDescription = function(fieldIdPrefix, languageKey) {
	const selector = 'label[for^="' + fieldIdPrefix + '_"]';

	jQuery(selector).parent().next().children().first().text(
		LanguageUtil.get(languageKey));
}

const changeLanguageInputPlaceholder = function(fieldId, languageKey) {
	const selector = "#" + fieldId;

	jQuery(selector).attr("placeholder", LanguageUtil.get(languageKey));
}
	
const changeLanguageLabel = function(fieldIdPrefix, languageKey) {
	const selector  = 'label[for^="' + fieldIdPrefix + '_"]';

	jQuery(selector).contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get(languageKey);
	});
}

const changeLanguageSelect = function(fieldIdPrefix, languageKeys) {
	selector = 'select[id^="' + fieldIdPrefix + '_"] option';

	jQuery(selector).each(function(index){
		jQuery(this).text(LanguageUtil.get(languageKeys[index]));
	});
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
});

const setLocale = function(newLocale) {
	locale = newLocale;
}

onloadObserver.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);