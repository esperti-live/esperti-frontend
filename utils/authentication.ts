import axios from "axios";
import { resolve } from "path";
import slugify from "slugify";

interface UserData {
  id: string;
  slug: string;
  name: string;
}

/**
 *
 * @param m  (magic link)
 * @param email (user entered email address)
 * @description Starts the magic authentication process with provided email address
 * @returns {id, slug email, name}
 */

export const authenticateUser = (m, email: string): Promise<UserData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenId = await m.auth.loginWithMagicLink({ email, showUI: false });
      const profileData = await getProfileData(tokenId);
      const userData = {
        email,
        ...profileData,
      };

      resolve(userData);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param m (magic link)
 * @description Logs user out from current session
 */
export const unauthenticateUser = async (m) => {
    try {
      await m.user.logout();
    } catch (err) {
    }
};

/**
 *
 * @param m (magic link)
 * @description On page refresh / first visit after signing in fetches user data
 * @returns {id, slug, email}
 */
export const persistAuthentication = (m): Promise<UserData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email } = await m.user.getMetadata();
      const tokenId = await m.user.generateIdToken();

      if (process.env.NODE_ENV === "development") {
        console.log("persistAuthentication tokenId", tokenId);
      }

      const profileData = await getProfileData(tokenId);
      const userData = {
        ...profileData,
        email,
      };
      resolve(userData);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 *
 * @param token
 * @description Fetches user profile from backend
 * @returns {slug, id}
 */
export const getProfileData = async (token) => {
  try {
    const req = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles/my`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      slug: req.data.slug,
      id: req.data.id,
      name: req.data.name,
      type: req.data.type,
    };
  } catch (err) {
    console.log(err);
    resolve();
  }
};

export const checkIfAuthenticated = (m) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isLoggedIn = await m.user.isLoggedIn();

      if (isLoggedIn) {
        resolve(isLoggedIn);
      }

      resolve(isLoggedIn);
    } catch (error) {
      reject(false);
    }
  });
};
