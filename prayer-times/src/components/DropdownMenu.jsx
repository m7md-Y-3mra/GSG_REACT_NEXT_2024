import React from 'react';

function DropdownMenu({ entities, selectedEntity, handleEntityChange }) {
  return (
    <select
      value={selectedEntity}
      onChange={(e) => handleEntityChange(e.target.value)}
      className="dropdown-menu"
    >
      {entities.map((entity, index) => (
        <option key={index} value={entity}>
          {entity}
        </option>
      ))}
    </select>
  );
}

export default DropdownMenu;