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
  