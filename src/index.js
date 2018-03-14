module.exports = function count(s, pairs) {

  var onelengthCount = 0; 
  var currentCount = 0;
  for (var a = 0; a<s.length; a++) {
    if(s[a] === '1') {
      currentCount++;
    } else if(s[a] === '0') {
      if(currentCount > onelengthCount) {
        onelengthCount = currentCount;
      }
      currentCount = 0;
    }
  }
  pairs = pairs.sort(function(a, b) {
    return a[0] - b[0];
  })
  if (onelengthCount > pairs[0][0]) {
    return 0;
  }

  if (s.length > 3 || pairs.length > 7) { 
    return -1;
  }

  function findMultiple() {
    var res = 1;
    for (var i=0; i< pairs.length; i++) {
      res *= (pairs[i][0] ** pairs[i][1]);
    }
    return res;
  }
  var multiple = findMultiple();
  var resCount = 0;

  function isAddToCount(summKJ, oneOrZero) { 

      var isFullDivide = pairs.some(elem => summKJ % elem[0] === 0);
      if ( isFullDivide && (oneOrZero === '0') && summKJ !=0 || 
           !isFullDivide && (oneOrZero=== '1')) {

         return true;
      }
     return false;
  }

  for (var k=0 ; k <= multiple ; k++) { 
     
    var willAdd = true;
    for (var j = 0; j<s.length && willAdd; j++) {
      var summKJ = k+j;
      var oneOrZero = s.charAt(j);
        
      willAdd = isAddToCount(summKJ, oneOrZero);  
    }
    if(willAdd) {
      resCount++;
      if(resCount === 1000000007) {
        resCount = 0;
      }
    }
  }
 
  return resCount;
}