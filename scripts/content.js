jQuery.noConflict();

const observer = new MutationObserver(() => {
	if (!chrome.runtime?.id) {
		observer.disconnect();

		return;
	}

	// Add back church logo

	if (!jQuery("#lcbcLogoWrapper").length) {
		const horizonalLogoUrl = chrome.runtime.getURL("images/logo-en.png");

		const $logo = jQuery("<img>", {
			src: horizonalLogoUrl,
			alt: "Laguna Chinese Baptist Church",
			css: {
				"margin-bottom": "1.5em",
				"width": "250px"
			}
		})

		const $logoWrapper = jQuery("<div>", {
			id: "lcbcLogoWrapper",
			css: {
				"text-align": "center"
			}
		});

		$logoWrapper.append($logo);

		jQuery(".turnstile-form").before($logoWrapper);
	}
});

observer.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);