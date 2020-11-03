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
import { useRouter } from "next/router";

export default function requests() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [requests, setRequests] = useState<RequestInterface[]>([]);
  const [shownRequests, setShownRequests] = useState<RequestInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    console.log(user);
    (async () => {
      if (user && user.id) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/requests?user=${user.id}&_sort=created_at:DESC`
          );

          console.log(res.data);
          setRequests(res.data);
          setShownRequests(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      } else {
        router.replace("/");
      }
    })();
  }, [user]);

  useEffect(() => {
    const queriedRequests = requests.filter(
      (request) => request.title.includes(searchQuery) !== false
    );
    console.log(queriedRequests);
    setShownRequests(queriedRequests);
  }, [searchQuery]);

  return (
    <section className={styles.request}>
      <h1>My Requests</h1>
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
        {requests.length < 1 && !loading && <span>No requests found...</span>}
        <ul>
          <SkeletonTheme
            color="rgba(255, 255, 255, 0.85)"
            highlightColor="rgba(177, 177, 177, 0.05)"
          >
            {loading && (
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
      <Link href="/new-request">
        <a className={buttons.linkFloatingButton}>Submit Request</a>
      </Link>
    </section>
  );
}
