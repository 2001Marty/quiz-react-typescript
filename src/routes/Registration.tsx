import RegistrationForm from '../components/registration/RegistrationForm'
import RegistrationProps from '../types/Registration';

const Registration = (props: RegistrationProps) => {
  const {setCurrentEmail} = props;
  return (
    <RegistrationForm setCurrentEmail={setCurrentEmail}/>
  )
}

export default Registration