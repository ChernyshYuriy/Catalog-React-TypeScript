import "../../css/checkbox.css";

interface propsType {
  status: boolean;
  value: string | number;
  keyParameter?: string;
  id?: number;
  onChange: (...someArg: any) => void;
}

const Checkbox: React.FC<propsType> = ({
  status,
  value,
  keyParameter,
  id,
  onChange,
}) => {
  return (
    <div className="checkbox">
      <label className="custom-checkbox">
        <input
          type="checkbox"
          value={value}
          checked={status}
          onChange={(e) => {
            onChange(e, status, id, keyParameter);
          }}
        />
        <span>{value}</span>
      </label>
    </div>
  );
};
export default Checkbox;
