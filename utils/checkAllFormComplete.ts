export default function checkAllFormComplete<T extends Record<string, unknown>>(
  formData: T
): boolean {
  return Object.values(formData).every((value) => !!value);
}
