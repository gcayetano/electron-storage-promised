/**
 * @author Gabriel Cayetano <https://github.com/gcayetano>
 * @version 1.1.0
 * @ignore
 */

const electron = require('electron');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');
const utils = require('./utils');

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
   * //   "user": {
   * //     "name": "John",
   * //     "password": "123"
   * //     "messages": 50
   * //   }
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * // Search for a top key
   * storage.get('user').then(value => {
   *  console.log(value); // => { user: { name: "John", "password": "123", messages: 50 } }
   * });
   *
   * // Search for a deep key using string
   * storage.get('user.name').then(value => {
   *  console.log(value); // => John
   * });
   *
   * // Search for a deep key using array
   * storage.get(['user', 'name']).then(value => {
   *  console.log(value); // => John
   * });
   *
   * @param {(string|array)} key Key to search in storage. Now support deep search using `.` (dot) separator or array of strings
   * @returns {Promise} `string|object|array` extracted from storage file
   * @public
   */
  get(key) {
    return new Promise((resolve, reject) => {
      if (this._data) {
        let keys = key;

        if (typeof key !== 'string' && !Array.isArray(key)) {
          reject(new Error('The function parameter must be a string or an array of strings.'));
        }

        if (typeof key === 'string') {
          keys = key.split('.');
        }

        const result = utils._getDeepObjectKeyValue(keys, this._data);

        if (result) {
          resolve(result);
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
      if (typeof object !== 'object') {
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
   * Remove key from storage
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John",
   * //   "age": 20
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.delete('name').then(() => {
   *  // Success
   * });
   *
   * // New Storage
   * // {
   * //   "age": "20"
   * // }
   *
   * @param {string} key Name of the key
   * @returns {Promise} Promise object when key has been removed successfully
   * @public
   */
  delete(key) {
    return new Promise((resolve, reject) => {
      delete this._data[key];

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
   * Remove a set of keys from storage
   *
   * @example
   * // Storage example
   * // {
   * //   "name": "John",
   * //   "age": 20,
   * //   "country": "United Kingdom"
   * // }
   *
   * import storage from 'electron-storage-promised';
   *
   * storage.deleteAll(['name', 'age']).then(() => {
   *  // Success
   * });
   *
   * // New Storage
   * // {
   * //   "country": "United Kingdom"
   * // }
   *
   * @param {array} keys Array of key names
   * @returns {Promise} Promise object when keys have been removed successfully
   * @public
   */
  deleteAll(keys) {
    return new Promise((resolve, reject) => {
      if (typeof keys !== 'object' && !Array.isArray(keys)) {
        reject(new Error('The function parameter must be an array'));
      }

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        delete this._data[key];
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
