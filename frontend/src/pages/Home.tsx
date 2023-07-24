// import { useAuth } from '../providers/AuthProvider'
// import CompanyList from '../components/CompanyList'
import ApiProvicelist from '../components/ApiProvicelist'

const Home = () => {
  //   const { isLoggedIn } = useAuth()
  return (
    <div>
      <div>
        {/* <CompanyList /> */}
        <ApiProvicelist />
      </div>
    </div>
  )
}

export default Home
