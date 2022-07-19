export function paginate(items, pageNumber, pageSize) {
  const startIdx = (pageNumber - 1) * pageSize;
  return [...items].splice(startIdx, pageSize);
}
