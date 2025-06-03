export default function Button({ onClick, className, children }) {
  return (
    <button
      className={className ? `primary-button ${className}` : "primary-button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
