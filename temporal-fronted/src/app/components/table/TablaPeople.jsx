import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import BubbleImage from "./BubbleImage";
import { useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { AlertConfirm } from "../Common/Alert";
const apiUrl = process.env.NEXT_PUBLIC_API;

const titles = [
  ["Image", ""],
  ["Name", "name_"],
  ["Email", "correo"],
  ["Institution", "institute"],
];

const TablaPeople = ({
  peoples,
  handleEditClick,
  handleDelete,
  currentPerson,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [current, setCurrent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const sortedPeople = [...peoples].sort((a, b) => {
    if (!sortConfig.key) return 0; // No ordenar si no hay columna seleccionada
    const aValue = a[sortConfig.key]
      ? a[sortConfig.key].toString().toLowerCase()
      : "";
    const bValue = b[sortConfig.key]
      ? b[sortConfig.key].toString().toLowerCase()
      : "";
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key) => {
    if (key !== "") {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    }
  };

  return (
    <div className="w-full">
      <table className="min-w-full">
        <thead>
          <tr className="bg-black uppercase text-sm leading-normal">
            {titles.map((title, index) => (
              <th
                key={index}
                onClick={() => handleSort(title[1])}
                className={`py-3 px-6 text-left border-x-2 border-x-background cursor-pointer ${
                  index === 0 ? "w-20" : "" // Asigna ancho solo a la primera columna
                }`}
              >
                <div className="flex justify-between items-center transition-all">
                  {title[0]}
                  {title[1] != "" && sortConfig.key === title[1] && (
                    <span>
                      {sortConfig.direction === "asc" ? (
                        <TiArrowSortedUp
                          className="rotate-180 duration-200"
                          size={20}
                        />
                      ) : (
                        <TiArrowSortedUp size={20} className="duration-200" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="py-3 px-6 text-left border-x-2 border-x-background">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {peoples &&
            sortedPeople.map((people, index) => (
              <tr
                key={index}
                className=" font-light items-center odd:bg-tablaIntercalado1 even:bg-tablaIntercalado2"
              >
                <td className="py-3 px-6 text-left text-xs border-r-2 border-background w-20">
                  <BubbleImage image={`${apiUrl}/public/people/${people.photo}`} />
                </td>
                <td className="py-3 px-6 text-left border-r-2 border-background">
                  {people.name_}
                </td>
                <td className="py-3 px-6 text-left border-r-2 border-background">
                  {people.correo}
                </td>
                <td className="py-3 px-6 text-left border-r-2 border-background">
                  {people.institute}
                </td>
                <td className="w-20">
                  <div className="flex justify-center items-center h-full space-x-3">
                    <FiEdit
                      onClick={() => handleEditClick(people)}
                      size={20}
                      className="hover:text-primary duration-150"
                    />
                    <FaTrash
                      onClick={() => {
                        currentPerson(people);
                        setCurrent(people);
                        setIsOpen(true);
                      }}
                      size={20}
                      className="hover:text-primary duration-150"
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isOpen && (
        <AlertConfirm
          title="Delete Person"
          message="Are you sure you want to delete this person?"
          cancel={() => setIsOpen(false)}
          confirm={() => {
            handleDelete(current);
            setIsOpen(false);
          }}
          action="Delete"
        />
      )}
    </div>
  );
};

export default TablaPeople;
