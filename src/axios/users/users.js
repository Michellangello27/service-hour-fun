import { instance } from "../instance";

export async function services() {
  try {
    const { data } = await instance.get(`/services`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function users() {
  try {
    const { data } = await instance.get(`/users`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUsers(id) {
  try {
    const { status } = await instance.delete(`/users/${id}`);
    return status;
  } catch (error) {
    throw error;
  }
}

export async function servicesIdUser(id) {
  try {
    const { data } = await instance.get(`/services/?status=&&user=${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createUser(request) {
  try {
    const { status } = await instance.post(`/users`, request);
    return status;
  } catch (error) {
    throw error;
  }
}

  export async function updateUsers(id, requestData) {
    try {
      const  status  = await instance.put(`/users/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(status)
      return status;
    } catch (error) {
      throw error;
    }
  }

  export async function getRoles() {
    try {
      const { data } = await instance.get(`/roles`);
      return data;
    } catch (error) {
      throw error;
    }
  }

export async function getUserByRol(id) {
  try {
    const { data } = await instance.get(`/users?r=${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getSchoolsList() {
  try {
    const { data } = await instance.get(`/schools`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function servicesId(id) {
  try {
    const { data } = await instance.get(`/services/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function revisionHorasServicio(request, id) {
  try {
    const { data } = await instance.patch(`/services/${id}/review`, request);
    return data;
  } catch (error) {
    throw error;
  }
}
