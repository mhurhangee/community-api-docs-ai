'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Message, useAssistant } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, SendIcon, StopCircle, User, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { StreamingMarkdown } from '@/components/StreamingMarkdown'

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, stop, setMessages, append } = useAssistant({ api: '/api/assistant' })
  const [isInputEmpty, setIsInputEmpty] = useState(true)
  const [prevStatus, setPrevStatus] = useState(status)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (prevStatus !== status) {
      setPrevStatus(status)
      scrollToBottom()
    }
  }, [status, prevStatus, scrollToBottom])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isInputEmpty) {
      submitMessage(e)
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e)
    setIsInputEmpty(e.target.value.trim() === '')
  }

  const renderMessageContent = (content: string) => {
    return content.replace(/【.*?】/g, '')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-3xl h-[95vh] flex flex-col shadow-lg">
        <CardHeader className="border-b py-2">
          <CardTitle className="text-xl font-bold text-center">Community API Chatbot</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              {messages.map((m: Message) => (
                <div key={m.id} className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback>{m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow space-y-1">
                    <div className={`message p-3`}>
                      {m.role !== 'data' && (
                        <StreamingMarkdown content={m.content} />
                      )}
                      {m.role === 'data' && (
                        <>
                          {(m.data as any).description}
                          <br />
                          <pre className="bg-muted p-2 rounded mt-2 text-sm overflow-x-auto">
                            {JSON.stringify(m.data, null, 2)}
                          </pre>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {status === 'in_progress' && (
                <div className="flex justify-center items-center mt-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              type="text"
              value={input}
              onChange={handleInput}
              className="flex-grow"
              placeholder="Type your message..."
            />
            {status === 'in_progress' ? (
              <Button type="button" onClick={stop} variant="secondary">
                <StopCircle className="h-4 w-4 mr-2" />
                Stop
              </Button>
            ) : (
              <Button type="submit" disabled={isInputEmpty}>
                <SendIcon className="h-4 w-4 mr-2" />
                Send
              </Button>
            )}
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}