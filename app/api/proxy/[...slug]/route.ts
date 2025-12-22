import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://a2f378b31447.ngrok-free.app/api'

async function proxyRequest(
  method: string,
  endpoint: string,
  data?: any,
  headers?: Record<string, string>,
  searchParams?: URLSearchParams
) {
  let url = `${BACKEND_URL}${endpoint}`
  if (searchParams && searchParams.toString()) {
    url += `?${searchParams.toString()}`
  }
  
  console.log(`[Proxy] ${method} ${url}`)
  
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    const responseData = await response.json()
    return { status: response.status, data: responseData }
  } catch (error) {
    console.error(`[Proxy] Error:`, error)
    throw error
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const endpoint = '/' + (slug?.join('/') || '')
  const searchParams = request.nextUrl.searchParams
  const token = request.headers.get('authorization')

  try {
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = token
    }

    const { status, data } = await proxyRequest('GET', endpoint, undefined, headers, searchParams)
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error('GET proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(
  requestObj: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const endpoint = '/' + (slug?.join('/') || '')
  const searchParams = requestObj.nextUrl.searchParams
  const token = requestObj.headers.get('authorization')
  const body = await requestObj.json()

  try {
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = token
    }

    const { status, data } = await proxyRequest('POST', endpoint, body, headers, searchParams)
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error('POST proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to post data' },
      { status: 500 }
    )
  }
}

export async function PUT(
  requestObj: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const endpoint = '/' + (slug?.join('/') || '')
  const searchParams = requestObj.nextUrl.searchParams
  const token = requestObj.headers.get('authorization')
  const body = await requestObj.json()

  try {
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = token
    }

    const { status, data } = await proxyRequest('PUT', endpoint, body, headers, searchParams)
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error('PUT proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to update data' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  requestObj: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const endpoint = '/' + (slug?.join('/') || '')
  const searchParams = requestObj.nextUrl.searchParams
  const token = requestObj.headers.get('authorization')
  const body = await requestObj.json()

  try {
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = token
    }

    const { status, data } = await proxyRequest('PATCH', endpoint, body, headers, searchParams)
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error('PATCH proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to patch data' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  requestObj: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const endpoint = '/' + (slug?.join('/') || '')
  const searchParams = requestObj.nextUrl.searchParams
  const token = requestObj.headers.get('authorization')

  try {
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = token
    }

    const { status, data } = await proxyRequest('DELETE', endpoint, undefined, headers, searchParams)
    return NextResponse.json(data, { status })
  } catch (error) {
    console.error('DELETE proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to delete data' },
      { status: 500 }
    )
  }
}
