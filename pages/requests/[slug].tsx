import Head from "next/head";
import styles from "../../styles/Request.module.scss";
import button from "../../styles/Button.module.scss";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { formatDate } from "../../utils/date";
// import { getChannel } from "../../utils/chat";
// import Chat from "../../components/Chat/Chat";

export default function request({ request }) {
  // const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);

  console.log(request);
  console.log(user);

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

        <div className={styles.status}>
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
        </div>
        <div className={styles.singleRequest}>
          <span>Last Updated: {formatDate(request.updated_at, false)}</span>
          <h1>{request.title}</h1>
          <p>{request.description}</p>

          <div className={styles.tagContainer}>
            {request.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
          </div>
          <span>Answers (3)</span>
          <hr />

          <button>
            <span>Close Request</span>
          </button>
        </div>
      </div>

      {/* {user && (
        <button
          onClick={() => setShowModal(true)}
          className={button.expertFloatingButton}
        >
          Send a message
        </button>
      )}
      {showModal && (
        <Chat
          channel={getChannel(user.id, request.profile)}
          user={user}
          expert={user}
        />
      )} */}
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/requests`);
  const requests = await res.json();

  const paths = requests.map((requests) => ({
    params: { slug: requests.slug },
  }));

  return {
    paths,
    fallback: true, //Ensures people don't get weird 404s
  };
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/requests/${params.slug}`
  );
  const request = await res.json();
  return {
    props: {
      request,
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};
