import { useAuth } from "../../../../auth/Auth"
import { cn } from "../../../../utils/cn"

type ChatMessageProps = {
    isAdmin: boolean,
    name?: string,
    children: React.ReactNode,
}

const ChatMessage = ({
    name,
    isAdmin,
    children
}: ChatMessageProps) => {

    const {auth} = useAuth()

    return <div className="chat-message__wrapper">
        <div 
            className={cn(
                "chat-message",
                isAdmin ? "admin" : "user",
                !isAdmin 
                    ? auth?.user.name === name
                        ? "yours"
                        : "alien"
                    : ""
            )}
        >
            {
                !isAdmin
                    && <div className="chat-message__author">
                        {
                            name === auth?.user.name
                                ? "You"
                                : name
                        }
                    </div>
            }
            <div className="chat-message__content">
                {children}
            </div>
        </div>
    </div>
}

export default ChatMessage
