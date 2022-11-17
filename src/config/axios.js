import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  key:localStorage.getItem("authorization")
});

axiosInstance.interceptors.request.use(
  function (config)
  {
    return config;
  },
  function (error)
  {
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  function(response)
  {
    // console.log(response)
    // if (response.headers['Authorization']===localStorage.getItem('Authorization')) {
      return response;
    // }
  },
  function(error)
  {
    return Promise.reject(error);
  }
  )
  // const status=error.response? error.response.status:null;
  // if(status===401){
  //   axio
  // }