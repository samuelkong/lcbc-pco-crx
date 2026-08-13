jQuery.noConflict();

const observer = new MutationObserver(() => {
	if (!chrome.runtime?.id) {
		observer.disconnect();

		return;
	}

	const $navigation = jQuery("nav");

	if ($navigation.length) {
		$navigation.hide();
	}
});

observer.observe(
	document.body, {
		childList: true,
		subtree: true
	}
);