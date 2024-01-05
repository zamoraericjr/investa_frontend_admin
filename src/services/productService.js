import axios from "axios";

const baseUrl = "http://investa-api.onrender.com/products";

async function addProduct(newProd) {
  const resp = await axios.post(baseUrl, newProd);
  return resp.data;
}

async function getProducts() {

  const resp = await axios.get(baseUrl);
  return resp.data;
}

async function deleteProduct(prodId) {

  const resp = await axios.delete(`${baseUrl}/${prodId}`);
  return resp.data;
}

async function updateProduct(id, update) {
  const res = await axios.put(`${baseUrl}/${id}`, update);
  return res.data;
};


export default {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct,
};
