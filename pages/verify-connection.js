import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function VerifyConnection() {
    const [connectionStatus, setConnectionStatus] = useState('Checking connection...');
    const [readStatus, setReadStatus] = useState('Pending...');
    const [writeStatus, setWriteStatus] = useState('Pending...');
    const [logs, setLogs] = useState([]);

    const addLog = (message) => {
        setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    useEffect(() => {
        async function verify() {
            try {
                // 1. Connection/Read Check
                addLog('Attempting to fetch 1 job from "jobs" table...');
                const { data, error: readError } = await supabase
                    .from('jobs')
                    .select('*')
                    .limit(1);

                if (readError) {
                    console.error('Read Error:', readError);
                    setReadStatus(`Failed: ${readError.message}`);
                    addLog(`Read failed: ${readError.message}`);
                } else {
                    setReadStatus('Success');
                    addLog(`Read successful. Found ${data.length} rows.`);
                    setConnectionStatus('Connected');
                }

                // 2. Write Check
                addLog('Attempting to insert a dummy job...');
                const dummyJob = {
                    title: 'Test Job ' + new Date().toISOString(),
                    company: 'Test Company',
                    location: 'Test Location',
                    allowance: '1000',
                    tags: ['Test']
                };

                const { data: insertData, error: writeError } = await supabase
                    .from('jobs')
                    .insert([dummyJob])
                    .select();

                if (writeError) {
                    console.error('Write Error:', writeError);
                    setWriteStatus(`Failed: ${writeError.message}`);
                    addLog(`Write failed: ${writeError.message}`);
                } else {
                    setWriteStatus('Success');
                    addLog('Write successful. Data inserted.');

                    // Cleanup (optional, but good practice for tests)
                    if (insertData && insertData[0]) {
                        addLog('Cleaning up test data...');
                        await supabase.from('jobs').delete().eq('id', insertData[0].id);
                        addLog('Cleanup successful.');
                    }
                }

            } catch (err) {
                console.error('Unexpected Error:', err);
                setConnectionStatus(`Error: ${err.message}`);
                addLog(`Unexpected error: ${err.message}`);
            }
        }

        verify();
    }, []);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Supabase Connection Verification</h1>

            <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h2>Status</h2>
                <p><strong>Connection:</strong> {connectionStatus}</p>
                <p><strong>Read Check:</strong> <span style={{ color: readStatus === 'Success' ? 'green' : readStatus.startsWith('Failed') ? 'red' : 'black' }}>{readStatus}</span></p>
                <p><strong>Write Check:</strong> <span style={{ color: writeStatus === 'Success' ? 'green' : writeStatus.startsWith('Failed') ? 'red' : 'black' }}>{writeStatus}</span></p>
            </div>

            <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
                <h2>Logs</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {logs.map((log, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem', fontFamily: 'monospace' }}>{log}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
