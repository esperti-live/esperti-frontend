import '../styles/globals.css'
import AuthProvider from '../providers/AuthProvider';
import Layout from '../components/Partials/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProvider>
  )
}

export default MyApp
