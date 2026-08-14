jQuery.noConflict();

let onloadChangeNeeded = 4;

const languageButton = function(label, locale) {
	return jQuery("<button>", {
		type: "button",
		text: label,
		class: "btn secondary-btn minor-btn",
		click: function() {
			LanguageSwitcher.locale = locale;
			LanguageSwitcher.update();
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