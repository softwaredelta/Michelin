import { useSelector } from 'react-redux'
import { selectUserById } from '../../services/usersApiSlice'
import UserAccordionTitle from '../../components/titles/UserAccordionTitle'
import InfoAccordion from '../../components/accordions/InfoAccordion'
import { FaUser } from 'react-icons/fa'
import UserOverview from './UserOverview'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M1_H9
const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId))

  const userManager =
    user.id_manager === 0
      ? 'Sin manager'
      : `${user.manager_name} ${user.manager_last_name}`

  let content

  if (user) {
    content = (
      <>
        <div className='flex flex-row justify-center'>
          <InfoAccordion
            icon={
              <FaUser size={40} className='fill-zinc-500 dark:fill-gray-100' />
            }
            sectionTitle={
              <UserAccordionTitle
                role={user.role_name}
                name={`${user.name} ${user.last_name}`}
                zone={user.state_name}
                reports={user.form_count}
                manager={userManager}
              />
            }
            accordionContent={<UserOverview userId={userId} />}
          />
        </div>
      </>
    )
  } else {
    content = null
  }
  return content
}

export default User
