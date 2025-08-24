import React from "react";
import Button from "../../../../../Button/Button";

const styleObj = {
  maxWidth: 180,
  maxHeight: 44,
};

export default function LeaveReview({ action }) {
  const activeModal = () => {
    action((prev) => !prev);
  };
  return (
    <Button type={"button"} style={styleObj} action={activeModal}>
      {"Leave a review"}
    </Button>
  );
}
