const electron = require('electron');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');

const app = electron.app || electron.remote.app;
const userData = app.getPath('userData');

class Storage {
  constructor(options = null) {
    this.options = null;
    this.data = null;

    // Default options
    const defaultOptions = {
      filename: 'config.json'
    };

    if (options) {
      this.options = options;
    } else {
      this.options = defaultOptions;
    }

    // Set filepath
    this.options.filepath = path.join(userData, this.options.filename);
    console.log(path.join(userData, this.options.filename));

    // Create file if not exists or load data if it is
    const found = fs.existsSync(this.options.filepath);

    if (!found) {
      this.data = {};
      jsonfile.writeFile(this.options.filepath, {}, err => {
        console.log(err);
      });
    } else {
      jsonfile.readFile(this.options.filepath, (err, obj) => {
        if (err) console.log(err);

        if (obj) {
          this.data = obj;
        }
      });
    }
  }

  /**
   * Get data by key from storage
   * @param {string} key
   */
  get(key) {
    return new Promise((resolve, reject) => {
      if (this.data && Object.keys(this.data).length > 0) {
        if (this.data[key]) {
          resolve(this.data[key]);
        } else {
          reject(new Error('Key not found in storage'));
        }
      } else {
        reject(new Error('An error ocurred. Maybe config file has not been loaded properly or it is empty.'));
      }
    });
  }
}

module.exports = Storage;
