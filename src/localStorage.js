/**
 * Sets an object key-values to the localStorage.
 * @param {object} data
 * @constructor
 */
export function Set(data) {
    Object.keys(data).forEach(key => {
        localStorage.setItem(key, data[key])
    })
}

/**
 * Returns a value by a key from the localStorage.
 * @param {string} key
 * @return {string}
 */
export function Get(key) {
    return localStorage.getItem(key);
}

/**
 * Removes all keys from the localStorage.
 * @constructor
 */
export function Clear() {
    localStorage.clear();
}