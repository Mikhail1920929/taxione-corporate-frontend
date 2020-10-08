import axios from 'axios'

axios.defaults.headers.common['accept-language'] = 'ru'

let baseURL = 'https://taxione-backend-staging.tax1one.ru'

fetch(`/`)
  .then(data => {
    if (data.headers.has('X-BASE-URL')) {
      API.defaults.baseURL = data.headers.get('X-BASE-URL')
      window.baseURL = data.headers.get('X-BASE-URL')
    }
  })

const API = axios.create({
  baseURL: baseURL
})

export default API
