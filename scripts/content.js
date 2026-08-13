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
});

observer.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);