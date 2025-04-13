const Input = ({
  label,
  id,
  value,
  touched,
  errors,
  handleBlur,
  handleChange,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`capitalize ${value && !errors ? "text-main" : ""} ${
          touched && errors ? "text-error" : ""
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`px-4 h-14 bg-white border rounded transition-all duration-300 hover:border-main focus:border-main outline-none placeholder:text-subtext ${
          value && !errors ? "!border-main !text-main" : "border-subtext"
        } ${
          touched && errors ? "!border-error !text-error" : "border-subtext"
        }`}
      />
      {touched && errors && (
        <span className="text-base text-error">{errors}</span>
      )}
    </div>
  );
};

export default Input;
