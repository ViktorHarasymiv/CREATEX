import css from "./Button.module.css";

export default function LoadMore({ sliceValue, setSliceValue, context }) {
  const handleScroll = () => {
    if (context === "Hide All") {
      setSliceValue(8);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      //   setTimeout(() => {
      //     window.scrollBy({ top: 200, behavior: "smooth" });
      //   }, 700);

      setSliceValue(sliceValue + 4);
    }
  };

  return (
    <button className={css.button_transparent} onClick={handleScroll}>
      <span className={css.button_context_t}>{context}</span>
    </button>
  );
}
