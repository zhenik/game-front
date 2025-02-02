import Vue from "vue";
import axios from "axios";
import { API_URL } from "./config";
import VueAxios from "vue-axios";
import {store} from '../store/index'

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    console.log("API_URL -> "+API_URL)

    Vue.axios.interceptors.request.use(
        (config) => {
          let token = store.getters["authToken"]
          if (token) {
            config.headers['Token'] = `${ token }`;
          }
          return config;
        },
        (error) => {
          // console.log("Interceptors exception");
          return Promise.reject(error)
        }
    )

  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    const url = `${resource}/${slug}`;
    // console.log("URL for request " + url)
    return Vue.axios.get(url).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const UsersService = {
  getUser(email) {
    // console.log("Axios base url -> "+Vue.axios.defaults.baseURL);
    return ApiService.get("users", `${email}`);
  },
  // only role=USER
  getUsersWithRoleUser() {
    const params = {
      role: 'USER'
    };
    return ApiService.query("users", {params})
  }
};

export const ListsService = {
  getLists(email) {
    const params = {
      email: email
    };
    return ApiService.query("/lists", {params});
  },
  post(payload) {
    const data = JSON.stringify(payload)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    // console.log("List prepared  " + data)
    return Vue.axios.post("lists", data, config) // todo: extract method to ApiService
  },
  get(slug) {
    return ApiService.get("lists", slug);
  },
  update(slug, payload) {
    const data = JSON.stringify(payload)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    return Vue.axios.put(`lists/${slug}`, data, config);
  },
  getLatestWIPList(email) {
    const params = {
      email: email
    };
    return ApiService.query("lists/latest", {params});
  }
};

export const AnalyticsService = {
  getAnalytics(email) {
    const params = {
      email: email
    };
    return ApiService.query("/analytics", {params});
  },
  getTopTen() {
    return ApiService.get("/analytics/top")
  }
};
