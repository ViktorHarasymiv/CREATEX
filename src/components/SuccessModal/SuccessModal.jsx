const SuccessModal = ({ content }) => {
  return (
    <div className="overlay">
      <div className="override" style={{ textAlign: "center" }}>
        <h3>{content}</h3>
      </div>
    </div>
  );
};

export default SuccessModal;
