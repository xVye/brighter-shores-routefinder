const ExternalLink = ({ to, title, children }) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-500 hover:underline font-medium"
      title={title}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
