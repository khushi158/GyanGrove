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
  ListItemSecondaryAction,
  Divider,
  Chip,
  Tooltip,
  Zoom,
} from "@mui/material"
import {
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  ErrorOutline as ErrorOutlineIcon,
  Email as EmailIcon,
  MailOutline as MailOutlineIcon,
  MailLock as MailLockIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 6px 30px rgba(0, 0, 0, 0.15)",
  },
}))

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}))

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
    <StyledPaper elevation={3}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "error.main",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          <WarningIcon sx={{ mr: 1 }} /> Low Stock Alerts
        </Typography>
        <Chip
          icon={<EmailIcon />}
          label={`Email: ${localStorage.getItem("userEmail") || "Not set"}`}
          variant="outlined"
          color="primary"
          sx={{ mb: 2 }}
        />
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No low stock items
          </Typography>
        </Box>
      ) : (
        <List>
          {lowStockItems.map((item) => (
            <Tooltip
              key={item.id}
              title={emailNotificationsEnabled ? "Email alert enabled" : "Email alert disabled"}
              placement="left"
              TransitionComponent={Zoom}
            >
              <StyledListItem>
                <ListItemIcon>
                  <ErrorOutlineIcon color="error" />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.quantity} left in stock`}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                  secondaryTypographyProps={{ color: "error" }}
                />
                <ListItemSecondaryAction>
                  {emailNotificationsEnabled ? <MailOutlineIcon color="primary" /> : <MailLockIcon color="action" />}
                </ListItemSecondaryAction>
              </StyledListItem>
            </Tooltip>
          ))}
        </List>
      )}
    </StyledPaper>
  )
}

export default LowStockAlerts

