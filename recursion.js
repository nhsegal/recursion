const fibs = function (num) {
  let fn1 = 0;
  let fn2 = 1;
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(fn1);
    let temp = fn1;
    fn1 = fn1 + fn2;
    fn2 = temp;
  }
  return arr;
};

function fibsRec(num) {
  if (num <= 1) {
    return [0];
  }
  if (num == 2) {
    return [0, 1];
  } else {
    const temp = fibsRec(num-1);
    temp.push(temp[temp.length-1] + temp[temp.length-2]);
    return temp;
  }
}

function merge(arr1, arr2) {
  if (!arr1 || arr1.length === 0 || arr1[0] === undefined) {
    return arr2;
  }
  if (!arr2 || arr2.length === 0 || arr2[0] === undefined) {
    return arr1;
  }
  let i = 0;
  let j = 0;
  let k = 0;
  arr3 = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      arr3.push(arr1[i]);
      i++;
    } else {
      arr3.push(arr2[j]);
      j++;
    }
  }
  if (i <= arr1.length) {
    arr3.push(...arr1.slice(i));
  }
  if (j <= arr2.length) {
    arr3.push(...arr2.slice(j));
  }
  return arr3;
}

function mergeSort(arr) {
  const mutableArr = [...arr];
  const copiedArr = [...arr];
  
  let depth = 1;
  while (2 ** depth < 2*arr.length) {
    for (let i = 0; i < copiedArr.length; i = i + 2 ** depth) {
      let segLength = Math.min(2 ** depth, copiedArr.length - i);
      let piece1 = copiedArr.slice(i, i + Math.ceil(segLength / 2));
      let piece2 = copiedArr.slice(i + Math.ceil(segLength / 2), i + segLength);
      mutableArr.splice(
        i,         // start
        segLength, // deleteCount
        ...merge(   // items
         piece1,
         piece2
        )
      );
    }
    for (let i = 0; i < copiedArr.length; i++) {
      copiedArr[i] = mutableArr[i];
    }
    depth++;
  }
  return copiedArr;
}

// *** Some tests
console.log(`fibs(8): ${fibs(8)}`);
console.log(`fibsRec(8): ${fibsRec(8)}`);

let a1 = [1, 2, 12];
let b1 = [0, 3, 23, 12];
console.log('a1: ',a1)
console.log('b1: ',b1)
console.log(merge(a1, b1))

let testOfMergeSort = mergeSort([6, 5 ,42, 13, 2, 1, 0]);
console.log(testOfMergeSort);
