import React from 'react';

const Dropdown = ({ currentValue, items, onChange }) => {
  return (
    <select
      data-testid="dropdown"
      style={{ textAlignLast: 'right' }}
      className="flex-grow h-8 bg-gray-100 text-right pr-2 border-none outline-none"
      value={currentValue}
      onChange={({ target }) => onChange(target.value)}
    >
      {items?.map((student) => (
        <option
          data-testid="dropdown-option"
          key={student.id}
          value={student.id}
          className="bg-white border-white outline-white"
        >
          {`${student.firstName} ${student.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
