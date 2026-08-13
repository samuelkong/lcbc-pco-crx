jQuery.noConflict();

const observer = new MutationObserver((mutations, observer) => {
	if (!chrome.runtime?.id) {
		observer.disconnect();

		return;
	}

	if (jQuery("#lcbcLogoWrapper").length) {
		observer.disconnect();

		return;
	}

	// Add back church logo

	const $logoWrapper = jQuery("<div>", {
		id: "lcbcLogoWrapper",
		css: {
			"text-align": "center"
		}
	});

	const horizonalLogoUrl = chrome.runtime.getURL("images/logo-en.png");

	const $logo = jQuery("<img>", {
		src: horizonalLogoUrl,
		alt: "Laguna Chinese Baptist Church",
		css: {
			"margin-bottom": "1.5em",
			"width": "250px"
		}
	})

	$logoWrapper.append($logo);

	jQuery(".turnstile-form").before($logoWrapper);

	// Add language changer

	const $languageWrapper = jQuery("<div>", {
		css: {
			"position": "fixed",
			"right": "0.5em",
			"text-align": "center",
			"top": "5em",
			"z-index": "9999"
		}
	});

	$logoWrapper.before($languageWrapper);

	const languageIconUrl = chrome.runtime.getURL("images/language.png");

	const $languageIcon = jQuery("<img>", {
		src: languageIconUrl,
		alt: "Language Selector",
		css: {
			"width": "48px"
		}
	});

	$languageWrapper.append($languageIcon);

	const languageBtnCss = {
		"clear": "left",
		"display": "block",
		"margin-bottom": "0.3em"
	};

	const $languageEnUsBtn = jQuery("<button>", {
		type: "button",
		text: "ENGLISH",
		class: "btn secondary-btn minor-btn",
		css: languageBtnCss
	});

	$languageWrapper.append($languageEnUsBtn);

	const $languageZhHkBtn = jQuery("<button>", {
		type: "button",
		text: "繁體中文",
		class: "btn secondary-btn minor-btn",
		css: languageBtnCss
	});

	$languageWrapper.append($languageZhHkBtn);

	const $languageZhCnBtn = jQuery("<button>", {
		type: "button",
		text: "简体中文",
		class: "btn secondary-btn minor-btn",
		css: languageBtnCss
	});

	$languageWrapper.append($languageZhCnBtn);
});

observer.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);