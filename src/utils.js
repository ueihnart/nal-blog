export function normalized(str) {
  if (str === null || str === undefined) return str;
  str = str.trim();
  str = str.replace(/(\s+)/g, " ");
  if (str === "") return str;
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  str = str.replace(/[đĐ]/g, "D");
  str = str.toUpperCase();
  return str;
}
export function toSlug(str) {
  if (str === null || str === undefined) return str;
  str = normalized(str).toLowerCase().replace(/(\s)/g, "-");
  return str;
}
export function paginatedItems(items, page, limit) {
  if (items !== null && items.length > limit) {
    let len = items.length;
    let start = (page - 1) * limit;
    let end = start + limit > len ? len : start + limit;
    return items.slice(start, end);
  }
  return items;
}
export function sortData(data, subject, oder) {
  if (!subject || !oder) return data;

  data.sort((a, b) => {
    const nameA = toSlug(a[subject]);
    const nameB = toSlug(b[subject]);
    if (oder === "Ascending") return nameA > nameB ? 1 : -1;
    if (oder === "Descending") return nameA > nameB ? -1 : 1;
    return 0;
  });
  return data;
}
