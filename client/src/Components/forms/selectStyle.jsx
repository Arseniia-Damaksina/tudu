const customStyle = {
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? 'teal' : 'black',
      // eslint-disable-next-line
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#14375A' : 'transparent'
    })
  }

export default customStyle;