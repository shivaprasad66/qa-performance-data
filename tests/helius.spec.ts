import { test, expect } from '@playwright/test';
import 'dotenv/config';

const RPC = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_KEY}`;

const call = (method: string, params: unknown[] = []) => ({
  jsonrpc: '2.0',
  id: 1,
  method,
  params,
});

test('RPC is healthy', async ({ request }) => {
  const response = await request.post(RPC, {
    data: call('getHealth'),
  });

  expect(response.status()).toBe(200);

  const json = await response.json();

  expect(json.result).toBe('ok');
});

test('getBalance returns a valid, non-negative value', async ({ request }) => {
  const address = 'So11111111111111111111111111111111111111112';

  const response = await request.post(RPC, {
    data: call('getBalance', [address]),
  });

  expect(response.status()).toBe(200);

  const json = await response.json();

  expect(json.jsonrpc).toBe('2.0');
  expect(typeof json.result.value).toBe('number');
  expect(json.result.value).toBeGreaterThanOrEqual(0);
});

test('latency SLA: responds under 1.5s', async ({ request }) => {
  const start = Date.now();

  const response = await request.post(RPC, {
    data: call('getSlot'),
  });

  const elapsed = Date.now() - start;

  expect(response.status()).toBe(200);
  expect(elapsed).toBeLessThan(1500);
});

test('invalid method returns a JSON-RPC error', async ({ request }) => {
  const response = await request.post(RPC, {
    data: call('notARealMethod'),
  });

  const json = await response.json();

  expect(json.error).toBeTruthy();
  expect(json.error.code).toBeDefined();
});