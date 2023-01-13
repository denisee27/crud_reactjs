import axios from "axios";

const instance = axios.create({
  baseURL: "https://pos.karyaoptima.com/api",
  headers: {
    "content-type": "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
  },
});

const getAll = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return instance.get("/categories", {
    headers: { Authorization: "Bearer " + token },
  });
};

const createData = (data) => {
  return instance.post("/categories/create", data);
};

const getSingleData = (id) => {
  return instance.get("/categories/" + id);
};

const updateData = (data) => {
  return instance.post("/categories/update", data);
};

const deleteData = (id) => {
  return instance.delete("/categories/delete", { data: id });
};

const serviceApi = {
  getAll,
  createData,
  getSingleData,
  deleteData,
  updateData,
};

export default serviceApi;
