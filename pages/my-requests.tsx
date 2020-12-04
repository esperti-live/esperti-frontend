import { useState, useEffect, useContext } from "react";
import { Request as RequestInterface } from "../ts/interfaces";
import { useMyRequest } from "../components/Hooks/useMyRequests";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Link from "next/link";

import Request from "../components/Request/Request";
import AuthContext from "../contexts/AuthContext";

import styles from "../styles/pages/MyRequests.module.scss";

export default function requests() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

  const [requests, loading] = useMyRequest(user);
  console.log("my-requests requests", requests);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user]);

  const shownRequests = requests.filter(
    (request: RequestInterface) => request.title.includes(searchQuery) !== false
  );

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
          {shownRequests.map((request: RequestInterface) => (
            <Request request={request} key={request.id} />
          ))}
        </ul>
      </div>
      <Link href="/new-request">
        <a className={styles.linkFloatingButton}>Submit Request</a>
      </Link>
    </section>
  );
}
