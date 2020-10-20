import "../theme/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="antialiased w-full h-full flex flex-col flex-grow items-center relative">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
