import axios from "axios";
import { User } from "src/types/user";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3002/api/users";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post<User>(API_BASE_URL, user);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.put<User>(`${API_BASE_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
