import '../src/index.scss';
import './preview.scss';

const preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

const observer = new MutationObserver(() => {
	// Query the spans for collapsing objects.
	const objectCollapseSpans = [
		...document.querySelectorAll('.rejt-tree > .rejt-object-node > span'),
	];

	// Query the spans for collapsing array of objects.
	const arrayCollapseSpans = [
		...document.querySelectorAll('.rejt-tree > .rejt-array-node > span'),
	];

	const collapseSpans = [...arrayCollapseSpans, ...objectCollapseSpans];

	for (const span of collapseSpans) {
		if (span.className !== 'closed') {
			span.click();
		}
		span.className = 'closed';
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});

export default preview;
