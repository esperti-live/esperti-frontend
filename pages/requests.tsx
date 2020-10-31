import styles from "../styles/Request.module.scss";
import Request from "../components/Request/Request";
import Link from "next/link";

const FAKE_REQUESTS = [
  {
    id: 1,
    user: {
      image_url: "/images/placeholder.png",
      name: "Bob",
    },
    title: "I need help deploying python script",
    tags: ["Python", "Amazon Web Services"],
    type: "Freelance job",
  },
  {
    id: 2,
    user: {
      image_url: "/images/placeholder.png",
      name: "Bob",
    },
    title: "Azure issues in authentcation",
    tags: ["Azure", "Sitefinity"],
    type: "Freelance job",
  },
  {
    id: 3,
    user: {
      image_url: "/images/placeholder.png",
      name: "Bob",
    },
    title: "Powershell help for aszure network security",
    tags: ["Azure", "Powershell"],
    type: "Freelance job",
  },
  {
    id: 4,
    user: {
      image_url: "/images/placeholder.png",
      name: "Bob",
    },
    title: "Need mentor for cybersecurity",
    tags: ["Cyber secrutiy", "Mathematics"],
    type: "1 on 1 help",
  },
  {
    id: 5,
    user: {
      image_url: "/images/placeholder.png",
      name: "Bob",
    },
    title: "Open application on computer using webhooks",
    tags: ["PHP", "Node.js", "Amazon"],
    type: "1 on 1 help",
  },
];

export default function requests() {
  return (
    <div className={styles.request}>
      <Link href="/new-request">
        <a className={styles.button}>New Request</a>
      </Link>
      <div className={styles.requestList}>
        <ul>
          {FAKE_REQUESTS.map((request) => (
            <Request request={request} key={request.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
