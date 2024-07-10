const FormInput = ({ label, name, type, required }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {label} {}
        </span>
      </label>
      <input
        className="input input-bordered w-full"
        name={name}
        type={type}
        required={required}
      />
    </div>
  );
};

export default FormInput;
