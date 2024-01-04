import axios from "axios";

const baseUrl = "/selected";

async function addSelected(sel) {
  const resp = await axios.post(baseUrl, sel);
  return resp.data;
}

async function getSelected() {

  const resp = await axios.get(baseUrl);
  return resp.data;
}

async function deleteSelected(selId) {

  const resp = await axios.delete(`${baseUrl}/${selId}`);
  return resp.data;
}

export default {
    addSelected,
    getSelected,
    deleteSelected,
};
