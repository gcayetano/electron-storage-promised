<a name="Storage"></a>

## Storage
The electron-storage-promised Storage class

**Kind**: global class  

* [Storage](#Storage)
    * [.get(key)](#Storage+get) ⇒ <code>Promise</code>
    * [.getAll()](#Storage+getAll) ⇒ <code>Promise</code>
    * [.set(key, data)](#Storage+set) ⇒ <code>Promise</code>
    * [.setAll(object)](#Storage+setAll) ⇒ <code>Promise</code>
    * [.delete(key)](#Storage+delete) ⇒ <code>Promise</code>
    * [.deleteAll(keys)](#Storage+deleteAll) ⇒ <code>Promise</code>
    * [.file()](#Storage+file) ⇒ <code>string</code>
    * [.clear()](#Storage+clear) ⇒ <code>Promise</code>

<a name="Storage+get"></a>

### storage.get(key) ⇒ <code>Promise</code>
Get data by key from storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - `string|object|array` extracted from storage file  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> \| <code>array</code> | Key to search in storage. Now support deep search using `.` (dot) separator or array of strings |

**Example**  
```js// Storage example// {//   "user": {//     "name": "John",//     "password": "123"//     "messages": 50//   }// }``````jsimport storage from 'electron-storage-promised';// Search for a top keystorage.get('user').then(value => { console.log(value); // => { user: { name: "John", "password": "123", messages: 50 } }});// Search for a deep key using stringstorage.get('user.name').then(value => { console.log(value); // => John});// Search for a deep key using array of stringsstorage.get(['user', 'name']).then(value => { console.log(value); // => John});```
<a name="Storage+getAll"></a>

### storage.getAll() ⇒ <code>Promise</code>
Get all data from storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - `object` with all data from storage  
**Access**: public  
**Example**  
```js// Storage example// {//   "name": "John"// }``````jsimport storage from 'electron-storage-promised';storage.getAll().then(data => { console.log(data); // => `object` {name: 'John'}});```
<a name="Storage+set"></a>

### storage.set(key, data) ⇒ <code>Promise</code>
Save data to storage by key

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when data has been saved successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the key. Now support deep search using `.` (dot) separator or array of strings |
| data | <code>string</code> \| <code>object</code> \| <code>array</code> | Value of the key |

**Example**  
```js// Storage example// {//   "user": {//     "name": "John",//     "password": "123"//     "messages": 50//   }// }``````jsimport storage from 'electron-storage-promised';// Set a top keystorage.set('myKey', 'myValue').then(() => { // Success});// Set a deep key using stringstorage.set('user.password', 'test').then(() => { //Success});// Set a deep key using array of stringsstorage.set(['user', 'messages'], 100).then(() => { //Success});// New Storage// {//   "user": {//     "name": "John",//     "password": "test"//     "messages": 100//   },//   "myKey": "myValue"// }```
<a name="Storage+setAll"></a>

### storage.setAll(object) ⇒ <code>Promise</code>
Save multiple data to storage at once

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when data has been saved successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object with multiple keys and their values to be set |

**Example**  
```js// Storage example// {//   "name": "John"// }``````jsimport storage from 'electron-storage-promised';storage.setAll({age: 20, country: 'United Kingdom'}).then(() => { // Success});// New Storage// {//   "name": "John",//   "age": "20",//   "country": "United Kingdom"// }```
<a name="Storage+delete"></a>

### storage.delete(key) ⇒ <code>Promise</code>
Remove key from storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when key has been removed successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the key |

**Example**  
```js// Storage example// {//   "name": "John",//   "age": 20// }``````jsimport storage from 'electron-storage-promised';storage.delete('name').then(() => { // Success});// New Storage// {//   "age": "20"// }```
<a name="Storage+deleteAll"></a>

### storage.deleteAll(keys) ⇒ <code>Promise</code>
Remove a set of keys from storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when keys have been removed successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>array</code> | Array of key names |

**Example**  
```js// Storage example// {//   "name": "John",//   "age": 20,//   "country": "United Kingdom"// }``````jsimport storage from 'electron-storage-promised';storage.deleteAll(['name', 'age']).then(() => { // Success});// New Storage// {//   "country": "United Kingdom"// }```
<a name="Storage+file"></a>

### storage.file() ⇒ <code>string</code>
Returns default path of storage file

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>string</code> - Default path of storage file  
**Access**: public  
**Example**  
```js
import storage from 'electron-storage-promised';const filePath = storage.file();console.log(filePath); // => path/to/storage/file
```
<a name="Storage+clear"></a>

### storage.clear() ⇒ <code>Promise</code>
Clear storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when data has been cleared successfully  
**Access**: public  
**Example**  
```js// Storage example// {//   "name": "John"// }``````jsimport storage from 'electron-storage-promised';storage.clear().then(() => { // Other stuff});// New Storage// {}```
