import Head from "next/head";
import styles from "../../styles/pages/Request.module.scss";
import { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { formatDate } from "../../utils/date";
// import { getChannel } from "../../utils/chat";
// import Chat from "../../components/Chat/Chat";

const useMyRequests = (user) => {
  const [state, setstate] = useState();
  useEffect(() => {}, []);
};

export default function request({ request }) {
  if (!request) {
    return (
      <>
        <Head>
          <title>Esperti.live | Request</title>
        </Head>
        <div>Loading</div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Esperti.live | {request.name}</title>
      </Head>
      <div className={styles.requestContainer}>
        <h1>My Requests</h1>

        {/* <div className={styles.status}>
          <div
            className={`${styles.active} ${
              request.active ? styles.selected : ""
            }`}
          >
            Active
          </div>
          <div
            className={`${styles.closed} ${
              !request.active ? styles.selected : ""
            }`}
          >
            Closed
          </div>
        </div> */}
      </div>
    </>
  );
}
