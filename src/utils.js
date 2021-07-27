export function paginatedItems(items, page, limit) {
  if (items !== null && items.length > limit) {
    let len = items.length;
    let start = (page - 1) * limit;
    let end = start + limit > len ? len : start + limit;
    return items.slice(start, end);
  }
  return items;
}
