import axios from "axios";

export const url = `${process.env.BASE_URL}`;

const token = `${process.env.STRAPI_TOKEN}`;

const API = axios.create({
  baseURL: url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const setCookie = async (e) => {
  try {
    const res = await axios.post(`/api/login`, e, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await API.get(`/api/categories?populate=*`);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const fetchCategoriesBasic = async () => {
  try {
    const res = await API.get(`/api/categories`);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const myInfo = async (e) => {
  try {
    const res = await API.get(`/api/users/me?populate=*`, {
      headers: {
        Authorization: `Bearer ${e}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const postImage = async (data) => API.post(`/api/upload`, data);

export const register = async (e) => {
  try {
    const res = await API.post(`/api/auth/local/register`, e);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};
export const loginUser = async (data) => {
  try {
    const res = await API.post(`/api/auth/local`, data);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};
export const verifyUser = async (jwt) => {
  try {
    const res = await API.get(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const fetchArticles = async () => {
  try {
    const res = await API.get(`/api/articles?populate=*`);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const postArticle = async (e) => {
  try {
    const res = await API.post(`/api/articles`, e);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const fetchUser = async (value) => {
  try {
    const res = await API.get(
      `/api/users?filters=[email][$eq]=${value}&populate=*`
    );
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const fetchAllUsers = async () => {
  try {
    const res = await API.get(`/api/users?populate=*`);
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};

export const fetchSingleArticle = async (value) => {
  try {
    const res = await API.get(
      `api/articles?filters[Slug][$eq]=${value}&populate=*`
    );
    return res.data;
  } catch (err) {
    return err.response.data.error.message;
  }
};
