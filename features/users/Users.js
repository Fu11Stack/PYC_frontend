import { frontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './userApiSplice'
import { is } from 'immer/dist/internal'

const User = ({ userId}) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if(user) {
        const handleEdit = () => navigate(`/dash/user/${userId}`)
        
        const userRolesString = user.roles.toString().replaceAll(',',', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            </tr>
        )
    } else return null
 return (
  <div>User</div>
 )
}

export default User