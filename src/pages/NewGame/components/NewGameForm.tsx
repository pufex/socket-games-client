import type { FieldValues } from "react-hook-form";

import { useSocket } from "../../../contexts/Socket";
import {useForm} from "react-hook-form"
import { useState } from "react";

import { FormProvider } from "react-hook-form";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";

import api from "../../../api/api";
import { isAxiosError } from "axios";

const NewGameForm = () => {
    
    const {JoinGame} = useSocket()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const methods = useForm()
    const {handleSubmit, formState: {errors}} = methods

    const onSubmit = async (data: FieldValues) => {
        const {name} = data
        setLoading(true)
        setError("")
        try{
            await api.post("/games",{name})
            JoinGame(name)
        }catch(err){
            if(isAxiosError(err)){
                if(err.response?.status === 409)
                    setError("Name is taken.")
                else setError("Unknown error occured.")
            }else setError("Unknown error occured.")
        }

        setLoading(false)
    }

    return <FormProvider {...methods}>
        <section className="new-game__wrapper">
            <form 
                className="new-game-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className="heading center new-game__heading">
                    New game
                </h1>
                {
                    error
                        && <h1 className="heading--error">
                            {error}
                        </h1>
                }
                <Input
                    name="name"
                    registerOptions={{
                        required: "Required",
                        minLength: {
                            value: 2,
                            message: "Min. 2 char."
                        },
                        maxLength: {
                            value: 30,
                            message: "Max. 30 char."
                        }
                    }}
                    errorMessage={`${errors?.name?.message ?? ""}`}
                    placeholder="Enter room's name"
                >
                    Room's name
                </Input>
                <Button
                    isLoading={loading}
                    isDisabled={loading}
                >
                    Create a game
                </Button>
            </form>
        </section>
    </FormProvider>
}

export default NewGameForm
