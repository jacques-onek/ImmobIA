import { NextResponse } from 'next/server'
import { imagekit } from '@/lib/imagekit'

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    return NextResponse.json(authenticationParameters)
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate auth parameters' },
      { status: 500 }
    )
  }
}