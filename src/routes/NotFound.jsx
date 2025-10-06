import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="section__inner not-found">
        <h1>Page not found</h1>
        <p>The page you're after has drifted off the flight path.</p>
        <Link className="button" to="/">Return home</Link>
      </div>
    </section>
  );
}
