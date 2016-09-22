/**
 * Double-exponential smoothing based on Wright's modification of Holt's method
 * for irregular data.
 *
 * Copyright 2014 Martin Tschirsich
 * Released under the MIT license
 *
 * @param {Array}  alphas        Exponential smoothing factors
 * @param {Array}  initialValues Initial values before smoothing
 * @param {Number} lookAhead     Additionally added linear trend, between 0 - 1
 */

const Smoother = function(alphas, initialValues, lookAhead) {
  
  let lastUpdate = +new Date();
  
  const
    initialAlphas = alphas.slice(0),
    a = initialValues.slice(0),
    b = initialValues.slice(0),
    numValues = initialValues.length;
  
  alphas = alphas.slice(0);
  lookAhead = (typeof lookAhead !== 'undefined') ? lookAhead : 1.0;
  
  this.smooth = function(values) {
    const smoothedValues = [];
    
    // time in seconds since last update:
    let time = new Date() - lastUpdate;
    lastUpdate += time;
    time /= 1000;
    
    // update:
    for (let i = 0; i < numValues; ++i) {
      
      // Wright's modification of Holt's method for irregular data:
      // eslint-disable-next-line
      alphas[i] = alphas[i] / (alphas[i] + Math.pow(1 - initialAlphas[i], time));
      
      const oldA = a[i];
      a[i] = alphas[i] * values[i] + (1 - alphas[i]) * (a[i] + b[i] * time);
      b[i] = alphas[i] * (a[i] - oldA) / time + (1 - alphas[i]) * b[i];
      
      smoothedValues[i] = a[i] + time * lookAhead * b[i];
      
      // Alternative approach:
      //a[i] = alphas[i] * values[i] + (1 - alphas[i]) * a[i];
      //b[i] = alphas[i] * a[i] + (1 - alphas[i]) * b[i];
      //smoothedValues[i] = 2*a[i] - 1*b[i];*/
    }
    
    return smoothedValues;
  };
};

export default Smoother;