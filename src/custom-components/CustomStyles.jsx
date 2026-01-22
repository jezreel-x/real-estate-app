const CustomStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.selectProps.isDisabled ? '#e5e7eb' : 'white', // Tailwind: bg-gray-200,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      padding: '4px',
      cursor: state.selectProps.isDisabled ? 'not-allowed' : 'default',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "rgb(229, 231, 235)",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgb(169, 169, 169)" : "transparent",
      color: state.isSelected ? "white" : "black",
    }),
    singleValue: (provided) => ({
      ...provided,
        color: "black",
        fontSize: "16px",
        fontWeight: "500",
        padding: "4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
      fontSize: "16px",
      fontWeight: "500",
    }),
};

export default CustomStyles;