import { makeStyles } from 'tss-react/mui'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material'
import { FaChevronUp, FaChevronDown, FaCircleExclamation } from 'react-icons/fa6'
import { memo, useCallback, useMemo, useState } from 'react'
import {
  ERROR_REPORT_EMAIL_TO,
  ERROR_REPORT_EMAIL_CC,
  // isUnauthorizedError,
  // isConflictError,
} from '../utilities/index'
import { AxiosError } from 'axios'
import axios from 'axios'

export interface ErrorCardProps {
  title?: string
  description: string
  details?: Error | AxiosError
  onRetry?: () => void
}

export const ErrorCard = memo(function ErrorCard({
  title,
  description,
  details,
  onRetry,
}: ErrorCardProps) {
  const { classes } = useStyles()

  const [expanded, setExpanded] = useState(false)

  const errorTitle = useMemo(() => {
    if (title) {
      return title
    }
    return 'server_communication_error'
    // if (details && isUnauthorizedError(details)) {
    //   return t('error_card.access_not_allowed')
    // } else if (details && isConflictError(details)) {
    //   return t('error_card.conflict_saving')
    // } else if (title) {
    //   return title
    // } else {
    //   return t('error_card.server_communication_error')
    // }
  }, [title])

  const errorDescription = useMemo(() => {
    return description
    // if (details && isUnauthorizedError(details)) {
    //   return t('error_card.not_allowed_prompt')
    // } else if (details && isConflictError(details)) {
    //   return t('error_card.conflict_prompt')
    // } else {
    //   return description
    // }
  }, [description])

  const displayedDetails = useMemo(() => {
    const isAxiosError = axios.isAxiosError(details)

    if (isAxiosError && details.response?.data?.error) {
      return details.response.data.error ?? ''
    } else {
      return details?.toString() ?? ''
    }
  }, [details])

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded, setExpanded])

  const onEmailSupport = useCallback(() => {
    let bodyDetails = ''

    if (details && 'isAxiosError' in details) {
      const tokens = [
        `${details.config?.method?.toUpperCase()} ${details.request.responseURL}`,
        details.message,
        `server responded with: ${JSON.stringify(details.response?.data)}`,
      ]
      if (details.config?.data) {
        tokens.push(`payload: ${details.config.data}`)
      }

      bodyDetails = tokens.join('%0A')
    } else {
      bodyDetails = details?.toString() || 'none'
    }

    const body = [
      ` `,
      `---`,
      `Error Title: %0A${errorTitle}`,
      `Error Description: %0A${description}`,
      `Time: %0A${Date()}`,
      // eslint-disable-next-line no-restricted-globals
      `URL: %0A${location.href}`,
      `Browser: %0A${navigator.userAgent}`,
      `Details: %0A${bodyDetails.replace(/&/g, '%26')}`,
    ]
      .join('%0A%0A')
      .substring(0, 5000)

    const subject = 'CSI Field Logs Error Report'

    const link = `mailto:${ERROR_REPORT_EMAIL_TO}?cc=${ERROR_REPORT_EMAIL_CC}&subject=${subject}&body=${body}`
    window.open(link, '_blank')
  }, [description, details, errorTitle])

  return (
    <Card className={classes.root} data-testid="error-card">
      <CardContent>
        <Typography variant="h6" color="error" gutterBottom>
          <FaCircleExclamation /> {errorTitle}
        </Typography>

        <Typography variant="body2">{errorDescription}</Typography>
      </CardContent>
      <CardActions>
        {onRetry && (
          <Button size="small" variant="contained" color="info" onClick={onRetry}>
            {'retry'}
          </Button>
        )}
        {details && (
          <>
            <Button size="small" color="info" onClick={onEmailSupport}>
              {'email support'}
            </Button>
            <span style={{ flexGrow: 1 }}></span>
            <IconButton size="small" onClick={toggleExpanded} data-testid="expander">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </IconButton>
          </>
        )}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ overflowWrap: 'break-word' }}>
          <Typography variant="caption" data-testid="details">
            {displayedDetails}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
})

const useStyles = makeStyles({ name: { ErrorCard } })(() => ({
  root: {
    margin: '2em auto',
  },
}))
