import { useContext, useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/Modal.module.scss";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

const CheckEmailModal = ({ closeModal, profile }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    setDisabled(true);
    e.preventDefault();

    try {
      const data = {
        message,
        profile: profile.id,
      };

      axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/messages`, data, {
        headers: { Authorization: `Bearer ${user.tokenId}` },
      });
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  const changeMessageHandler = (e) => {
    if (disabled) {
      setDisabled(false);
    }

    setMessage(e.target.value);
  };

  return (
    <Modal closeModal={closeModal}>
      <h5>Send your message to our expert</h5>
      <p>You'll get an email once our expert answers your question</p>

      <form onSubmit={submitHandler}>
        <textarea
          className={styles.inputPrimary}
          placeholder="Your message"
          onChange={changeMessageHandler}
          value={message}
          rows={7}
        ></textarea>
        <button type="submit" className={styles.btnPrimary} disabled={disabled}>
          Send
        </button>
      </form>
    </Modal>
  );
};

export default CheckEmailModal;
