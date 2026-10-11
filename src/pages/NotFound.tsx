const NotFound = () => (
  <main className="grid min-h-screen place-items-center px-5 text-center">
    <div>
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="heading-xl uppercase">
        <span className="font-extralight">Lost </span>
        <span className="font-semibold text-champagne">the thread.</span>
      </h1>
      <a href="/" className="btn-ghost mt-10">
        Back to home
      </a>
    </div>
  </main>
);

export default NotFound;
