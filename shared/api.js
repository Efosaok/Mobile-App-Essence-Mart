import axios from 'axios';
// import { TrackJS } from 'trackjs';
import React, { useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import { useToastContext } from '../context/ToastContext';


const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  responseType: 'json',
});

function endpointTransform(endpoint, id) {
  let needle = '$id';
  if (!id)
    needle = '$id/';
  return endpoint.replace(needle, id || '');
}

function createEndpoint(endpoint) {
  return {
    get: (id) => axiosInstance.get(endpointTransform(endpoint, id)),
    put: (id, data, config) => axiosInstance.put(endpointTransform(endpoint, id), data, config),
    patch: (id, data, config) => axiosInstance.patch(endpointTransform(endpoint, id), data, config),
    post: (data, id) => axiosInstance.post(endpointTransform(endpoint, id), data),
  }
}

function createHyperlinkedEndpoint(endpoint) {
  return {
    get: ({ id, url }) => axiosInstance.get(url || endpointTransform(endpoint, id)),
    patch: ({ id, url, data, config }) => axiosInstance.patch(url || endpointTransform(endpoint, id), data, config),
    post: ({ data, id }) => axiosInstance.post(endpointTransform(endpoint, id), data),
  }
}

const useApi = () => {
  const { setToast } = useToastContext();
  const { token } = useUserContext();

  useEffect(() => {
    let interceptor;
    if (token) {
      interceptor = axiosInstance.interceptors.request.use(config => ({ ...config, headers: { 'Authorization': `Token ${token}`, ...config.headers } }))
    }
    return () => {
      if (interceptor) {
        axiosInstance.interceptors.request.eject(interceptor);
      }
    }
  }, [token])

  useEffect(() => {
    axiosInstance.interceptors.request.use(config => ({ ...config, headers: { ...config.headers } }));
  }, [])


  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(res => res, err => {
      // if (process.env.NODE_ENV === 'production') {
      //   TrackJS.console.log({
      //     url: err.response.url,
      //     status: err.response.status,
      //     statusText: err.response.statusText,
      //     request: err.response.data,
      //   });

      //   TrackJS.track(`${err.response.status  } ${  err.response.statusText  }: ${  err.response.url}`);
      // }

      const errorMessage = (err.response && err.response.message)
      switch (err.response.status) {
        case 404:
          setToast({ message: errorMessage || 'notFoundError', type: 'error' })
          break;

        case 401:
          setToast({ message: errorMessage || 'unauthorizedError', type: 'error' })
          break;

        default:
        case 500:
          setToast({ message: errorMessage || 'serverError', type: 'error' })
          break;
      }
      throw err
    });

    return () => {
      if (interceptor) {
        axiosInstance.interceptors.response.eject(interceptor);
      }
    }
  }, [setToast])

  const API = React.useMemo(() => ({
    categories: createHyperlinkedEndpoint('categories/'),
    register: { post: (data) => axiosInstance.post('register/', data) },
    verify: { post: (data, type) => axiosInstance.post(`verify/${type}/`, data) },
    mailingList: { post: (data) => axiosInstance.post('mailing-list/', data) },
    partners: createEndpoint('admin/partners/$id/'),
    productList: { get: (partnerId) => axiosInstance.get(`products/${partnerId && `?partner=${  partnerId}`}`) },
    products: createHyperlinkedEndpoint('admin/products/$id/'),
    productImages: createEndpoint('admin/products/$id/images/'),
    authToken: { post: (data) => axiosInstance.post(`api-token-auth/`, data) },
  }), []);

  return { API, axiosInstance };
}


export default useApi;
