import {Temperature} from "@ouroboros/weathercore-representations";

/**
 * Splits an array into grouped chunks.
 */
export async function chunker<TArr>(input: TArr[], chunkSize: number): Promise<TArr[][]> {
  return input.reduce((resultArr: TArr[][], item, index) => {
    // Determine the chunk position where the item should be in.
    const chunkIndex = Math.floor(index/chunkSize);

    // Create new chunk if no chunk exist.
    if (!resultArr[chunkIndex]) {
      resultArr[chunkIndex] = []
    };

    // Push the item in the position determined by the chunkIndex.
    resultArr[chunkIndex]?.push(item);

    return resultArr;
  }, []);
}
