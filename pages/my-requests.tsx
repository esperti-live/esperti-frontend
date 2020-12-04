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
import { useMyRequest } from "../components/Hooks/useMyRequests";

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
    (request) => request.title.includes(searchQuery) !== false
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
