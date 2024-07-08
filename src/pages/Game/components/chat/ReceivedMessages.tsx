import type { MessageType, GiveMessagePayload } from "../../../../types"

import { useState, useEffect, useRef } from "react"
import { useSocket } from "../../../../contexts/Socket"

import ChatMessage from "./ChatMessage"

type ReceivedMessagesProps = {
  chatboxRef: React.RefObject<HTMLDivElement>
}

const ReceivedMessages = ({
  chatboxRef
}: ReceivedMessagesProps) => {
  
  const {socket} = useSocket()
  const [messages, setMessages] = useState<MessageType[]>([])
  const shouldScroll = useRef(false)

  useEffect(() => {

    if(!socket)
      return

    const receiveMessage = ({message}: GiveMessagePayload) => {
      if(chatboxRef.current){
        const {
          scrollTop,
          clientHeight,
          scrollHeight
        } = chatboxRef.current
        if(scrollHeight - scrollTop - clientHeight < 1)
          shouldScroll.current = true
        else shouldScroll.current = false
      }
      setMessages(prev => [...prev, message])
    }

    socket.on("giveMessage", receiveMessage)
    return () => {
      socket.off("giveMessage", receiveMessage)
    }

  }, [socket])

  useEffect(() => {
    shouldScroll.current
      && chatboxRef.current?.scrollTo({top: chatboxRef.current.scrollHeight, behavior: "instant"})
  }, [messages])

  return messages
    .sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .map(({message, isAdmin, name}) => (
      <ChatMessage 
        name={name}
        isAdmin={isAdmin}
      >
        {message}
      </ChatMessage>
    ))
    

}

export default ReceivedMessages
