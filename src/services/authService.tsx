import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import apiService from "./apiService";
import '../firebase/config';
import { IResponseRedisUser } from "../interfaces/auth";

const auth = getAuth();

/**
 * Sign in using Google Authentication
 * @returns {Promise<Object>} - User information from Firebase
 * @throws {Error} - Throws an error if authentication fails
 */
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const response = await signInWithPopup(auth, provider);
        return response.user;
    } catch (error) {
        console.error("Google Login Error:", error);
        throw error;
    }
};

/**
 * Sign in using Facebook Authentication
 * @returns {Promise<Object>} - User information from Firebase
 * @throws {Error} - Throws an error if authentication fails
 */
export const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
        const response = await signInWithPopup(auth, provider);
        return response.user;
    } catch (error) {
        console.error("Facebook Login Error:", error);
        throw error;
    }
};

/**
 * Log in using email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Authentication response from API
 * @throws {Error} - Throws an error if login fails
 */
export const loginWithEmail = async (email: string, password: string) => {
    try {
        const response = await apiService.post(`login`, {
            email,
            password,
            fingerprint_code: "b6d8f0d2749eebf842d049c765a06503"
        });
        return response.data;
    } catch (error: any) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Log out the currently authenticated user
 * @returns {Promise<Object>} - API response after logout
 * @throws {Error} - Throws an error if logout fails
 */
export const logout = async () => {
    try {
        const response = await apiService.post("logout", {});
        return response.data;
    } catch (error: any) {
        console.error("Logout Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Retrieve user information from Redis cache
 * @returns {Promise<Object>} - User data retrieved from the API
 * @throws {Error} - Throws an error if retrieval fails
 */
export const getRedisUser = async (): Promise<IResponseRedisUser> => {
    try {
        const response = await apiService.get("user", {});
        return response.user;
    } catch (error: any) {
        console.error("Get Redis User Infor Error:", error.response?.data || error.message);
        throw error;
    }
};
