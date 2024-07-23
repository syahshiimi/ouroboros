export const contractGraphics = {
  contracts: {
    rainfall: null,
    temperature: null,
    humidity: null,
  },
  getVisuals: function <T extends keyof typeof this.contracts>(
    index: number,
    topic: T,
  ): string | undefined {
    return "";
  },
};
