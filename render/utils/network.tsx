export const query = async (query: string, ...params: any) => {
  try {
    const data = await backend.query(query, ...params);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export const mutate = async (query: string, ...params: any) => {
  try {
    const data = await backend.mutate(query, ...params);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
