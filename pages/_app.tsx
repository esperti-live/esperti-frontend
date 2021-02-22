import "../styles/globals.css";
import AuthProvider from "../providers/AuthProvider";
import SessionProvider from "../providers/SessionProvider";
import NotificationProvider from "../providers/NotificationProvider";
import ChatProvider from "../providers/ChatProvider";

import Layout from "../components/Partials/Layout";
import PubNub from "pubnub";

import { PubNubProvider } from "pubnub-react";
import { useEffect } from "react";

const pubnub = new PubNub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUM_PK,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUM_SK,
});

function MyApp({ Component, pageProps }) {
  const leaveApplication = () => {
    pubnub.unsubscribeAll();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", leaveApplication);
  }, []);

  return (
    <PubNubProvider client={pubnub}>
      <AuthProvider>
        <SessionProvider>
          <NotificationProvider>
            <ChatProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChatProvider>
          </NotificationProvider>
        </SessionProvider>
      </AuthProvider>
    </PubNubProvider>
  );
}

export default MyApp;
