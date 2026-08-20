'use client'

import { useState } from 'react'
import MvpLayout from '@/components/mvp/MvpLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Send,
  Search,
  Plus,
  Phone,
  Mail,
  MoreVertical,
  CheckCheck,
  Clock,
  Bot,
  UserPlus,
  BarChart3,
  Reply
} from 'lucide-react'

// Types pour WhatsApp CRM
interface Contact {
  id: string
  name: string
  phone: string
  email?: string
  avatar?: string
  lastMessage: string
  lastMessageTime: Date
  unread: number
  status: 'active' | 'inactive' | 'lead'
  tags: string[]
}

interface Message {
  id: string
  contactId: string
  content: string
  type: 'text' | 'image' | 'system'
  sentBy: 'me' | 'them'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
}

// Données de démonstration
const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Marie Diop',
    phone: '+221 77 123 45 67',
    email: 'marie@example.com',
    lastMessage: 'Bonjour, je voudrais réserver une table pour ce soir',
    lastMessageTime: new Date(Date.now() - 300000),
    unread: 2,
    status: 'active',
    tags: ['VIP', 'Régulier']
  },
  {
    id: '2',
    name: 'Ibrahim Ndiaye',
    phone: '+221 78 234 56 78',
    lastMessage: 'Merci pour votre service !',
    lastMessageTime: new Date(Date.now() - 3600000),
    unread: 0,
    status: 'active',
    tags: ['Nouveau']
  },
  {
    id: '3',
    name: 'Fatou Sow',
    phone: '+221 76 345 67 89',
    email: 'fatou@sow.com',
    lastMessage: 'Quels sont vos horaires d\'ouverture ?',
    lastMessageTime: new Date(Date.now() - 7200000),
    unread: 1,
    status: 'lead',
    tags: ['Prospect']
  },
  {
    id: '4',
    name: 'Ousmane Fall',
    phone: '+221 77 456 78 90',
    lastMessage: 'Parfait, je commande le même que d\'habitude',
    lastMessageTime: new Date(Date.now() - 86400000),
    unread: 0,
    status: 'active',
    tags: ['Régulier']
  },
  {
    id: '5',
    name: 'Aminata Diallo',
    phone: '+221 78 567 89 01',
    lastMessage: 'Bonne journée !',
    lastMessageTime: new Date(Date.now() - 172800000),
    unread: 0,
    status: 'inactive',
    tags: ['Ancien']
  },
]

const sampleMessages: Message[] = [
  { id: '1', contactId: '1', content: 'Bonjour !', type: 'text', sentBy: 'them', timestamp: new Date(Date.now() - 600000), status: 'read' },
  { id: '2', contactId: '1', content: 'Bonjour Marie ! Comment puis-je vous aider ?', type: 'text', sentBy: 'me', timestamp: new Date(Date.now() - 540000), status: 'read' },
  { id: '3', contactId: '1', content: 'Je voudrais réserver une table pour ce soir', type: 'text', sentBy: 'them', timestamp: new Date(Date.now() - 300000), status: 'delivered' },
  { id: '4', contactId: '1', content: 'Bien sûr ! Pour combien de personnes et à quelle heure ?', type: 'text', sentBy: 'me', timestamp: new Date(Date.now() - 240000), status: 'sent' },
  { id: '5', contactId: '1', content: 'Bonjour, je voudrais réserver une table pour ce soir', type: 'text', sentBy: 'them', timestamp: new Date(Date.now() - 60000), status: 'delivered' },
]

