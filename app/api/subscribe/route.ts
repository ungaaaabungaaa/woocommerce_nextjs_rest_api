import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try {
        const response = await fetch('http://13.235.113.210/wp-json/newsletter/v1/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Failed to subscribe.' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error processing subscription' }, { status: 500 });
    }
}