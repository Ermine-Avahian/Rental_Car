import css from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.subtitle}>Page Not Found</h1>
      <p className={css.description}>
        Oops! You seem to be lost in the void of the internet.
      </p>
      <a href="/" className={css.homeButton}>
        Go Back Home
      </a>
    </div>
  );
}
