import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import UserAccordionTitle from "../../components/UserAccordionTitle";
import InfoAccordion from "../../components/InfoAccordion";
import { FaUser } from "react-icons/fa";
const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  if (user) {
    return (
      //Example
      <InfoAccordion
        icon={<FaUser size={40} className="fill-zinc-500 dark:fill-gray-100" />}
        sectionTitle={<UserAccordionTitle role={"TBM"} name={"Pedro Picapiedra"} zone={"Querétaro"} reports={4} manager={"Example"} />}
      />
    );
  } else return null;
};

export default User;
