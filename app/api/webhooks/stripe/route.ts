import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Only handle lip flip visualization payments
        if (paymentIntent.metadata?.product !== 'lip_flip_visualization') break;
        if (!paymentIntent.payment_method) break;

        // Check if we already created a subscription for this PI
        if (paymentIntent.metadata?.subscription_created === 'true') break;

        const priceId = process.env.STRIPE_WEEKLY_PRICE_ID;
        if (!priceId) {
          console.warn('STRIPE_WEEKLY_PRICE_ID not set — skipping subscription creation');
          break;
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

        console.log(`Subscription ${subscription.id} created for customer ${customer.id} (trial ends in 7 days)`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${invoice.id} paid — $${(invoice.amount_paid / 100).toFixed(2)}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${invoice.id} failed for customer ${invoice.customer}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${subscription.id} canceled for customer ${subscription.customer}`);
        break;
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Trial ending soon for subscription ${subscription.id}`);
        break;
      }

      default:
        // Unhandled event type
        break;
    }
  } catch (err: unknown) {
    console.error('Error processing webhook event:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
