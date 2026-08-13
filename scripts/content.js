jQuery.noConflict();

const changeLanguage = function(locale) {

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

	jQuery("h1.h1").text(LanguageUtil.get("new-children-registration", locale));

	// Form description/instruction

	jQuery("h1.h1").next().children().first().html(
		"<br>" + LanguageUtil.get("form-instruction", locale));

	// Name: Label

	jQuery('label[for^="your_name_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("your-name", locale);
	});

	// Name: Input

	jQuery('input[id^="your_name_"]').attr(
		"placeholder", LanguageUtil.get("first-name", locale));
	jQuery("#last_name").attr(
		"placeholder", LanguageUtil.get("last-name", locale));

	// Email: Label

	jQuery('label[for^="email_address_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("email-address", locale);
	});

	// Phone: Label

	jQuery('label[for^="phone_number_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("phone-number", locale);
	});

	// Phone: Description

	jQuery('label[for^="phone_number_"]').parent().next().children().first().html(
		LanguageUtil.get("mobile-number-that-we-can-call", locale));

	// Phone: Select Options

	jQuery('select[id^="phone_type_"] option').eq(0).text(LanguageUtil.get("mobile", locale));

	// Gender: Label

	jQuery('label[for^="gender_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get("gender", locale);
	});

	// Gender: Select Options

	jQuery('select[id^="gender_"] option').eq(0).text(LanguageUtil.get("select", locale));
	jQuery('select[id^="gender_"] option').eq(1).text(LanguageUtil.get("male", locale));
	jQuery('select[id^="gender_"] option').eq(2).text(LanguageUtil.get("female", locale));

	// Household: Description

	jQuery('label[for^="household_"]').html(LanguageUtil.get("household-instructions", locale));

	// Household: Buttons

	jQuery('label[for^="household_"]').parent().next().next().text(
		LanguageUtil.get("add-adult", locale));
	jQuery('label[for^="household_"]').parent().next().next().next().text(
		LanguageUtil.get("add-child", locale));

	// Parent?: Label

	jQuery('label[for^="dropdown_"]').contents().filter(function() {
		return this.nodeType === Node.TEXT_NODE;
	}).each(function() {
		this.nodeValue = LanguageUtil.get(
			"are-you-the-parent-guardian-of-the-children-listed-above", locale);
	});

	// Parent? : Selection Options

	jQuery('select[id^="dropdown_"] option').eq(0).text(LanguageUtil.get("select", locale));
	jQuery('select[id^="dropdown_"] option').eq(1).text(LanguageUtil.get("yes", locale));
	jQuery('select[id^="dropdown_"] option').eq(2).text(LanguageUtil.get("no", locale));

	// Check-in instructions

	jQuery('h2.h2').last().next().children().first().text(
		LanguageUtil.get("after-submitting-this-form", locale));

	// Submit button

	jQuery('button[type="submit"]').text(LanguageUtil.get("submit", locale))
}

const languageButton = function(label, locale) {
	return jQuery("<button>", {
		type: "button",
		text: label,
		class: "btn secondary-btn minor-btn",
		css: {
			"clear": "left",
			"display": "block",
			"margin-bottom": "0.3em"
		},
		click: function() {
			changeLanguage(locale);
		}
	});
}

let onloadChangeNeeded = 2;

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

		const horizonalLogoUrl = chrome.runtime.getURL("images/logo-en.png");

		const $logo = jQuery("<img>", {
			src: horizonalLogoUrl,
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

onloadObserver.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);