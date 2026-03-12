import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { idea } = body

  if (!idea) {
    return NextResponse.json(
      { error: 'Product idea is required' },
      { status: 400 }
    )
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'n8n webhook not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea,
        timestamp: new Date().toISOString(),
      }),
    })

    const data = await response.json()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to trigger pipeline' },
      { status: 500 }
    )
  }
}
