import React from "react";
import PropTypes from "prop-types";

const GroupeList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  // ------------------------------------------
  // решение из видео, но мне непонятно, зачем нужна здесь эта
  // проверка на массив, если и без этой проверки в случае массива
  // на выходе имеем объект типа  {_id: '67rdca3eeb7f6fgeed471818', name: 'Доктор'}
  // ------------------------------------------
  // if (Array.isArray(items)) {
  //   return (
  //     <ul className="list-group">
  //       {items.map((item) => (
  //         <li
  //           className={
  //             "list-group-item" +
  //             (item === selectedItem ? " active" : "")
  //           }
  //           key={item[valueProperty]}
  //           onClick={() => onItemSelect(item)}
  //           role="button"
  //         >
  //           {item[contentProperty]}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          className={
            "list-group-item" + (items[item] === selectedItem ? " active" : "")
          }
          key={items[item][valueProperty]}
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};
GroupeList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupeList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupeList;
