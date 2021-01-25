import "./input.css";
export const InputWithLabel = ({
  name,
  change,
  value,
  type,
  label,
  ...rest
}) => {
  return (
    <div className="custom-input-container">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => change(e)}
        {...rest}
      />
    </div>
  );
};
