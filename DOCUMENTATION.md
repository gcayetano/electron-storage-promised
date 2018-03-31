<a name="Storage"></a>

## Storage
The electron-storage-promised Storage class

**Kind**: global class  

* [Storage](#Storage)
    * [.get(key)](#Storage+get) ⇒ <code>Promise</code>
    * [.getAll()](#Storage+getAll) ⇒ <code>Promise</code>
    * [.set(key, data)](#Storage+set) ⇒ <code>Promise</code>
    * [.setAll(object)](#Storage+setAll) ⇒ <code>Promise</code>
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
| key | <code>string</code> | Key to search in storage |

**Example**  
```js
// Storage example// {//   "name": "John"// }import storage from 'electron-storage-promised';storage.get('name').then(value => { console.log(value); // => John});
```
<a name="Storage+getAll"></a>

### storage.getAll() ⇒ <code>Promise</code>
Get all data from storage

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - `object` with all data from storage  
**Access**: public  
**Example**  
```js
// Storage example// {//   "name": "John"// }import storage from 'electron-storage-promised';storage.getAll().then(data => { console.log(data); // => `object` {name: 'John'}});
```
<a name="Storage+set"></a>

### storage.set(key, data) ⇒ <code>Promise</code>
Save data to storage by key

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when data has been saved successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Name of the key |
| data | <code>string</code> \| <code>object</code> \| <code>array</code> | Value of the key |

**Example**  
```js
// Storage example// {//   "name": "John"// }import storage from 'electron-storage-promised';storage.set('age', 20).then(() => { // Success});// New Storage// {//   "name": "John",//   "age": "20"// }
```
<a name="Storage+setAll"></a>

### storage.setAll(object) ⇒ <code>Promise</code>
Save multiple data to storage at once

**Kind**: instance method of [<code>Storage</code>](#Storage)  
**Returns**: <code>Promise</code> - Promise object when data has been saved successfully  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | Object with multiple keys and their values to be set |

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
```js
// Storage example// {//   "name": "John"// }import storage from 'electron-storage-promised';storage.clear().then(() => { // Other stuff});// New Storage// {}
```
