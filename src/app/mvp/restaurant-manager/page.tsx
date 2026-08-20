'use client'

import { useState } from 'react'
import MvpLayout from '@/components/mvp/MvpLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  UtensilsCrossed, 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  DollarSign,
  Clock,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  ChefHat,
  Package
} from 'lucide-react'

// Types pour le Restaurant Manager
interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
}

interface Order {
  id: string
  items: { name: string; qty: number; price: number }[]
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  table: number
  customer: string
  createdAt: Date
}

interface Table {
  id: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved'
  order?: string
}

// Données de démonstration
const sampleMenuItems: MenuItem[] = [
  { id: '1', name: 'Thiébou Diène', description: 'Riz au poisson traditionnel sénégalais', price: 3500, category: 'Plats principaux', available: true },
  { id: '2', name: 'Yassa Poulet', description: 'Poulet mariné à l\'oignon', price: 4000, category: 'Plats principaux', available: true },
  { id: '3', name: 'Mafé', description: 'Sauce arachide avec viande', price: 3800, category: 'Plats principaux', available: true },
  { id: '4', name: 'Jollof Rice', description: 'Riz jolof nigérien', price: 3000, category: 'Plats principaux', available: true },
  { id: '5', name: 'Attiéké Poisson', description: 'Attieké avec poisson frit', price: 3500, category: 'Plats principaux', available: false },
  { id: '6', name: 'Bissap', description: 'Jus d\'hibiscus frais', price: 1000, category: 'Boissons', available: true },
  { id: '7', name: 'Jus de Gingembre', description: 'Jus de gingembre naturel', price: 1000, category: 'Boissons', available: true },
  { id: '8', name: 'Dibi', description: 'Agneau rôti', price: 5000, category: 'Plats principaux', available: true },
  { id: '9', name: 'Pastels', description: 'Beignets de thon', price: 1500, category: 'Entrées', available: true },
  { id: '10', name: 'Salade Niçoise', description: 'Salade fraîche aux légumes', price: 2500, category: 'Entrées', available: true },
]

const sampleOrders: Order[] = [
  { 
    id: 'ORD-001', 
    items: [{ name: 'Thiébou Diène', qty: 2, price: 3500 }, { name: 'Bissap', qty: 2, price: 1000 }], 
    total: 9000, 
    status: 'preparing', 
    table: 1, 
    customer: 'Client Table 1',
    createdAt: new Date(Date.now() - 1800000)
  },
  { 
    id: 'ORD-002', 
    items: [{ name: 'Yassa Poulet', qty: 1, price: 4000 }, { name: 'Jus de Gingembre', qty: 1, price: 1000 }], 
    total: 5000, 
    status: 'pending', 
    table: 3, 
    customer: 'Client Table 3',
    createdAt: new Date(Date.now() - 600000)
  },
  { 
    id: 'ORD-003', 
    items: [{ name: 'Mafé', qty: 3, price: 3800 }, { name: 'Attiéké Poisson', qty: 1, price: 3500 }], 
    total: 14900, 
    status: 'ready', 
    table: 5, 
    client: 'Client Table 5',
    customer: 'Client Table 5',
    createdAt: new Date(Date.now() - 3600000)
  },
  { 
    id: 'ORD-004', 
    items: [{ name: 'Dibi', qty: 2, price: 5000 }, { name: 'Pastels', qty: 2, price: 1500 }], 
    total: 13000, 
    status: 'delivered', 
    table: 2, 
    customer: 'Client Table 2',
    createdAt: new Date(Date.now() - 7200000)
  },
]

const sampleTables: Table[] = [
  { id: 1, capacity: 4, status: 'occupied', order: 'ORD-001' },
  { id: 2, capacity: 2, status: 'available' },
  { id: 3, capacity: 6, status: 'occupied', order: 'ORD-002' },
  { id: 4, capacity: 4, status: 'available' },
  { id: 5, capacity: 8, status: 'occupied', order: 'ORD-003' },
  { id: 6, capacity: 4, status: 'reserved' },
  { id: 7, capacity: 2, status: 'available' },
  { id: 8, capacity: 6, status: 'available' },
]

