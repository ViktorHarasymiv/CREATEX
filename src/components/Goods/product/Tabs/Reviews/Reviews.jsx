import { useState } from "react";

import style from "./Reviews.module.css";

import Statistics from "./Statistics";
import { Comments } from "./Comments";

import LeaveReview from "./Action/LeaveReview";
import LeaveModal from "./LeaveModal";

export default function Reviews({ data }) {
  const [leaveReview, setLeaveReview] = useState(false);

  return (
    <div className={style.tab_wrapper}>
      <Statistics data={data} />
      <LeaveReview action={setLeaveReview}></LeaveReview>
      <Comments data={data}></Comments>
      {/* Modal */}
      {leaveReview && (
        <LeaveModal id={data.id} setLeaveReview={setLeaveReview} />
      )}
    </div>
  );
}
