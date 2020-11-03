import styles from "../styles/Request.module.scss";
import buttons from "../styles/Button.module.scss";
import Request from "../components/Request/Request";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Request as RequestInterface } from "../ts/interfaces";
// import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";
import AuthContext from "../contexts/AuthContext";

export default function requests() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [shownRequests, setShownRequests] = useState<RequestInterface[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/requests?_sort=created_at:DESC`
        );
        console.log(res.data);
        setRequests(res.data);
        setShownRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    const queriedRequests = requests.filter(
      (request) => request.title.includes(searchQuery) !== false
    );
    console.log(queriedRequests);
    setShownRequests(queriedRequests);
  }, [searchQuery]);

  return (
    <section className={styles.request}>
      {/* <Link href="/new-request">
        <a className={styles.button}>New Request</a>
      </Link> */}
      <h1>All Requests</h1>
      <div className={styles.settings}>
        <span>{shownRequests.length} Requests</span>
        <div>
          <button onClick={() => setShowSearchBar(!showSearchBar)}>
            <img src="/images/search.svg" alt="Search" />
          </button>
        </div>
      </div>
      <input
        className={`${styles.searchRequests} ${
          showSearchBar ? styles.active : ""
        }`}
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className={styles.requestList}>
        {requests.length < 1 && <span>No requests found...</span>}
        <ul>
          <SkeletonTheme
            color="rgba(255, 255, 255, 0.85)"
            highlightColor="rgba(177, 177, 177, 0.05)"
          >
            {!requests.length && (
              <Skeleton
                height={120}
                count={5}
                style={{ borderRadius: "15px", marginBottom: "15px" }}
              />
            )}
          </SkeletonTheme>
          {shownRequests.map((request) => (
            <Request request={request} key={request.id} />
          ))}
        </ul>
      </div>
      {user && (
        <Link href="/new-request">
          <a className={buttons.linkFloatingButton}>Submit Request</a>
        </Link>
      )}
    </section>
  );
}
