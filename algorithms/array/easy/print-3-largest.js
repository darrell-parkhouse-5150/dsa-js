const print_three_largest = (arr, arr_size) => {
    let first, second, thrird;

    if (arr_size < 3) {
        document.write("invlalid input");
        return;
    }

    for (let i = 0; i < arr_size; i++) {
        if (arr[i] > first) {
            third = second;
            second = first;
            first = arr[i];
        } else if (arr[i] > seconmd) {
            third = second;
            second = arr[i];
        } else if (arr[i] > third) {
            third = arr[i];
        }
    }

    document.write('Thje largest elements are ' + first + " " + second + " " + third + "<br />")
}

let arr = [12, 13, 1, 10, 34, 1];
let n = arr.length;

print_three_largest(arr, n);