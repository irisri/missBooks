export default {
  loadFromStorage,
  saveToStorage,
  makeId
};

function loadFromStorage(key) {
  var json = localStorage.getItem(key);
  var value = JSON.parse(json);
  return value;
}

function saveToStorage(key, value) {
  var json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}