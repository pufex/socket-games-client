import type { FieldValues } from "react-hook-form"
import type { AskToSendMessagePayload } from "../../../../types" 

import { useAuth } from "../../../../auth/Auth"
import {useForm} from "react-hook-form"
import { useEffect, useState } from "react"
import { useSocket } from "../../../../contexts/Socket"
import { useGame } from "../../../../store/store"

import { FormProvider } from "react-hook-form"
import Input from "../../../../ui/Input"
import Button from "../../../../ui/Button"
import { CgSpinner as LoadingIcon} from "react-icons/cg";

type ChatFormProps = {
    chatboxRef: React.RefObject<HTMLDivElement>
} 

const ChatForm = ({
    chatboxRef
}: ChatFormProps) => {
    
    const {game} = useGame()
    const {auth} = useAuth()
    const {socket} = useSocket()

    const methods = useForm()
    const {handleSubmit, reset} = methods
    
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if(!socket || !auth || !game)
            return

        const handleMessageSent = () => {
            setLoading(false)
            reset()
        }

        const handleMessageNotSent = () => {
            setLoading(false)
        }

        socket.on("messageSent", handleMessageSent)
        socket.on("messageNotSent", handleMessageNotSent)

        return () => {
            socket.off("messageSent", handleMessageSent)
            socket.off("messageNotSent", handleMessageNotSent)
        }
    }, [socket])

    const onSubmit = (data: FieldValues) => {
        if(!socket || !auth || !game)
            return

        setLoading(true)
        const {message} = data
        const obj: AskToSendMessagePayload = {
            message,
            name: auth.user.name,
            game: game.name
        }
        chatboxRef.current?.scrollTo({ top: chatboxRef.current.scrollHeight, behavior: "instant"})
        socket.emit("askToSendMessage", obj)
    }

    return <FormProvider {...methods}>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="chat-form"
        >
            <Input
                name="message"
                registerOptions={{
                    required: "Required",
                    maxLength: {
                        value: 200,
                        message: "Maximum length of message is 200 characters."
                    }
                }}
                placeholder="Your message..."
            />
            <Button isDisabled={isLoading}>
                {
                    isLoading   
                        ? <LoadingIcon 
                            className="chat-form__loading"
                            size={30}
                        />
                        : "Send"
                }
            </Button>
        </form>
    </FormProvider>
}

export default ChatForm
