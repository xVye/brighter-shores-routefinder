const Paragraph = ({ children, className }) => {
  return <p className={`mb-6 ${className || ""}`}>{children}</p>;
};

export default Paragraph;
