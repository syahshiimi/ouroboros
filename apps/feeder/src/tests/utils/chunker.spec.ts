import {chunker} from "../../domains/temporal/utils/chunker";
import {describe, expect, test} from "vitest";

describe('test the chunking of a function', async () => {
  const oddArray = [1, 2, 3, 4, 5, 6, 7]
  const evenArray = [1, 2, 3, 4, 5, 6]

  const evenChunkSize = 2
  const oddChunkSize = 3

  test('the chunk size should match', async () => {
    const result = await chunker(evenArray, evenChunkSize);
    expect(result[0]?.length).toBe(evenChunkSize)
  })

  test(`an odd sized array, should not be left behind`, async () => {
    const result = await chunker(oddArray, oddChunkSize)
    expect(result[result.length-1]?.length).toBe(1)
  })
})