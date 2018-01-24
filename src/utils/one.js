const URI = 'http://v3.wufazhuce.com:8000/api'
const fetch = require('./fetch')
let params = {
    version: '3.5.0',
    platform: 'android'
}

function fetchApi (type, params) {
  return fetch(URI, type, params)
}

function find (type = 'movie/list/0') {
  return fetchApi(type, params)
    .then(res => res.data)
}

function findOne (type = 'essay', id) {
  return fetchApi(type + id)
    .then(res => res.data)
}

module.exports = { find, findOne }
