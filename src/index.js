/**
 * @author Gabriel Cayetano <https://github.com/gcayetano>
 * @version 1.0.0
 * @ignore
 */

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

/**
 * A reference to the Electron app. If this framework is required within a
 * renderer processes, we need to load the app via `remote`.
 *
 * @type {string}
 * @ignore
 */
const app = electron.app || electron.remote.app;

/**
 * The Electron app's user data path.
 *
 * @type {string}
 * @ignore
 */
const userData = app.getPath('userData');

/**
 * The name of the storage file
 *
 * @type {string}
 * @ignore
 */
const defaultFileName = 'storage.json';

/**
 * The absolute path to the storage file.
 *
 * @type {string}
 * @ignore
 */
const defaultFilePath = path.join(userData, defaultFileName);


/**
 * The electron-storage-promised Storage class
 *
 * @class
 */
class Storage {
  constructor() {

    /**
     * The default name of storage file.
     *
     * @type {string}
     * @private
     * @ignore
     */
    this._defaultFileName = defaultFileName;

    /**
     * The absolute path to the default storage file on the disk.
     *
     * @type {string}
     * @private
     * @ignore
     */
    this._defaultFilePath = defaultFilePath;

    /**
     * The data loaded from storage file
     *
     * @type {object}
     * @private
     * @ignore
     */
    this._data = null;

    // Create file if not exists or load data if it is
    const found = fs.existsSync(this._defaultFilePath);

    if (!found) {
      this._data = {};
      jsonfile.writeFile(this._defaultFilePath, {}, err => {
        console.error(err);
      });
    } else {
      this._data = jsonfile.readFileSync(this._defaultFilePath);
    }
  }

  /**
   * Get data by key from storage
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.get('name').then(value => {
   *  console.log(value); // => John
   * });
   *
   * @param {string} key Key to search in storage
   * @returns {Promise} `string|object|array` extracted from storage file
   * @public
   */
  get(key) {
    return new Promise((resolve, reject) => {
      if (this._data) {
        if (this._data[key]) {
          resolve(this._data[key]);
        } else {
          reject(new Error('Key not found in storage'));
        }
      } else {
        reject(new Error('An error ocurred. Maybe config file has not been loaded properly or it is empty.'));
      }
    });
  }

  /**
   * Get all data from storage
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.getAll().then(data => {
   *  console.log(data); // => `object` {name: 'John'}
   * });
   *
   * @returns {Promise} `object` with all data from storage
   * @public
   */
  getAll() {
    return new Promise(resolve => {
      resolve(this._data);
    });
  }

  /**
   * Save data to storage by key
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.set('age', 20).then(() => {
   *  // Success
   * });
   *
   * // New Storage
   * // {
   * //   "name": "John",
   * //   "age": "20"
   * // }
   *
   * @param {string} key Name of the key
   * @param {(string|object|array)} data Value of the key
   * @returns {Promise} Promise object when data has been saved successfully
   * @public
   */
  set(key, data) {
    return new Promise((resolve, reject) => {
      this._data[key] = data;
      jsonfile.writeFile(this._defaultFilePath, this._data, err => {
        if (err) {
          reject(new Error(`An error ocurred while saving to storage file. ${err}`));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Save multiple data to storage at once
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.setAll({age: 20, country: 'United Kingdom'}).then(() => {
   *  // Success
   * });
   *
   * // New Storage
   * // {
   * //   "name": "John",
   * //   "age": "20",
   * //   "country": "United Kingdom"
   * // }
   *
   * @param {object} object Object with multiple keys and their values to be set
   * @returns {Promise} Promise object when data has been saved successfully
   * @public
   */
  setAll(object) {
    return new Promise((resolve, reject) => {
      if (typeof keysObject !== 'object') {
        reject(new Error('The function parameter must be an object'));
      }

      const keys = Object.keys(object);

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        this._data[key] = object[key];
      }

      jsonfile.writeFile(this._defaultFilePath, this._data, err => {
        if (err) {
          reject(new Error(`An error ocurred while saving to storage file. ${err}`));
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Returns default path of storage file
   *
   * @example
   * import storage from 'electron-storage-promised';
   *
   * const filePath = storage.file();
   * console.log(filePath); // => path/to/storage/file
   *
   * @returns {string} Default path of storage file
   * @public
   */
  file() {
    return this._defaultFilePath;
  }

  /**
   * Clear storage
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.clear().then(() => {
   *  // Other stuff
   * });
   *
   * // New Storage
   * // {}
   *
   * @returns {Promise} Promise object when data has been cleared successfully
   * @public
   */
  clear() {
    return new Promise((resolve, reject) => {
      this._data = {};
      jsonfile.writeFile(this._defaultFilePath, {}, err => {
        reject(new Error(err));
      });
      resolve();
    });
  }
}

module.exports = new Storage();
