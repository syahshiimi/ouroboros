import { describe, expect, test } from "vitest";
import { composer } from "../../domains/temporal/utils/composer.js";

describe('test the topic producer', async () => {
  test('the topic should produce a url with topic and data', async () => {
    const inputs = {
      date: '2024-01-01',
      topic: 'humidity'
    }
    const result = await composer({ date: inputs.date, topic: "humidity" })
    expect(result).toBe('https://api.data.gov.sg/v1/environment/relative-humidity?date=2024-01-01')
  })
})
