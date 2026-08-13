jQuery.noConflict();

let locale = "en-US";
let onloadChangeNeeded = 2;

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

	// Name: Label

	jQuery('label[for^="your_name_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("your-name");
	});

	// Name: Input

	jQuery('input[id^="your_name_"]').attr(
		"placeholder", LanguageUtil.get("first-name"));
	jQuery("#last_name").attr(
		"placeholder", LanguageUtil.get("last-name"));

	// Email: Label

	jQuery('label[for^="email_address_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("email-address");
	});

	// Phone: Label

	jQuery('label[for^="phone_number_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("phone-number");
	});

	// Phone: Description

	jQuery('label[for^="phone_number_"]').parent().next().children().first().html(
		LanguageUtil.get("mobile-number-that-we-can-call"));

	// Phone: Select Options

	jQuery('select[id^="phone_type_"] option').eq(0).text(LanguageUtil.get("mobile"));

	// Gender: Label

	jQuery('label[for^="gender_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("gender");
	});

	// Gender: Select Options

	jQuery('select[id^="gender_"] option').eq(0).text(LanguageUtil.get("select"));
	jQuery('select[id^="gender_"] option').eq(1).text(LanguageUtil.get("male"));
	jQuery('select[id^="gender_"] option').eq(2).text(LanguageUtil.get("female"));

	// Household: Description

	jQuery('label[for^="household_"]').html(LanguageUtil.get("household-instructions"));

	// Household: Buttons

	jQuery('label[for^="household_"]').parent().next().next().text(
		LanguageUtil.get("add-adult"));
	jQuery('label[for^="household_"]').parent().next().next().next().text(
		LanguageUtil.get("add-child"));

	// Parent?: Label

	jQuery('label[for^="dropdown_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get(
			"are-you-the-parent-guardian-of-the-children-listed-above");
	});

	// Parent? : Selection Options

	jQuery('select[id^="dropdown_"] option').eq(0).text(LanguageUtil.get("select"));
	jQuery('select[id^="dropdown_"] option').eq(1).text(LanguageUtil.get("yes"));
	jQuery('select[id^="dropdown_"] option').eq(2).text(LanguageUtil.get("no"));

	// Check-in instructions

	jQuery('h2.h2').last().next().children().first().text(
		LanguageUtil.get("after-submitting-this-form"));

	// Submit button

	jQuery('button[type="submit"]').text(LanguageUtil.get("submit"))
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

const onloadObserver = new MutationObserver((mutations, observer) => {
	if (!chrome.runtime?.id) {
		observer.disconnect();
		return;
	}

	if (onloadChangeNeeded == 0) {
		observer.disconnect();
		return;
	}

	// Add back church logo

	if (jQuery(".turnstile-form").length && !jQuery("#lcbcLogoWrapper").length) {
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

	// Add language changer

	if (jQuery("#lcbcLogoWrapper").length && !jQuery("#lcbcLanguageChanger").length) {
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