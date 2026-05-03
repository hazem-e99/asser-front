export default function Stars() {
  return (
    <div
      style={{
        color: "#ffc107",
        marginBottom: 15,
        fontSize: "1.1rem",
      }}
    >
      {[...Array(5)].map((_, i) => (
        <i key={i} className="fas fa-star" />
      ))}
    </div>
  );
}
