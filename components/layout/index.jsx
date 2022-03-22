import Head from 'next/head'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>10 day forecast</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="10 day forecast application" />
    </Head>
    <div className="h-screen w-screen bg-blue-300">
      <main className="min-h-screen max-w-6xl m-auto flex flex-col items-center gap-6">
        {children}
      </main>
    </div>
  </>
)

export default Layout
