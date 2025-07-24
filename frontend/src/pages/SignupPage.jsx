 import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {

  const[showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const {signup, isSigningUp} = useAuthStore();

  const validateForm = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/* left side*/}
      <div className="flex flex-col justify-center items-center p-6 sm:9-12">



      </div>
    </div>
  )
}

export default SignupPage