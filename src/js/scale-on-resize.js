const customThrottle = ( callback, limit ) => {
	let wait = false;
	return () => {
		if ( !wait ) {
			callback.call();
			wait = true;
			setTimeout( () => {
				wait = false;
			}, limit );
		}
	};
};

const scaleBasedOnViewport = () => {
	const mainElement = document.querySelectorAll( '.posterContainer' )[0];
    const originalWidth = mainElement.dataset.originalWidth;
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

	// we "pretend" that the viewport is 40 pixels smaller to have some 
	// margins around the poster
	const derivedViewportWidth = viewportWidth - 40;

	if ( derivedViewportWidth < originalWidth ) {
		const scaleFactor = derivedViewportWidth / originalWidth;
        mainElement.style.transform = `scale(${scaleFactor})`;
	}
};

const throttledScaleBasedOnViewport = customThrottle( scaleBasedOnViewport, 100 );

document.addEventListener("DOMContentLoaded", scaleBasedOnViewport );
window.addEventListener('resize', throttledScaleBasedOnViewport);
