import axios from "axios";

const baseUrl = "/investors";

async function addInvestor(newInv) {
  const response = await axios.post(baseUrl, newInv);
  return response.data;
}

async function getInvestors() {

  const response = await axios.get(baseUrl);
  return response.data;
}

async function deleteInvestor(key) {

  const resp = await axios.delete(`${baseUrl}/${key}`);
  return resp.data;
}

async function updateInvRec(id, update) {
  const res = await axios.put(`${baseUrl}/${id}`, update);
  return res.data;
};


export default {
  addInvestor,
  getInvestors,
  deleteInvestor,
  updateInvRec
  
};
