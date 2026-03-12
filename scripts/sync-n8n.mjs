import fs from 'fs';
import path from 'path';

const N8N_BASE_URL = 'https://bhamisipatiraji.app.n8n.cloud';
const WORKFLOW_ID = 'Pu4hWNXmFRxgW9eK';
const API_KEY = process.env.N8N_API_KEY;

if (!API_KEY) {
  console.error('N8N_API_KEY not set in environment');
  process.exit(1);
}

const response = await fetch(
  `${N8N_BASE_URL}/api/v1/workflows/${WORKFLOW_ID}`,
  {
    headers: {
      'X-N8N-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  }
);

if (!response.ok) {
  console.error(`Failed to fetch workflow: ${response.status}`);
  process.exit(1);
}

const workflow = await response.json();
const outputPath = path.join('n8n', 'groundwork-pipeline.json');

fs.mkdirSync('n8n', { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(workflow, null, 2));

console.log(`Workflow saved to ${outputPath}`);
