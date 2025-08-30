import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput';
import MessageHeader from './MessageHeader';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const {getMessages, selectedUser, isMessagesLoading, messages} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=> {
    getMessages(selectedUser.id)
  }, [selectedUser.id, getMessages])

  if(isMessagesLoading) return <p>Loading......</p>
  return (
    <div className=' flex-1 flex flex-col overflow-auto'>
     <MessageHeader/>
     <div className=' flex-1 overflow-y-auto p-4 space-y-4'>
      { Array.isArray(messages) &&
        messages.map((message)=> (
        <div 
        key={message?.id}
        className={`chat${message.sender?.id === authUser?.id ? 'chat-end' : "chat-start" }`}
        >
          <div className=' chat-image avatar'>
            <div className=' size-9 rounded-full border'>
              <img
              src={message?.sender?.id === authUser?.id ? authUser?.profilePicture : selectedUser?.profilePicture}
              />
            </div>
          </div>
        </div>
        ))
      }
     </div>
     <MessageInput/>
    </div>
  )
}

export default ChatContainer
