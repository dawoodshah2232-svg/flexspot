// src/components/Honeypot.jsx
// Invisible spam trap for public forms. Bots fill every field they see;
// humans never can (off-screen, unfocusable, hidden from screen readers).
// The matching server endpoint must reject any payload where `company_website`
// is non-empty — see api/submissions.js and api/reserve.js.
export default function Honeypot({ value, onChange }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  );
}
