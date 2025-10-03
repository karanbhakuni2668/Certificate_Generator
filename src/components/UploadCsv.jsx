import { useMemo, useState } from 'react'
import { Alert, Button, Stack, Typography } from '@mui/material'
import Papa from 'papaparse'
import { saveParticipants, saveCsvData, testFirebaseConnection } from '../services/db'
import { sanitizeName, validateNameWithAI } from '../services/validationService'

export default function UploadCsv({ eventId }) {
  const [rows, setRows] = useState([])
  const [report, setReport] = useState(null)
  const [busy, setBusy] = useState(false)

  // Count issues in names
  const issuesCount = useMemo(
    () => rows.reduce((acc, r) => acc + (r.validation?.issues?.length || 0), 0),
    [rows]
  )

  const handleFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (res) => {
        const parsed = res.data
          .filter(Boolean)
          .map((r) => ({
            name: sanitizeName(r.name || r.Name || ''),
            email: String(r.email || r.Email || '').trim(),
            phone: String(r.phone || r.Phone || '').trim(),
            meta: { raw: r },
          }))

        const withValidation = await Promise.all(
          parsed.map(async (p) => ({
            ...p,
            validation: await validateNameWithAI(p.name),
          }))
        )

        setRows(withValidation)

        // Auto-save parsed CSV
        try {
          setBusy(true)
          const participants = withValidation.map((r) => ({
            name: r.validation?.suggestion || r.name,
            email: r.email,
            phone: r.phone,
            meta: r.meta,
          }))

          await saveCsvData(
            participants.map((p) => ({
              name: p.name,
              email: p.email,
              phone: p.phone,
            }))
          )

          if (eventId) {
            await saveParticipants(eventId, participants)
          }

          setReport({
            ok: true,
            msg: `Auto-saved ${participants.length} rows to Realtime DB`,
          })
        } catch (e) {
          setReport({ ok: false, msg: e?.message || 'Auto-save failed' })
        } finally {
          setBusy(false)
        }
      },
    })
  }

  const handleSave = async () => {
    setBusy(true)
    try {
      // Test Firebase connection first
      console.log('Testing Firebase connection...')
      await testFirebaseConnection()
      
      const participants = rows.map((r) => ({
        name: r.validation?.suggestion || r.name,
        email: r.email,
        phone: r.phone,
        meta: r.meta,
      }))

      console.log('Prepared participants for saving:', participants)

      if (eventId) {
        console.log(`Saving to event: ${eventId}`)
        await saveParticipants(eventId, participants)
        await saveCsvData(
          participants.map((p) => ({
            name: p.name,
            email: p.email,
            phone: p.phone,
          }))
        )
        setReport({
          ok: true,
          msg: `✅ Successfully saved ${participants.length} participants to event ${eventId}`,
        })
      } else {
        console.log('Saving to CSV only (no eventId)')
        await saveCsvData(
          participants.map((p) => ({
            name: p.name,
            email: p.email,
            phone: p.phone,
          }))
        )
        setReport({
          ok: true,
          msg: `✅ Successfully saved ${participants.length} rows to EventEye/CSV (no eventId)`,
        })
      }

      setRows([])
    } catch (e) {
      console.error('Save error:', e)
      setReport({ 
        ok: false, 
        msg: `❌ Failed to save: ${e?.message || 'Unknown error'}` 
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
      >
        <Button variant="contained" component="label">
          Select CSV
          <input
            type="file"
            accept=".csv"
            hidden
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
        </Button>

        {/* ✅ Correct dynamic button (not hardcoded "Save 100") */}
        <Button
          disabled={!rows.length || busy}
          variant="outlined"
          onClick={handleSave}
        >
          Save {rows.length} to Event
        </Button>

        {!!rows.length && (
          <Typography color="text.secondary">
            Name issues detected: {issuesCount}
          </Typography>
        )}
      </Stack>

      {report && (
        <Alert
          severity={report.ok ? 'success' : 'error'}
          onClose={() => setReport(null)}
        >
          {report.msg}
        </Alert>
      )}

      {!!rows.length && (
        <Typography variant="body2" color="text.secondary">
          Preview loaded rows (first 5):{' '}
          {JSON.stringify(rows.slice(0, 5), null, 2)}
        </Typography>
      )}
    </Stack>
  )
}
