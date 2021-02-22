import { RequestProp } from "../../ts/interfaces";
import { formatDate } from "../../utils/date";

import {useOpenChat} from "../../providers/ChatProvider";

import styles from "../../styles/components/Request.module.scss";

const Request = ({ request }: RequestProp) => {
  const openChat = useOpenChat()

  const setChatOpen = () => {
    const fakeOther = {id: request.profile, name: request.profile}//If you're expert you can't see other, let's do a fake object
    console.log("fakeOther", fakeOther)
    openChat(fakeOther) //Open chat without expert, just with other
  }

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
      

      <button onClick={setChatOpen}>Chat with {request?.profile}</button>
      <span>Experts are writting to you, check your messages</span>
      <hr />
    </div>
  );
};

export default Request;
