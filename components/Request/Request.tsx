import { RequestProp } from "../../ts/interfaces";
import { formatDate } from "../../utils/date";

import styles from "../../styles/components/Request.module.scss";

const Request = ({ request }: RequestProp) => {
  return (
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

      <span>Experts are writting to you, check your messages</span>
      <hr />
    </div>
  );
};

export default Request;