export default function WhatsAppCrmPage() {
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts)
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(sampleContacts[0])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewContact, setShowNewContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' })

  // Stats
  const totalContacts = contacts.length
  const activeContacts = contacts.filter(c => c.status === 'active').length
  const unreadMessages = contacts.reduce((sum, c) => sum + c.unread, 0)
  const responseRate = 94 // %

  // Filtrer les contacts
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  )

  // Messages du contact sélectionné
  const selectedContactMessages = messages.filter(m => m.contactId === selectedContact?.id)

  // Envoyer un message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        contactId: selectedContact.id,
        content: newMessage,
        type: 'text',
        sentBy: 'me',
        timestamp: new Date(),
        status: 'sent'
      }
      setMessages([...messages, message])
      setNewMessage('')

      // Simuler réponse automatique après 2 secondes
      setTimeout(() => {
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          contactId: selectedContact.id,
          content: '✅ Message reçu ! Notre équipe vous répondra rapidement.',
          type: 'system',
          sentBy: 'them',
          timestamp: new Date(),
          status: 'delivered'
        }
        setMessages(prev => [...prev, autoReply])
      }, 2000)
    }
  }

  // Ajouter un contact
  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email || undefined,
        lastMessage: 'Nouveau contact',
        lastMessageTime: new Date(),
        unread: 0,
        status: 'lead',
        tags: ['Nouveau']
      }
      setContacts([contact, ...contacts])
      setNewContact({ name: '', phone: '', email: '' })
      setShowNewContact(false)
    }
  }

  // Réponses rapides
  const quickReplies = [
    'Bonjour ! Comment puis-je vous aider ?',
    'Merci pour votre message. Nous vous répondons rapidement.',
    'Vos informations ont bien été reçues.',
    'Notre équipe vous rappelle dans les plus brefs délais.',
  ]

  return (
    <MvpLayout 
      mvpName="WhatsApp CRM" 
      mvpIcon={<MessageCircle className="w-5 h-5 text-white" />}
      mvpColor="bg-green-500"
      navItems={[
        { label: 'Conversations', icon: <MessageCircle className="w-5 h-5" />, href: '#', active: true },
        { label: 'Contacts', icon: <Users className="w-5 h-5" />, href: '#' },
        { label: 'Automatisations', icon: <Bot className="w-5 h-5" />, href: '#' },
        { label: 'Statistiques', icon: <BarChart3 className="w-5 h-5" />, href: '#' },
        { label: 'Paramètres', icon: <MoreVertical className="w-5 h-5" />, href: '#' },
      ]}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Contacts</p>
              <p className="text-xl font-bold">{totalContacts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Actifs</p>
              <p className="text-xl font-bold">{activeContacts}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Send className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Non lus</p>
              <p className="text-xl font-bold">{unreadMessages}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Taux de réponse</p>
              <p className="text-xl font-bold">{responseRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="flex gap-4 h-[calc(100vh-350px)] min-h-[500px]">
        {/* Contacts List */}
        <Card className="w-80 flex-shrink-0">
          <CardContent className="p-0 h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => setShowNewContact(true)}
                className="w-full bg-green-500 hover:bg-green-600"
                size="sm"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Nouveau contact
              </Button>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedContact?.id === contact.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold truncate">{contact.name}</p>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                    <div className="flex gap-1 mt-1">
                      {contact.tags.map(tag => (
                        <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center flex-shrink-0">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                    {selectedContact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{selectedContact.name}</p>
                    <p className="text-xs text-gray-500">{selectedContact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {selectedContactMessages.map(message => (
                  <div key={message.id} className={`flex ${message.sentBy === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${message.type === 'system' ? 'mx-auto text-center' : ''}`}>
                      {message.type === 'system' ? (
                        <div className="bg-blue-50 text-blue-600 text-xs px-4 py-2 rounded-lg">
                          {message.content}
                        </div>
                      ) : (
                        <div className={`p-3 rounded-2xl ${
                          message.sentBy === 'me' 
                            ? 'bg-green-500 text-white rounded-br-none' 
                            : 'bg-white border border-gray-200 rounded-bl-none'
                        }`}>
                          <p>{message.content}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 ${
                            message.sentBy === 'me' ? 'text-green-100' : 'text-gray-400'
                          }`}>
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.sentBy === 'me' && (
                              message.status === 'read' ? <CheckCheck className="w-4 h-4" /> :
                              message.status === 'delivered' ? <CheckCheck className="w-4 h-4 opacity-50" /> :
                              <Clock className="w-3 h-3" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              <div className="px-4 py-2 border-t bg-gray-50">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewMessage(reply)}
                      className="whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm hover:bg-gray-100"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Écrivez votre message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-green-500 hover:bg-green-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Sélectionnez une conversation</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* New Contact Modal */}
      {showNewContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Ajouter un contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Nom complet"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
              <Input
                placeholder="Numéro de téléphone"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
              <Input
                placeholder="Email (optionnel)"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({...newContact, email: e.target.value})}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddContact} className="bg-green-500 hover:bg-green-600 flex-1">
                  Ajouter
                </Button>
                <Button variant="outline" onClick={() => setShowNewContact(false)} className="flex-1">
                  Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </MvpLayout>
  )
}
