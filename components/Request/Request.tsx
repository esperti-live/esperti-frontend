import React from "react";
import { RequestProp } from "../../ts/interfaces";
import styles from "../../styles/Request.module.scss";
import Link from "next/link";

const Request = ({ request }: RequestProp) => {
  return (
    <li className={styles.requestItem}>
      <Link href={`/requests/${request.id}`}>
        <a>
          {/* <div className={styles.top}>
            <img src={request.user.image_url} alt={request.user.name} />
            <span>andy.korn</span>
          </div> */}
          <div className={styles.bottom}>
            <h5>{request.title}</h5>
            <div className={styles.tagContainer}>
              {request.tags.map((tag) => (
                <span key={tag.id} className={styles.tag}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Request;
