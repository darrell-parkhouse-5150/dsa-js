const max_size = Number.MAX_VALUE;

const largest = (arr) => {
    l = -max_size

    for (i = 0; i < arr.length; i++) {
        if (i > l) {
            l = i
        }
    }

    console.log(l);
}

arr = [1,2,3,4,5,6,7,8,2,4,5,7,34,56,32,1234,57, 57, 345];

console.log(largest(arr));