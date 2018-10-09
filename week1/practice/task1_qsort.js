/*
  Practice 1, 09.10.2018
  Task 1
  Quick Sort
*/

var qsort = function (arr) {
  let partition = function (lIdx, rIdx) {
    let pivotValue = arr[lIdx]; // note: ! may be chosen differently

    let l = lIdx - 1;
    let r = rIdx + 1;

    //   >>>>>>> move L towards end 
    // [lesser, lesser, L, ?, ?, ?, ... (piv) ... , ?, ?, ?, R, greater, greater]
    //                                               <<<<<<< move R to start
    //  while maintaining (L < piv < R) true. this goes for only that long...  
    //  then swap L & R and try some more until L & R eventually meet into P
    //
    //  P is now the pivot position and all elems of the range hold Ai < pval < Aj 

    do {
      do {                // move L towards end 
        l = l + 1;
      } while (arr[l] < pivotValue);

      do {               // move R towards 
        r = r - 1;
      } while (arr[r] > pivotValue);

      if (l >= r) {
        return r;
      }

      [arr[l], arr[r]] = [arr[r], arr[l]]; // a.k.a. swap
    } while (true);
  }

  let rec = function (lIdx, rIdx) {
    if (lIdx < rIdx) {
      let pIdx = partition(lIdx, rIdx);
      rec(lIdx, pIdx);      // sort left
      rec(pIdx + 1, rIdx); // sort right
    }
  }

  rec(0, arr.length - 1);

  return arr;
}
var res = qsort([1, 2, 5, 11, 8, 6, 3]);
console.log(res);
