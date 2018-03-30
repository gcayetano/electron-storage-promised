const electron = require('electron');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

/**
 * A reference to the Electron app. If this framework is required within a
 * renderer processes, we need to load the app via `remote`.
 *
 * @type {string}
 */
const app = electron.app || electron.remote.app;

/**
 * The Electron app's user data path.
 *
 * @type {string}
 */
const userData = app.getPath('userData');

/**
 * The name of the storage file
 *
 * @type {string}
 */
const defaultFileName = 'storage.json';

/**
 * The absolute path to the storage file.
 *
 * @type {string}
 */
const defaultFilePath = path.join(userData, defaultFileName);


/**
 * The electron-storage-native-promises Storage class
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
     */
    this._defaultFileName = defaultFileName;

    /**
     * The absolute path to the default storage file on the disk.
     *
     * @type {string}
     * @private
     */
    this._defaultFilePath = defaultFilePath;

    /**
     * The data loaded from storage file
     *
     * @type {object}
     * @private
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
   * @param {string} key
   * @returns {Promise} Promise object with data extracted from storage file
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
   * @returns {Promise} Promise object with all data from storage
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
   * @param {string} key
   * @param {(string|object|array)} data
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
   * @param {object} keysObject
   * @returns {Promise} Promise object when data has been saved successfully
   * @public
   */
  setMultiple(keysObject) {
    return new Promise((resolve, reject) => {
      if (typeof keysObject !== 'object') {
        reject(new Error('The function parameter must be an object'));
      }

      const keys = Object.keys(keysObject);

      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        this._data[key] = keysObject[key];
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
   * @returns {string} Default path of storage file
   * @public
   */
  file() {
    return this._defaultFilePath;
  }
}

module.exports = new Storage();
