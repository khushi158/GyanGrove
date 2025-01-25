import React, { useState, useEffect } from "react"
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

const EditItemDialog = ({ open, onClose, onEdit, item }) => {
  const [editedItem, setEditedItem] = useState(item || {})

  useEffect(() => {
    setEditedItem(item || {})
  }, [item])

  const handleEdit = () => {
    if (!editedItem.name || !editedItem.category) {
      // You might want to show an error message here
      return
    }
    onEdit({
      ...editedItem,
      quantity: Number.parseInt(editedItem.quantity) || 0,
    })
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Inventory Item</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={editedItem.name || ""}
          onChange={(e) => setEditedItem((prev) => ({ ...prev, name: e.target.value }))}
        />
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={editedItem.category || ""}
            onChange={(e) => setEditedItem((prev) => ({ ...prev, category: e.target.value }))}
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
          value={editedItem.quantity || ""}
          onChange={(e) => setEditedItem((prev) => ({ ...prev, quantity: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditItemDialog

