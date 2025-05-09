import { instance } from "../instance";

export async function services() {
  try {
    const { data } = await instance.get(`/services`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registroHoras(request) {
  try {
    const { status } = await instance.post(`/services`, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return status;
  } catch (error) {
    throw error;
  }
}

export async function editarActividad(data, id) {
  try {
    const { status } = await instance.patch(`/services/${id}`, data);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function load(id) {
  try {
    const { data } = await instance.get(`/evidence/${id}`, {
      headers: {
        "Content-Type": "application/pdf",
        Accept: "application/pdf",
      },
      responseType: "blob",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
