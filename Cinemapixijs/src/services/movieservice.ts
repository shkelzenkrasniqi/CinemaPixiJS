import axios from "axios";

const API_URL = 'http://localhost:5048/api'; 

export const getAllMovies = async () => {
    const response = await axios.get(`${API_URL}/Movie`);
    return response.data;
};