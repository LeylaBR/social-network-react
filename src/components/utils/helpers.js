export const updateObjectInArray = (items, itemId, propObj, newObjProps) =>
  items.map((u) => {
    if (u[propObj] === itemId) {
      return {
        ...u,
        ...newObjProps,
      };
    }
    return u;
  });

export const contactDesc = (contacts) => {
  if (Object.values(contacts)) {
    return <span>no contacts</span>;
  }

  return Object.keys(contacts).filter((contact, inx) => {
    if (contacts[contact] !== null) {
      return (
        <div key={inx}>
          {contact}:{contacts[contact]}
        </div>
      );
    }
  });
};
