import React from "react";

export default function SessionStatus({ isExpert, session }) {
  if (isExpert) {
    return (
      <div>
        {!session.start_time && <p>Session has not started yet.</p>}
        {session.start_time && !session.end_time && <p>Session has started.</p>}
        {session.end_time && <p>Session has ended.</p>}
      </div>
    );
  } else {
    return <></>;
  }
}
