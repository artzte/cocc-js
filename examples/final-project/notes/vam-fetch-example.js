'use strict'

function search() {
  return fetch('https://api.vam.ac.uk/v2/objects/search?q=monet&page_size=100')
    .then((res) => res.json())
    .then((json) => console.log('success', json))
    .catch((e) => {
      console.error('error', e)
    })
}

search()
