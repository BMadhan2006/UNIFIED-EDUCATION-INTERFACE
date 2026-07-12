import "../styles/QuickActionCard.css";

function QuickActionCard({ title, description, icon, onClick }) {
  return (
    <div className="quick-action-card" onClick={onClick}>
      <div className="quick-action-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button>Open →</button>
    </div>
  );
}

export default QuickActionCard;