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

  const priceId = process.env.STRIPE_WEEKLY_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: 'Subscription pricing not configured.' },
      { status: 500 }
    );
  }

  try {
    const { paymentIntentId } = await request.json();

    if (!paymentIntentId || typeof paymentIntentId !== 'string') {
      return NextResponse.json({ error: 'Missing paymentIntentId.' }, { status: 400 });
    }

    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not completed.' }, { status: 400 });
    }

    // Check if subscription was already created (by webhook or previous call)
    if (paymentIntent.metadata?.subscription_created === 'true') {
      return NextResponse.json({
        message: 'Subscription already exists.',
        subscriptionId: paymentIntent.metadata.subscription_id,
      });
    }

    if (!paymentIntent.payment_method) {
      return NextResponse.json({ error: 'No payment method found.' }, { status: 400 });
    }

    // Create customer with the payment method
    const customer = await stripe.customers.create({
      payment_method: paymentIntent.payment_method as string,
      invoice_settings: {
        default_payment_method: paymentIntent.payment_method as string,
      },
      metadata: {
        source: 'lip_flip_visualization',
        initial_payment_intent: paymentIntent.id,
      },
    });

    // Create subscription with 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 7,
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        source: 'lip_flip_visualization',
        initial_payment_intent: paymentIntent.id,
      },
    });

    // Mark the PI so we don't double-create
    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        ...paymentIntent.metadata,
        subscription_created: 'true',
        subscription_id: subscription.id,
        customer_id: customer.id,
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      trialEnd: subscription.trial_end,
    });
  } catch (error: unknown) {
    console.error('Subscription Error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to create subscription.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
