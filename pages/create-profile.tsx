import { useState, useContext, useEffect } from "react";

import AuthContext from "../contexts/AuthContext";

import styles from "../styles/Auth.module.scss";
import CheckEmailModal from "../components/Modal/CheckEmailModal";
// import ProfileCreatedModal from "../components/Modal/ProfileCreatedModal";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";

const newRequest = () => {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  // const [profileCreatedSuccessfully, setProfileCreatedSuccessfully] = useState<
  //   boolean
  // >(false);

  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { login, user, persistUser } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user.slug) {
      router.push("/");
    }
  }, []);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log({ name, image });
    try {
      const data = {
        name,
        image,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/profiles`, data, {
        headers: { Authorization: `Bearer ${user.tokenId}` },
      });
      await persistUser();
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setShowAuthModal(true);
    await login(emailInput);
    setShowAuthModal(false);
  };

  return (
    <div className={styles.createProfile}>
      <div className={styles.jumbotron}>
        <h1>Create your profile</h1>
      </div>
      <section className={styles.createProfileForm}>
        {/* {!user && <h5>Log in</h5>} */}
        {/* {user && <h5>Create your own profile</h5>} */}
        {!user && (
          <form onSubmit={loginHandler}>
            <input
              type="email"
              required
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email address"
            />
            <button type="submit" className={styles.submit}>
              Log In
            </button>
          </form>
        )}
        {user && (
          <form onSubmit={submitHandler}>
            <label htmlFor="title">Add your name*</label>
            <input
              type="text"
              placeholder="What is your name?"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="title">Add an image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />

            {!success && (
              <button
                type="submit"
                className={styles.submit}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Create"}
              </button>
            )}
            {success && (
              <button
                type="submit"
                className={`${styles.submit} btnSuccess`}
                disabled
              >
                &#10004;
              </button>
            )}
          </form>
        )}
        {showAuthModal && (
          <CheckEmailModal closeModal={() => setShowAuthModal(false)} />
        )}
        {/* {profileCreatedSuccessfully && (
          <ProfileCreatedModal
            closeModal={() => setProfileCreatedSuccessfully(false)}
          />
        )} */}
      </section>
    </div>
  );
};

export default newRequest;
