'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, X } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

const ChatBox = ({ isOpen, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !socket) {
      const ws = new WebSocket('ws://localhost:5328/ws/suiagentpay')
      
      ws.onopen = () => console.log('Connected to SuiAgentPay chat server')
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'response') {
          setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
        }
      }
      ws.onerror = (error) => console.error('Chat server error:', error)
      ws.onclose = () => setSocket(null)
      setSocket(ws)
    }
    return () => { if (socket) socket.close() }
  }, [isOpen])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending || !socket) return
    setIsSending(true)
    setMessages(prev => [...prev, { role: 'user', content: newMessage }])
    setNewMessage('')
    try {
      socket.send(JSON.stringify({ query: newMessage }))
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Something went wrong. Try again later." }])
    } finally {
      setIsSending(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 right-4 w-full max-w-[90vw] sm:max-w-[400px] h-[75vh] max-h-[520px] backdrop-blur-lg bg-white/10 border border-gray-600 rounded-xl shadow-2xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold">
        <h3>SuiAgentPay Assistant</h3>
        <button onClick={onClose} className="hover:opacity-75 transition-opacity">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`max-w-[80%] p-3 rounded-lg shadow-lg ${message.role === 'user' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-700 text-white'}`}>
            <p>{message.content}</p>
          </div>
        ))}
        {isSending && <Loader2 className="w-4 h-4 animate-spin text-white" />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-900">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage() }} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about bills, payments, stablecoins..."
            className="flex-1 bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white transition-colors"
          >
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox;
