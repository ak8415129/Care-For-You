import axios from "axios";

const API = axios.create({
  baseURL: "https://care-for-you-backend.onrender.com",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});


// const baseURL = "https://care-for-you-backend.onrender.com/";

export const registerUser = (authData) => {
  return API.post(`/user/register`, authData);
};

export const loginUser = (authData) => {
  return API.post(`/user/login`, authData);
};

export const fetchWardData = () => {
  return API.get(`/data`);
};

export const postWardData = (wardData) => {
  return API.post(`/data/addWard`, wardData);
};

export const editWardData = (id, updatedData) => {
  return API.patch(`/data/editWard/${id}`, updatedData);
};

export const fetchReview = () => {
  return API.get(`/reviews`);
};

export const postReview = (review) => {
  console.log("Review Posted");
  return API.post(`/reviews/`, review);
};

export const upvoteReview = (id) => {
  return API.patch(`/reviews/${id}/vote`);
};
