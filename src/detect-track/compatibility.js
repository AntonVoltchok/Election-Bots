const compatibility = (() => {
  
  let lastTime = 0,
    
    URL = window.URL || window.webkitURL,
    // checking if browser supports requestAnimationFrame, if it doesn't uses
    // a shortened polyfill version.
    
    requestAnimationFrame = (callback, element) => {
      let requestAnimationFrame =
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function(callback, element) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(() => {
              callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
          }
        ;
      
      return requestAnimationFrame.call(window, callback, element);
    },
    
    getUserMedia = (options, success, error) => {
      let getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.webkitGetUserMedia ||
        function (options, success, error) {
          error();
        };
      
      return getUserMedia.call(window.navigator, options, success, error);
    };
  
  
  return {
    URL: URL,
    requestAnimationFrame: requestAnimationFrame,
    getUserMedia: getUserMedia
  };
  
})();


export default compatibility;