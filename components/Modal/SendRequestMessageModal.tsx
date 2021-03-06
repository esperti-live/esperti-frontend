import { useState } from "react";
import Modal from "../Modal";
import styles from "../../styles/components/modal/Modal.module.scss";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { getToken } from "../../utils/magic";

const CheckEmailModal = ({ closeModal, request }) => {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    setLoading(true);
    setDisabled(true);

    e.preventDefault();

    try {
      const tokenId = await getToken();
      const data = {
        message,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/messages/request/${request.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${tokenId}` },
        }
      );

      setSuccess(true);
    } catch (err) {
      setError(
        `Something went wrong, please try again: ${
          err.message ? err.message : err
        }`
      );
    } finally {
      setLoading(false);
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
      {!success && (
        <>
          <h5>Send your message to user</h5>
          <p>Help a user by reaching out!</p>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={submitHandler}>
            <textarea
              className={styles.inputPrimary}
              placeholder="Your message"
              onChange={changeMessageHandler}
              value={message}
              rows={7}
            ></textarea>

            {!success && (
              <button
                type="submit"
                className={styles.btnPrimary}
                disabled={disabled}
              >
                {loading ? <LoadingSpinner /> : "Send"}
              </button>
            )}
          </form>
        </>
      )}

      {success && (
        <>
          <h5>Message sent successfully</h5>
          <p>You'll get an email once our expert answers your question</p>
          <button
            type="button"
            className={`${styles.btnPrimary} ${styles.success}`}
            onClick={() => closeModal()}
          >
            &#10004;
          </button>
        </>
      )}
    </Modal>
  );
};

export default CheckEmailModal;
