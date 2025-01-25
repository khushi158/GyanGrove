import React, { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

const AddItemDialog = ({ open, onClose, onAdd }) => {
  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "" })

  const handleAdd = () => {
    if (!newItem.name || !newItem.category) {
      // You might want to show an error message here
      return
    }
    onAdd({
      name: newItem.name,
      category: newItem.category,
      quantity: Number.parseInt(newItem.quantity) || 0,
    })
    setNewItem({ name: "", category: "", quantity: "" })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Inventory Item</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={newItem.name}
          onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
        />
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={newItem.category}
            onChange={(e) => setNewItem((prev) => ({ ...prev, category: e.target.value }))}
            label="Category"
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Furniture">Furniture</MenuItem>
            <MenuItem value="Office Supplies">Office Supplies</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          variant="outlined"
          value={newItem.quantity}
          onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemDialog

