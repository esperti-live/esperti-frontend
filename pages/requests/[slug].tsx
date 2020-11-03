import Head from "next/head";
import styles from "../../styles/Request.module.scss";
import button from "../../styles/Button.module.scss";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import SendRequestMessageModal from "../../components/Modal/SendRequestMessageModal";

export default function request({ request }) {
  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Esperti.live | {request.name}</title>
      </Head>
      <div className={styles.singleRequest}>
        <h1>{request.title}</h1>
        <p>{request.description}</p>

        <div className={styles.tagContainer}>
          {request.tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {user && (
        <button
          onClick={() => setShowModal(true)}
          className={button.expertFloatingButton}
        >
          Send a message
        </button>
      )}
      {showModal && (
        <SendRequestMessageModal
          closeModal={() => setShowModal(false)}
          request={request}
        />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/requests`);
  const requests = await res.json();

  console.log(requests);

  const paths = requests.map((requests) => ({
    params: { slug: requests.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/requests/${params.slug}`
  );
  const request = await res.json();

  console.log(request);
  return {
    props: {
      request,
    },
  };
};
