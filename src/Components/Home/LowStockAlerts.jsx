import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material"
import {
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material"

const LowStockAlerts = ({ lowStockItems, onToggleEmailNotifications }) => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)

  useEffect(() => {
    const storedToggleState = localStorage.getItem("emailNotificationsEnabled")
    if (storedToggleState === null) {
      localStorage.setItem("emailNotificationsEnabled", "true")
    } else {
      setEmailNotificationsEnabled(storedToggleState === "true")
    }
  }, [])

  const handleToggleChange = (event) => {
    const newState = event.target.checked
    setEmailNotificationsEnabled(newState)
    localStorage.setItem("emailNotificationsEnabled", newState.toString())
    onToggleEmailNotifications(newState)
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#d32f2f",
          }}
        >
          <WarningIcon sx={{ mr: 1 }} /> Low Stock Alerts
        </Typography>
        <FormControlLabel
          control={<Switch checked={emailNotificationsEnabled} onChange={handleToggleChange} color="primary" />}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <NotificationsIcon sx={{ mr: 1 }} />
              Email Alerts
            </Box>
          }
        />
      </Box>
      <Divider sx={{ mb: 2 }} />
      {lowStockItems.length === 0 ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100px" }}>
          <Typography variant="body2" color="textSecondary">
            No low stock items
          </Typography>
        </Box>
      ) : (
        <List>
          {lowStockItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemIcon>
                  <ErrorOutlineIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.quantity} left in stock`}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                  secondaryTypographyProps={{ color: "error" }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default LowStockAlerts

