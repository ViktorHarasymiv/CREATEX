import css from "./Button.module.css";

export default function LoadMore({ sliceValue, setSliceValue, context }) {
  const handleScroll = () => {
    if (context === "Hide All") {
      setSliceValue(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSliceValue(sliceValue + 3);
    }
  };

  return (
    <button className={css.button_transparent} onClick={handleScroll}>
      <span className={css.button_context_t}>{context}</span>
    </button>
  );
}
