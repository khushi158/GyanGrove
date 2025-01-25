import React, { useState, useEffect, useCallback } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Chip,
  Tooltip,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material"
import supabase from "../../supabase"
import InventoryTable from "./InventoryTable"
import LowStockAlerts from "./LowStockAlerts"
import AddItemDialog from "./AddItemDialog"
import EditItemDialog from "./EditItemDialog"
import { Navigate, useNavigate } from "react-router"

const Home = ({isAuthenticated, setIsAuthenticated}) => {
  const [inventory, setInventory] = useState([])
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [filter, setFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lowStockItems, setLowStockItems] = useState([])
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const LOW_STOCK_THRESHOLD = 10
  const navigator=useNavigate();
  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("Inventory").select("*")

      if (error) throw error

      setInventory(data || [])
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchLowStockItems = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("Lowstock").select("*")

      if (error) throw error

      setLowStockItems(data || [])
    } catch (err) {
      console.error("Error fetching low stock items:", err)
    }
  }, [])

  const checkAndUpdateLowStock = useCallback(
    async (item) => {
      if (item.quantity <= LOW_STOCK_THRESHOLD) {
        const { data, error } = await supabase
          .from("Lowstock")
          .upsert({ id: item.id, name: item.name, quantity: item.quantity, category: item.category })
          .select()

        if (error) {
          console.error("Error updating low stock:", error)
          return
        }

        if (data && data[0] && emailNotificationsEnabled) {
          sendLowStockEmail(data[0])
        }

        fetchLowStockItems()
      } else {
        const { error } = await supabase.from("Lowstock").delete().match({ id: item.id })

        if (error) {
          console.error("Error removing from low stock:", error)
        } else {
          fetchLowStockItems()
        }
      }
    },
    [fetchLowStockItems, emailNotificationsEnabled],
  )

  const sendLowStockEmail = async (item) => {
    try {
      const email = localStorage.getItem("userEmail")
      if (!email) {
        console.error("No email found in localStorage")
        return
      }

      const response = await fetch("https://lowstock.khushibanchhor21.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: item.name,
          category: item.category,
          quantity: item.quantity,
          toAddress: email,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error("Error sending email:", error)
        return
      }

      const result = await response.json()
      console.log("Email sent successfully:", result)
    } catch (error) {
      console.error("Error in sendLowStockEmail:", error)
    }
  }

  useEffect(() => {
    if(!localStorage.getItem("userEmail")){
      setIsAuthenticated(false);
      navigator('/signin')
    }
    fetchInventory()
    fetchLowStockItems();

    console.log("welcome");
    
  }, [fetchInventory, fetchLowStockItems])

  const handleAddItem = async (newItem) => {
    try {
      const { data, error } = await supabase.from("Inventory").insert([newItem]).select()

      if (error) throw error

      setInventory((prev) => [...prev, data[0]])
      setOpenAddDialog(false)
      setError(null)
      checkAndUpdateLowStock(data[0])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditItem = async (editedItem) => {
    try {
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("Inventory")
        .update(editedItem)
        .eq("id", editedItem.id)
        .select()

      if (inventoryError) throw inventoryError

      const { data: lowStockItem, error: lowStockError } = await supabase
        .from("Lowstock")
        .select("*")
        .eq("id", editedItem.id)
        .single()

      if (lowStockError && lowStockError.code !== "PGRST116") {
        throw lowStockError
      }

      if (lowStockItem) {
        const { error: deleteLowStockError } = await supabase.from("Lowstock").delete().eq("id", editedItem.id)

        if (deleteLowStockError) throw deleteLowStockError
      }

      setInventory((prev) => prev.map((item) => (item.id === editedItem.id ? inventoryData[0] : item)))

      setOpenEditDialog(false)
      checkAndUpdateLowStock(inventoryData[0])
      fetchLowStockItems()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      const { error: inventoryError } = await supabase.from("Inventory").delete().eq("id", id)
      const { error: lowstockError } = await supabase.from("Lowstock").delete().eq("id", id)

      if (inventoryError) throw inventoryError
      if (lowstockError) throw lowstockError

      setInventory((prev) => prev.filter((item) => item.id !== id))
      fetchLowStockItems()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggleEmailNotifications = (enabled) => {
    setEmailNotificationsEnabled(enabled)
  }

  const categories = [...new Set(inventory.map((item) => item.category))]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Toolbar>
          <InventoryIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Inventory Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This empty Toolbar acts as a spacer */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: "#555" }}>
                Inventory Control Panel
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search Inventory"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="action" />,
                  }}
                  sx={{ flexGrow: 1, minWidth: "200px" }}
                />
                <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Category">
                    <MenuItem value="">
                      <em>All Categories</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        <CategoryIcon sx={{ mr: 1, fontSize: 20 }} />
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="quantity">Quantity</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Add new inventory item">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddDialog(true)}
                    sx={{ minWidth: "150px" }}
                  >
                    Add Item
                  </Button>
                </Tooltip>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <InventoryTable
                inventory={inventory}
                filter={filter}
                categoryFilter={categoryFilter}
                sortBy={sortBy}
                onEdit={(item) => {
                  setCurrentItem(item)
                  setOpenEditDialog(true)
                }}
                onDelete={handleDeleteItem}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <LowStockAlerts lowStockItems={lowStockItems} onToggleEmailNotifications={handleToggleEmailNotifications} />
          </Grid>
        </Grid>

        <AddItemDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} onAdd={handleAddItem} />

        <EditItemDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onEdit={handleEditItem}
          item={currentItem}
        />
      </Container>
    </Box>
  )
}

export default Home

