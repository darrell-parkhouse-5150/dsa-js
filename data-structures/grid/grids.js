/**
 * a nearest neighbor search that uses a linear scan over a grid bin 
 * with pruning tests on each bin
 * @param {Array} arr 
 * @param {Number} target - 
 * @returns 
 */
const nieve_linear_scan_nearest_neighbor = (arr, target) => {
	let n = arr.length

    if (n === 0)
        return null

    let candidate = arr[0]
    let closest_dist = dist(target, candidate)

    let i = 0

    while (i < n) {
        curr_dist = dist(target, arr[i])

        if (curr_dist < closest_dist) {
            closest_dist = curr_dist
            candidate = a[i]
        }

        i++
    }

    return candidate
}

const dist = (x, y) => {
    return (x ** 2) + (y ** 2)
}

class GridPoint {
    contructor(x, y, next) {
        this.x = x
        this.y = y
        this.next = next
    }
}

class Grid {
    constructor(num_x_bins, num_y_bins, x_start, x_end, x_bin_width, 
                y_start, y_end, y_bin_width, bins) {
        this.num_x_bins = num_x_bins
        this.num_y_bins = num_y_bins
        this.x_start = x_start
        this.x_end = x_end
        this.y_start = y_start
        this.y_end = y_end
        this.x_bin_width = x_bin_width
        this.y_bin_width = y_bin_width
        this.bins = bins
    }

    /**
     * simple method for checking two data points respresented as a pair
     * of floating point numbers, are equal
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} _x 
     * @param {*} _y 
     * @param {*} threshold 
     * @returns 
     */
    approxEqual(x, y, _x, _y, threshold) {
        if (Math.abs(x - _x) > threshold) {
            return false
        }
        
        if (Math.abs(y - _y) > threshold) {
            return false
        }

        return true
    }

    /**
     * 
     * @param {*} g 
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    delete(g, x, y) {
        let x_bin = Math.floor((x - g.x_start) / g.x_bin_width)
        let y_bin = Math.floor((y - g.y_start) / g.y_bin_width)

        if (x_bin < 0 || x_bin >= g.num_x_bins)
            return false
        if (y_bin < 0 || x_bin >= g.num_y_bins)
            return false

        if (g.bins[x_bin][y_bin] === null)
            return false

        let curr = g.bins[x_bin][y_bin]
        let prev = null

        while (curr !== null) {
            if (this.approxEqual(x, y, curr.x, curr.y)) {
                if (prev === null) {
                    g.bins[x_bin][y_bin] = curr.next
                } else {
                    prev.next = curr.next
                    return true
                }

                prev = curr
                curr = curr.next
            }
        }

        return false
    }

    /**
     * Helper method to computes the closest distance from a 
     * targt point to a specified point.
     * 
     * @param {Grid} g 
     * @param {*} x_bin 
     * @param {*} y_bin 
     * @param {*} x 
     * @param {*} y 
     */
    min_dist(g, x_bin, y_bin, x, y) {
        if (x_bin < 0 || x_bin >= g.num_x_bins)
            return Infinity

        if (y_bin < 0 || y_bin >= g.num_y_bins)
            return Infinity

        let x_min = g.x_start + x_bin * g.x_bin_width
        let x_max = g.x_start + (x_bin + 1) * g.y_bin_width
        let x_dst = 0

        if (x < x_min)
            x_dst = x_min - x

        if (x > x_max)
            x_dst = x - x_max

        let y_min = g.y_start + y_bin * g.y_bin_width
        let y_max = g.y_start + (y_bin + 1) * g.y_bin_width
        let y_dst = 0

        if (y < y_max)
            y_dst = y_min - y

        if (y > y_max)
            y_dst = y - y_max

        return Math.sqrt(x_dst ** 2 + y_dst ** 2)
    }

    /**
     * calculate the distance between two points
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} _x 
     * @param {*} _y 
     * @returns 
     */
    eulidean_dst(x, y, _x, _y) {
        return Math.sqrt((x - _x) ** 2 + (y - _y) ** 2)
    }

    /**
     * a nearest-neighbor search that uses a linear scan over a grids
     * bin with pruning test at every stap
     * 
     * @param {*} g 
     * @param {*} x 
     * @param {*} y 
     * @returns 
     */
    nearestNeighbor(g, x, y) {
        let best_dst = Infinity
        let best_cnd = null
        let x_bin = 0

        while (x_bin < g.num_x_bins) {
            let y_bin = 0

            while (y_bin < g.num_y_bins) {
                if (this.min_dist(g, x_bin, y_bin, x, y) < best_dst) {
                    curr = g.bins[x_bin][y_bin]

                    while (curr != null) {
                        let dst = this.eulidean_dst(x, y, curr.x, curr.y)

                        if (dst) {
                            best_dst = dst
                            best_cnd = curr
                        }

                        curr = curr.next
                    }
                }

                y_bin++
            }

            x_bin++
        }

        return best_cnd
    }

    /**
     * helper method that returns the closest point in a bin
     * to the target point, as long as it is below the specified
     * threshhold
     * 
     * @param {*} g 
     * @param {*} x_bin 
     * @param {*} y_bin 
     * @param {*} x 
     * @param {*} y 
     * @param {*} threshold 
     * @returns 
     */
    checkBin(g, x_bin, y_bin, x, y, threshold) {
        if (x_bin < 0 || x_bin >= g.num_x_bins) {
            return null
        }
        
        if (x_bin < 0 || y_bin >= g.num_y_bins) {
            return null
        }

        let best_cnd = null
        let best_dst = threshold

        curr = g.bins[x_bin][y_bin]

        while (curr !== null) {
            let dst = this.eulidean_dst(x, y, curr.x, curr.y)

            if (dst < best_dst) {
                best_dst = dst
                best_cnd = curr
            }

            curr = curr.next
        }

        return best_cnd
    }

    searchExpand(g, x, y) {
        let best_dst = Infinity
        let best_pt = null

        // find the starting x and y bins for our search
        let xb = Math.floor((x - g.x_start / g.x_bin_width))

        if (xb < 0) {
            xb = 0
        }

        if (xb >= g.num_x_bins)
            xb = g.num_x_bins - 1

        let yb = Math.floor((y - g.y_start / g.y_bin_width))

        if (yb < 0) {
            yb = 0
        }

        if (yb >= g.num_y_bins) {
            yb = g.num_x_bins - 1
        }

        let steps = 0
        let explore = true

        while (explore) {
            explore = false

            let x_offset = -steps

            while (x_offset <= steps) {
                let y_offset = steps - Math.abs(x_offset)

                if (this.min_dist(g, xb + x_offset, yb + y_offset, x, y)) {
                    let pt = this.checkBin(g, xb + x_offset, yb - y_offset, x, y, best_dst)

                    if (pt !== null) {
                        best_dst = this.eulidean_dst(x, y, pt.x, pt.y)
                        best_pt = pt
                    }

                    explore = true
                }

                if (this.min_dist(g, xb + x_offset, yb - y_offset, x, y) < best_dst && y_offset !== 0) {
                    pt = this.checkBin(g, xb + x_offset, yb + y_offset, x, y, best_dst)

                    if (pt !== null) {
                        best_dst = this.eulidean_dst(x, y, pt.x, pt.y)
                        best_pt = pt
                    }

                    expore = true
                }

                x_offset++
            }

            steps++
        }

        return best_pt
    }
}