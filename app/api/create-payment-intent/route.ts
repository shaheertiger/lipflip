import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request: NextRequest) {
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json(
      { error: 'Server configuration error: Stripe key not set.' },
      { status: 500 }
    );
  }

  try {
    const { amount } = await request.json();

    if (!amount || typeof amount !== 'number' || amount < 49) {
      return NextResponse.json(
        { error: 'Invalid amount.' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: 'usd',
      metadata: {
        product: 'lip_flip_visualization',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    console.error('Stripe Error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create payment intent.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
