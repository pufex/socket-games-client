import type { FieldValues } from "react-hook-form"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useForm} from "react-hook-form"

import { FormProvider } from "react-hook-form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { Link } from "react-router-dom"

import api from "../api/api"
import { isAxiosError } from "axios"

const Register = () => {
  
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const methods = useForm()
  const {handleSubmit, formState: {errors}, getValues} = methods
  
  const onSubmit = async (data: FieldValues) => {
    const {name, password} = data
    setError("")
    setLoading(true)
    try{
      await api.post(
        "/auth/register",
        {name, password}
      )
      navigate("/login")
    }catch(err){
      if(isAxiosError(err)){
        if(err.response?.status === 409)
          setError("Username already taken.")
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
          Register
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
        <Input
          name="confirm"
          registerOptions={{
            required: "Required",
            validate: (val: string) => 
              val === getValues("password") || "Password must match"
          }}
          placeholder="Confirm password"
          errorMessage={`${errors?.confirm?.message ?? ""}`}
          isPassword
        >
          Confirm password
        </Input>
        <Button
          className="auth__button"
          isLoading={loading}
          isDisabled={loading}
        >
          Register now!
        </Button>
        <section className="auth__links">
          <p className="auth__link-wrapper">
            Already register? <Link className="auth__link" to="/login">Login now!</Link>
          </p>
        </section>
      </form>
    </section>
  </FormProvider>
}

export default Register
