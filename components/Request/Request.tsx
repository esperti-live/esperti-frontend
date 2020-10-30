import React from "react";
import { RequestProp } from "../../ts/interfaces";
import styles from "../../styles/Request.module.scss";
import Link from "next/link";

const Request = ({ request }: RequestProp) => {
  return (
    <li>
      <Link href={`/requests/${request.id}`}>
        <a className={styles.requestItem}>
          <div className={styles.left}>
            <img src={request.user.image_url} alt={request.user.name} />
          </div>
          <div className={styles.right}>
            <h5>{request.title}</h5>
            <span className={styles.type}>{request.type}</span>
            {request.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </a>
      </Link>
    </li>
  );
};

export default Request;
