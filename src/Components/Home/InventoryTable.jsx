import React, { useMemo } from "react"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Typography,
  Chip,
} from "@mui/material"
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material"

const InventoryTable = ({ inventory, filter, categoryFilter, sortBy, onEdit, onDelete }) => {
  const LOW_STOCK_THRESHOLD = 10

  const processedInventory = useMemo(() => {
    return inventory
      .filter(
        (item) =>
          (item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.category.toLowerCase().includes(filter.toLowerCase())) &&
          (categoryFilter === "" || item.category === categoryFilter),
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else if (sortBy === "quantity") {
          return a.quantity - b.quantity
        } else if (sortBy === "category") {
          return a.category.localeCompare(b.category)
        }
        return 0
      })
  }, [inventory, filter, categoryFilter, sortBy])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Item Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Category</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">Quantity</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">Status</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2">Actions</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processedInventory.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Chip label={item.category} size="small" />
              </TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">
                {item.quantity <= LOW_STOCK_THRESHOLD ? (
                  <Chip icon={<WarningIcon />} label="Low Stock" color="warning" size="small" />
                ) : (
                  <Chip icon={<CheckCircleIcon />} label="In Stock" color="success" size="small" />
                )}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit Item">
                  <IconButton color="primary" onClick={() => onEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Item">
                  <IconButton color="error" onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default InventoryTable

