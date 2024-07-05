import type { FieldValues } from "react-hook-form"
import type { AuthObject } from "./Auth"

import { useAuth } from "./Auth"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {useForm} from "react-hook-form"

import { FormProvider } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { Link } from "react-router-dom"

import api from "../api/api"
import { isAxiosError } from "axios"

const Login = () => {
  
  const {setAuth} = useAuth()

  const {state} = useLocation()
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const methods = useForm()
  const {handleSubmit, formState: {errors}} = methods
  
  const onSubmit = async (data: FieldValues) => {
    const {name, password} = data
    setError("")
    setLoading(true)
    try{
      const result = await api.post(
        "/auth/login",
        {name, password}
      )
      const {user, accessToken} = result.data as AuthObject
      setAuth({user, accessToken})
      if(state.previous)
        navigate(state.previous)
      else navigate("/")
    }catch(err){
      if(isAxiosError(err)){
        if(err.response?.status === 401)
          setError("This user doesn't exist.")
        else if(err.response?.status === 406)
          setError("Wrong username or password")
        else setError("Something went wrong...")
      }else setError("Something went wrong...")
    }
    setLoading(false)
  }

  return <FormProvider {...methods}>
    <section className="card__wrapper">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="auth__form"
      >
        <h1 className="heading text-center auth__heading">
          Login
        </h1>
        {
          error
            && <h1 className="heading--error text-center">
              {error}
            </h1>
        }
        <Input
          name="name"
          registerOptions={{
            required: "Required",
            minLength: {
              value: 6,
              message: "Min. 6 char.",
            },
            maxLength: {
              value: 30,
              message: "Max. 30 char."
            }
          }}
          placeholder="Type your username..."
          errorMessage={`${errors?.name?.message ?? ""}`}
        >
          Username
        </Input>
        <Input
          name="password"
          registerOptions={{
            required: "Required",
            minLength: {
              value: 6,
              message: "Min. 6 char.",
            },
            maxLength: {
              value: 20,
              message: "Max. 20 char."
            }
          }}
          placeholder="Your password"
          errorMessage={`${errors?.password?.message ?? ""}`}
          isPassword
        >
          Password
        </Input>
        <Button
          className="auth__button"
          isLoading={loading}
          isDisabled={loading}
        >
          Login
        </Button>
        <section className="auth__links">
          <p className="auth__link-wrapper">
            No account? <Link className="auth__link" to="/register">Register now!</Link>
          </p>
        </section>
      </form>
    </section>
  </FormProvider>
}

export default Login