export default function RestaurantManagerPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'orders' | 'tables'>('dashboard')
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems)
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [tables, setTables] = useState<Table[]>(sampleTables)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Plats principaux' })

  // Stats calculées
  const todayRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const activeTables = tables.filter(t => t.status === 'occupied').length
  const totalItems = menuItems.length

  // Filtrer le menu
  const filteredMenu = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ajouter un item au menu
  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description,
        price: parseInt(newItem.price),
        category: newItem.category,
        available: true
      }
      setMenuItems([...menuItems, item])
      setNewItem({ name: '', description: '', price: '', category: 'Plats principaux' })
      setShowAddItem(false)
    }
  }

  // Supprimer un item
  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  // Toggle disponibilité
  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ))
  }

  // Changer statut commande
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ))
  }

  // Nouvelle commande
  const [newOrder, setNewOrder] = useState({ table: 1, items: [] as { itemId: string; qty: number }[] })
  const [showNewOrder, setShowNewOrder] = useState(false)

  const handleCreateOrder = () => {
    if (newOrder.items.length > 0) {
      const orderItems = newOrder.items.map(oi => {
        const menuItem = menuItems.find(m => m.id === oi.itemId)!
        return { name: menuItem.name, qty: oi.qty, price: menuItem.price }
      })
      const total = orderItems.reduce((sum, i) => sum + (i.price * i.qty), 0)
      
      const order: Order = {
        id: `ORD-${Date.now().toString(-8).slice(-4)}`,
        items: orderItems,
        total,
        status: 'pending',
        table: newOrder.table,
        customer: `Table ${newOrder.table}`,
        createdAt: new Date()
      }
      
      setOrders([order, ...orders])
      setTables(tables.map(t => t.id === newOrder.table ? { ...t, status: 'occupied' as const, order: order.id } : t))
      setNewOrder({ table: 1, items: [] })
      setShowNewOrder(false)
    }
  }

  const addToOrder = (itemId: string) => {
    const existing = newOrder.items.find(i => i.itemId === itemId)
    if (existing) {
      setNewOrder({
        ...newOrder,
        items: newOrder.items.map(i => i.itemId === itemId ? { ...i, qty: i.qty + 1 } : i)
      })
    } else {
      setNewOrder({ ...newOrder, items: [...newOrder.items, { itemId, qty: 1 }] })
    }
  }

  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-4 h-4" /> },
    preparing: { label: 'En préparation', color: 'bg-blue-100 text-blue-800', icon: <ChefHat className="w-4 h-4" /> },
    ready: { label: 'Prêt', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4" /> },
    delivered: { label: 'Servi', color: 'bg-gray-100 text-gray-800', icon: <CheckCircle className="w-4 h-4" /> },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800', icon: <XCircle className="w-4 h-4" /> },
  }

  const tableStatusConfig = {
    available: { label: 'Disponible', color: 'bg-green-500', border: 'border-green-600' },
    occupied: { label: 'Occupée', color: 'bg-red-500', border: 'border-red-600' },
    reserved: { label: 'Réservée', color: 'bg-yellow-500', border: 'border-yellow-600' },
  }

  return (
    <MvpLayout 
      mvpName="Restaurant Manager" 
      mvpIcon={<UtensilsCrossed className="w-5 h-5 text-white" />}
      mvpColor="bg-orange-500"
      navItems={[
        { label: 'Tableau de bord', icon: <Package className="w-5 h-5" />, href: '#', active: activeTab === 'dashboard' },
        { label: 'Menu & Carte', icon: <UtensilsCrossed className="w-5 h-5" />, href: '#', active: activeTab === 'menu' },
        { label: 'Commandes', icon: <ShoppingCart className="w-5 h-5" />, href: '#', active: activeTab === 'orders' },
        { label: 'Tables', icon: <Users className="w-5 h-5" />, href: '#', active: activeTab === 'tables' },
        { label: 'Paramètres', icon: <Package className="w-5 h-5" />, href: '#' },
      ]}
    >
      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-6 bg-white p-1 rounded-lg shadow-sm w-fit">
        {[
          { id: 'dashboard', label: 'Tableau de bord' },
          { id: 'menu', label: 'Menu & Carte' },
          { id: 'orders', label: 'Commandes' },
          { id: 'tables', label: 'Tables' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-orange-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold">{todayRevenue.toLocaleString()} FCFA</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">+12% vs hier</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Commandes en attente</p>
                    <p className="text-2xl font-bold">{pendingOrders}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">À traiter</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tables occupées</p>
                    <p className="text-2xl font-bold">{activeTables}/{tables.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{tables.length - activeTables} disponibles</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Articles au menu</p>
                    <p className="text-2xl font-bold">{totalItems}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <UtensilsCrossed className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{menuItems.filter(i => i.available).length} disponibles</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders & Quick Actions */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 4).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-500">Table {order.table} • {order.items.length} articles</p>
                      </div>
                      <div className="text-right">
                        <Badge className={statusConfig[order.status].color}>
                          {statusConfig[order.status].label}
                        </Badge>
                        <p className="font-semibold mt-1">{order.total.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => { setActiveTab('orders'); setShowNewOrder(true) }}
                  className="w-full justify-start bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-2" /> Nouvelle commande
                </Button>
                <Button 
                  onClick={() => setActiveTab('menu')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" /> Gérer le menu
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> Voir les rapports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" /> Gérer les clients
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* MENU TAB */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un plat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => setShowAddItem(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" /> Ajouter un plat
            </Button>
          </div>

          {/* Add Item Modal */}
          {showAddItem && (
            <Card className="border-2 border-dashed border-orange-300 bg-orange-50/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ajouter un nouvel article</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nom du plat"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                  <Input
                    placeholder="Prix (FCFA)"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  />
                  <Input
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="sm:col-span-2"
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Plats principaux</option>
                    <option>Entrées</option>
                    <option>Desserts</option>
                    <option>Boissons</option>
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-600">
                    Ajouter
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddItem(false)}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menu Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMenu.map(item => (
              <Card key={item.id} className={`overflow-hidden ${!item.available ? 'opacity-60' : ''}`}>
                <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <UtensilsCrossed className="w-12 h-12 text-orange-400" />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge variant={item.available ? "default" : "secondary"} className={item.available ? "bg-green-100 text-green-800" : ""}>
                      {item.available ? 'Disponible' 'Indisponible'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-orange-600">{item.price.toLocaleString()} FCFA</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => toggleAvailability(item.id)}>
                        {item.available ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDeleteItem(item.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gestion des commandes</h2>
            <Button 
              onClick={() => setShowNewOrder(true)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="w-4 h-4 mr-2" /> Nouvelle commande
            </Button>
          </div>

          {/* New Order Form */}
          {showNewOrder && (
            <Card className="border-2 border-dashed border-blue-300 bg-blue-50/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Créer une nouvelle commande</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Table</label>
                  <select
                    value={newOrder.table}
                    onChange={(e) => setNewOrder({...newOrder, table: parseInt(e.target.value)})}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {tables.filter(t => t.status !== 'occupied').map(t => (
                      <option key={t.id} value={t.id}>Table {t.id} ({t.capacity} places)</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Ajouter des articles</label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {menuItems.filter(i => i.available).map(item => (
                      <button
                        key={item.id}
                        onClick={() => addToOrder(item.id)}
                        className={`p-2 text-left rounded-lg border transition-colors ${
                          newOrder.items.some(i => i.itemId === item.id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.price.toLocaleString()} FCFA</p>
                      </button>
                    ))}
                  </div>
                </div>

                {newOrder.items.length > 0 && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium mb-2">Articles sélectionnés:</p>
                    {newOrder.items.map(oi => {
                      const item = menuItems.find(m => m.id === oi.itemId)!
                      return (
                        <div key={oi.itemId} className="flex justify-between text-sm py-1">
                          <span>{item.name} x{oi.qty}</span>
                          <span>{(item.price * oi.qty).toLocaleString()} FCFA</span>
                        </div>
                      )
                    })}
                    <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                      <span>Total:</span>
                      <span>{newOrder.items.reduce((sum, oi) => {
                        const item = menuItems.find(m => m.id === oi.itemId)!
                        return sum + (item.price * oi.qty)
                      }, 0).toLocaleString()} FCFA</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={handleCreateOrder} className="bg-orange-500 hover:bg-orange-600" disabled={newOrder.items.length === 0}>
                    Créer la commande
                  </Button>
                  <Button variant="outline" onClick={() => { setShowNewOrder(false); setNewOrder({ table: 1, items: [] }) }}>
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Order Info */}
                    <div className="flex-1 p-4">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-bold text-lg">{order.id}</h3>
                        <Badge className={statusConfig[order.status].color}>
                          {statusConfig[order.status].icon}
                          <span className="ml-1">{statusConfig[order.status].label}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">Table {order.table}</span>
                        <span className="text-sm text-gray-500">
                          {order.createdAt.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{item.name} x{item.qty}</span>
                            <span>{(item.price * item.qty).toLocaleString()} FCFA</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-bold text-lg">{order.total.toLocaleString()} FCFA</span>
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, 'preparing')} className="bg-blue-500">
                              Commencer
                            </Button>
                          )}
                          {order.status === 'preparing' && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, 'ready')} className="bg-green-500">
                              Prêt
                            </Button>
                          )}
                          {order.status === 'ready' && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, 'delivered')}>
                              Servir
                            </Button>
                          )}
                          {order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, 'cancelled')}>
                              Annuler
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* TABLES TAB */}
      {activeTab === 'tables' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gestion des tables</h2>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Disponible</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Occupée</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Réservée</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map(table => (
              <Card 
                key={table.id} 
                className={`${tableStatusConfig[table.status].border} border-2 cursor-pointer hover:shadow-md transition-shadow`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full ${tableStatusConfig[table.status].color} flex items-center justify-center text-white font-bold text-xl mb-3`}>
                    {table.id}
                  </div>
                  <h3 className="font-semibold">Table {table.id}</h3>
                  <p className="text-sm text-gray-500">{table.capacity} places</p>
                  <Badge className={`mt-2 ${tableStatusConfig[table.status].color} text-white`}>
                    {tableStatusConfig[table.status].label}
                  </Badge>
                  {table.order && (
                    <p className="text-xs text-gray-500 mt-2">Commande: {table.order}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </MvpLayout>
  )
}
