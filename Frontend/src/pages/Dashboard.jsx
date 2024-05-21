import { UserContext } from "../../Shelf/userShelf"
import { useContext } from "react"

export default function Dashboard() {
    const {user} = useContext(UserContext)
  return (
    <div>
        <h1>Profile</h1>
        {!! user && (<h2>Hej {user.name} !</h2>)}
      
    </div>
  )
}
