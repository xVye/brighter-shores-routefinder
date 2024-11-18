const Paragraph = ({ children, className }) => {
  const classes = className?.includes("mb") ? className : `${className} mb-6`;
  return <p className={classes}>{children}</p>;
};

export default Paragraph;
