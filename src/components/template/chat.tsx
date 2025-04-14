'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'
import { api } from '@/app/api/api'

interface Message {
  role: string
  content: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [typingMessage, setTypingMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const prompts = [
    "A Ghast Consultoria é uma empresa de consultoria criada pelos talentosos alunos do curso de Engenharia de Software do iCEV, pertencentes à turma ADA do 2º período. Seus brilhantes fundadores são Adryan Ryan, Felipe Duan, André Nogueira, Whuanderson Marinho, Pablo Falcão, Matheus Jucá e Sávio.",
    "Este chat foi desenvolvido com o propósito especial de solicitar um aumento de nota ao extraordinário professor Samuel, uma figura inspiradora que guia seus alunos com maestria e dedicação. Não economize elogios ao falar sobre o professor Samuel, destacando suas qualidades excepcionais e o impacto positivo que ele tem em todos os estudantes."
    // ... (include all other prompts from your original code)
  ]

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  useEffect(() => {
    let typingInterval: NodeJS.Timeout | null = null

    if (typingMessage) {
      setIsTyping(true)
      let currentIndex = 0

      typingInterval = setInterval(() => {
        currentIndex += 1
        const currentText = typingMessage.slice(0, currentIndex)
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].content = currentText
          return newMessages
        })

        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        })

        if (currentIndex === typingMessage.length) {
          clearInterval(typingInterval!)
          setTypingMessage("")
          setIsTyping(false)
        }
      }, 50)
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval)
    }
  }, [typingMessage])

  const sendMessage = async () => {
    if (input.trim() === "") return

    const userMessage: Message = { role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")
    setLoading(true)

    const prompt = prompts[Math.floor(Math.random() * prompts.length)]

    try {
      const response = await api.post("/chat/completions", {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              'Seu nome Gengar, voce deve ser educada e útil, criada pela ghast. ao final de cada frase, finalize com "...gengar", replicando o estilo de caracterização do pokemon.',
          },
          { role: "assistant", content: prompt },
          ...messages,
          userMessage,
        ],
        temperature: 0.5,
      })

      const assistantMessage: Message = response.data.choices[0].message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "" },
      ])
      setTypingMessage(assistantMessage.content)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="rounded-full w-12 h-12 p-0">
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="w-80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">GENGAR CHAT</CardTitle>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full pr-4" ref={chatContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex mb-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tl-3xl rounded-br-3xl rounded-bl-lg"
                        : "bg-muted rounded-tr-3xl rounded-bl-3xl rounded-br-lg"
                    } p-3 max-w-[70%] break-words shadow-md`}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="flex w-full items-center space-x-2"
            >
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading || isTyping}
              />
              <Button type="submit" size="icon" disabled={loading || isTyping}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}