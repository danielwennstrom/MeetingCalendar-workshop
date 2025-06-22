import Select, { components } from "react-select";
import type { User } from "../../types/User";

type Props = {
  options: any;
  value?: any;
  onChange?: (selected: number) => void;
};

const CustomMultiValue = (props) => {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
};

const CustomOption = (props) => {
  const { data, innerRef, innerProps, isFocused, isSelected } = props;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? "#eee" : "white",
        padding: 10,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {/* <img
        src={data.user.profile.avatarUrl}
        alt={data.label}
        style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 10 }}
      /> */}
      <div>
        <div>{data.label}</div>
        <div style={{ fontSize: 12, color: "#666" }}>{data.user.email}</div>
      </div>
    </div>
  );
};

function ParticipantSelect({ options, value, onChange }: Props) {
  return (
    <Select
      options={options}
      isMulti
      components={{ Option: CustomOption, MultiValue: CustomMultiValue }}
      value={value}
      onChange={onChange}
      placeholder="Select participants..."
    />
  );
}

export default ParticipantSelect;
