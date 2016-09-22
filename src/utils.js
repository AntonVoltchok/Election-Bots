export default {
  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  
  throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
      deferTimer;
    return function () {
      var context = scope || this;
      
      var now = +new Date,
        args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    };
  },
  
  compact: (array:Array)=>array.filter(item=>!!item),
  
  omit: (obj, property)=> {
    const rval = {};
    Object.keys(obj).forEach(key=> {
      if (key !== property)
        rval[key] = obj[key];
    });
    return rval;
  },
  
  isEqual: (a, b)=> JSON.stringify(a) === JSON.stringify(b),
  
  values: obj=>Object.values(obj || {}),
  
  uniq: (array, predicate)=> {
    // if 2nd arg is passed, retrieves unique values in object
    if (predicate) {
      const m = {};
      array.forEach(item=> m[predicate(item)] = item);
      return Object.values(m || {});
    } else return [...new Set(array)];
  }
  
}