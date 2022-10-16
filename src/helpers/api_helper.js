import axios from "axios"
import authHeader from "./jwt-token-access/auth-token-header"
import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
//const token = accessToken
const token = authHeader().Authorization;

//apply base url for axios
const API_URL = "http://localhost:4000"
const axiosApi = axios.create({
  baseURL: API_URL
})
//axiosApi.defaults.baseURL = API_URL;

axiosApi.defaults.headers.common["Authorization"] = token



axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)


export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        } else {
          switch (err.response.status) {
            case 404:
              message = "Sorry! the page you are looking for could not be found"
              break
            case 500:
              message =
                "Sorry! something went wrong, please contact our support team"
              break
            case 401:
              message = "Invalid credentials"
              break
            default:
              message = err[1]
              break
          }
        }
      }
      throw message
    })
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        } else {
          switch (err.response.status) {
            case 404:
              message = "Sorry! the page you are looking for could not be foundddd"
              break
            case 500:
              message =
                "Sorry! something went wrong, please contact our support team"
              break
            case 401:
              message = "Invalid credentials"
              break
            default:
              message = err[1]
              break
          }
        }
      }
      throw message
    })
}

export async function put(url, data, config = {}) {
  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        } else {
          switch (err.response.status) {
            case 404:
              message = "Sorry! the page you are looking for could not be found"
              break
            case 500:
              message =
                "Sorry! something went wrong, please contact our support team"
              break
            case 401:
              message = "Invalid credentials"
              break
            default:
              message = err[1]
              break
          }
        }
      }
      throw message
    })
}

export async function del(url, config = {}) {
  return axiosApi
    .delete(url, { ...config })
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        } else {
          switch (err.response.status) {
            case 404:
              message = "Sorry! the page you are looking for could not be found"
              break
            case 500:
              message =
                "Sorry! something went wrong, please contact our support team"
              break
            case 401:
              message = "Invalid credentials"
              break
            default:
              message = err[1]
              break
          }
        }
      }
      throw message
    })
}
