import Select, { components } from "react-select";
import { useAuth } from "../../context/AuthContextProvider";

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
  const { data, innerRef, innerProps } = props;
  const fetchtUser = useAuth();
  const currentUser = fetchtUser.user;

  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="transition-colors flex text-center items-center p-2 bg-white hover:bg-gray-100"
    >
      {/* {data.user.profile.avatarUrl && (
        <img
          src={data.user.profile.avatarUrl}
          alt={data.label}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            marginRight: 10,
          }}
        />
      )} */}
      {data.user.profile.avatarUrl && (
        <img
          src="https://placehold.co/30"
          alt={data.label}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            marginRight: 10,
          }}
        />
      )}
      <div>
        <div>
          {data.label}
          {data.user.id == currentUser?.id && <span className="text-gray-600"> (you)</span>}
        </div>
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
      className="text-sm"
    />
  );
}

export default ParticipantSelect;
