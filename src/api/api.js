import axios from "axios";

const istance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getTasks = () => {
  return istance
    .get("posts/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const addTask = (body) => {
  return istance
    .post("posts/", {
      title: body.title,
      body: body.body,
      userId: 1,
      id: body.id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteTask = (id) => {
  return istance
    .delete(`posts/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getComments = (id) => {
  return istance
    .get(`posts/${id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
