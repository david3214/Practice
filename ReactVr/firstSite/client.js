// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('firstSite', { /* initial props */ }),
    r360.getDefaultSurface()
	);
	
	r360.renderToSurface(
    r360.createRoot('MainPanel', { /* initial props */ }),
    r360.getDefaultSurface()
  );

  // r360.renderToLocation(
  //   r360.createRoot('TestModel', {}),
  //   r360.getDefaultLocation()
  // )
  // const player = r360.compositor.createVideoPlayer('London')

  // player.setSource(r360.getAssetURL('London.mp4'), '3DLR')
  // player.setMuted(false)

  // Load the initial environment
  // r360.compositor.setBackgroundVideo('London')
  r360.compositor.setBackground(r360.getAssetURL('background.jpg'), {format: '3D'});
}

window.React360 = {init};
