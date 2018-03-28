const electron = require ('electron');
const path = require ('path');
const fs = require ('fs');
const jsonfile = require ('jsonfile');

const app = electron.app || electron.remote.app;
const userData = app.getPath ('userData');

const Storage = (options = null) => {
  const defaultOptions = {
    filename: 'config.json'
  };

  if (options) {
    this.options = options;
  } else {
    this.options = defaultOptions;
  }

  // Set filepath
  this.options.filepath = path.join (userData, this.options.filename);
  console.log (path.join (userData, this.options.filename));

  // Create file if not exists or load data if it is
  fs.exists (this.options.filepath, found => {
    if (!found) {
      this.data = {};
      jsonfile.writeFile (this.options.filepath, {}, err => {
        console.log (err);
      });
    } else {
      jsonfile.readFile (this.options.filepath, (err, obj) => {
        if (err) console.log (err);

        if (obj) {
          this.data = obj;
        }
      });
    }
  });
};

/**
 * Get data by key from storage
 * @param {string} key
 */
const get = key => {

};


Storage.prototype.get = get;

module.exports = Storage;
